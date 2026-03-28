import { useState } from "react";
import { toast } from "sonner";
import logoHorizontal from "@/assets/logo-horizontal.png";

interface AuthPageProps {
  onAuth: (action: "login" | "signup", email: string, password: string, name?: string) => Promise<{ error?: string | null }>;
  onResetPassword: (email: string) => Promise<{ error?: any }>;
  onClose: () => void;
}

type View = "login" | "signup" | "forgot";

export default function AuthPage({ onAuth, onResetPassword, onClose }: AuthPageProps) {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (view === "forgot") {
      setLoading(true);
      const { error } = await onResetPassword(email);
      setLoading(false);
      if (error) {
        toast.error("Erro ao enviar email de recuperação");
      } else {
        toast.success("Email de recuperação enviado!");
        setView("login");
      }
      return;
    }

    if (view === "signup") {
      if (!name.trim()) {
        toast.error("Informe seu nome completo");
        return;
      }
      if (password.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem");
        return;
      }
    }

    setLoading(true);
    const result = await onAuth(view, email, password, name);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else if (view === "signup") {
      toast.success("Cadastro realizado! Verifique seu email para confirmar.");
    }
  };

  return (
    <div className="fixed inset-0 z-[1500] bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 text-center border-b border-border">
          <img src={logoHorizontal} alt="AURA Peptides" className="h-7 mx-auto mb-4 dark:invert" />
          <h2 className="text-lg font-extrabold tracking-tight">
            {view === "login" ? "Entrar" : view === "signup" ? "Criar Conta" : "Recuperar Senha"}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {view === "login"
              ? "Acesse sua conta AURA"
              : view === "signup"
                ? "Crie sua conta para fazer pedidos"
                : "Informe seu email para recuperar o acesso"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-3.5">
          {view === "signup" && (
            <div>
              <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoFocus
              className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground transition-colors"
            />
          </div>

          {view !== "forgot" && (
            <div>
              <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground transition-colors"
              />
            </div>
          )}

          {view === "signup" && (
            <div>
              <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Confirmar Senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-3.5 py-2.5 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground transition-colors"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer transition-opacity hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Aguarde…"
              : view === "login"
                ? "Entrar"
                : view === "signup"
                  ? "Criar Conta"
                  : "Enviar Email"
            }
          </button>
        </form>

        {/* Footer links */}
        <div className="px-8 pb-6 space-y-2 text-center">
          {view === "login" && (
            <>
              <button
                onClick={() => setView("forgot")}
                className="text-xs text-muted-foreground cursor-pointer bg-transparent border-none hover:text-foreground transition-colors"
              >
                Esqueceu a senha?
              </button>
              <div className="text-xs text-muted-foreground">
                Não tem conta?{" "}
                <button
                  onClick={() => setView("signup")}
                  className="font-semibold text-foreground cursor-pointer bg-transparent border-none hover:underline"
                >
                  Criar conta
                </button>
              </div>
            </>
          )}
          {view === "signup" && (
            <div className="text-xs text-muted-foreground">
              Já tem conta?{" "}
              <button
                onClick={() => setView("login")}
                className="font-semibold text-foreground cursor-pointer bg-transparent border-none hover:underline"
              >
                Entrar
              </button>
            </div>
          )}
          {view === "forgot" && (
            <button
              onClick={() => setView("login")}
              className="text-xs text-muted-foreground cursor-pointer bg-transparent border-none hover:text-foreground transition-colors"
            >
              ← Voltar ao login
            </button>
          )}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="text-xs text-muted-foreground cursor-pointer bg-transparent border-none hover:text-foreground transition-colors"
            >
              Continuar sem conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
