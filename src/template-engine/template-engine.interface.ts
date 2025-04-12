import {TemplateId} from "@/template-engine/template-id";
import {RenderOptions} from "@/template-engine/types";

export interface TemplateEngine {
  get baseDir(): string

  get imagesDir(): string

  render(templateId: TemplateId, data: Record<string, any>, opts?: RenderOptions): string
}
