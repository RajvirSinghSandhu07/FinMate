import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Pocket {
  id: string;
  name: string;
  balance: number;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'transfer' | 'split';
  amount: number;
  from: string;
  to: string;
  date: Date;
  category?: string;
}

export interface SavedReceiver {
  id: string;
  name: string;
  qrCode?: string;
  paymentId?: string;
  defaultPocket?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
}

interface AppContextType {
  mainBalance: number;
  pockets: Pocket[];
  transactions: Transaction[];
  savedReceivers: SavedReceiver[];
  friends: Friend[];
  points: number;
  badge: string;
  setMainBalance: (amount: number) => void;
  addPocket: (pocket: Omit<Pocket, 'id'>) => boolean;
  updatePocket: (id: string, amount: number) => void;
  transferToPocket: (pocketId: string, amount: number) => void;
  makePayment: (amount: number, from: string, to: string, category?: string) => boolean;
  addSavedReceiver: (receiver: Omit<SavedReceiver, 'id'>) => void;
  addFriend: (friend: Omit<Friend, 'id'>) => void;
  splitPayment: (amount: number, members: number, from: string) => void;
  addPoints: (points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainBalance, setMainBalance] = useState(50000);
  const [pockets, setPockets] = useState<Pocket[]>([
    { id: '1', name: 'Food', balance: 5000, color: '#FF6B6B' },
    { id: '2', name: 'Travel', balance: 3000, color: '#4ECDC4' },
    { id: '3', name: 'Rent', balance: 15000, color: '#95E1D3' },
  ]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savedReceivers, setSavedReceivers] = useState<SavedReceiver[]>([]);
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'Rahul', avatar: '👨' },
    { id: '2', name: 'Priya', avatar: '👩' },
    { id: '3', name: 'Amit', avatar: '🧑' },
  ]);
  const [points, setPoints] = useState(45);
  const [badge, setBadge] = useState('Beginner');

  useEffect(() => {
    if (points >= 100) setBadge('Finance King');
    else if (points >= 50) setBadge('Saver Star');
    else setBadge('Beginner');
  }, [points]);

  const addPocket = (pocket: Omit<Pocket, 'id'>) => {
    if (mainBalance >= pocket.balance) {
      setMainBalance(mainBalance - pocket.balance);
      setPockets([...pockets, { ...pocket, id: Date.now().toString() }]);
      return true;
    }
    return false;
  };

  const updatePocket = (id: string, amount: number) => {
    setPockets(pockets.map(p => p.id === id ? { ...p, balance: amount } : p));
  };

  const transferToPocket = (pocketId: string, amount: number) => {
    if (mainBalance >= amount) {
      setMainBalance(mainBalance - amount);
      setPockets(pockets.map(p => 
        p.id === pocketId ? { ...p, balance: p.balance + amount } : p
      ));
      
      setTransactions([{
        id: Date.now().toString(),
        type: 'transfer',
        amount,
        from: 'Main Balance',
        to: pockets.find(p => p.id === pocketId)?.name || '',
        date: new Date(),
      }, ...transactions]);

      addPoints(5);
    }
  };

  const makePayment = (amount: number, from: string, to: string, category?: string) => {
    let success = false;
    
    if (from === 'main') {
      if (mainBalance >= amount) {
        setMainBalance(prev => prev - amount);
        success = true;
      }
    } else {
      const pocket = pockets.find(p => p.id === from);
      if (pocket && pocket.balance >= amount) {
        setPockets(prev => prev.map(p => 
          p.id === from ? { ...p, balance: p.balance - amount } : p
        ));
        success = true;
      }
    }

    if (success) {
      setTransactions(prev => [{
        id: Date.now().toString(),
        type: 'payment',
        amount,
        from: from === 'main' ? 'Main Balance' : pockets.find(p => p.id === from)?.name || '',
        to,
        date: new Date(),
        category,
      }, ...prev]);

      addPoints(10);
    }
    
    return success;
  };

  const addSavedReceiver = (receiver: Omit<SavedReceiver, 'id'>) => {
    setSavedReceivers([...savedReceivers, { ...receiver, id: Date.now().toString() }]);
  };

  const addFriend = (friend: Omit<Friend, 'id'>) => {
    setFriends([...friends, { ...friend, id: Date.now().toString() }]);
  };

  const splitPayment = (amount: number, members: number, from: string) => {
    const perPerson = amount / members;
    makePayment(perPerson, from, 'Group Payment', 'Split');
  };

  const addPoints = (newPoints: number) => {
    setPoints(points + newPoints);
  };

  return (
    <AppContext.Provider value={{
      mainBalance,
      pockets,
      transactions,
      savedReceivers,
      friends,
      points,
      badge,
      setMainBalance,
      addPocket,
      updatePocket,
      transferToPocket,
      makePayment,
      addSavedReceiver,
      addFriend,
      splitPayment,
      addPoints,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
