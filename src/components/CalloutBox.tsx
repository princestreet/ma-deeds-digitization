export default function CalloutBox({
  children,
  variant = "blue",
}: {
  children: React.ReactNode;
  variant?: "blue" | "amber" | "red";
}) {
  const borderColor = {
    blue: "border-blue-500",
    amber: "border-amber-500",
    red: "border-red-500",
  }[variant];

  const bgColor = {
    blue: "bg-blue-50",
    amber: "bg-amber-50",
    red: "bg-red-50",
  }[variant];

  return (
    <div
      className={`border-l-4 ${borderColor} ${bgColor} p-4 md:p-5 my-6 rounded-r-lg`}
    >
      <div className="text-slate-700 text-base leading-relaxed font-sans">
        {children}
      </div>
    </div>
  );
}
