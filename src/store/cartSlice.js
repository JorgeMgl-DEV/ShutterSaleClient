import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromStorage(),
    },
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find((i) => i.id === item.id);
            if (!existingItem) {
                state.items.push(item);
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart(state) {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;