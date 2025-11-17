import { Sparkles } from 'lucide-react';

const QUOTES = [
  "Save today, smile tomorrow",
  "Money saved is money earned",
  "Small savings add up to big dreams",
  "Budget wisely, live richly",
  "Financial freedom starts with a plan",
];

export const QuoteCard = () => {
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="bg-gradient-accent rounded-2xl p-6 shadow-glow">
      <div className="flex items-start gap-3">
        <Sparkles className="h-6 w-6 text-accent-foreground flex-shrink-0" />
        <div>
          <div className="text-sm font-medium text-accent-foreground/90 mb-1">
            Daily Tip
          </div>
          <div className="text-lg font-semibold text-accent-foreground">
            {randomQuote}
          </div>
        </div>
      </div>
    </div>
  );
};
