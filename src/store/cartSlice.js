import { createSlice } from '@reduxjs/toolkit';

// Carrega o carrinho do localStorage ou usa um array vazio
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
                localStorage.setItem('cart', JSON.stringify(state.items)); // Salva no localStorage
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(state.items)); // Atualiza o localStorage
        },
        clearCart(state) {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items)); // Limpa o localStorage
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;