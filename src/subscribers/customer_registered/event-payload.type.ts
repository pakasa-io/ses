export type VariantOption = {
  attribute_code: string;
  attribute_name: string;
  attribute_id: number;
  option_id: number;
  option_text: string;
}

export type OrderItem = {
  order_item_id: number;
  uuid: string;
  order_item_order_id: number;
  product_id: number;
  referer: string | null;
  product_sku: string;
  product_name: string;
  thumbnail: string;
  product_weight: string;
  product_price: string;
  product_price_incl_tax: string;
  qty: number;
  final_price: string;
  final_price_incl_tax: string;
  tax_percent: string;
  tax_amount: string;
  discount_amount: string;
  total: string;
  variant_group_id: number;
  variant_options: VariantOption[] | string; // Can be stringified JSON or parsed array
  product_custom_options: any | null; // Replace 'any' with specific type if known
  requested_data: any | null; // Replace 'any' with specific type if known
}

export type OrderAddress = {
  order_address_id: number;
  uuid: string;
  full_name: string;
  postcode: string;
  telephone: string;
  country: string;
  province: string;
  city: string;
  address_1: string;
  address_2: string | null;
  country_name: string;
  province_name: string;
}

export type CustomerRegisteredEventPayload = {
  customer_id?: string;
  full_name: string;
  email: string;
}
