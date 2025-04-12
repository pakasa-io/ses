import {DI_HBS, Handlebars, inject, injectable, ioc} from "@/di";

import * as path from 'path';
import * as fs from 'fs';

import {Ccm} from "@/ccm";
import {TemplateGlobals} from "@/template-engine/globals";
import {HelperFactory} from "@/template-engine/helper-factory.type";
import {TemplateEngine} from "@/template-engine/template-engine.interface";
import {RenderOptions} from "@/template-engine/types";
import * as helpers from '@/template-engine/helpers';
import {TemplateId} from "@/template-engine/template-id";

const defaults = {
  filename: 'index.html',
  lang: 'en',
};

const PARTIALS_DIR = '__partials__'
const ASSETS_DIR = '__assets__'

@injectable()
export class TemplateEngineImpl implements TemplateEngine {
  protected compiled: Record<string, any> = {};

  constructor(
    protected ccm: Ccm,
    protected globals: TemplateGlobals,
    @inject(DI_HBS) protected client: Handlebars
  ) {
    this.registerHelpers(helpers);
    this.registerPartials(this.baseDir);
  }

  get baseDir() {
    return path.resolve(this.ccm.templates.baseDir);
  }

  get imagesDir() {
    return path.resolve(this.ccm.templates.baseDir, ASSETS_DIR, 'img');
  }

  protected registerHelpers(helperz: Record<string, HelperFactory>) {
    Object.keys(helperz).forEach((key) => {
      this.client.registerHelper(key, helperz[key](this, this.client, ioc));
    });
  }

  protected registerPartials(dir: string) {
    fs.readdirSync(dir, {withFileTypes: true}).forEach((lang) => {
      if (lang.isFile()) return;

      const partialsDir = path.resolve(dir, lang.name, PARTIALS_DIR);
      fs.readdirSync(partialsDir, {withFileTypes: true})
        .filter(
          (partial) =>
            partial.isFile() && path.extname(partial.name) === '.html'
        )
        .forEach((partial) => {
          const basename = path.basename(partial.name, '.html');
          const name = `${lang.name}-${basename}`;
          const filepath = path.resolve(partialsDir, partial.name);
          const content = fs.readFileSync(filepath);

          this.client.registerPartial(name, content);
        });
    });
  }

  render(templateId: TemplateId, data: Record<string, any>, opts?: RenderOptions): string {
    const {filename, lang} = {...defaults, ...opts};
    const template = this.getTemplate(templateId, lang, filename);
    return template(this.globals.populate(data));
  }

  protected getTemplate(
    templateId: TemplateId,
    lang: string,
    filename: string
  ) {
    const key = `${templateId}:${lang}:${filename}`;
    const filepath = this.resolveTemplatePath(templateId, lang, filename);
    const content = fs.readFileSync(filepath, {encoding: 'utf8'});
    this.compiled[key] = this.client.compile(content);
    return this.compiled[key];
  }

  protected resolveTemplatePath(
    templateId: TemplateId,
    lang: string,
    filename: string
  ) {
    const lng = lang.trim().toLowerCase();
    return path.resolve(this.baseDir, lng, templateId, filename);
  }
}
