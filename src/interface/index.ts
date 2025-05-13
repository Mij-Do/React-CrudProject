import type { TProductName } from "../types";

export interface Iproduct {
    id: string | undefined;
    title: string;
    price: string;
    description: string;
    imageURL: string;
    category: {
        name: string,
        imageURL: string,
    };
    colors: string[];
}


export interface IFormList {
    id: string;
    name:   TProductName;
    label: string;
    type: string
}


export interface ICategory {
    id: string;
    name: string;
    imageURL: string;
}