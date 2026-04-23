const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you create a StockTally account, we collect your name, username, email address, and password. This information is required to provide you access to the platform.",
      },
      {
        subtitle: "Trade & Watchlist Data",
        text: "We collect and store the trade details and watchlists you create on our platform, including stock names, symbols, prices, quantities, dates, and transaction types.",
      },
      {
        subtitle: "Profile Information",
        text: "You may optionally provide a profile picture. This image is stored securely via Cloudinary, a third-party cloud storage provider.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with StockTally, including pages visited, features used, browser type, device type, IP address, and referring URLs.",
      },
      {
        subtitle: "Cookies & Local Storage",
        text: "We use browser localStorage to store authentication tokens. We may also use cookies for session management, analytics, and advertising purposes.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: null,
        text: "We use the information we collect to:\n• Provide, operate, and maintain the StockTally platform\n• Authenticate your identity and keep your account secure\n• Store and display your trades, watchlists, and portfolio data\n• Send you service-related notifications and updates\n• Analyze usage patterns to improve our product\n• Display relevant advertisements through Google AdSense\n• Comply with legal obligations",
      },
    ],
  },
  {
    title: "3. Google AdSense & Advertising",
    content: [
      {
        subtitle: null,
        text: "StockTally uses Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to collect data about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.",
      },
      {
        subtitle: null,
        text: "Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google's Ads Settings at https://www.google.com/settings/ads.",
      },
      {
        subtitle: null,
        text: "For more information on how Google collects and uses data, please visit: https://policies.google.com/technologies/partner-sites",
      },
    ],
  },
  {
    title: "4. Third-Party Services",
    content: [
      {
        subtitle: "Cloudinary",
        text: "Profile pictures are stored using Cloudinary. Cloudinary may process your image data in accordance with their own privacy policy.",
      },
      {
        subtitle: "TradingView",
        text: "Our Charts and Top Stories pages embed TradingView widgets. TradingView may collect data in accordance with their privacy policy when you interact with these widgets.",
      },
      {
        subtitle: "Stock Price API",
        text: "We use a third-party API to fetch live stock prices. Your stock symbol queries may be transmitted to this service.",
      },
    ],
  },
  {
    title: "5. Data Sharing & Disclosure",
    content: [
      {
        subtitle: null,
        text: "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:\n• With service providers who assist in operating our platform (under confidentiality agreements)\n• When required by law, court order, or governmental authority\n• To protect the rights, property, or safety of StockTally, our users, or the public\n• In connection with a merger, acquisition, or sale of assets",
      },
    ],
  },
  {
    title: "6. Data Security",
    content: [
      {
        subtitle: null,
        text: "We implement industry-standard security measures to protect your personal information, including encrypted password storage, JWT-based authentication, and secure HTTPS connections. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    title: "7. Data Retention",
    content: [
      {
        subtitle: null,
        text: "We retain your account and trade data for as long as your account is active. If you delete your account, we will delete your personal information within 30 days, except where we are required to retain it for legal purposes.",
      },
    ],
  },
  {
    title: "8. Your Rights",
    content: [
      {
        subtitle: null,
        text: "You have the right to:\n• Access the personal data we hold about you\n• Correct inaccurate or incomplete data\n• Request deletion of your account and data\n• Opt out of personalized advertising\n• Lodge a complaint with a supervisory authority\n\nTo exercise these rights, contact us at the email address below.",
      },
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      {
        subtitle: null,
        text: "StockTally is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will delete it immediately.",
      },
    ],
  },
  {
    title: "10. Changes to This Policy",
    content: [
      {
        subtitle: null,
        text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the 'Last Updated' date at the top of this page. Your continued use of StockTally after changes are made constitutes your acceptance of the updated policy.",
      },
    ],
  },
  {
    title: "11. Contact Us",
    content: [
      {
        subtitle: null,
        text: "If you have any questions about this Privacy Policy, please contact us at:\n\nStockTally\nEmail: codewithdp2073@gmail.com\nWebsite: stock-tally.vercel.app",
      },
    ],
  },
];

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-text-muted text-sm">
            Last updated:{" "}
            <span className="text-text-secondary">January 1, 2025</span>
          </p>
          <div className="st-divider mt-6" />
        </div>

        {/* Intro */}
        <div
          className="st-card p-5 mb-8 border-l-4 border-l-green-400"
          style={{ borderRadius: "0 12px 12px 0" }}
        >
          <p className="text-text-secondary text-sm leading-relaxed">
            Welcome to{" "}
            <span className="text-text-primary font-medium">StockTally</span>.
            We respect your privacy and are committed to protecting your
            personal data. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our platform.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-text-primary font-medium text-lg mb-4">
                {section.title}
              </h2>
              <div className="flex flex-col gap-4">
                {section.content.map((item, i) => (
                  <div key={i} className="st-card p-5">
                    {item.subtitle && (
                      <p className="text-green-400 text-xs uppercase tracking-wider font-medium mb-2">
                        {item.subtitle}
                      </p>
                    )}
                    <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
