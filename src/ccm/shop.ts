import { DI_CONFIG, inject, injectable } from '@/di';
import { IConfig } from 'config';
import { Logger } from '@/logger';

@injectable()
export class ShopConfigs {
  constructor(
    @inject(DI_CONFIG) protected config: IConfig,
    @inject(Logger) protected logger: Logger,
  ) {
  }

  get homeUrl(): string {
    try {
      return this.config.get(this.key('homeUrl'));
    } catch (e: any) {
      this.logger.warn(e?.message || e);
      return '';
    }
  }

  get language(): string | 'en'{
    try {
      return this.config.get(this.key('language'));
    } catch (e: any) {
      this.logger.warn(e?.message || e);
      return 'en';
    }
  }

  protected key(path: string): string {
    return `shop.${path}`;
  }
}
