import {injectable, inject} from "@/di";
import {Ccm} from "@/ccm";

@injectable()
export class TemplateGlobals {
  constructor(@inject(Ccm) protected ccm: Ccm) {
  }

  populate(data: Record<string, any>): Record<string, any> {
    // todo: dynamically resolve globals
    const globals = {
      home_url: this.ccm.shop.homeUrl
    };

    return {...globals, data}
  }
}
