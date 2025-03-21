
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, PlusCircle, LayoutGrid } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", label: "Beranda", icon: LayoutGrid },
    { path: "/create", label: "Tambah Koleksi", icon: PlusCircle },
    { path: "/collections", label: "Semua Koleksi", icon: FileText },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="glass border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-xl text-blue-600 flex items-center gap-2">
              <span className="bg-blue-600 text-white p-1 rounded">Admin</span>
              <span>Daarul Ilmi</span>
            </Link>

            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium hover-lift ${
                    isActive(item.path)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="md:hidden flex">
              {/* Mobile menu button */}
              <button className="text-gray-700 hover:text-blue-600">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
