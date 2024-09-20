
import { getCartQuantity, 
         cart, 
         deleteFromCart, 
         updateCartQuantity, 
         updateDeliveryId 
} from '../cart.js';
import productsData from '../../data/products.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { isWeekend as isSatSun } from '../utils/date.js';
import { centsToActual } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { generatePaymentSummary } from './paymentSummary.js';


// update quantity at the top center of checkout page

export function checkoutQuantityAtCenter(){

    const quantity = getCartQuantity();

    const cartQuantityElement = document.querySelector(".js-checkout-total-items");

    cartQuantityElement.innerHTML = quantity;

}


// generate checkout items order summary html

export function generateCheckoutSummaryHTML(){

    let summaryHtml = "";

    cart.forEach((cartItem) => {

        let matchingItem;

        productsData.forEach((product) => {

            if(cartItem.productId === product.id){

                matchingItem = product;

            }

        });

        const deliveryId = cartItem.deliveryId;

        // Calling dayjs() without parameters returns a fresh Day.js object with the current date and time.
        // dayjs format doc https://day.js.org/docs/en/display/format

        const deliveryDate = isSatSun(dayjs(),Number(deliveryId));

        summaryHtml += `<div class="cart-item-container js-cart-item-container-${
        cartItem.productId
        }">
            <div class="delivery-date js-delivery-date">
            Delivery date: ${deliveryDate.format("dddd, MMMM D")}
            </div>
        
            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${matchingItem.image}">
        
            <div class="cart-item-details">
                <div class="product-name">
                ${matchingItem.name}
                </div>
                <div class="product-price">
                $${centsToActual(matchingItem.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${
                    cartItem.productId
                    }">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id=${
                    matchingItem.id
                }>
                    Update
                </span>
    
                <input placeholder="${
                    cartItem.quantity
                }" class="quantity-input js-quantity-input-${
            matchingItem.id
        }" type="number" min="0" max="100" value="${cartItem.quantity}">
                <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id=${
                    matchingItem.id
                }>Save</span>
    
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id=${
                    cartItem.productId
                }>
                    Delete
                </span>
                </div>
            </div>
            <div class="delivery-options js-delivery-options-${matchingItem.id}">
            </div>
            </div>
        </div>`

    });

    // placing in dom

    if(summaryHtml == ""){
        
        summaryHtml += `<div class="empty-cart-img">
            <img src="./images/icons/empty-cart.png">
          </div>
          <a class="shop-now-btn-div" href="index.html">
            <button class="shop-now-btn button-primary">Shop now</button>
          </a>
          `

    }

    const orderSummaryElement = document.querySelector(".js-order-summary");
    orderSummaryElement.innerHTML = summaryHtml;

}



// checkout delete button funtionality

export function deleteButton(){

    const deleteButtonElements = document.querySelectorAll(".js-delete-quantity-link");

    deleteButtonElements.forEach((button) => {

        button.addEventListener("click", () => {

            const productId = button.dataset.productId;
            deleteFromCart(productId);
            if(cart.length == 0){

                generateCheckoutSummaryHTML();

            }
            else{
                document.querySelector(`.js-cart-item-container-${productId}`).remove();
               
            }
            checkoutQuantityAtCenter();
            generatePaymentSummary();
        
        });

    });

}



// update button fucntionality

export function updateButton(){


    const updateButtonElements = document.querySelectorAll(".js-update-quantity-link");

    updateButtonElements.forEach((button) => {


        button.addEventListener("click", () => {

            const productId = button.dataset.productId;
            
            // adding styles and html related to update to that item container

            document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');

        });

    });

}


// save button fucntionality

export function saveButton(){

    const saveButtonElements = document.querySelectorAll('.js-save-quantity-link');

    saveButtonElements.forEach((button) => {

        button.addEventListener("click", () => {


            const productId = button.dataset.productId;
            const inputFieldElement = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = inputFieldElement.value;

            if(newQuantity == 0){

                deleteFromCart(productId);
                if(cart.length == 0){
                    generateCheckoutSummaryHTML();
                }
                else{
                    document.querySelector(`.js-cart-item-container-${productId}`).remove();
                }

            }
            else{

                updateCartQuantity(productId, newQuantity);
                document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${newQuantity}`;
                document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
            
            }
            checkoutQuantityAtCenter();
            generatePaymentSummary();

        });

    });



}

// generate delivery options html

export function generateDeliveryOptionsHtml(){


    cart.forEach((cartItem) => {


        const toCheckMark = cartItem.deliveryId;
        let deliveryOptionsHtml = `<div class="delivery-options-title">
            Choose a delivery option:
        </div>`;

        deliveryOptions.forEach((option) => {

            const currDate = dayjs();
            const updatedDate = isSatSun(currDate, Number(option.id)).format("dddd, MMMM D");

            let flag = false;

            if(option.id === toCheckMark){

                flag = true;

            }

            deliveryOptionsHtml += `
                    <div class="delivery-option js-delivery-option" data-product-id="${
                cartItem.productId
                }" data-delivery-id="${option.id}">
                <input type="radio" ${flag == true ? "checked" : ""}  
                class="delivery-option-input"
                name="delivery-option-${cartItem.productId}">
                <div>
                <div class="delivery-option-date">
                ${updatedDate}
                </div>
                <div class="delivery-option-price">
                    ${
                    option.priceCents === 0
                        ? "FREE "
                        : `$${centsToActual(option.priceCents)} - `
                    }Shipping 
                </div>
                </div>
            </div>`
        });

        const deliveryOptionElement = document.querySelector(`.js-delivery-options-${cartItem.productId}`);

        deliveryOptionElement.innerHTML = deliveryOptionsHtml;
        
    });

}


// choose delivery option 

export function chooseDeliveryOption(){

    const deliveryOptionsElements = document.querySelectorAll('.js-delivery-option');
    
    deliveryOptionsElements.forEach((button) => {


        button.addEventListener("click", () => {

            const {productId, deliveryId} = button.dataset;
            updateDeliveryId(productId, deliveryId);
            generateCheckoutSummaryHTML();
            generateDeliveryOptionsHtml();
            generatePaymentSummary();
            updateEvents();

        });

    });


}

export function updateEvents(){

    saveButton();
    chooseDeliveryOption();
    deleteButton();
    updateButton();
}