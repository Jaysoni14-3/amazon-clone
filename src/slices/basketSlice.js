import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Global variable named items
  items: [],
};

export const basketSlice = createSlice({
  // creates the slice
  name: "basket", // name of the slice
  initialState, // passing the initialState as arguments... and it gives the initial values
  reducers: {
    // dispatching the actions
    //------  ACTIONS    -------
    //! ADDING items into basket
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },

    //! REMOVING items from basket
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];
      if (index >= 0) {
        // The item exists in the basket... REMOVE IT
        newBasket.splice(index, 1);
      } else {
        // The item does not exist
        console.warn(
          `Cannot remove product (id: ${action.payload.id}) as its not in your basket`
        );
      }

      state.items = newBasket;
    },
  },
});

// EXPORTING THE ACTIONS
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
