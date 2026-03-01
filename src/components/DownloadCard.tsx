export default function DownloadCard({
  title,
  description,
  href,
  size,
}: {
  title: string;
  description: string;
  href: string;
  size: string;
}) {
  return (
    <a
      href={href}
      download
      className="block border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-colors group"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-slate-400 group-hover:text-blue-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-sm text-slate-800 font-sans group-hover:text-blue-700">
            {title}
          </div>
          <div className="text-xs text-slate-500 mt-1">{description}</div>
          <div className="text-xs text-slate-400 mt-1">{size}</div>
        </div>
      </div>
    </a>
  );
}
