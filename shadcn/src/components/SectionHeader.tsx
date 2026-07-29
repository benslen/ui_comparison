export function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-1">
      <h2 className="text-lg font-semibold leading-tight">{title}</h2>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}
