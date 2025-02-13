import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const items = action.payload;
      let addedItems = [];
      items.forEach((item) => {
        const existingItem = state.cartItems.find((i) => i._id === item._id);

        if (existingItem) {
          existingItem.quantity = existingItem.quantity + (item.quantity || 1);
        } else {
          const itemToAdd = { ...item };
          delete itemToAdd.quantity;
          state.cartItems.push(itemToAdd);
          addedItems.push(item.title);
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
      // Show success notification
      if (addedItems.length > 0) {
        notification.success({
          message: "Added to Cart",
          description: `${addedItems.join(", ")} has been added to your cart.`,
          duration: 3,
        });
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.cartItems.find((i) => i._id === action.payload);
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify([...state.cartItems]));

      // Show success notification
      if (itemToRemove) {
        notification.warning({
          message: "Removed from Cart",
          description: `${itemToRemove.title} has been removed from your cart.`,
          duration: 3,
        });
      }
    },
  },
});

export const selectCartTotalCount = (state) => {
  return state.cart.cartItems.length; // Return count directly instead of array
};

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
