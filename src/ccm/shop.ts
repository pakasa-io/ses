import {DI_CONFIG, injectable, inject} from "@/di";
import {IConfig} from "config";

@injectable()
export class ShopConfigs {
  constructor(@inject(DI_CONFIG) protected config: IConfig) {
  }

  get homeUrl(): string {
   return this.config.get(this.key('homeUrl')) ?? ''
  }

  get language(): string {
    return this.config.get(this.key('language')) ?? 'en'
  }

  protected key(path: string): string {
    return `shop.${path}`
  }
}
