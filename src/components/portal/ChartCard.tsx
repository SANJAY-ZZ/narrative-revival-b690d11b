export function ChartCard({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-base text-foreground">{title}</h3>
          {subtitle ? <p className="mt-1 text-[12px] text-muted-foreground">{subtitle}</p> : null}
        </div>
        {right}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/** Hand-rolled line chart, no dependency. */
export function LineChart({
  data,
  height = 160,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const w = 480;
  const h = height;
  const pad = 10;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1 || 1);
  const points = data.map((d, i) => {
    const x = pad + i * step;
    const y = h - pad - ((d.value - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });
  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1]![0]},${h - pad} L${points[0]![0]},${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="orvnt-line-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={pad}
          x2={w - pad}
          y1={pad + f * (h - pad * 2)}
          y2={pad + f * (h - pad * 2)}
          stroke="var(--color-border)"
          strokeWidth={1}
        />
      ))}
      <path d={areaPath} fill="url(#orvnt-line-fill)" stroke="none" />
      <path d={linePath} fill="none" stroke="var(--gold)" strokeWidth={1.6} />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.4} fill="var(--gold)" />
      ))}
    </svg>
  );
}

/** Hand-rolled donut chart, no dependency. */
export function DonutChart({
  data,
  size = 160,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 14;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border)" strokeWidth={16} />
        {data.map((d, i) => {
          const frac = d.value / total;
          const dash = frac * circumference;
          const el = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth={16}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return el;
        })}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground"
          style={{ fontFamily: "var(--font-display)", fontSize: 20 }}
        >
          {total}
        </text>
      </svg>
      <ul className="flex flex-col gap-2">
        {data.map((d, i) => (
          <li key={i} className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span className="h-2 w-2 shrink-0" style={{ background: d.color }} />
            {d.label} <span className="text-foreground">({d.value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
