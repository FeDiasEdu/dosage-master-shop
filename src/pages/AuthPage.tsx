import { useState } from "react";
import { toast } from "sonner";
import logoHorizontal from "@/assets/logo-horizontal.png";

interface AuthPageProps {
  onAuth: (action: "login" | "signup", email: string, password: string, name?: string, extra?: SignupExtra) => Promise<{ error?: string | null }>;
  onResetPassword: (email: string) => Promise<{ error?: any }>;
  onClose: () => void;
}

export interface SignupExtra {
  phone: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

type View = "login" | "signup" | "forgot";

export default function AuthPage({ onAuth, onResetPassword, onClose }: AuthPageProps) {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const formatCpf = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const formatCep = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  };

  const lookupCep = async (rawCep: string) => {
    const digits = rawCep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setStreet(data.logradouro || "");
        setNeighborhood(data.bairro || "");
        setCity(data.localidade || "");
        setState(data.uf || "");
      }
    } catch { /* ignore */ }
    setCepLoading(false);
  };

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
      if (!name.trim()) { toast.error("Informe seu nome completo"); return; }
      if (password.length < 6) { toast.error("A senha deve ter pelo menos 6 caracteres"); return; }
      if (password !== confirmPassword) { toast.error("As senhas não coincidem"); return; }
    }

    setLoading(true);
    const extra: SignupExtra = { phone, cpf, cep, street, number, complement, neighborhood, city, state };
    const result = await onAuth(view, email, password, name, view === "signup" ? extra : undefined);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else if (view === "signup") {
      toast.success("Cadastro realizado! Você já está logado.");
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground transition-colors";
  const labelClass = "block text-[.7rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1";

  return (
    <div className="fixed inset-0 z-[1500] bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 text-center border-b border-border shrink-0">
          <img src={logoHorizontal} alt="AURA Peptides" className="h-7 mx-auto mb-4 dark:invert" />
          <h2 className="text-lg font-extrabold tracking-tight">
            {view === "login" ? "Entrar" : view === "signup" ? "Criar Conta" : "Recuperar Senha"}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {view === "login"
              ? "Acesse sua conta AURA"
              : view === "signup"
                ? "Preencha seus dados para criar sua conta"
                : "Informe seu email para recuperar o acesso"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-3">
          {view === "signup" && (
            <>
              <div>
                <label className={labelClass}>Nome completo</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" required className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Telefone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(11) 99999-9999" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>CPF</label>
                <input type="text" value={cpf} onChange={(e) => setCpf(formatCpf(e.target.value))} placeholder="000.000.000-00" className={inputClass} />
              </div>
            </>
          )}

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required autoFocus className={inputClass} />
          </div>

          {view !== "forgot" && (
            <div>
              <label className={labelClass}>Senha</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className={inputClass} />
            </div>
          )}

          {view === "signup" && (
            <>
              <div>
                <label className={labelClass}>Confirmar Senha</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required minLength={6} className={inputClass} />
              </div>

              {/* Address section */}
              <div className="pt-2 border-t border-border mt-3">
                <p className="text-[.68rem] font-bold text-muted-foreground uppercase tracking-wider mb-3">📍 Endereço de entrega</p>
                <div className="grid grid-cols-[1fr_auto] gap-2 mb-2">
                  <div>
                    <label className={labelClass}>CEP</label>
                    <input type="text" value={cep} onChange={(e) => { setCep(formatCep(e.target.value)); }} onBlur={(e) => lookupCep(e.target.value)} placeholder="00000-000" className={inputClass} />
                  </div>
                  <div className="flex items-end">
                    <button type="button" onClick={() => lookupCep(cep)} disabled={cepLoading}
                      className="px-3 py-2.5 rounded-lg border border-border bg-secondary text-foreground text-xs font-semibold cursor-pointer hover:border-foreground disabled:opacity-50">
                      {cepLoading ? "…" : "Buscar"}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className={labelClass}>Rua / Avenida</label>
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Rua Exemplo" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={labelClass}>Número</label>
                      <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="123" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Complemento</label>
                      <input type="text" value={complement} onChange={(e) => setComplement(e.target.value)} placeholder="Apto 4B" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Bairro</label>
                    <input type="text" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Centro" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-[1fr_80px] gap-2">
                    <div>
                      <label className={labelClass}>Cidade</label>
                      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="São Paulo" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>UF</label>
                      <input type="text" value={state} onChange={(e) => setState(e.target.value.toUpperCase().slice(0, 2))} placeholder="SP" maxLength={2} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer transition-opacity hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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
        <div className="px-8 pb-6 space-y-2 text-center shrink-0">
          {view === "login" && (
            <>
              <button onClick={() => setView("forgot")} className="text-xs text-muted-foreground cursor-pointer bg-transparent border-none hover:text-foreground transition-colors">
                Esqueceu a senha?
              </button>
              <div className="text-xs text-muted-foreground">
                Não tem conta?{" "}
                <button onClick={() => setView("signup")} className="font-semibold text-foreground cursor-pointer bg-transparent border-none hover:underline">
                  Criar conta
                </button>
              </div>
            </>
          )}
          {view === "signup" && (
            <div className="text-xs text-muted-foreground">
              Já tem conta?{" "}
              <button onClick={() => setView("login")} className="font-semibold text-foreground cursor-pointer bg-transparent border-none hover:underline">
                Entrar
              </button>
            </div>
          )}
          {view === "forgot" && (
            <button onClick={() => setView("login")} className="text-xs text-muted-foreground cursor-pointer bg-transparent border-none hover:text-foreground transition-colors">
              ← Voltar ao login
            </button>
          )}
          <div className="pt-2">
            <button onClick={onClose} className="text-xs text-muted-foreground cursor-pointer bg-transparent border-none hover:text-foreground transition-colors">
              Continuar sem conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
