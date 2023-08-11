export interface InventoryRequest {
    product_id: number;
    quantity: number;
}

export interface InventoryResponse {
    product_id: number;
    quantity: number;
}

export type InventoryOperation = 'add' | 'sub'