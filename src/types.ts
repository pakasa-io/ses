export type DomainEvent = 'order_placed' | 'reset_password' | 'customer_registered'
export type DomainEventConfig = {
  enabled: boolean;
  subject: string;
  subscribers?: string[]
}
