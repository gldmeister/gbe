// src/shared/ui/button/button-links.tsx

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonLinkVariant;
};

const buttonBaseClasses =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-300";

const buttonVariantClasses: Record<ButtonLinkVariant, string> = {
  primary: "bg-blue-700 text-white hover:bg-blue-800",
  secondary:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${buttonBaseClasses} ${buttonVariantClasses[variant]}`}
    >
      {children}
    </Link>
  );
}