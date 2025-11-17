import { useApp } from '@/contexts/AppContext';
import { Wallet } from 'lucide-react';

export const PocketsList = () => {
  const { pockets } = useApp();

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">My Pockets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {pockets.map((pocket) => (
          <div
            key={pocket.id}
            className="bg-card rounded-2xl p-4 shadow-card border border-border hover:shadow-glow transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: pocket.color + '20' }}
              >
                <Wallet className="h-5 w-5" style={{ color: pocket.color }} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">{pocket.name}</div>
                <div className="text-xl font-bold text-foreground">
                  ₹{pocket.balance.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
