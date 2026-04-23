const sections = [
  {
    title: "1. Acceptance of Terms",
    text: "By accessing or using StockTally, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform. We reserve the right to update these terms at any time, and your continued use of the platform constitutes acceptance of any changes.",
  },
  {
    title: "2. Description of Service",
    text: "StockTally is a personal trade journaling and portfolio tracking platform. It allows users to log trades, monitor live stock prices, manage watchlists, and view financial charts and news. StockTally is a tool for personal record-keeping and does not constitute financial advice, investment recommendations, or brokerage services.",
  },
  {
    title: "3. User Accounts",
    text: "You must create an account to use StockTally. You are responsible for:\n• Providing accurate and complete registration information\n• Maintaining the confidentiality of your password\n• All activities that occur under your account\n• Notifying us immediately of any unauthorized use of your account\n\nWe reserve the right to suspend or terminate accounts that violate these terms.",
  },
  {
    title: "4. Not Financial Advice",
    text: "StockTally is a journaling and tracking tool only. Nothing on this platform constitutes financial advice, investment advice, trading advice, or any other form of professional advice. All trade data, P&L calculations, and price information displayed are for informational and record-keeping purposes only.\n\nAlways consult a qualified financial advisor before making investment decisions. StockTally is not responsible for any financial losses incurred as a result of using this platform.",
  },
  {
    title: "5. Accuracy of Data",
    text: "While we strive to provide accurate real-time stock prices and data, we cannot guarantee the accuracy, completeness, or timeliness of any information displayed on StockTally. Stock prices are sourced from third-party APIs and may be delayed or inaccurate. Do not rely solely on StockTally data for trading decisions.",
  },
  {
    title: "6. User Content",
    text: "You retain ownership of all trade data and content you enter into StockTally. By using the platform, you grant us a limited, non-exclusive license to store and process your content solely for the purpose of providing our services to you. You are responsible for ensuring that any content you enter does not violate any laws or third-party rights.",
  },
  {
    title: "7. Prohibited Activities",
    text: "You agree not to:\n• Use StockTally for any unlawful purpose\n• Attempt to gain unauthorized access to any part of the platform\n• Reverse engineer, decompile, or disassemble any part of our software\n• Upload malicious code, viruses, or harmful files\n• Scrape, crawl, or harvest data from the platform\n• Use automated bots or scripts to interact with the platform\n• Impersonate another user or person\n• Share your account credentials with others",
  },
  {
    title: "8. Advertising",
    text: "StockTally may display advertisements served by Google AdSense and other advertising partners. These ads help us keep the platform free. By using StockTally, you consent to the display of advertisements. We are not responsible for the content of third-party advertisements.",
  },
  {
    title: "9. Third-Party Services",
    text: "StockTally integrates with third-party services including Cloudinary (image storage), TradingView (charts and news), and stock price APIs. Your use of these services is subject to their respective terms of service and privacy policies. We are not responsible for the availability, accuracy, or practices of these third-party services.",
  },
  {
    title: "10. Intellectual Property",
    text: "All content on StockTally, including the design, logo, code, and text (excluding user-entered trade data), is the intellectual property of StockTally. You may not copy, reproduce, distribute, or create derivative works from our platform without explicit written permission.",
  },
  {
    title: "11. Limitation of Liability",
    text: "To the fullest extent permitted by law, StockTally shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of or inability to use the platform.\n\nOur total liability to you for any claims arising from your use of StockTally shall not exceed the amount you paid us in the 12 months preceding the claim (which is zero, as StockTally is free).",
  },
  {
    title: "12. Disclaimer of Warranties",
    text: "StockTally is provided 'as is' and 'as available' without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of viruses or other harmful components. We disclaim all warranties including implied warranties of merchantability and fitness for a particular purpose.",
  },
  {
    title: "13. Termination",
    text: "We reserve the right to suspend or terminate your account and access to StockTally at any time, with or without cause, and with or without notice. You may also delete your account at any time. Upon termination, your right to use the platform ceases immediately.",
  },
  {
    title: "14. Governing Law",
    text: "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in India.",
  },
  {
    title: "15. Contact Us",
    text: "If you have any questions about these Terms and Conditions, please contact us at:\n\nStockTally\nEmail: codewithdp2073@gmail.com\nWebsite: stock-tally.vercel.app",
  },
];

const TermsAndConditions = () => {
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
            Terms & Conditions
          </h1>
          <p className="text-text-muted text-sm">
            Last updated:{" "}
            <span className="text-text-secondary">January 1, 2025</span>
          </p>
          <div className="st-divider mt-6" />
        </div>

        {/* Intro */}
        <div
          className="st-card p-5 mb-8 border-l-4 border-l-amber-400"
          style={{ borderRadius: "0 12px 12px 0" }}
        >
          <p className="text-text-secondary text-sm leading-relaxed">
            Please read these Terms and Conditions carefully before using{" "}
            <span className="text-text-primary font-medium">StockTally</span>.
            These terms govern your access to and use of our platform. By using
            StockTally, you agree to be bound by these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-5">
          {sections.map((section) => (
            <div key={section.title} className="st-card p-6">
              <h2 className="text-text-primary font-medium text-lg mb-3">
                {section.title}
              </h2>
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

export default TermsAndConditions;
