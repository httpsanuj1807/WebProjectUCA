// fetching cart from local storage if already exists

export let cart = JSON.parse(localStorage.getItem("cart")) || [];



function saveInLocalStorage(){

    localStorage.setItem("cart", JSON.stringify(cart));

}


// add to cart function

export function addToCart(productId, quantity){

    // looking if the product is already in the cart
    let flag = false;

    cart.forEach((cartItem) => {

        if(cartItem.productId === productId){

            flag = true;
            cartItem.quantity += Number(quantity);

        }

    });

    // if not present then create a obj and push into cart
    if(!flag){

        const cartItem = {

            productId,
            quantity : Number(quantity),
            deliveryId : "7"

        }

        cart.push(cartItem);

    }

    // saving in cart
    saveInLocalStorage();

}



// fucntion to delete any cart item 

export function deleteFromCart(productId){

    let updatedCart = [];
    cart.forEach((cartItem) => {

        if(cartItem.productId != productId){
            updatedCart.push(cartItem);
        }

    });

    cart = updatedCart;
    saveInLocalStorage();

}   

// update cart item quantity from checkout page update button

export function updateCartQuantity(productId, newQuantity){


    cart.forEach((cartItem) => {


        if(cartItem.productId === productId){

            cartItem.quantity = Number(newQuantity);

        }

    });

    saveInLocalStorage();

}



// update delivery id of any cart item from checkout page delivery options

export function updateDeliveryId(productId, newDeliveryId){


    cart.forEach((cartItem) => {

        if(cartItem.productId === productId){


            cartItem.deliveryId = newDeliveryId;

        }

    });

    saveInLocalStorage();

}


// function to return the current total count of cart

export function getCartQuantity(){

    let count = 0;

    cart.forEach((cartItem) => {

        count += cartItem.quantity;

    });

    return count;

}