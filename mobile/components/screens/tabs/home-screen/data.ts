import type { ComponentProps } from 'react';

import type { Ionicons } from '@expo/vector-icons';

export type HomeDeal = {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  accentColor: string;
  placeholderLabel: string;
};

export type QuickAction = {
  id: string;
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export type Destination = {
  id: string;
  city: string;
  price: string;
  placeholderLabel: string;
  accentColor: string;
};

export const PROMO_DEALS: HomeDeal[] = [
  {
    id: 'beach-paradise',
    badge: 'HOT DEAL',
    title: 'Beach Paradise Getaway',
    subtitle: 'From $299 - 5 nights',
    accentColor: '#fb7185',
    placeholderLabel: 'Beach',
  },
  {
    id: 'city-escape',
    badge: 'LIMITED',
    title: 'Modern City Escape',
    subtitle: 'From $349 - 4 nights',
    accentColor: '#f97316',
    placeholderLabel: 'City',
  },
  {
    id: 'island-dream',
    badge: 'TRENDING',
    title: 'Island Dream Retreat',
    subtitle: 'From $399 - 6 nights',
    accentColor: '#14b8a6',
    placeholderLabel: 'Island',
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'flights', label: 'Flights', icon: 'airplane-outline' },
  { id: 'hotels', label: 'Hotels', icon: 'business-outline' },
  { id: 'transport', label: 'Transport', icon: 'car-outline' },
  { id: 'visa', label: 'Visa', icon: 'document-text-outline' },
];

export const DESTINATIONS: Destination[] = [
  { id: 'paris', city: 'Paris', price: 'From $350', placeholderLabel: 'Paris', accentColor: '#d97706' },
  { id: 'dubai', city: 'Dubai', price: 'From $420', placeholderLabel: 'Dubai', accentColor: '#0ea5e9' },
  { id: 'bali', city: 'Bali', price: 'From $390', placeholderLabel: 'Bali', accentColor: '#14b8a6' },
  { id: 'rome', city: 'Rome', price: 'From $330', placeholderLabel: 'Rome', accentColor: '#ef4444' },
];
