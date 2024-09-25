import { getCartQuantity } from "./cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { centsToActual } from './utils/money.js';
import productsData from '../data/products.js';
import { isWeekend as isSatSun } from './utils/date.js';

// fetching orders from local storage if already exists
export let orders = JSON.parse(localStorage.getItem("orders")) || [];

//  if not exist then setting an empty array instead

updateCartQuantity();

function updateCartQuantity(){

    const quantity = getCartQuantity();
    const quantityElement = document.querySelector(".js-cart-quantity");
    quantityElement.innerHTML = quantity;

}


function generateOrderHtml(){

    let ordersHtml = "";

    orders.forEach((order) => {

        let productsHtml = "";
    
        
        order.products.forEach((product) => {
    
            const productId = product.productId;
            let matchingItem;
    
            
            productsData.forEach((productItem) => {
                if (productId === productItem.id) {
                    matchingItem = productItem;
                }
            });

            const deliveryDate = isSatSun(dayjs(),Number(product.deliveryId));
    
            // Append product HTML to productsHtml
            productsHtml += `
                <div class="product-image-container">
                    <img src="${matchingItem.image}">
                </div>
    
                <div class="product-details">
                    <div class="product-name">
                        ${matchingItem.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${dayjs(deliveryDate).format("MMMM D")}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${product.quantity}
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>
    
                <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>`;
        });
    
        // Add the productsHtml to the main ordersHtml
        ordersHtml += `<div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div class="order-label-text">${dayjs(order.datePlaced).format("MMMM D")}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div class="order-label-text">$${centsToActual(order.totalPrice)}</div>
                    </div>
                </div>
    
                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div class="order-label-text">${order.orderId}</div>
                </div>
            </div>
    
            <div class="order-details-grid">
                ${productsHtml}
            </div>
        </div>`;
    });

    const orderGridElement = document.querySelector('.js-orders-grid');
    orderGridElement.innerHTML = ordersHtml;

}

generateOrderHtml();

