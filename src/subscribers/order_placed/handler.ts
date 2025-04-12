import {resolve} from '@/di';
import {pool} from '@evershop/evershop/src/lib/postgres/connection'; // todo: modularize
import {select} from '@evershop/postgres-query-builder'; // todo: modularize
import {Ccm} from "@/ccm";
import {Mailer, SendEmailRequest} from "@/services/mailer";
import {TemplateEngineImpl, TemplateId} from "@/template-engine";
import {OrderPlacedEventPayload} from "./event-payload.type";
import {Logger} from "@/logger";

import {contries} from '@evershop/evershop/src/lib/locale/countries';
import {provinces} from '@evershop/evershop/src/lib/locale/provinces';

async function handler(data: OrderPlacedEventPayload) {
    const logger = resolve(Logger)

    try {
        logger.info(`OrderPlacedEventPayload`, data)
        const ccm = resolve(Ccm)
        const mailer = resolve(Mailer)
        const tpl = resolve(TemplateEngineImpl)
        const from = ccm.pakasaSes.from;

        if (!from) return;

        const {enabled, subject} = ccm.pakasaSes.events?.order_placed;
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

        const lang = ccm.shop.language

        const dto: SendEmailRequest = {
            to: order.customer_email,
            subject: subject || 'Order Confirmation',
            from,
            html: tpl.render(TemplateId.ORDER_PLACED, emailData, {lang})
        };

        await mailer.send(dto);
    } catch (e) {
        logger.error(e);
    }
};

module.exports = handler
