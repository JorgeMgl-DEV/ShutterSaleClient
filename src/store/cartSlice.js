import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },
        decreaseQuantity(state, action) {
            const id = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter((i) => i.id !== id);
            }
        },
        increaseQuantity(state, action) {
            const id = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item) {
                item.quantity += 1;
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;