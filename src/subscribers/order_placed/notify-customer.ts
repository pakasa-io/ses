import { resolve } from '@/inversify.config';
import { Ccm } from '@/ccm';
import { Mailer, SendEmailRequest } from '@/services/mailer';
import { TemplateEngineImpl, TemplateId } from '@/template-engine';
import { NAMESPACE } from '@/constants';

const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { select } = require('@evershop/postgres-query-builder');
const { contries } = require('@evershop/evershop/src/lib/locale/countries');
const { provinces } = require('@evershop/evershop/src/lib/locale/provinces');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const { getValue } = require('@evershop/evershop/src/lib/util/registry');

module.exports = async function sendOrderConfirmationEmail(data) {
  try {
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

    const payload = order;
    order.items = await select()
      .from('order_item')
      .where('order_item_order_id', '=', order.order_id)
      .execute(pool);

    payload.shipping_address = await select()
      .from('order_address')
      .where('order_address_id', '=', order.shipping_address_id)
      .load(pool);

    payload.shipping_address.country_name =
      contries.find((c) => c.code === payload.shipping_address.country)
        ?.name || '';

    payload.shipping_address.province_name =
      provinces.find((p) => p.code === payload.shipping_address.province)
        ?.name || '';

    // Preparing the data for email
    const lang = ccm.shop.language;

    const $payload = await getValue(
      `${NAMESPACE}_order_confirmation_email_data`,
      payload,
      {}
    );

    const dto: SendEmailRequest = {
      to: order.customer_email,
      subject: 'Order Confirmation',
      from,
      html: tpl.render(TemplateId.ORDER_PLACED, $payload, { lang, filename: 'customer.html' }),
    };

    await mailer.send(dto);
  } catch (e) {
    error(e);
  }
};
