import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export const SplitPaymentModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { pockets, splitPayment, mainBalance } = useApp();
  const [amount, setAmount] = useState('');
  const [members, setMembers] = useState('');
  const [source, setSource] = useState('main');

  const handleSplit = () => {
    if (!amount || !members) {
      toast.error('Please fill all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    const numMembers = parseInt(members);
    const perPerson = numAmount / numMembers;

    if (source === 'main' && perPerson > mainBalance) {
      toast.error('Insufficient balance');
      return;
    }

    const pocket = pockets.find(p => p.id === source);
    if (pocket && perPerson > pocket.balance) {
      toast.error('Insufficient pocket balance');
      return;
    }

    splitPayment(numAmount, numMembers, source);
    toast.success(`Split successful! ₹${perPerson.toFixed(2)} per person`);
    setAmount('');
    setMembers('');
    setSource('main');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Split Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bill-amount">Total Bill (₹)</Label>
            <Input
              id="bill-amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="members-count">Number of Members</Label>
            <Input
              id="members-count"
              type="number"
              placeholder="0"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
            />
          </div>

          {amount && members && (
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              Per person: ₹{(parseFloat(amount) / parseInt(members)).toFixed(2)}
            </div>
          )}

          <div className="space-y-2">
            <Label>Pay from</Label>
            <RadioGroup value={source} onValueChange={setSource}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="main" id="split-main" />
                <Label htmlFor="split-main">Main Balance</Label>
              </div>
              {pockets.map((pocket) => (
                <div key={pocket.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={pocket.id} id={`split-${pocket.id}`} />
                  <Label htmlFor={`split-${pocket.id}`}>{pocket.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button onClick={handleSplit} className="w-full bg-gradient-accent">
            Split & Pay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
