import { getCartQuantity, cart } from '../cart.js';
import productsData from '../../data/products.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { centsToActual } from '../utils/money.js';


export function generatePaymentSummary(){

    let count = getCartQuantity();

    let itemsPrice = 0;
    let shippingPrice = 0;
    let totalBeforeTax = 0;
    let addedTax = 0;
    let finalPrice = 0;

    cart.forEach((cartItem) => {

        let matchingItem;

        productsData.forEach((product) => {

            if(product.id === cartItem.productId){

                matchingItem = product;

            }

        });

        itemsPrice += (matchingItem.priceCents * cartItem.quantity); 

        deliveryOptions.forEach((option) => { 

            if(option.id === cartItem.deliveryId){

                matchingItem = option;

            }

        });

        shippingPrice += (matchingItem.priceCents);

    });

    totalBeforeTax = itemsPrice + shippingPrice;
    addedTax = (0.1 * totalBeforeTax);
    finalPrice = totalBeforeTax + addedTax;

    let paymentSummaryHtml = `
         <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
        <div>Items (${count}):</div>
        <div class="payment-summary-money">$${centsToActual(itemsPrice)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${centsToActual(shippingPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${centsToActual(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${centsToActual(addedTax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${centsToActual(finalPrice)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>`;

    const paymentSummaryElement = document.querySelector(".js-payment-summary");

    paymentSummaryElement.innerHTML = paymentSummaryHtml;

}