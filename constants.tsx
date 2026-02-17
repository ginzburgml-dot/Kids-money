
import { Goal, Chore, ShopItem } from './types';

export const INITIAL_CHORES = (lang: 'en' | 'ru'): Chore[] => {
  const data = {
    en: [
      { id: '1', title: 'Clean My Room', reward: 2, icon: '🧹', isCompleted: false, timesCompleted: 0 },
      { id: '2', title: 'Wash the Dishes', reward: 1, icon: '🍽️', isCompleted: false, timesCompleted: 0 },
      { id: '3', title: 'Feed the Pet', reward: 1, icon: '🐕', isCompleted: false, timesCompleted: 0 },
      { id: '4', title: 'Water the Plants', reward: 2, icon: '🌱', isCompleted: false, timesCompleted: 0 },
      { id: '5', title: 'Help with Groceries', reward: 3, icon: '🍎', isCompleted: false, timesCompleted: 0 },
    ],
    ru: [
      { id: '1', title: 'Убраться в комнате', reward: 2, icon: '🧹', isCompleted: false, timesCompleted: 0 },
      { id: '2', title: 'Помыть посуду', reward: 1, icon: '🍽️', isCompleted: false, timesCompleted: 0 },
      { id: '3', title: 'Покормить питомца', reward: 1, icon: '🐕', isCompleted: false, timesCompleted: 0 },
      { id: '4', title: 'Полить цветы', reward: 2, icon: '🌱', isCompleted: false, timesCompleted: 0 },
      { id: '5', title: 'Помочь с продуктами', reward: 3, icon: '🍎', isCompleted: false, timesCompleted: 0 },
    ]
  };
  return data[lang];
};

export const INITIAL_SHOP_ITEMS = (lang: 'en' | 'ru'): ShopItem[] => {
  const data = {
    en: [
      { id: 's1', name: 'Ice Cream Cone', price: 3, imageUrl: 'https://picsum.photos/seed/icecream/200/200' },
      { id: 's2', name: 'Cool Stickers', price: 1, imageUrl: 'https://picsum.photos/seed/stickers/200/200' },
      { id: 's3', name: 'New Comic Book', price: 5, imageUrl: 'https://picsum.photos/seed/comic/200/200' },
      { id: 's4', name: 'Action Figure', price: 12, imageUrl: 'https://picsum.photos/seed/hero/200/200' },
      { id: 's5', name: 'Stuffed Animal', price: 15, imageUrl: 'https://picsum.photos/seed/plush/200/200' },
    ],
    ru: [
      { id: 's1', name: 'Мороженое', price: 3, imageUrl: 'https://picsum.photos/seed/icecream/200/200' },
      { id: 's2', name: 'Крутые наклейки', price: 1, imageUrl: 'https://picsum.photos/seed/stickers/200/200' },
      { id: 's3', name: 'Новый комикс', price: 5, imageUrl: 'https://picsum.photos/seed/comic/200/200' },
      { id: 's4', name: 'Супергерой', price: 12, imageUrl: 'https://picsum.photos/seed/hero/200/200' },
      { id: 's5', name: 'Мягкая игрушка', price: 15, imageUrl: 'https://picsum.photos/seed/plush/200/200' },
    ]
  };
  return data[lang];
};

export const DEFAULT_GOAL = (lang: 'en' | 'ru'): Goal => {
  const data = {
    en: { id: 'g1', name: 'Super Toy Rocket', cost: 50, imageUrl: 'https://picsum.photos/seed/rocket/300/300', category: 'Toy' },
    ru: { id: 'g1', name: 'Космическая ракета', cost: 50, imageUrl: 'https://picsum.photos/seed/rocket/300/300', category: 'Игрушка' }
  };
  return data[lang];
};
