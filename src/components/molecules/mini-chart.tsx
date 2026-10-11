// Molécula: mini-gráfico de linha (receita x custo). SVG puro — Recharts só a
// partir da Fase 3 (design.md). Cores via tokens chart-1 (receita) e chart-2.
function toPath(points: number[], width: number, height: number): string {
  const step = width / (points.length - 1);
  return points
    .map((v, i) => {
      const x = i * step;
      const y = height - (v / 100) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export function MiniChart({
  series,
}: {
  series: { month: string; revenue: number; cost: number }[];
}) {
  const width = 500;
  const height = 150;
  const revenue = series.map((s) => s.revenue);
  const cost = series.map((s) => s.cost);

  return (
    <div className="px-1">
      <div className="mb-3 flex justify-end gap-4 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <i className="size-2 rounded-full bg-chart-1" /> Receitas
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="size-2 rounded-full bg-chart-2" /> Custos
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-[150px] w-full"
        role="img"
        aria-label="Receitas e custos nos últimos 6 meses"
      >
        <path
          d={toPath(revenue, width, height)}
          fill="none"
          stroke="var(--chart-1)"
          strokeWidth={3}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={toPath(cost, width, height)}
          fill="none"
          stroke="var(--chart-2)"
          strokeWidth={3}
          strokeDasharray="6 5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        {series.map((s) => (
          <span key={s.month}>{s.month}</span>
        ))}
      </div>
    </div>
  );
}
