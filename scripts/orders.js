import { getCartQuantity } from "./cart.js";

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





}

