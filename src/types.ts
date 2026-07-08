export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  serviceInterest: 'tailored' | 'jewelry' | 'both';
  preferredDate: string;
  preferredTime?: string;
  specialNotes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  customizationDetails?: CustomizationChoice;
}

export interface CustomizationChoice {
  category: 'suit' | 'qipao' | 'ring' | 'necklace';
  fabricId: string;
  liningId?: string;
  buttonId?: string;
  gemstoneId?: string;
  metalId?: string;
  monogramText: string;
  monogramFont?: string;
  estimatedPrice: number;
}

export interface CustomOption {
  id: string;
  name: string;
  priceModifier: number;
  colorHex?: string;
  imageUrl?: string;
}

export interface AtelierLocation {
  id: string;
  type: 'atelier' | 'event';
  name: string;
  address: string;
  hoursOrDate: string;
  phone?: string;
  lat: number; // For visualization on our SVG map
  lng: number; // For visualization on our SVG map
  description: string;
  imageUrl: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
}

export type Language = 'fr' | 'en' | 'cn';

export type ActiveTab = 'home' | 'services' | 'map' | 'profile';
