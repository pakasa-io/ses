import { describe, expect, it } from 'vitest';
import handler from './handler'
describe('customer_registered:handler()', () => {
  it('should process customer_registered events',async () => {
    const call = handler({
      customer_id: '1'
    } as any)

    await expect(call).resolves.not.toThrow()
  })
});
