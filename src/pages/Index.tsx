import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import StorePage from "@/pages/StorePage";
import GuidePage from "@/pages/GuidePage";
import CalcPage from "@/pages/CalcPage";
import AdminPanel from "@/components/admin/AdminPanel";
import AuthPage from "@/pages/AuthPage";
import ProfilePage from "@/pages/ProfilePage";
import { useAuth } from "@/hooks/use-auth";
import iconInstagram from "@/assets/icon-instagram.png";
import iconWhatsapp from "@/assets/icon-whatsapp.png";
import iconGmail from "@/assets/icon-gmail.png";

type Tab = "guia" | "calc" | "store";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("store");
  const [adminOpen, setAdminOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  // Open admin via hash or Ctrl+Shift+A
  useEffect(() => {
    if (location.hash === "#admin") {
      setTimeout(() => setAdminOpen(true), 500);
    }
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setAdminOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleAuth = async (action: "login" | "signup", email: string, password: string, name?: string, extra?: any) => {
    if (action === "signup") {
      const { error } = await auth.signUp(email, password, name || "");
      if (error) return { error: error.message };
      // Save profile data (phone, cpf, address) after signup
      if (extra) {
        // Wait briefly for auth state to propagate
        setTimeout(async () => {
          const { data: { user } } = await (await import("@/integrations/supabase/client")).supabase.auth.getUser();
          if (user) {
            await (await import("@/integrations/supabase/client")).supabase
              .from("customers")
              .upsert({
                id: user.id,
                email,
                name: name || "",
                phone: extra.phone || null,
                cpf: extra.cpf?.replace(/\D/g, "") || null,
                address: {
                  cep: extra.cep?.replace(/\D/g, "") || "",
                  street: extra.street || "",
                  number: extra.number || "",
                  complement: extra.complement || "",
                  neighborhood: extra.neighborhood || "",
                  city: extra.city || "",
                  state: extra.state || "",
                },
              }, { onConflict: "id" });
            auth.refetchProfile();
          }
        }, 500);
      }
      return { error: null };
    } else {
      const { error } = await auth.signIn(email, password);
      if (error) return { error: error.message };
      setAuthOpen(false);
      return { error: null };
    }
  };

  const handleResetPassword = async (email: string) => {
    return auth.resetPassword(email);
  };

  return (
    <>
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={auth.user}
        onAuthClick={() => auth.user ? setProfileOpen(true) : setAuthOpen(true)}
      />
      {activeTab === "guia" && <GuidePage />}
      {activeTab === "calc" && <CalcPage />}
      {activeTab === "store" && <StorePage />}

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Footer */}
      <footer className="max-w-[1100px] mx-auto px-6 py-5 pb-20 sm:pb-10 border-t border-border">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
          <span className="text-muted-foreground text-[11.5px]">© {new Date().getFullYear()} AURA Peptides</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px]">
            <span className="bg-foreground text-card text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[2px]">RUO</span>
            <span className="text-muted-foreground">Research Use Only</span>
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <a href="https://instagram.com/aura_peptides" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-foreground text-[11.5px] font-medium no-underline transition-all hover:bg-secondary hover:border-foreground">
            <img src={iconInstagram} alt="Instagram" className="w-3.5 h-3.5 object-contain" />
            @aura_peptides
          </a>
          <a href="https://wa.me/5511973616286" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-foreground text-[11.5px] font-medium no-underline transition-all hover:bg-secondary hover:border-foreground">
            <img src={iconWhatsapp} alt="WhatsApp" className="w-3.5 h-3.5 object-contain" />
            (11) 97361-6286
          </a>
          <a href="mailto:peptides.aura@gmail.com"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-foreground text-[11.5px] font-medium no-underline transition-all hover:bg-secondary hover:border-foreground">
            <img src={iconGmail} alt="Gmail" className="w-3.5 h-3.5 object-contain" />
            peptides.aura@gmail.com
          </a>
        </div>
      </footer>

      {/* Auth */}
      {authOpen && (
        <AuthPage
          onAuth={handleAuth}
          onResetPassword={handleResetPassword}
          onClose={() => setAuthOpen(false)}
        />
      )}

      {/* Profile */}
      {profileOpen && auth.user && (
        <ProfilePage
          profile={auth.profile}
          email={auth.user.email || ""}
          onUpdate={auth.updateProfile}
          onSignOut={auth.signOut}
          onClose={() => setProfileOpen(false)}
        />
      )}

      {/* Admin Panel */}
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-7 right-6 z-[500] w-11 h-11 rounded-full bg-foreground text-card border-none cursor-pointer text-lg font-bold flex items-center justify-center shadow-lg transition-all hover:-translate-y-0.5"
    >
      ↑
    </button>
  );
}
