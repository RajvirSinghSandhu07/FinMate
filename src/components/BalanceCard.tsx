import { Wallet, TrendingUp } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const BalanceCard = () => {
  const { mainBalance, points, badge } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-6 shadow-glow">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-white" />
            <span className="text-white/90 font-medium">Main Balance</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <TrendingUp className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-semibold">{points} pts</span>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-5xl font-bold text-white mb-1">
            ₹{mainBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-white/80 text-sm">
            Badge: <span className="font-semibold">{badge}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
