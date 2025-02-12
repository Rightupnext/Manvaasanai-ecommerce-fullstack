import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const items = action.payload;
      items.forEach((item) => {
        const existingItem = state.cartItems.find((i) => i._id === item._id);

        if (existingItem) {
          existingItem.quantity = existingItem.quantity + (item.quantity || 1);
        } else {
          const itemToAdd = { ...item };
          delete itemToAdd.quantity;
          state.cartItems.push(itemToAdd);
        }
      });

      state.cartItems = state.cartItems.reduce((uniqueItems, currentItem) => {
        const existingItem = uniqueItems.find(
          (item) => item._id === currentItem._id
        );
        if (!existingItem) {
          uniqueItems.push(currentItem);
        }
        return uniqueItems;
      }, []);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify([...state.cartItems])); 
    },    
  },
});

export const selectCartTotalCount = (state) => {
  const itemCount = state.cart.cartItems.length;
  return [itemCount];
};

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
