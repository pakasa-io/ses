import { inject, injectable } from '@/di';
import { Ccm } from '@/ccm';

@injectable()
export class TemplateGlobals {
  constructor(@inject(Ccm) protected ccm: Ccm) {
  }

  populate(data: Record<string, any>): Record<string, any> {
    // todo: dynamically resolve globals
    const globals = {
      store: {
        name: this.ccm.shop.name,
        phone: this.ccm.shop.phone,
        url: this.ccm.shop.homeUrl,
      },
    };

    return { ...globals, ...data };
  }
}
