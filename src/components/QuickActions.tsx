import { Send, QrCode, Users, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { PaymentModal } from './PaymentModal';
import { TransferModal } from './TransferModal';
import { SplitPaymentModal } from './SplitPaymentModal';
import { CreatePocketModal } from './CreatePocketModal';

export const QuickActions = () => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [splitOpen, setSplitOpen] = useState(false);
  const [pocketOpen, setPocketOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          onClick={() => setPaymentOpen(true)}
          className="h-24 flex-col gap-2 bg-card hover:bg-accent hover:text-accent-foreground shadow-card"
          variant="ghost"
        >
          <Send className="h-6 w-6" />
          <span className="text-sm font-medium">Pay</span>
        </Button>

        <Button
          onClick={() => setTransferOpen(true)}
          className="h-24 flex-col gap-2 bg-card hover:bg-accent hover:text-accent-foreground shadow-card"
          variant="ghost"
        >
          <QrCode className="h-6 w-6" />
          <span className="text-sm font-medium">Transfer</span>
        </Button>

        <Button
          onClick={() => setSplitOpen(true)}
          className="h-24 flex-col gap-2 bg-card hover:bg-accent hover:text-accent-foreground shadow-card"
          variant="ghost"
        >
          <Users className="h-6 w-6" />
          <span className="text-sm font-medium">Split</span>
        </Button>

        <Button
          onClick={() => setPocketOpen(true)}
          className="h-24 flex-col gap-2 bg-card hover:bg-accent hover:text-accent-foreground shadow-card"
          variant="ghost"
        >
          <Plus className="h-6 w-6" />
          <span className="text-sm font-medium">Pocket</span>
        </Button>
      </div>

      <PaymentModal open={paymentOpen} onOpenChange={setPaymentOpen} />
      <TransferModal open={transferOpen} onOpenChange={setTransferOpen} />
      <SplitPaymentModal open={splitOpen} onOpenChange={setSplitOpen} />
      <CreatePocketModal open={pocketOpen} onOpenChange={setPocketOpen} />
    </>
  );
};
