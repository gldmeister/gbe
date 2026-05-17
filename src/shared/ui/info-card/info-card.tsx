// src/shared/ui/info-card/info-card.tsx

import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  children: ReactNode;
};

export function InfoCard({ title, children }: InfoCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}