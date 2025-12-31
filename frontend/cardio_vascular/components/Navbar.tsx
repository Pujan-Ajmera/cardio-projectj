"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Activity, BarChart3, HelpCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Activity,
      active: pathname === "/",
    },
    {
      href: "/predict",
      label: "Predict Risk",
      icon: Activity, // You might want a different icon or reuse
      active: pathname === "/predict",
    },
    // {
    //     href: "/stats",
    //     label: "Model Stats",
    //     icon: BarChart3,
    //     active: pathname === "/stats",
    // },
    {
      href: "/how-to",
      label: "How to Use",
      icon: HelpCircle,
      active: pathname === "/how-to",
    },
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight"
        >
          <Activity className="h-6 w-6" />
          <span>CardioGuard</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                route.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
          <Button asChild variant="default" size="sm" className="ml-4">
            <Link href="/predict">Start Assessment</Link>
          </Button>
        </div>

        {/* Mobile Menu Placeholder - For simplicity using just a button or simple list if needed later */}
        <div className="md:hidden">
          {/* Mobile menu implementation optional but good for responsiveness */}
        </div>
      </div>
    </nav>
  );
}
