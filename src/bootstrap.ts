import '@/di'
import config from 'config';
import {NAMESPACE} from "@/constants";

const fn = () => {
    const defaults = {
        from: 'Customer Service <no-reply@pakasa.io>',
        fromName: 'Pakasa',
        events: {
            order_placed: {
                subject: 'Order Confirmation',
                enabled: true,
            },
            reset_password: {
                subject: 'Reset Password',
                enabled: true,
            },
            customer_registered: {
                subject: 'Welcome to Pakasa',
                enabled: true,
            }
        }
    };
    config.util.setModuleDefaults(NAMESPACE, defaults);
};

module.exports = fn
export default fn
