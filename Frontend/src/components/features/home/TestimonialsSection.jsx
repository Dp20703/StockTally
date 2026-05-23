const testimonials = [
  {
    quote:
      "Trade journaling helped me identify emotional entries and improve discipline.",
    name: "Rahul M.",
  },
  {
    quote: "The platform makes reviewing trades much easier than spreadsheets.",
    name: "Priya S.",
  },
  {
    quote:
      "The educational blogs helped me understand support and resistance better.",
    name: "Arjun K.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-4 py-20 bg-bg-surface border-y border-bg-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="st-badge-ghost mb-4 inline-block">
            Community Feedback
          </span>

          <h2
            className="text-text-primary font-semibold"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            Traders Using StockTally
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="st-card p-6">
              <i className="ri-double-quotes-l text-green-400 text-2xl mb-4 block" />

              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {t.quote}
              </p>

              <div className="border-t border-bg-border pt-4">
                <p className="text-text-primary text-sm font-medium">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
