
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  hideHeader?: boolean;
}

const Layout = ({ children, title, subtitle, hideHeader = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 animate-page-in">
        {!hideHeader && (
          <header className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl relative inline-block">
              <span className="relative inline-block">
                {title}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded opacity-70"></span>
              </span>
            </h1>
            {subtitle && (
              <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto animate-fade-in">
                {subtitle}
              </p>
            )}
          </header>
        )}
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
