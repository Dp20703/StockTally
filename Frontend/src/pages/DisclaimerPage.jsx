const sections = [
  {
    title: "Not Financial Advice",
    color: "red",
    text: "The information provided on StockTally is for personal record-keeping and educational purposes only. Nothing on this platform should be construed as financial advice, investment advice, trading advice, or any other type of professional advice.\n\nStockTally is a journaling tool — it helps you track your own trades and monitor prices. It does not tell you what to buy, sell, or hold.",
  },
  {
    title: "No Guarantee of Accuracy",
    color: "amber",
    text: "Stock prices, P&L calculations, and market data displayed on StockTally are sourced from third-party APIs and may be delayed, incomplete, or inaccurate. We make no representations or warranties about the accuracy, reliability, or completeness of any information displayed on the platform.\n\nDo not make investment decisions based solely on data shown in StockTally.",
  },
  {
    title: "Investment Risk",
    color: "red",
    text: "All investments carry risk, including the risk of losing the principal amount invested. Past performance of any stock or trade is not indicative of future results. Trading in equities, derivatives, and other financial instruments involves substantial risk of loss.\n\nYou should only invest money you can afford to lose, and always consult a SEBI-registered financial advisor before making investment decisions.",
  },
  {
    title: "Third-Party Content",
    color: "amber",
    text: "StockTally embeds TradingView charts and news widgets. The content displayed through these widgets is sourced from TradingView and other third-party providers. StockTally does not endorse, verify, or take responsibility for any third-party content, news, or analysis displayed on the platform.",
  },
  {
    title: "No Broker or Exchange",
    color: "blue",
    text: "StockTally is not a stock broker, investment advisor, exchange, or financial institution. We do not execute trades, hold funds, or provide any brokerage services. All trading must be done through a SEBI-registered broker.",
  },
  {
    title: "Limitation of Liability",
    color: "blue",
    text: "StockTally and its creators shall not be held liable for any financial losses, damages, or other consequences arising from the use of this platform or reliance on any information displayed herein. Your use of StockTally is entirely at your own risk.",
  },
];

const colorMap = {
  red: { badge: "st-badge-red", border: "border-l-red-400" },
  amber: { badge: "st-badge-amber", border: "border-l-amber-400" },
  blue: { badge: "st-badge-blue", border: "border-l-blue-400" },
};

const Disclaimer = () => {
  return (
    <main className="st-page">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="st-badge-ghost mb-4 inline-block">Legal</span>
          <h1
            className="text-text-primary font-semibold mb-3"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Disclaimer
          </h1>
          <p className="text-text-muted text-sm">
            Last updated:{" "}
            <span className="text-text-secondary">January 1, 2025</span>
          </p>
          <div className="st-divider mt-6" />
        </div>

        {/* Warning card */}
        <div className="bg-red-900 border border-red-border rounded-xl p-5 mb-8 flex gap-4 items-start">
          <i className="ri-error-warning-fill text-red-400 text-xl mt-0.5 shrink-0" />
          <p className="text-red-400 text-sm leading-relaxed">
            <span className="font-medium">Important:</span> StockTally is NOT a
            financial advisory service. All information on this platform is for
            personal tracking purposes only. Always consult a qualified
            financial advisor before making investment decisions.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-5">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`st-card p-6 border-l-4 ${colorMap[section.color].border}`}
              style={{ borderRadius: "0 12px 12px 0" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={colorMap[section.color].badge}>
                  {section.title}
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Disclaimer;
