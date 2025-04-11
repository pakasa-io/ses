import {DI_CONFIG, injectable, inject} from "@/di";

import {IConfig} from "config";
import {NAMESPACE} from "@/constants";
import {DomainEvent, DomainEventConfig} from "@/types";

@injectable()
export class PakasaSesConfigs {
  constructor(@inject(DI_CONFIG) protected config: IConfig) {
  }

  get from(): string {
    return this.config.get(`${NAMESPACE}.from`)
  }

  get fromName(): string {
    return this.config.get(`${NAMESPACE}.fromName`)
  }

  get events(): Record<DomainEvent, DomainEventConfig> {
    return this.config.get(`${NAMESPACE}.events`) ?? {}
  }
}
