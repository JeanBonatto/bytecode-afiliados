export interface AliExpressProduct {
  product_id: string;
  product_title: string;
  target_sale_price: string;
  product_detail_url: string;
  promotion_link: string;
  shop_name: string;
  evaluate_rate: string;
  lastest_volume: number;
}

export interface AliExpressResponse {
  aliexpress_affiliate_product_query_response: {
    resp_result: {
      result: {
        products: {
          product: AliExpressProduct[];
        };
        current_page_no: number;
        total_record_count: number;
      };
      resp_code: number;
      resp_msg: string;
    };
  };
}