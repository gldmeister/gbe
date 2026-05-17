// src/shared/ui/page-header/page-header.tsx

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <>
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-700">
        {eyebrow}
      </p>

      <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h1>

      <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-700">
        {description}
      </p>
    </>
  );
}