import {DI_CONFIG, injectable, inject} from "@/di";
import {IConfig} from "config";
import {TemplateConfigs} from "@/ccm/templates";
import {PakasaSesConfigs} from "@/ccm/pakasa-ses";
import {ShopConfigs} from "@/ccm/shop";

@injectable()
export class Ccm {
  constructor(
    @inject(DI_CONFIG) protected config: IConfig,
    public shop: ShopConfigs,
    public templates: TemplateConfigs,
    public pakasaSes: PakasaSesConfigs
  ) {
  }

  get(key: string, defaultt: any) {
    return this.config.get(key) ?? defaultt
  }
}
