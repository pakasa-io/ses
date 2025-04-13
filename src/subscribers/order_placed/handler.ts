import { resolve } from '@/di';
import { pool } from '@evershop/evershop/src/lib/postgres/connection'; // todo: modularize
import { select } from '@evershop/postgres-query-builder'; // todo: modularize
import { Ccm } from '@/ccm';
import { Mailer, SendEmailRequest } from '@/services/mailer';
import { TemplateEngineImpl, TemplateId } from '@/template-engine';
import { Logger } from '@/logger';

import { contries } from '@evershop/evershop/src/lib/locale/countries';
import { provinces } from '@evershop/evershop/src/lib/locale/provinces';

async function handler(data: OrderPlacedEventPayload) {
  const logger = resolve(Logger);

  try {
    logger.info(`OrderPlacedEventPayload`, data);
    const ccm = resolve(Ccm);
    const mailer = resolve(Mailer);
    const tpl = resolve(TemplateEngineImpl);
    const from = ccm.pakasaSes.from;

    if (!from) return;

    const { enabled, subject } = ccm.pakasaSes.events?.order_placed;
    if (!enabled) return;

    // Build the email data
    const orderId = data.order_id;
    const order = await select()
      .from('order')
      .where('order_id', '=', orderId)
      .load(pool);

    if (!order) {
      return;
    }

    const emailData = order;
    order.items = await select()
      .from('order_item')
      .where('order_item_order_id', '=', order.order_id)
      .execute(pool);

    emailData.shipping_address = await select()
      .from('order_address')
      .where('order_address_id', '=', order.shipping_address_id)
      .load(pool);

    emailData.shipping_address.country_name =
      contries.find((c: any) => c.code === emailData.shipping_address.country)
        ?.name || '';

    emailData.shipping_address.province_name =
      provinces.find((p: any) => p.code === emailData.shipping_address.province)
        ?.name || '';

    emailData.billing_address = await select()
      .from('order_address')
      .where('order_address_id', '=', order.billing_address_id)
      .load(pool);

    emailData.billing_address.country_name =
      contries.find((c: any) => c.code === emailData.billing_address.country)
        ?.name || '';

    emailData.billing_address.province_name =
      provinces.find((p: any) => p.code === emailData.billing_address.province)
        ?.name || '';

    // const finalEmailData = await getValue(
    //   'sendgrid_order_confirmation_email_data',
    //   emailData,
    //   {}
    // );

    const lang = ccm.shop.language;

    const dto: SendEmailRequest = {
      to: order.customer_email,
      subject: subject || 'Order Confirmation',
      from,
      html: tpl.render(TemplateId.ORDER_PLACED, emailData, { lang }),
    };

    await mailer.send(dto);
  } catch (e) {
    logger.error(e);
  }
};

module.exports = handler;
export default handler;


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

export type OrderPlacedEventPayload = {
  order_id: number;
  uuid: string;
  integration_order_id: string | null;
  sid: string;
  order_number: string;
  cart_id: number;
  currency: string;
  customer_id: number;
  customer_email: string;
  customer_full_name: string;
  user_ip: string | null;
  user_agent: string | null;
  coupon: string | null;
  shipping_fee_excl_tax: string;
  shipping_fee_incl_tax: string;
  discount_amount: string;
  sub_total: string;
  total_qty: number;
  total_weight: string;
  tax_amount: string;
  shipping_note: string | null;
  grand_total: string;
  shipping_method: string;
  shipping_method_name: string;
  shipping_address_id: number;
  payment_method: string;
  payment_method_name: string;
  billing_address_id: number;
  shipment_status: string;
  payment_status: string;
  created_at: Date | string;
  updated_at: Date | string;
  items: OrderItem[];
  shipping_address: OrderAddress;
  billing_address: OrderAddress;
}
