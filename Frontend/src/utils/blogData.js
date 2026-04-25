export const blogs = [
  {
    id: 1,
    slug: "why-every-trader-needs-a-trade-journal",
    category: "Journaling",
    categoryColor: "green",
    readTime: "4 min read",
    date: "Jan 12, 2025",
    title: "Why Every Trader Needs a Trade Journal",
    excerpt:
      "Most traders focus on entries and exits but ignore the most powerful edge available — reviewing their own trades. A journal turns random results into repeatable patterns.",
    tags: ["Journaling", "Discipline", "Mindset"],
    content: [
      {
        type: "intro",
        text: "Most traders obsess over finding the perfect entry strategy. They spend hours backtesting indicators, watching YouTube tutorials, and reading books on candlestick patterns. Yet the single most powerful tool available to any trader costs nothing and requires no software — a trade journal.",
      },
      {
        type: "heading",
        text: "What Is a Trade Journal?",
      },
      {
        type: "paragraph",
        text: "A trade journal is a systematic record of every trade you make — including the stock name, entry price, exit price, quantity, date, your reasoning for entering, and how the trade played out. Done correctly, it becomes a mirror that reflects your real trading behavior back at you.",
      },
      {
        type: "paragraph",
        text: "Most traders think they have a good memory. They don't. Without a journal, you remember your winners vividly and forget your losers. This creates a distorted self-image — you believe you're better than you are, and you never identify the recurring mistakes that are quietly draining your account.",
      },
      {
        type: "heading",
        text: "What a Journal Reveals",
      },
      {
        type: "paragraph",
        text: "After 30 days of consistent journaling, patterns emerge that would otherwise be invisible. You might discover that 80% of your losses come from trades you took after 2 PM. Or that you consistently exit profitable trades too early out of fear. Or that your intraday trades consistently lose money while your swing trades are profitable.",
      },
      {
        type: "callout",
        color: "green",
        text: "\"The journal doesn't judge you. It just shows you the data. And data doesn't lie.\"",
      },
      {
        type: "paragraph",
        text: "These insights are worth more than any trading course. They are specific to you — your psychology, your schedule, your market biases. No external resource can give you this.",
      },
      {
        type: "heading",
        text: "What to Track",
      },
      {
        type: "list",
        items: [
          "Stock name and symbol",
          "Buy price and sell price",
          "Quantity and position size",
          "Entry date and exit date",
          "Trade type (long/short, intraday/swing)",
          "Reason for entry (setup, news, technical level)",
          "Emotion at entry (confident, hesitant, FOMO)",
          "Final profit or loss",
          "What you would do differently",
        ],
      },
      {
        type: "heading",
        text: "The Weekly Review",
      },
      {
        type: "paragraph",
        text: "Journaling is only half the equation. The weekly review is where the improvement actually happens. Every weekend, spend 20 minutes reviewing the week's trades. Look for:\n\nWhich setups had the best win rate? Which days of the week were most profitable? Did you follow your rules? What trades should you have skipped entirely?",
      },
      {
        type: "paragraph",
        text: "Over months, this practice compounds. Traders who journal consistently report that their biggest improvement comes not from learning new strategies, but from eliminating their own repeated mistakes.",
      },
      {
        type: "callout",
        color: "blue",
        text: "StockTally was built specifically for this workflow — log trades, track live P&L, and review your performance all in one place.",
      },
      {
        type: "heading",
        text: "Starting Today",
      },
      {
        type: "paragraph",
        text: "You don't need a perfect system to start. Open StockTally, log your next trade, and write one sentence about why you took it. That single habit, repeated consistently, will do more for your trading than any indicator ever will.",
      },
    ],
  },
  {
    id: 2,
    slug: "understanding-unrealized-profit-and-loss",
    category: "Education",
    categoryColor: "blue",
    readTime: "5 min read",
    date: "Jan 19, 2025",
    title: "Understanding Unrealized Profit & Loss",
    excerpt:
      "Your P&L means nothing until you close the trade. Here's why unrealized gains can be misleading and how to use them as a decision-making tool rather than a feel-good number.",
    tags: ["P&L", "Risk Management", "Education"],
    content: [
      {
        type: "intro",
        text: "You open your portfolio and see ₹15,000 in unrealized profit. It feels real. It feels like money. But until you press the sell button, it is not money — it is a possibility. Understanding the difference between unrealized and realized P&L is one of the most important distinctions in trading.",
      },
      {
        type: "heading",
        text: "Realized vs Unrealized P&L",
      },
      {
        type: "paragraph",
        text: "Realized P&L is money you have actually made or lost — it is locked in once you close a trade. Unrealized P&L (also called open P&L or floating P&L) is the profit or loss on positions you still hold, calculated against the current market price.",
      },
      {
        type: "callout",
        color: "green",
        text: "Unrealized P&L = (Current Price − Buy Price) × Quantity",
      },
      {
        type: "paragraph",
        text: "The key word is 'unrealized' — the market can take it back at any moment. A ₹20,000 unrealized gain can become ₹5,000 or even a loss within hours if the stock moves against you.",
      },
      {
        type: "heading",
        text: "Why Unrealized P&L Is Psychologically Dangerous",
      },
      {
        type: "paragraph",
        text: "The human brain treats unrealized profits as real money. This is why traders hold losing positions too long (hoping the unrealized loss will 'come back') and exit winning positions too early (wanting to lock in gains before they disappear). Both behaviors are driven by the emotional weight we assign to floating numbers.",
      },
      {
        type: "list",
        items: [
          "Holding losers too long because the loss feels 'not real yet'",
          "Exiting winners prematurely due to fear of losing the unrealized gain",
          "Increasing position size on a winner because you feel 'up' on the day",
          "Taking on more risk because unrealized gains create a false sense of buffer",
        ],
      },
      {
        type: "heading",
        text: "How to Use Unrealized P&L Correctly",
      },
      {
        type: "paragraph",
        text: "The right way to use unrealized P&L is as a decision-making input — not as an emotional score. Ask yourself: if I had no position, would I buy this stock at the current price? If the answer is no, your unrealized profit is a gift — consider taking it. If yes, hold the position.",
      },
      {
        type: "callout",
        color: "amber",
        text: "\"Don't manage your emotions based on unrealized P&L. Manage your position based on the current price.\"",
      },
      {
        type: "heading",
        text: "Trailing Stop Losses",
      },
      {
        type: "paragraph",
        text: "One of the best tools for protecting unrealized gains is a trailing stop loss. Instead of a fixed exit point, a trailing stop moves up as the price rises, locking in a percentage of the gain while allowing the trade to keep running. This removes the emotional burden of deciding when to exit.",
      },
      {
        type: "heading",
        text: "Monitoring Unrealized P&L in StockTally",
      },
      {
        type: "paragraph",
        text: "StockTally fetches live stock prices and calculates your unrealized P&L for every open trade in real-time. This gives you a clear, objective view of your open positions without having to manually calculate anything — so you can focus on making decisions, not doing math.",
      },
    ],
  },
  {
    id: 3,
    slug: "how-to-build-a-watchlist-that-works",
    category: "Strategy",
    categoryColor: "amber",
    readTime: "6 min read",
    date: "Jan 26, 2025",
    title: "How to Build a Watchlist That Actually Works",
    excerpt:
      "A 200-stock watchlist is noise. A 10-stock watchlist is signal. Learn how to filter, categorize, and monitor stocks without getting overwhelmed by information overload.",
    tags: ["Watchlist", "Strategy", "Focus"],
    content: [
      {
        type: "intro",
        text: "Open any trading app and you can add 500 stocks to a watchlist in five minutes. But having 500 stocks on a watchlist is the same as having no watchlist at all. A watchlist is only useful if it helps you focus — and focus requires ruthless elimination.",
      },
      {
        type: "heading",
        text: "The Problem With Big Watchlists",
      },
      {
        type: "paragraph",
        text: "When you watch too many stocks, your attention is spread across all of them and mastered on none. You end up half-aware of 200 stocks instead of deeply familiar with 10. You miss obvious setups on stocks you know well because you were distracted by noise on stocks you barely understand.",
      },
      {
        type: "heading",
        text: "The 10-Stock Rule",
      },
      {
        type: "paragraph",
        text: "Professional traders often follow a simple rule — maintain a primary watchlist of no more than 10 stocks at any time. These are the stocks you know inside out: their typical daily range, how they react to news, their key support and resistance levels, their sector correlations.",
      },
      {
        type: "callout",
        color: "amber",
        text: "\"Know 10 stocks deeply rather than 100 stocks superficially. Depth beats breadth in trading.\"",
      },
      {
        type: "heading",
        text: "How to Select Stocks for Your Watchlist",
      },
      {
        type: "list",
        items: [
          "High liquidity — stocks that trade at least ₹50 crore daily volume",
          "Clear technical structure — stocks that respect support and resistance levels",
          "Your sector expertise — trade what you understand",
          "Upcoming catalysts — earnings, results, sector news",
          "Stocks at key levels — near all-time highs, breakout zones, or strong support",
        ],
      },
      {
        type: "heading",
        text: "Organizing Multiple Watchlists",
      },
      {
        type: "paragraph",
        text: "Instead of one giant list, organize stocks into themed watchlists. For example: 'Breakout Candidates', 'Sector Leaders', 'Swing Setups', 'Earnings This Week'. Each list has a specific purpose and a maximum of 10 stocks.",
      },
      {
        type: "paragraph",
        text: "This structure keeps your focus sharp. When you open the 'Breakout Candidates' list, you're in breakout-hunting mode. You know exactly what you're looking for and why each stock is there.",
      },
      {
        type: "heading",
        text: "The Weekly Watchlist Review",
      },
      {
        type: "paragraph",
        text: "Every Sunday, spend 15 minutes reviewing your watchlists. Remove stocks that have played out their setup or no longer meet your criteria. Add new stocks that are approaching key levels. Keep the list alive and intentional — not a graveyard of forgotten tickers.",
      },
      {
        type: "callout",
        color: "green",
        text: "StockTally allows you to create multiple named watchlists with up to 10 stocks each — designed exactly for this focused, organized approach.",
      },
      {
        type: "heading",
        text: "What a Good Watchlist Looks Like",
      },
      {
        type: "paragraph",
        text: "A good watchlist is one you can go through in under 2 minutes and identify immediately which stocks are at actionable levels. If you're spending 30 minutes scanning your watchlist every morning, it's too big. The goal is speed and clarity — not coverage.",
      },
    ],
  },
  {
    id: 4,
    slug: "technical-analysis-basics-for-beginners",
    category: "Education",
    categoryColor: "blue",
    readTime: "8 min read",
    date: "Feb 2, 2025",
    title: "Technical Analysis Basics Every Trader Should Know",
    excerpt:
      "Support, resistance, volume, and candlestick patterns — these four concepts form the foundation of technical analysis. Master them before adding indicators.",
    tags: ["Technical Analysis", "Charts", "Beginners"],
    content: [
      {
        type: "intro",
        text: "New traders are often overwhelmed by the sheer number of technical indicators available — RSI, MACD, Bollinger Bands, Stochastics, Ichimoku Cloud. Before you learn any of them, there are four fundamental concepts that form the foundation of everything else. Master these first.",
      },
      {
        type: "heading",
        text: "1. Support and Resistance",
      },
      {
        type: "paragraph",
        text: "Support is a price level where a falling stock tends to pause or reverse upward. Resistance is a price level where a rising stock tends to pause or reverse downward. These levels exist because of collective market memory — traders remember where the price has been before and react accordingly.",
      },
      {
        type: "paragraph",
        text: "The key insight: when a resistance level is broken convincingly, it often becomes new support. When a support level breaks, it becomes new resistance. These 'role reversals' are among the most reliable patterns in technical analysis.",
      },
      {
        type: "callout",
        color: "blue",
        text: "Draw support and resistance with a thick marker, not a sharp pencil. These are zones, not exact prices.",
      },
      {
        type: "heading",
        text: "2. Trend",
      },
      {
        type: "paragraph",
        text: "Price moves in trends — uptrend (higher highs and higher lows), downtrend (lower highs and lower lows), or sideways (range-bound). The most important rule in trading: trade with the trend, not against it.",
      },
      {
        type: "list",
        items: [
          "Uptrend: Each rally goes higher than the last, each pullback stays above the previous low",
          "Downtrend: Each selloff goes lower than the last, each bounce stays below the previous high",
          "Sideways: Price bounces between a horizontal support and resistance zone",
        ],
      },
      {
        type: "heading",
        text: "3. Volume",
      },
      {
        type: "paragraph",
        text: "Volume tells you the conviction behind a price move. A breakout on high volume is far more reliable than one on low volume. When a stock breaks resistance with 3x its average daily volume, institutions are buying — that is meaningful. When it breaks on thin volume, it is likely to fail.",
      },
      {
        type: "callout",
        color: "amber",
        text: "\"Price is what you pay. Volume is what confirms it means something.\"",
      },
      {
        type: "heading",
        text: "4. Candlestick Patterns",
      },
      {
        type: "paragraph",
        text: "Candlestick charts show four prices for each time period: open, high, low, and close. The body of the candle shows the open-to-close range. The wicks show the high and low extremes. Together, they tell the story of who controlled the period — buyers or sellers.",
      },
      {
        type: "list",
        items: [
          "Doji: Open and close nearly equal — indecision, potential reversal",
          "Hammer: Long lower wick, small body near top — buyers rejected lower prices",
          "Engulfing candle: Second candle's body completely engulfs the first — strong reversal signal",
          "Marubozu: No wicks, full body — complete dominance by buyers or sellers",
        ],
      },
      {
        type: "heading",
        text: "Why Not to Start With Indicators",
      },
      {
        type: "paragraph",
        text: "Indicators are mathematical derivatives of price and volume. They add lag. They give conflicting signals. Most importantly, they can give you the illusion of understanding when you actually don't. A trader who understands price action, support, resistance, and volume can read any chart without a single indicator. Learn to walk before adding wings.",
      },
    ],
  },
  {
    id: 5,
    slug: "position-sizing-the-most-underrated-skill",
    category: "Risk Management",
    categoryColor: "red",
    readTime: "5 min read",
    date: "Feb 9, 2025",
    title: "Position Sizing: The Most Underrated Trading Skill",
    excerpt:
      "You can be right 40% of the time and still be profitable — if your position sizing is correct. This is the math that separates consistently profitable traders from the rest.",
    tags: ["Position Sizing", "Risk", "Math"],
    content: [
      {
        type: "intro",
        text: "Ask 10 traders what the most important skill in trading is and 9 will say 'finding good setups' or 'picking the right stocks'. The correct answer is position sizing. Position sizing determines how much of your capital you risk on any single trade — and it is the difference between surviving long enough to get good and blowing up your account.",
      },
      {
        type: "heading",
        text: "The Math of Survival",
      },
      {
        type: "paragraph",
        text: "Imagine two traders, both with a 50% win rate. Trader A risks 20% of capital per trade. Trader B risks 2% per trade. After a losing streak of 5 trades in a row (which is completely normal with a 50% win rate), Trader A has lost 67% of their account. Trader B has lost 10%. Trader A needs a 200% gain to recover. Trader B needs an 11% gain.",
      },
      {
        type: "callout",
        color: "red",
        text: "A 50% loss requires a 100% gain to break even. The math of losses is asymmetric — protect capital above all else.",
      },
      {
        type: "heading",
        text: "The 1-2% Rule",
      },
      {
        type: "paragraph",
        text: "Professional traders rarely risk more than 1-2% of their total capital on any single trade. This is not timidity — it is mathematics. With a 2% risk per trade, you can lose 10 trades in a row and still have 80% of your capital. You can recover from that. You cannot recover from losing 50% of your account in a single bad week.",
      },
      {
        type: "heading",
        text: "How to Calculate Position Size",
      },
      {
        type: "callout",
        color: "green",
        text: "Position Size = (Account Size × Risk %) ÷ (Entry Price − Stop Loss Price)",
      },
      {
        type: "paragraph",
        text: "Example: Account size ₹5,00,000. Risk 1% = ₹5,000. Entry price ₹200. Stop loss ₹190. Risk per share = ₹10. Position size = ₹5,000 ÷ ₹10 = 500 shares. You buy 500 shares, and if the stock hits your stop, you lose exactly ₹5,000 — 1% of your account. No more.",
      },
      {
        type: "heading",
        text: "Why You Can Be Right 40% of the Time and Still Profit",
      },
      {
        type: "paragraph",
        text: "Position sizing works together with your risk-reward ratio. If you risk ₹1 to make ₹3 (a 1:3 risk-reward), you only need to be right 34% of the time to break even. Win 40% of the time with that ratio and you are consistently profitable — even though you lose more trades than you win.",
      },
      {
        type: "list",
        items: [
          "Win rate 40%, Risk:Reward 1:3 → Profitable",
          "Win rate 50%, Risk:Reward 1:1 → Breakeven (after costs, losing)",
          "Win rate 60%, Risk:Reward 1:0.5 → Barely profitable",
          "Win rate 30%, Risk:Reward 1:4 → Profitable",
        ],
      },
      {
        type: "heading",
        text: "Start With Risk, Not With Setup",
      },
      {
        type: "paragraph",
        text: "Before every trade, ask: where is my stop loss? How much will I lose if I am wrong? Is that amount acceptable? If yes, then calculate your position size accordingly. This sequence — stop first, size second, entry third — is how professional traders approach every trade.",
      },
    ],
  },
  {
    id: 6,
    slug: "how-to-read-a-stock-chart",
    category: "Education",
    categoryColor: "blue",
    readTime: "7 min read",
    date: "Feb 16, 2025",
    title: "How to Read a Stock Chart Like a Pro",
    excerpt:
      "Candlestick charts carry more information than most traders extract from them. Learn to identify trends, reversals, and high-probability setups using price action alone.",
    tags: ["Charts", "Candlesticks", "Price Action"],
    content: [
      {
        type: "intro",
        text: "A price chart is the most honest representation of a stock. It shows exactly what buyers and sellers have done — not what analysts predict, not what management says, not what news suggests. Learning to read it fluently is the most valuable skill a trader can develop.",
      },
      {
        type: "heading",
        text: "Reading the Story of a Candlestick",
      },
      {
        type: "paragraph",
        text: "Every candlestick tells a story. A large green candle with small wicks says: buyers controlled the entire period from open to close, and neither side managed to push price far beyond that range. A small red candle with a huge lower wick says: sellers tried to push price down aggressively, but buyers came in and pushed it back up — sellers lost this battle.",
      },
      {
        type: "paragraph",
        text: "When you look at a chart, try to narrate the story rather than pattern-match. Ask: who is in control? Where did they fail? Where did the other side step in? This narrative approach is far more powerful than memorizing 50 named candlestick patterns.",
      },
      {
        type: "heading",
        text: "Multi-Timeframe Analysis",
      },
      {
        type: "paragraph",
        text: "Professional traders always look at multiple timeframes. The weekly chart shows the big picture trend. The daily chart shows the medium-term setup. The 15-minute or hourly chart shows the entry trigger. Always trade in the direction of the higher timeframe trend.",
      },
      {
        type: "list",
        items: [
          "Weekly chart: Identify the primary trend and major levels",
          "Daily chart: Find the setup — consolidation, pullback, or breakout",
          "Hourly/15-min chart: Find the precise entry trigger",
        ],
      },
      {
        type: "callout",
        color: "blue",
        text: "\"If the weekly chart is bearish, don't take long setups on the daily. Align your trades with the higher timeframe.\"",
      },
      {
        type: "heading",
        text: "Identifying High-Probability Setups",
      },
      {
        type: "paragraph",
        text: "The best setups share common characteristics. They occur in the direction of the primary trend. They form at a significant support or resistance level. They are accompanied by decreasing volume during consolidation (indicating supply is drying up) and increasing volume on the breakout (indicating genuine demand).",
      },
      {
        type: "heading",
        text: "The Power of Gaps",
      },
      {
        type: "paragraph",
        text: "Gaps — when a stock opens significantly above or below the previous close — are among the most powerful signals on a chart. A gap up on strong volume signals institutional buying. How a stock behaves after gapping up tells you everything about whether the move is sustainable or a fade opportunity.",
      },
      {
        type: "heading",
        text: "Common Mistakes When Reading Charts",
      },
      {
        type: "list",
        items: [
          "Drawing too many lines — key levels should be obvious, not crowded",
          "Ignoring the higher timeframe trend",
          "Trusting patterns without volume confirmation",
          "Seeing setups everywhere — quality over quantity",
          "Confusing a retracement with a reversal",
        ],
      },
      {
        type: "callout",
        color: "green",
        text: "Use StockTally's TradingView chart integration to analyze your watchlist stocks across all timeframes without leaving the platform.",
      },
    ],
  },
  {
    id: 7,
    slug: "common-trading-mistakes-to-avoid",
    category: "Mindset",
    categoryColor: "amber",
    readTime: "6 min read",
    date: "Feb 23, 2025",
    title: "7 Common Trading Mistakes (And How to Avoid Them)",
    excerpt:
      "From revenge trading to ignoring stop losses — these seven mistakes are responsible for the majority of trading losses. Identifying them in your journal is the first step to eliminating them.",
    tags: ["Mistakes", "Psychology", "Improvement"],
    content: [
      {
        type: "intro",
        text: "You don't need to find new strategies to improve your trading. You need to stop making the same mistakes. Here are the seven most common trading mistakes — and more importantly, how to identify and eliminate them from your own behavior.",
      },
      {
        type: "heading",
        text: "1. Revenge Trading",
      },
      {
        type: "paragraph",
        text: "After a loss, the emotional brain wants to win it back immediately. This leads to taking low-quality trades with oversized positions, which typically leads to larger losses. The market doesn't know you lost money. It doesn't owe you a recovery. Taking trades out of emotion rather than setup is revenge trading — and it is account-destroying.",
      },
      {
        type: "callout",
        color: "red",
        text: "Fix: After a loss that exceeds your daily limit, stop trading for the day. Walk away. Review the trade tomorrow with a clear mind.",
      },
      {
        type: "heading",
        text: "2. Ignoring Stop Losses",
      },
      {
        type: "paragraph",
        text: "Moving your stop loss further away from your entry — or not having one at all — is the fastest way to turn a small loss into an account-destroying one. Every trader has a story of 'I'll just wait for it to come back' that ended in catastrophe. A stop loss is not optional.",
      },
      {
        type: "heading",
        text: "3. Overtrading",
      },
      {
        type: "paragraph",
        text: "More trades do not mean more profit. They mean more commissions, more slippage, and more opportunities for emotional decisions. The best traders are often the most selective — they sit on their hands for days waiting for the one setup that meets all their criteria, then size into it confidently.",
      },
      {
        type: "heading",
        text: "4. FOMO Entries",
      },
      {
        type: "paragraph",
        text: "Fear of Missing Out causes traders to chase stocks that have already moved significantly. You see a stock up 8% and jump in, only to be the last buyer before the reversal. By the time it shows up on your radar as 'moving', the smart money has already entered. The FOMO entry gives you the worst risk-reward ratio on the trade.",
      },
      {
        type: "heading",
        text: "5. Not Having a Trading Plan",
      },
      {
        type: "paragraph",
        text: "Every trade should be planned before the market opens, not improvised in real-time. Your plan should specify: entry trigger, stop loss level, target price, position size, and the condition under which you will exit early. Without a plan, every decision becomes emotional.",
      },
      {
        type: "heading",
        text: "6. Averaging Down on Losers",
      },
      {
        type: "paragraph",
        text: "Adding to a losing position because 'it's cheaper now' is a cognitive bias called loss aversion. The fact that a stock is 20% lower than where you bought it is not a reason to buy more — it may be lower for a very good reason that you don't fully understand yet.",
      },
      {
        type: "callout",
        color: "amber",
        text: "\"Add to winners, cut losers. Not the other way around.\"",
      },
      {
        type: "heading",
        text: "7. Not Reviewing Your Trades",
      },
      {
        type: "paragraph",
        text: "Not reviewing is how mistakes become habits. If you don't systematically review your trades, you will repeat the same errors for years without realizing it. Your journal is the tool. The weekly review is the practice. Without it, you're flying blind.",
      },
    ],
  },
  {
    id: 8,
    slug: "swing-trading-vs-intraday-which-is-right-for-you",
    category: "Strategy",
    categoryColor: "green",
    readTime: "6 min read",
    date: "Mar 2, 2025",
    title: "Swing Trading vs Intraday: Which Is Right for You?",
    excerpt:
      "Both styles can be profitable, but they require very different skill sets, time commitments, and psychological temperaments. Here's how to pick the right one for your life.",
    tags: ["Swing Trading", "Intraday", "Style"],
    content: [
      {
        type: "intro",
        text: "The most important trading decision is not which stock to buy — it is which trading style to adopt. Intraday and swing trading are fundamentally different disciplines that require different skills, different schedules, and different psychological profiles. Choosing the wrong one for your personality is a guaranteed path to frustration.",
      },
      {
        type: "heading",
        text: "What Is Intraday Trading?",
      },
      {
        type: "paragraph",
        text: "Intraday trading involves buying and selling stocks within the same trading day — all positions are closed before market close. You make many smaller trades and aim to capture short-term price movements. You need to be at your screen from 9:15 AM to 3:30 PM, actively monitoring positions and reacting to price action in real-time.",
      },
      {
        type: "heading",
        text: "What Is Swing Trading?",
      },
      {
        type: "paragraph",
        text: "Swing trading involves holding positions for 2 days to several weeks, capturing medium-term price swings. You analyze the market in the evening, place orders before market open or at specific levels, and check in briefly during the day. You do not need to watch the screen constantly.",
      },
      {
        type: "heading",
        text: "Key Differences",
      },
      {
        type: "list",
        items: [
          "Time commitment: Intraday requires full-day focus. Swing requires 30-60 mins/day",
          "Number of trades: Intraday = 5-20 trades/day. Swing = 2-10 trades/month",
          "Capital requirement: Swing requires more capital (overnight risk). Intraday less so",
          "Stress level: Intraday is highly stressful. Swing is more measured",
          "Tax treatment: In India, both are treated as business income if done regularly",
          "Skill required: Intraday needs fast execution. Swing needs patience and conviction",
        ],
      },
      {
        type: "callout",
        color: "amber",
        text: "\"Intraday suits full-time traders. Swing trading suits professionals with jobs, students, or anyone who cannot watch screens all day.\"",
      },
      {
        type: "heading",
        text: "Which Suits Your Personality?",
      },
      {
        type: "paragraph",
        text: "Honest self-assessment matters more than the strategy itself. If you get anxious when a trade goes against you by ₹500, intraday trading will be a nightmare. If you can't resist checking your positions every 10 minutes, swing trading will drive you to premature exits. Match the style to who you actually are — not who you wish you were.",
      },
      {
        type: "heading",
        text: "The Case for Starting With Swing Trading",
      },
      {
        type: "paragraph",
        text: "Most traders learn better with swing trading. You have time to analyze setups carefully, make deliberate decisions, and review trades without the pressure of real-time price action. Once you develop discipline, consistency, and a positive edge in swing trading, transitioning to intraday becomes much easier.",
      },
      {
        type: "callout",
        color: "green",
        text: "StockTally's trade tracking works equally well for both styles — log intraday trades with entry/exit on the same day, or hold swing trades open for days and monitor live P&L.",
      },
    ],
  },
  {
    id: 9,
    slug: "how-to-use-stop-loss-effectively",
    category: "Risk Management",
    categoryColor: "red",
    readTime: "5 min read",
    date: "Mar 9, 2025",
    title: "How to Use Stop Loss Effectively Without Getting Stopped Out",
    excerpt:
      "Placing stops too tight gets you shaken out of good trades. Too wide, and you blow up your account. Here is the framework for placing stops where they actually make sense.",
    tags: ["Stop Loss", "Risk", "Execution"],
    content: [
      {
        type: "intro",
        text: "The stop loss is the most important order you will ever place — and the most misunderstood. Most traders either place it too tight (getting stopped out of perfectly good trades) or ignore it entirely (turning small losses into catastrophic ones). Here is how to use it correctly.",
      },
      {
        type: "heading",
        text: "Why the Stop Loss Exists",
      },
      {
        type: "paragraph",
        text: "A stop loss exists for one reason: to protect your capital when you are wrong. Every trader is wrong. The best traders in the world are wrong 40-60% of the time. The difference between winners and losers is not being right more often — it is losing less when wrong and winning more when right. The stop loss handles the first half of that equation.",
      },
      {
        type: "heading",
        text: "The Three Biggest Stop Loss Mistakes",
      },
      {
        type: "list",
        items: [
          "Placing stops at round numbers — everyone else does too, and they get hunted",
          "Setting stops based on P&L ('I'll only lose ₹2,000') instead of the chart",
          "Moving stops further away to avoid being stopped out",
        ],
      },
      {
        type: "heading",
        text: "Structure-Based Stop Placement",
      },
      {
        type: "paragraph",
        text: "The correct approach is to place stops based on market structure — at levels where, if reached, your trade idea is invalidated. For a long trade above support, your stop goes below that support level. For a breakout trade, your stop goes below the breakout candle's low. The stop should be at a price where you can say 'if it goes here, I was wrong.'",
      },
      {
        type: "callout",
        color: "green",
        text: "Place your stop where your trade idea becomes invalid — not where it becomes uncomfortable.",
      },
      {
        type: "heading",
        text: "Dealing With Stop Hunts",
      },
      {
        type: "paragraph",
        text: "Large operators often push price slightly below obvious stop levels to trigger retail stops before reversing higher. This is called a stop hunt or liquidity sweep. To avoid them, place your stop slightly below the 'obvious' level — 0.5-1% below the key support rather than exactly at it. This small buffer can make the difference between being shaken out and staying in a great trade.",
      },
      {
        type: "heading",
        text: "The Mental Stop Trap",
      },
      {
        type: "paragraph",
        text: "Some traders use 'mental stops' — telling themselves they will exit if price reaches a certain level, without actually placing the order. This almost never works. When the price actually reaches that level, the emotional brain makes excuses to stay in the trade. Always place your stop loss as an actual order when you enter the trade.",
      },
      {
        type: "callout",
        color: "amber",
        text: "\"A stop loss placed immediately at entry is a commitment. A mental stop is a wish. Only one of them works.\"",
      },
      {
        type: "heading",
        text: "Trailing Stops for Protecting Gains",
      },
      {
        type: "paragraph",
        text: "Once a trade is profitable, consider using a trailing stop. Move your stop up to breakeven first (eliminating risk on the trade). Then, as price moves higher, trail your stop below each new swing low. This lets you capture the full extent of a trend move while protecting accumulated gains.",
      },
    ],
  },
  {
    id: 10,
    slug: "using-stocktally-to-improve-your-trading",
    category: "StockTally",
    categoryColor: "green",
    readTime: "4 min read",
    date: "Mar 16, 2025",
    title: "Using StockTally to Systematically Improve Your Trading",
    excerpt:
      "Your trading journal is only as useful as the time you spend reviewing it. Here's a simple weekly review framework using StockTally to identify your edge and eliminate your weaknesses.",
    tags: ["StockTally", "Review", "Improvement"],
    content: [
      {
        type: "intro",
        text: "StockTally is not just a trade logger — it is a system for continuous improvement. The data you enter every day, combined with a consistent review process, creates a feedback loop that compounds over time. Here is the exact framework to extract maximum value from your StockTally account.",
      },
      {
        type: "heading",
        text: "The Daily Logging Habit",
      },
      {
        type: "paragraph",
        text: "The foundation of improvement is consistency. Log every trade on the same day you take it — not at the end of the week when you have forgotten the details. Include the stock name, symbol, buy price, sell price, quantity, and trade type. StockTally stores this and calculates your P&L automatically.",
      },
      {
        type: "callout",
        color: "green",
        text: "Take 2 minutes after every trade to log it. This single habit is worth more than any trading course.",
      },
      {
        type: "heading",
        text: "The Weekly Review Process",
      },
      {
        type: "paragraph",
        text: "Every Sunday, open StockTally and go through the week's trades. For each trade, ask yourself: Was the setup valid? Did I follow my plan? Was my position size correct? What would I do differently? This review turns individual trades into learning events.",
      },
      {
        type: "list",
        items: [
          "Review open trades — are they still valid? Should any be closed?",
          "Review closed trades — what was the win rate? Average P&L?",
          "Identify the best trade of the week — what made it work?",
          "Identify the worst trade of the week — what went wrong?",
          "Check if you followed your rules — how many trades were emotional?",
        ],
      },
      {
        type: "heading",
        text: "Using Your Watchlist for Pre-Market Prep",
      },
      {
        type: "paragraph",
        text: "Every morning before market open, review your StockTally watchlists. Which stocks are at key levels today? Which have catalysts (results, news)? Which are approaching your planned entry zones? This 10-minute morning ritual replaces an hour of unfocused scanning.",
      },
      {
        type: "heading",
        text: "Tracking Open vs Closed Trades",
      },
      {
        type: "paragraph",
        text: "StockTally separates your open and closed trades. The open trades view shows your live P&L — check this once or twice a day, not every minute. The closed trades view is your trading history — it is the most honest record of your actual performance, free from the bias of what you remember.",
      },
      {
        type: "callout",
        color: "blue",
        text: "Consistent traders check their open P&L at the right times — not obsessively. Use StockTally's live price feature as a decision tool, not a scoreboard.",
      },
      {
        type: "heading",
        text: "The Compounding Effect",
      },
      {
        type: "paragraph",
        text: "The traders who improve fastest are not those who read the most books or watch the most YouTube videos. They are the ones who review their own trades most consistently. Every trade in StockTally is a data point. Over 6 months, you have 100+ data points. Patterns emerge. Edges become clear. Weaknesses become undeniable. And you become a systematically better trader — not by chance, but by design.",
      },
    ],
  },
];

export default blogs;
