import {Container, Handlebars} from '@/di'
import fs from 'fs';
import path from 'path';
import {toString} from 'lodash'
import {TemplateEngine} from "@/template-engine/template-engine.interface";
// @ts-ignore
import {lookup} from 'mime-types';

export const truncate = (_e: TemplateEngine, _h: Handlebars, _c: Container) => (value: any) => {
  if (!value) return value;

  value = toString(value);
  return value?.length <= 27
    ? value
    : `${value.slice(0, 16)}...${value.substr(value.length - 8)}`;
};

export const datauri = (egn: TemplateEngine, hbs: Handlebars, c: Container) => (filename: string) => {
  const bitmap = fs.readFileSync(path.join(egn.imagesDir, filename));
  const base64String = new Buffer(bitmap).toString('base64');
  const mimeType = lookup(filename);

  return new hbs.SafeString(`data:${mimeType};base64,${base64String}`);
};
