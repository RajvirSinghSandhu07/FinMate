import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export const TransferModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { pockets, transferToPocket, mainBalance } = useApp();
  const [amount, setAmount] = useState('');
  const [toPocket, setToPocket] = useState('');

  const handleTransfer = () => {
    if (!amount || !toPocket) {
      toast.error('Please fill all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (numAmount > mainBalance) {
      toast.error('Insufficient main balance');
      return;
    }

    transferToPocket(toPocket, numAmount);
    toast.success('Transfer successful!');
    setAmount('');
    setToPocket('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer to Pocket</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select Pocket</Label>
            <Select value={toPocket} onValueChange={setToPocket}>
              <SelectTrigger>
                <SelectValue placeholder="Choose pocket" />
              </SelectTrigger>
              <SelectContent>
                {pockets.map((pocket) => (
                  <SelectItem key={pocket.id} value={pocket.id}>
                    {pocket.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transfer-amount">Amount (₹)</Label>
            <Input
              id="transfer-amount"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="text-sm text-muted-foreground">
            Available: ₹{mainBalance.toLocaleString('en-IN')}
          </div>

          <Button onClick={handleTransfer} className="w-full bg-gradient-success">
            Transfer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
