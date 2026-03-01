export default function ChartContainer({
  title,
  caption,
  sourceNote,
  children,
}: {
  title?: string;
  caption?: string;
  sourceNote?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 max-w-[900px] mx-auto">
      {title && (
        <h3 className="text-lg font-semibold text-slate-800 font-sans mb-3">
          {title}
        </h3>
      )}
      {caption && (
        <p className="text-sm text-slate-500 font-sans mb-4">{caption}</p>
      )}
      <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6">
        {children}
      </div>
      {sourceNote && (
        <p className="text-xs text-slate-400 font-sans mt-2 italic">
          {sourceNote}
        </p>
      )}
    </div>
  );
}
