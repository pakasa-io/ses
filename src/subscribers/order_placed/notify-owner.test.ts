import { beforeEach, describe, expect, it } from 'vitest';
import config from 'config';
import handler from './notify-owner';

describe('order_placed:handler()', () => {
  beforeEach(() => {
    config.util.setModuleDefaults('shop', {
      name: 'Pakasa',
      phone: '0772072072',
      homeUrl: 'lilwizzy.pakasa.io',
      language: 'en',
    });

    config.util.setModuleDefaults('pakasa_ses', {
      from: 'no-reply@pakasa.io',
      fromName: 'Pakasa',
      events: {
        order_placed: {
          subject: 'Order Confirmation',
          enabled: true,
          subscribers: [
            'admin@pakasa.io',
          ],
        },
        reset_password: {
          subject: 'Reset Password',
          enabled: true,
        },
        customer_registered: {
          subject: 'Welcome to Pakasa',
          enabled: true,
        },
      },
    });
  });

  it('should process order_placed events', async () => {
    const call = handler(data as any);

    await expect(call).resolves.not.toThrow();
  });
});

const data = {
  'order_id': 2,
  'uuid': '92778366-68dc-437c-bfd7-e1cac5e08b0d',
  'integration_order_id': null,
  'sid': '9k2lxX80LEeTiereiS6A5QPWc_qMNSO5',
  'order_number': '10002',
  'status': 'new',
  'cart_id': 2,
  'currency': 'UGX',
  'customer_id': null,
  'customer_email': 'gssekirime@gmail.com',
  'customer_full_name': null,
  'user_ip': null,
  'user_agent': null,
  'coupon': null,
  'shipping_fee_excl_tax': '0.0000',
  'shipping_fee_incl_tax': '0.0000',
  'discount_amount': '0.0000',
  'sub_total': '90.0000',
  'sub_total_incl_tax': '90.0000',
  'sub_total_with_discount': '90.0000',
  'sub_total_with_discount_incl_tax': '90.0000',
  'total_qty': 1,
  'total_weight': '90.0000',
  'tax_amount': '0.0000',
  'tax_amount_before_discount': '0.0000',
  'shipping_tax_amount': '0.0000',
  'shipping_note': null,
  'grand_total': '90.0000',
  'shipping_method': 'df6db2e5-65a0-4e6d-be48-b87add65cab3',
  'shipping_method_name': 'As early as possible',
  'shipping_address_id': 3,
  'payment_method': 'cod',
  'payment_method_name': 'Cash On Delivery',
  'billing_address_id': 4,
  'shipment_status': 'pending',
  'payment_status': 'pending',
  'created_at': '2025-04-13T00:54:38.180Z',
  'updated_at': '2025-04-13T00:54:38.180Z',
  'total_tax_amount': '0.0000',
};
