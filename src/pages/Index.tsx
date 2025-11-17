import { BalanceCard } from '@/components/BalanceCard';
import { PocketsList } from '@/components/PocketsList';
import { QuickActions } from '@/components/QuickActions';
import { TransactionList } from '@/components/TransactionList';
import { QuoteCard } from '@/components/QuoteCard';
import { AnalyticsSection } from '@/components/AnalyticsSection';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AppProvider } from '@/contexts/AppContext';

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background pb-8">
        <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-lg bg-card/80">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FinMate
              </h1>
              <p className="text-sm text-muted-foreground">Your Smart Money Companion</p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <BalanceCard />
          <QuoteCard />
          <QuickActions />
          <PocketsList />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnalyticsSection />
            <TransactionList />
          </div>
        </main>
      </div>
    </AppProvider>
  );
};

export default Index;
