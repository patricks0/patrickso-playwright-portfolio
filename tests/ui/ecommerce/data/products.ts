export type ProductRef = {
name: string;
category: string; // if you want to assert category
availability: string; // if you want to assert availability
condition?: string; // if you want to assert condition
brand?: string; // if you want to assert brand
priceText?: string; // if you assert displayed price text
slug?: string; // if you ever need a stable URL fragment
};

export const PRODUCTS = {
WHITE_TOP: {
name: 'Summer White Top',
priceText: 'Rs. 400',
category: 'Women > Tops',
availability: 'In Stock',
condition: 'New',
brand: 'H&M',// optional; keep only if it’s stable
} satisfies ProductRef,

BLUE_TOP: {
name: 'Blue Top',
priceText: 'Rs. 500',
category: 'Women > Tops',
availability: 'In Stock',
} satisfies ProductRef,
} as const;

export type ProductKey = keyof typeof PRODUCTS;