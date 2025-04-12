import '@/di';

import * as template_id from './template-id';
import * as template_engine from './template-engine.impl';

module.exports = {
  ...template_id,
  ...template_engine,
};

export * from './types';
export * from './template-engine.interface';
export * from './template-id';
export * from './template-engine.impl';

