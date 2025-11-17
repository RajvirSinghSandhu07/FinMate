import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export const EditBalanceModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { mainBalance, setMainBalance } = useApp();
  const [balance, setBalance] = useState(mainBalance.toString());

  const handleSave = () => {
    const amount = parseFloat(balance);
    if (isNaN(amount) || amount < 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setMainBalance(amount);
    toast.success('Main balance updated!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Main Balance</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="main-balance">Main Balance (₹)</Label>
            <Input
              id="main-balance"
              type="number"
              placeholder="0"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-gradient-primary">
            Save Balance
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
