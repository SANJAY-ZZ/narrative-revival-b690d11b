export function QuickAction({
  label,
  onClick,
  icon,
}: {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border border-border bg-card px-4 py-3 text-left text-[12px] uppercase tracking-[0.1em] text-foreground transition-colors hover:border-gold hover:text-gold"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
