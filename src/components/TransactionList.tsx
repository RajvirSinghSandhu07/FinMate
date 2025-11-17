import { useApp } from '@/contexts/AppContext';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';

export const TransactionList = () => {
  const { transactions } = useApp();
  const recentTransactions = transactions.slice(0, 5);

  if (recentTransactions.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <div className="bg-card rounded-2xl p-8 shadow-card text-center">
          <p className="text-muted-foreground">No transactions yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
      <div className="bg-card rounded-2xl p-4 shadow-card space-y-3">
        {recentTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              transaction.type === 'payment' ? 'bg-destructive/10' : 'bg-success/10'
            }`}>
              {transaction.type === 'payment' ? (
                <ArrowUpRight className="h-5 w-5 text-destructive" />
              ) : (
                <ArrowDownLeft className="h-5 w-5 text-success" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{transaction.to}</div>
              <div className="text-sm text-muted-foreground">
                {transaction.from} • {format(transaction.date, 'MMM dd, hh:mm a')}
              </div>
            </div>
            <div className={`font-semibold ${
              transaction.type === 'payment' ? 'text-destructive' : 'text-success'
            }`}>
              {transaction.type === 'payment' ? '-' : '+'}₹{transaction.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
