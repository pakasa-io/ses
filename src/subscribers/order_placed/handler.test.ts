import { describe, expect, it } from 'vitest';
import handler from './handler';

describe('order_placed:handler()', () => {
  it('should process order_placed events', async () => {
    const call = handler({
      customer_id: '1',
    } as any);

    expect(call).resolves.not.toThrow();
  });
});
