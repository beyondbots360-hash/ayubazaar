import { cookies } from "next/headers";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  ExternalLink, 
  LogOut,
  Leaf
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAuthenticated = session?.value === "authenticated";

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex flex-col md:flex-row text-[#174A3A]">
      <aside className="w-full md:w-64 bg-[#174A3A] text-[#F8F5EC] flex flex-col justify-between shrink-0 shadow-xl border-r border-[#D6A83F]/20">
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#11382C] border border-[#D6A83F]/40 flex items-center justify-center shadow-inner">
                <span className="font-serif font-bold text-xl text-[#D6A83F]">A</span>
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold tracking-tight text-white">
                  AyuBazaar
                </h2>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#D6A83F]">
                  Admin Portal
                </p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1.5">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#D6A83F]" />
              <span>Dashboard Overview</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
            >
              <Package className="w-4 h-4 text-[#D6A83F]" />
              <span>Products & Prices</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#D6A83F]" />
              <span>Orders & Customers</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 text-[#D6A83F]" />
              View Live Storefront
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div>
            <button
              type="button"
              id="admin-logout-btn"
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', () => {
                const btn = document.getElementById('admin-logout-btn');
                if (btn) {
                  btn.onclick = async () => {
                    await fetch('/api/admin/auth', { method: 'DELETE' });
                    window.location.href = '/admin/login';
                  };
                }
              });
            `,
          }}
        />
        {children}
      </main>
    </div>
  );
}
