export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews_count: number;
  isNew?: boolean;
  isTrending?: boolean;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin' | 'vendor' | 'guest';
}

export type ViewState = 
  | 'AUTH'
  | 'HOME' 
  | 'PLP' 
  | 'PDP' 
  | 'CART' 
  | 'CHECKOUT' 
  | 'USER_DASHBOARD' 
  | 'ADMIN_DASHBOARD';

export interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  selectedProductId: number | null;
  setSelectedProductId: (id: number | null) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}