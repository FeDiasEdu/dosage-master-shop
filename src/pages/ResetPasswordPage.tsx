import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoHorizontal from "@/assets/logo-horizontal.png";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if this is a recovery flow
    const hash = window.location.hash;
    if (!hash.includes("type=recovery")) {
      setError("Link de recuperação inválido ou expirado.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      setDone(true);
      toast.success("Senha atualizada com sucesso!");
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground transition-colors";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[420px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-5 text-center border-b border-border">
          <img src={logoHorizontal} alt="AURA Peptides" className="h-7 mx-auto mb-4 dark:invert" />
          <h2 className="text-lg font-extrabold tracking-tight">Redefinir Senha</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {done ? "Sua senha foi atualizada." : error || "Escolha uma nova senha para sua conta."}
          </p>
        </div>

        <div className="px-8 py-6">
          {done ? (
            <a
              href="/"
              className="block w-full py-3 rounded-lg bg-foreground text-card text-center text-sm font-bold no-underline hover:opacity-85"
            >
              Voltar à loja
            </a>
          ) : error ? (
            <a
              href="/"
              className="block w-full py-3 rounded-lg border border-border text-foreground text-center text-sm font-semibold no-underline hover:bg-secondary"
            >
              Voltar à loja
            </a>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Nova Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className={inputClass} autoFocus />
              </div>
              <div>
                <label className="block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Confirmar Nova Senha</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required minLength={6} className={inputClass} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Aguarde…" : "Redefinir Senha"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
