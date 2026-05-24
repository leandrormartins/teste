export function Logo({ size = "default" }: { size?: "default" | "small" }) {
  const big = size === "default";
  if (big) {
    return (
      <div className="flex flex-wrap items-baseline gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          vidadosfamosos<span className="text-primary">.</span>com.br
        </h1>
        <span className="inline-flex items-center gap-1 rounded-md bg-yellow-400 px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-yellow-900 shadow-sm">
          <span>★</span> Premium
        </span>
      </div>
    );
  }
  return (
    <span className="text-base font-extrabold tracking-tight text-gray-900 md:text-lg">
      vidadosfamosos<span className="text-primary">.</span>com.br
    </span>
  );
}
