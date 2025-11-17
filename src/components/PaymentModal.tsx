import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export const PaymentModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { pockets, makePayment, mainBalance } = useApp();
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [source, setSource] = useState('main');

  const handlePayment = () => {
    if (!amount || !receiver) {
      toast.error('Please fill all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (source === 'main' && numAmount > mainBalance) {
      toast.error('Insufficient balance');
      return;
    }

    const pocket = pockets.find(p => p.id === source);
    if (pocket && numAmount > pocket.balance) {
      toast.error('Insufficient pocket balance');
      return;
    }

    const success = makePayment(numAmount, source, receiver);
    if (success) {
      toast.success('Payment successful!');
      setAmount('');
      setReceiver('');
      setSource('main');
      onOpenChange(false);
    } else {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="receiver">Receiver Name</Label>
            <Input
              id="receiver"
              placeholder="Enter name"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Pay from</Label>
            <RadioGroup value={source} onValueChange={setSource}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="main" id="main" />
                <Label htmlFor="main">Main Balance (₹{mainBalance.toLocaleString('en-IN')})</Label>
              </div>
              {pockets.map((pocket) => (
                <div key={pocket.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={pocket.id} id={pocket.id} />
                  <Label htmlFor={pocket.id}>
                    {pocket.name} (₹{pocket.balance.toLocaleString('en-IN')})
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button onClick={handlePayment} className="w-full bg-gradient-primary">
            Pay Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
