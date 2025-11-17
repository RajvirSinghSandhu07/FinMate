import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const COLORS = ['#FF6B6B', '#4ECDC4', '#95E1D3', '#FFD93D', '#A8E6CF', '#FF8B94'];

export const CreatePocketModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { addPocket } = useApp();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleCreate = () => {
    if (!name) {
      toast.error('Please enter a pocket name');
      return;
    }

    if (balance === '') {
      toast.error('Please enter an initial balance');
      return;
    }

    const amount = parseFloat(balance);
    if (isNaN(amount) || amount < 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const success = addPocket({
      name,
      balance: amount,
      color: selectedColor,
    });

    if (success) {
      toast.success('Pocket created!');
      setName('');
      setBalance('');
      setSelectedColor(COLORS[0]);
      onOpenChange(false);
    } else {
      toast.error('Insufficient main balance!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Pocket</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pocket-name">Pocket Name</Label>
            <Input
              id="pocket-name"
              placeholder="e.g., Shopping, Bills"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pocket-balance">Initial Balance (₹)</Label>
            <Input
              id="pocket-balance"
              type="number"
              placeholder="0"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Choose Color</Label>
            <div className="flex gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full transition-transform ${
                    selectedColor === color ? 'scale-110 ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <Button onClick={handleCreate} className="w-full bg-gradient-primary">
            Create Pocket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
