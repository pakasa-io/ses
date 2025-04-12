import {injectable} from "@/di";
import {Ccm} from "@/ccm";

@injectable()
export class TemplateGlobals {
  constructor(protected ccm: Ccm) {
  }

  populate(data: Record<string, any>): Record<string, any> {
    // todo: dynamically resolve globals
    const globals = {
      home_url: this.ccm.shop.homeUrl
    };

    return {...globals, data}
  }
}
