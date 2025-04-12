import {toConstant} from '@/inversify.config'
import * as handlebars from 'handlebars';

export type Handlebars = { [k in keyof typeof handlebars]: any };

export const DI_HBS = "handlebars"
toConstant(DI_HBS, handlebars)
