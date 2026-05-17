// src/shared/ui/page-container/page-cintainer.tsx

import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-5xl">{children}</section>
    </main>
  );
}