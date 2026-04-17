import { Badge } from "./Badge";

/* ── Status Badge ───────────────────────────────────────── */
export const StatusBadge = ({ status }) => {
  const statusMap = {
    open: "green",
    closed: "red",
    pending: "amber",
    long: "blue",
    short: "blue",
    buy: "green",
    sell: "red",
  };

  const label = status.charAt(0).toUpperCase() + status.slice(1);
  const variant = statusMap[status] || "ghost";

  return <Badge variant={variant}>{label}</Badge>;
};
