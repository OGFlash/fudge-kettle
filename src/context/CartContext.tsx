import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, Cart } from '../types/shop';

interface CartContextType {
  cart: Cart;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, selectedOptions: Record<string, string>) => void;
  updateQuantity: (productId: string, selectedOptions: Record<string, string>, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; selectedOptions: Record<string, string> } }
  | { type: 'UPDATE_QTY'; payload: { productId: string; selectedOptions: Record<string, string>; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'fudge-kettle-cart';

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(action.payload.selectedOptions)
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: newItems };
      }

      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              JSON.stringify(item.selectedOptions) === JSON.stringify(action.payload.selectedOptions)
            )
        ),
      };
    }

    case 'UPDATE_QTY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(action.payload.selectedOptions)
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...item,
        quantity: item.quantity || 1,
      },
    });
  };

  const removeItem = (productId: string, selectedOptions: Record<string, string>) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, selectedOptions } });
  };

  const updateQuantity = (productId: string, selectedOptions: Record<string, string>, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, selectedOptions);
    } else {
      dispatch({ type: 'UPDATE_QTY', payload: { productId, selectedOptions, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
