export default function StatCard({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm">
      <div className="text-3xl md:text-4xl font-bold text-slate-900 font-sans tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-600 font-sans uppercase tracking-wide">
        {label}
      </div>
      {sublabel && (
        <div className="mt-1 text-xs text-slate-400 font-sans">{sublabel}</div>
      )}
    </div>
  );
}
