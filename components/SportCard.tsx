import Link from "next/link";
import type { Sport } from "@/lib/site-content";

export function SportCard({ sport }: { sport: Sport }) {
  return (
    <Link href={`/sports/${sport.slug}`} className="sport-card">
      <div className="sport-mark">{sport.short}</div>
      <div className="sport-card-copy">
        <strong>{sport.name}</strong>
        <span>{sport.season}</span>
        <small>{sport.ages}</small>
      </div>
      <span className={`status-pill status-${sport.status}`}>{sport.statusLabel}</span>
    </Link>
  );
}
