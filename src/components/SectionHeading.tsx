export default function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-2xl md:text-3xl font-bold text-slate-900 font-sans mt-16 mb-6 scroll-mt-20"
    >
      {children}
    </h2>
  );
}
