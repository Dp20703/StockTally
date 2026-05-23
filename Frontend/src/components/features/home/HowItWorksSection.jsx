const steps = [
  {
    n: "01",
    title: "Create Your Account",
    desc: "Sign up and start tracking trades within minutes.",
  },
  {
    n: "02",
    title: "Log Your Trades",
    desc: "Record entries, exits, quantity, and trading setups.",
  },
  {
    n: "03",
    title: "Analyze Performance",
    desc: "Review patterns, mistakes, and profitable behaviors.",
  },
  {
    n: "04",
    title: "Improve Consistency",
    desc: "Use data and journaling to become more disciplined.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="st-badge-ghost mb-4 inline-block">How It Works</span>

          <h2
            className="text-text-primary font-semibold"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
          >
            Improve Your Trading Process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((step) => (
            <div key={step.n} className="st-card p-6 flex gap-5">
              <span className="text-green-400 text-2xl font-bold font-mono">
                {step.n}
              </span>

              <div>
                <h3 className="text-text-primary font-medium text-lg mb-2">
                  {step.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
