import { checkoutQuantityAtCenter, generateCheckoutSummaryHTML, generateDeliveryOptionsHtml } from './checkout/orderSummary.js';

import { generatePaymentSummary } from './checkout/paymentSummary.js';

// updating quantity at center of the page

checkoutQuantityAtCenter();
generateCheckoutSummaryHTML();
generatePaymentSummary();
generateDeliveryOptionsHtml();