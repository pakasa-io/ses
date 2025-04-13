import { DI_CONFIG, inject, injectable } from '@/di';

import { IConfig } from 'config';
import { NAMESPACE } from '@/constants';
import { DomainEvent, DomainEventConfig } from '@/types';
import { Logger } from '@/logger';

@injectable()
export class PakasaSesConfigs {
  constructor(
    @inject(DI_CONFIG) protected config: IConfig,
    @inject(Logger) protected logger: Logger,
  ) {
  }

  get from(): string {
    try {
      return this.config.get(`${NAMESPACE}.from`);
    } catch (e: any) {
      this.logger.warn(e?.message || e);
      return '';
    }
  }

  get fromName(): string {
    try {
      return this.config.get(`${NAMESPACE}.fromName`);
    } catch (e: any) {
      this.logger.warn(e?.message || e);
      return '';
    }
  }

  get events(): Record<DomainEvent, DomainEventConfig> {
    try {
      return this.config.get(`${NAMESPACE}.events`);
    } catch (e: any) {
      this.logger.warn(e?.message || e);
      return {} as any;
    }
  }
}
