import {resolve} from '@/di';
import {INTERNAL_SERVER_ERROR} from '@evershop/evershop/src/lib/util/httpStatus';
import {buildUrl} from '@evershop/evershop/src/lib/router/buildUrl';
import {getContextValue} from '@evershop/evershop/src/modules/graphql/services/contextHelper';
import {Logger} from "@/logger";
import {Ccm} from "@/ccm";
import {Mailer} from "@/services/mailer";
import {TemplateEngineImpl, TemplateId} from "@/template-engine";

// eslint-disable-next-line no-unused-vars
export default async (request: any, response: any, delegate: any, next: () => any) => {
  const logger = resolve(Logger)
  try {
    const ccm = resolve(Ccm)
    const mailer = resolve(Mailer)
    const tpl = resolve(TemplateEngineImpl)

    const {
      $body: {email, token}
    } = response;

    const from = ccm.pakasaSes.from;

    if (!from) return;

    const {enabled, subject} = ccm.pakasaSes.events?.reset_password;
    if (!enabled) return;

    // Generate the url to reset password page
    const url = buildUrl('updatePasswordPage');
    // Add the token to the url
    const resetPasswordUrl = `${getContextValue(
      request,
      'homeUrl'
    )}${url}?token=${token}`;

    const lang = ccm.shop.language

    // Send email to customer
    const dto = {
      to: email,
      subject: subject || 'Reset Password',
      from,
      html: tpl.render(TemplateId.RESET_PASSWORD, {reset_password_url: resetPasswordUrl}, {lang})
    };

    await mailer.send(dto);
    await next();
  } catch (e: any) {
    logger.error(e);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
