export interface ShopeeItem {
  item_id: number;
  item_name: string;
  item_sku: string;
  price_min: number;
  item_url: string;
  shopid: number;
}

export interface ShopeeResponse {
  error: string;
  message: string;
  response: {
    item: ShopeeItem[];
    total_count: number;
    next_offset: number;
  };
}