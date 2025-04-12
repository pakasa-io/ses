import {DI_CONFIG, injectable, inject} from "@/di";
import {IConfig} from "config";
import { BASE_DIR } from '@/constants';
import path from 'path';

@injectable()
export class TemplateConfigs {
  constructor(@inject(DI_CONFIG) protected config: IConfig) {
  }

  get baseDir(): string {
    return path.resolve(BASE_DIR, 'templates')
  }
}
