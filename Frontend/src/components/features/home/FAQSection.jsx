const faqs = [
  {
    q: "Is StockTally completely free?",
    a: "Yes. StockTally is completely free to use. There are no subscriptions, hidden fees, or locked premium features.",
  },
  {
    q: "Can beginners use StockTally?",
    a: "Yes. StockTally is designed for both beginner and experienced traders who want to improve discipline and track performance.",
  },
  {
    q: "Does StockTally support Indian stock markets?",
    a: "Yes. Traders can track stocks from NSE, BSE, and other exchanges manually through the journaling system.",
  },
  {
    q: "Why is trade journaling important?",
    a: "Trade journaling helps traders review mistakes, identify profitable setups, improve discipline, and track long-term performance consistently.",
  },
  {
    q: "Does StockTally connect directly to brokers?",
    a: "No. StockTally works as an independent trading journal and tracking platform. Your trade data remains private and under your control.",
  },
  {
    q: "Can I track swing trades and intraday trades?",
    a: "Yes. StockTally supports both short-term intraday trades and long-term swing trading journals.",
  },
];

const FaqItem = ({ q, a }) => (
  <details className="st-card group">
    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
      <span className="text-text-primary font-medium text-md pr-4">{q}</span>

      <i className="ri-add-line text-green-400 text-lg group-open:hidden" />

      <i className="ri-subtract-line text-green-400 text-lg hidden group-open:block" />
    </summary>

    <div className="px-5 pb-4 border-t border-bg-border">
      <p className="text-text-muted text-sm leading-relaxed pt-3">{a}</p>
    </div>
  </details>
);

const FAQSection = () => {
  return (
    <section className="px-4 py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="st-badge-ghost mb-4 inline-block">
            Frequently Asked Questions
          </span>

          <h2
            className="text-text-primary font-semibold"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.3rem)" }}
          >
            Common Questions About StockTally
          </h2>

          <p className="text-text-muted mt-4 text-sm max-w-2xl mx-auto leading-relaxed">
            Learn more about trade journaling, trading psychology, portfolio
            tracking, and how StockTally helps traders improve consistency.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} {...faq} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-10">
          <p className="text-text-muted text-xs leading-relaxed max-w-xl mx-auto">
            Trading involves risk. StockTally is an educational and tracking
            platform and does not provide financial or investment advice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
