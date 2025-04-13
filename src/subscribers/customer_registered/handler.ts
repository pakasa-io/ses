import {resolve} from '@/di';
import {pool} from '@evershop/evershop/src/lib/postgres/connection'; // todo: modularize
import {select} from '@evershop/postgres-query-builder'; // todo: modularize
import {Ccm} from "@/ccm";
import {Mailer, SendEmailRequest} from "@/services/mailer";
import {TemplateEngineImpl, TemplateId} from "@/template-engine";
import {Logger} from "@/logger";

async function handler(data: CustomerRegisteredEventPayload) {
  const logger = resolve(Logger)

  try {
    logger.info('CustomerRegisteredEventPayload', data)

    const ccm = resolve(Ccm)
    const mailer = resolve(Mailer)
    const tpl = resolve(TemplateEngineImpl)

    const from = ccm.pakasaSes.from;
    if (!from) return;

    const {enabled, subject} = ccm.pakasaSes.events?.customer_registered;
    if (!enabled) return;


    // Build the email data
    const customerId = data.customer_id;
    const customer = await select()
      .from('customer')
      .where('customer_id', '=', customerId)
      .load(pool);

    if (!customer) return;
    delete customer.password;

    const lang = ccm.shop.language

    const request: SendEmailRequest = {
      to: [data.email],
      from,
      subject: subject || `Welcome to Pakasa`,
      html: tpl.render(TemplateId.CUSTOMER_REGISTERED, data, {lang}),
    };

    await mailer.send(request);
  } catch (e) {
    logger.error(e);
  }
};

module.exports = handler
export default handler

export type CustomerRegisteredEventPayload = {
  customer_id?: string;
  full_name: string;
  email: string;
}


