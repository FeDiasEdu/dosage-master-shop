import { useState, useEffect } from "react";
import { toast } from "sonner";
import type { CustomerProfile } from "@/hooks/use-auth";

interface ProfilePageProps {
  profile: CustomerProfile | null;
  email: string;
  onUpdate: (updates: Partial<Omit<CustomerProfile, "id" | "email">>) => Promise<{ error?: string }>;
  onSignOut: () => void;
  onClose: () => void;
}

export default function ProfilePage({ profile, email, onUpdate, onSignOut, onClose }: ProfilePageProps) {
  const [name, setName] = useState(profile?.name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [cpf, setCpf] = useState(profile?.cpf || "");
  const [cep, setCep] = useState(profile?.address?.cep || "");
  const [street, setStreet] = useState(profile?.address?.street || "");
  const [number, setNumber] = useState(profile?.address?.number || "");
  const [complement, setComplement] = useState(profile?.address?.complement || "");
  const [neighborhood, setNeighborhood] = useState(profile?.address?.neighborhood || "");
  const [city, setCity] = useState(profile?.address?.city || "");
  const [state, setState] = useState(profile?.address?.state || "");
  const [saving, setSaving] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setCpf(profile.cpf || "");
      setCep(profile.address?.cep || "");
      setStreet(profile.address?.street || "");
      setNumber(profile.address?.number || "");
      setComplement(profile.address?.complement || "");
      setNeighborhood(profile.address?.neighborhood || "");
      setCity(profile.address?.city || "");
      setState(profile.address?.state || "");
    }
  }, [profile]);

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 10) return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    return digits.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  };

  const lookupCep = async (cepValue: string) => {
    const digits = cepValue.replace(/\D/g, "");
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
    } catch {
      // silent
    } finally {
      setCepLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Informe seu nome completo");
      return;
    }
    setSaving(true);
    const { error } = await onUpdate({
      name,
      phone: phone || null,
      cpf: cpf.replace(/\D/g, "") || null,
      address: {
        cep: cep.replace(/\D/g, ""),
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
      },
    });
    setSaving(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Perfil atualizado!");
    }
  };

  return (
    <div className="fixed inset-0 z-[1500] bg-background overflow-y-auto">
      <div className="max-w-[560px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold">👤 Meu Perfil</h1>
          <button onClick={onClose} className="text-muted-foreground text-sm cursor-pointer bg-transparent border-none hover:text-foreground">
            ← Voltar
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="border-b border-border pb-3 mb-2">
            <p className="text-xs text-muted-foreground">Conectado como</p>
            <p className="text-sm font-semibold text-foreground">{email}</p>
          </div>

          {/* Personal */}
          <h3 className="text-[.7rem] font-bold uppercase tracking-wider text-muted-foreground">Dados Pessoais</h3>

          <Field label="Nome completo" value={name} onChange={setName} required />
          <Field label="Telefone" value={formatPhone(phone)} onChange={(v) => setPhone(v.replace(/\D/g, ""))} placeholder="(11) 99999-9999" />
          <Field label="CPF" value={formatCpf(cpf)} onChange={(v) => setCpf(v.replace(/\D/g, ""))} placeholder="000.000.000-00" />

          {/* Address */}
          <h3 className="text-[.7rem] font-bold uppercase tracking-wider text-muted-foreground mt-4">Endereço de Entrega</h3>

          <div className="flex gap-2">
            <div className="flex-1">
              <Field label="CEP" value={formatCep(cep)} onChange={(v) => setCep(v.replace(/\D/g, ""))} placeholder="00000-000"
                onBlur={() => lookupCep(cep)} />
            </div>
            {cepLoading && <span className="text-xs text-muted-foreground self-end pb-3">Buscando…</span>}
          </div>

          <Field label="Endereço" value={street} onChange={setStreet} placeholder="Rua, Avenida…" />

          <div className="grid grid-cols-[1fr_2fr] gap-2">
            <Field label="Número" value={number} onChange={setNumber} placeholder="123" />
            <Field label="Complemento" value={complement} onChange={setComplement} placeholder="Apto, bloco…" />
          </div>

          <Field label="Bairro" value={neighborhood} onChange={setNeighborhood} />

          <div className="grid grid-cols-[2fr_1fr] gap-2">
            <Field label="Cidade" value={city} onChange={setCity} />
            <Field label="Estado" value={state} onChange={setState} placeholder="SP" maxLength={2} />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-lg bg-foreground text-card border-none text-sm font-bold cursor-pointer hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Salvando…" : "Salvar Perfil"}
            </button>
            <button
              onClick={() => { onSignOut(); onClose(); }}
              className="px-5 py-3 rounded-lg border border-border bg-transparent text-muted-foreground text-sm cursor-pointer hover:border-foreground hover:text-foreground"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, maxLength, onBlur }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; maxLength?: number; onBlur?: () => void;
}) {
  return (
    <div>
      <label className="block text-[.65rem] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground text-sm outline-none focus:border-foreground transition-colors"
      />
    </div>
  );
}
