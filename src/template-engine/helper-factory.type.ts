import {TemplateEngine} from "@/template-engine/template-engine.interface";
import {Container, Handlebars} from "@/di";

export type Helper = (...a: any) => any
export  type HelperFactory = (egn: TemplateEngine, hbs: Handlebars, c: Container) => Helper;
