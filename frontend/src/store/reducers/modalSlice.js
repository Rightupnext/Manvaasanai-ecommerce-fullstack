import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: "success", 
  message: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type || "success";
      state.message = action.payload.message || "";
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
