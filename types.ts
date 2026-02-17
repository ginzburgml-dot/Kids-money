
export interface Goal {
  id: string;
  name: string;
  cost: number;
  imageUrl: string;
  category: string;
}

export interface Chore {
  id: string;
  title: string;
  reward: number;
  icon: string;
  isCompleted: boolean;
  timesCompleted: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'earn' | 'spend';
  description: string;
  date: number;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}
