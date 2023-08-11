export interface IProduct {
    id: number;
    name: string;
    quantity: number;
    category_name: string;
    category_id: number;
}

export interface IProductPaginated {
    data: IProduct[]
    meta: {
        prev: number;
        next: number;
        current: number;
    };
}

export interface ProductCardProps {
    item: any;
    onChangeInventory: any;
    key?: any;
}