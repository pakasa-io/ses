import {DI_CONFIG, injectable, inject} from "@/di";
import {IConfig} from "config";

@injectable()
export class TemplateConfigs {
  constructor(@inject(DI_CONFIG) protected config: IConfig) {
  }

  get baseDir(): string {
    throw new Error("templates.assetsDir not implemented")
  }
}
