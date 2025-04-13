import { DI_CONFIG, inject, injectable } from '@/di';
import { IConfig } from 'config';
import { BASE_DIR } from '@/constants';
import path from 'path';
import { Logger } from '@/logger';

@injectable()
export class TemplateConfigs {
  constructor(
    @inject(DI_CONFIG) protected config: IConfig,
    @inject(Logger) protected logger: Logger) {
  }

  get baseDir(): string {
    try {
      return path.resolve(BASE_DIR, 'templates');
    } catch (e: any) {
      this.logger.warn(e?.message || e);
      return '';
    }
  }
}
