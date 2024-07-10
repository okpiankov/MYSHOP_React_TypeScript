import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TypeProducts = {
  image: string | '';
  type: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
  id: number | null;
  quantity?: number | null;
};

type CartSliceState = TypeProducts[];

// const initialState: CartSliceState = [
//   {
//     image: '',
//     type: null,
//     name: null,
//     description: null,
//     price: null,
//     id: null,
//     quantity: null,
//   },
// ];
const initialState: CartSliceState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartSliceState>) => {
      return (state = action.payload);
      // return [...action.payload];
    },
  },
  selectors: {
    getCart: state => state,
  },
});

export const productActions = cartSlice.actions;

export const { getCart } = cartSlice.selectors;
// console.log(getCart)

// export const cartSlice = createSlice({
//   name: 'cart',
//   initialState: { products: [] },
//   reducers: {
//     setCart: (state, action) => {
//       state.products = action.payload;
//     },
//   },
//   selectors: {
//     getCart: state => state.products,
//   },
// });

// export const productActions = cartSlice.actions;
// export const { getCart } = cartSlice.selectors;
