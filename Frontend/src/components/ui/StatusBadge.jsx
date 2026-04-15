import { Badge } from "./Badge";

/* ── Status Badge ───────────────────────────────────────── */
export const StatusBadge = ({ status }) => (
  <Badge variant={status === "open" ? "green" : "red"}>{status}</Badge>
);
