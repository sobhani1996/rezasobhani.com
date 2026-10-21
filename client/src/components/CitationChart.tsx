// Single-series bar chart of citations per year: one hue, rounded data-ends, hover tooltips, table fallback.
import { useState } from "react";
import { metrics } from "@/content/profile";
import { useLanguage } from "@/contexts/LanguageContext";

const W = 560;
const H = 220;
const PAD = { top: 28, right: 8, bottom: 28, left: 8 };
const R = 4;

function barPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(R, h, w / 2);
  const b = y + h;
  return `M${x},${b}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${b}Z`;
}

export default function CitationChart() {
  const { s, num, language } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const data = metrics.citationsByYear;
  const max = Math.max(...data.map((d) => d.count));
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const slot = innerW / data.length;
  const barW = slot - 2 * Math.max(2, slot * 0.18);
  const last = data.length - 1;
  const shown = active ?? last;

  return (
    <figure className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-serif text-lg font-semibold text-ink">{s.home.chartTitle}</span>
        <button type="button" onClick={() => setShowTable((v) => !v)} className="text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">
          {s.home.chartTable}
        </button>
      </figcaption>
      <p className="mt-1 text-sm text-muted-foreground">{s.home.chartCaption}</p>

      {showTable ? (
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-1.5 text-start font-medium">{s.home.chartYear}</th>
              <th className="py-1.5 text-end font-medium">{s.home.chartCount}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.year} className="border-b border-border/60">
                <td className="py-1.5">{num(d.year).replace(/٬|,/g, "")}</td>
                <td className="py-1.5 text-end tabular-nums">{num(d.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="relative mt-4" dir="ltr">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${s.home.chartTitle}: ${data.map((d) => `${d.year} ${d.count}`).join(", ")}`}>
            <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} stroke="var(--border)" strokeWidth={1} />
            {data.map((d, i) => {
              const h = (d.count / max) * innerH;
              const x = PAD.left + i * slot + (slot - barW) / 2;
              const y = H - PAD.bottom - h;
              const isShown = i === shown;
              return (
                <g key={d.year}>
                  <path d={barPath(x, y, barW, h)} fill="var(--primary)" opacity={active === null || isShown ? 1 : 0.45} className="transition-opacity" />
                  {isShown && (
                    <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--foreground)" className="tabular-nums">
                      {num(d.count)}
                    </text>
                  )}
                  <text x={x + barW / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
                    {language === "en" ? `'${String(d.year).slice(2)}` : num(d.year).replace(/٬|,/g, "")}
                  </text>
                  <rect
                    x={PAD.left + i * slot}
                    y={PAD.top - 20}
                    width={slot}
                    height={innerH + 20}
                    fill="transparent"
                    tabIndex={0}
                    aria-label={`${d.year}: ${d.count}`}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </figure>
  );
}
