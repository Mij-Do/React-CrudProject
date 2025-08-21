import type { IProduct } from "../interface";

export function txtLength (txt: string, max:number) {
    if (txt.length > max) {
        return `${txt.slice(0, max)}...`;
    }
}

export function uuid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export const addToCart = (cartItem: IProduct[], product: IProduct) => {
    const exists = cartItem.find(item => item.id === product.id);

    if (exists) {
        return cartItem.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
    }

    return [...cartItem, {...product, qty: 1}];
}