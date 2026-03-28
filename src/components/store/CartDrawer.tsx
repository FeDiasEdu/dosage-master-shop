import { useCartStore } from "@/stores/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();

  const handleIncrement = (sku: string, currentQty: number, maxStock: number) => {
    if (currentQty >= maxStock) {
      toast.error(`Limite de estoque: ${maxStock} unidade(s)`);
      return;
    }
    updateQuantity(sku, currentQty + 1);
  };

  const checkout = () => {
    if (items.length === 0) return;
    const lines = items.map(
      (i) => `• ${i.productName} (${i.label}) × ${i.quantity} = R$ ${(i.price * i.quantity).toFixed(2).replace(".", ",")}`
    );
    const total = `\n💰 Total: R$ ${totalPrice().toFixed(2).replace(".", ",")}`;
    const msg = encodeURIComponent(`Olá! Gostaria de fazer um pedido:\n\n${lines.join("\n")}${total}`);
    window.open(`https://wa.me/5511973616286?text=${msg}`, "_blank");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-[600]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <div
        className={`fixed right-0 top-0 bottom-0 w-[min(400px,95vw)] bg-card border-l border-border z-[700] flex flex-col shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-5 pt-5 pb-4 border-b border-border shrink-0">
          <span className="font-bold text-base">Carrinho</span>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer text-xl text-muted-foreground">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm py-10">Carrinho vazio</div>
          ) : (
            items.map((item) => (
              <div key={item.sku} className="flex gap-2.5 items-start py-2.5 border-b border-border last:border-b-0">
                <div className="flex-1">
                  <div className="text-[.82rem] font-bold text-foreground">{item.productName}</div>
                  <div className="text-[.72rem] text-muted-foreground mt-0.5">
                    {item.label}
                    {item.maxStock > 0 && <span className="ml-1 opacity-60">(máx: {item.maxStock})</span>}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <button
                      onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-border bg-transparent cursor-pointer text-sm text-foreground flex items-center justify-center hover:bg-secondary"
                    >−</button>
                    <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.sku, item.quantity, item.maxStock)}
                      className="w-6 h-6 rounded-full border border-border bg-transparent cursor-pointer text-sm text-foreground flex items-center justify-center hover:bg-secondary"
                    >+</button>
                    <button
                      onClick={() => removeItem(item.sku)}
                      className="ml-2 text-xs text-destructive cursor-pointer bg-transparent border-none"
                    >Remover</button>
                  </div>
                </div>
                <div className="text-[.82rem] font-bold text-foreground whitespace-nowrap">
                  R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-5 py-4 border-t border-border shrink-0">
          <div className="flex justify-between items-center mb-3">
            <span className="text-muted-foreground text-sm">Total</span>
            <span className="text-lg font-extrabold text-foreground">
              R$ {totalPrice().toFixed(2).replace(".", ",")}
            </span>
          </div>
          <button
            onClick={checkout}
            disabled={items.length === 0}
            className="w-full py-3 rounded-xl bg-foreground text-card border-none text-[.9rem] font-bold cursor-pointer font-sans hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finalizar pedido via WhatsApp
          </button>
          <p className="text-[.7rem] text-muted-foreground text-center mt-2">
            Você será direcionado ao WhatsApp para confirmar
          </p>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="w-full mt-2 py-2 rounded-lg bg-transparent border border-border text-muted-foreground text-xs cursor-pointer font-sans hover:border-foreground hover:text-foreground transition-all"
            >
              Limpar carrinho
            </button>
          )}
        </div>
      </div>
    </>
  );
}
