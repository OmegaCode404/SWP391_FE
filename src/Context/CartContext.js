// src/CartContext.js
import React, { createContext, useReducer, useContext } from "react";

// Create a context for the cart
const CartContext = createContext();

const initialState = {
  cartItems: [],
};

// Define action types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";

// Reducer function to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    default:
      return state;
  }
};

// CartProvider component to wrap the app
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
