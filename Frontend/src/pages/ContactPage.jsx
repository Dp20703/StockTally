const contactItems = [
  {
    icon: "ri-mail-fill",
    color: "green",
    label: "Email",
    value: "codewithdp2073@gmail.com",
    href: "mailto:codewithdp2073@gmail.com",
  },
  {
    icon: "ri-global-line",
    color: "blue",
    label: "Website",
    value: "stock-tally.vercel.app",
    href: "https://stock-tally.vercel.app",
  },
];

const topics = [
  { icon: "ri-bug-line", color: "red", label: "Report a Bug" },
  { icon: "ri-question-line", color: "blue", label: "General Inquiry" },
  { icon: "ri-shield-line", color: "green", label: "Privacy Concerns" },
  { icon: "ri-advertisement-line", color: "amber", label: "Advertising" },
];

const colorMap = {
  green: {
    bg: "bg-green-900",
    text: "text-green-400",
    border: "border-green-border",
  },
  blue: {
    bg: "bg-blue-900",
    text: "text-blue-400",
    border: "border-blue-border",
  },
  red: { bg: "bg-red-900", text: "text-red-400", border: "border-red-border" },
  amber: {
    bg: "bg-amber-900",
    text: "text-amber-400",
    border: "border-amber-border",
  },
};

const ContactPage = () => {
  return (
    <main className="st-page">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="st-badge-ghost mb-4 inline-block">Support</span>
          <h1
            className="text-text-primary font-semibold mb-3"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Contact Us
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Have a question, found a bug, or want to report a concern? We'd love
            to hear from you. Reach out using any of the methods below.
          </p>
          <div className="st-divider mt-6" />
        </div>

        {/* Contact cards */}
        <div className="flex flex-col gap-4 mb-10">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="st-card p-5 flex items-center gap-4 hover:border-green-border transition-colors duration-normal group"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[item.color].bg} ${colorMap[item.color].border}`}
              >
                <i
                  className={`${item.icon} text-lg ${colorMap[item.color].text}`}
                />
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">
                  {item.label}
                </p>
                <p
                  className={`font-medium text-md group-hover:${colorMap[item.color].text} transition-colors duration-fast text-text-primary`}
                >
                  {item.value}
                </p>
              </div>
              <i className="ri-arrow-right-line text-text-muted ml-auto text-sm group-hover:text-text-primary transition-colors duration-fast" />
            </a>
          ))}
        </div>

        {/* Topics */}
        <div className="mb-10">
          <h2 className="text-text-primary font-medium text-lg mb-4">
            What can we help with?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {topics.map((t) => (
              <div
                key={t.label}
                className="st-card p-4 flex items-center gap-3"
              >
                <i className={`${t.icon} text-lg ${colorMap[t.color].text}`} />
                <span className="text-text-secondary text-sm">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Response time */}
        <div className="st-card p-5 flex gap-4 items-start mb-10">
          <i className="ri-time-line text-green-400 text-lg mt-0.5 shrink-0" />
          <div>
            <p className="text-text-primary font-medium text-md mb-1">
              Response Time
            </p>
            <p className="text-text-muted text-sm leading-relaxed">
              We typically respond within 24–48 hours on weekdays. For urgent
              issues, please mention it in your email subject line.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
