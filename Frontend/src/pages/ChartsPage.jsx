import TradingViewWidget from "components/features/chart/TradingViewWidget";
import { Divider } from "components/ui";

export default function ChartsPage() {
  return (
    <main className="st-page">
     
      {/* Content */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl text-text-primary">Charts</h1>
          <span
            className="px-3 py-1 rounded-full text-xs border 
                bg-green-900 w-fit text-green-400 border-green-border
            "
          >
            Chart
          </span>
        </div>
      </section>
      {/* Divider */}
      <Divider className="mx-4 mb-4" />
      <section className="st-card mx-4 mb-10 overflow-x-auto">
        <TradingViewWidget />
      </section>

    </main>
  );
}
