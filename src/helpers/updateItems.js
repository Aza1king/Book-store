import api from '../api';

const updateItems = async (cart, item, newItem) => {
    if (newItem.count === 0) {
        await api.deleteCartItem(newItem.id);
        return cart.filter((cartItem) => cartItem.id !== newItem.id);
    }

    if (item) {
        await api.editCartItem(newItem);
        return cart.map((cartItem) => (cartItem.id === newItem.id ? newItem : cartItem));
    }

    await api.addToCart(newItem);
    return [...cart, newItem];
};

export default updateItems;
