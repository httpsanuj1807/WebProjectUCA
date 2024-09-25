// fetching orders from local storage if already exists
export let orders = JSON.parse(localStorage.getItem("orders")) || [];

//  if not exist then setting an empty array instead
function saveInLocalStorage(){

    localStorage.setItem("orders", JSON.stringify(orders));

}


export function placeOrder(cart){


    const date = new Date();
    const orderId = crypto.randomUUID();
    const products = cart;

    const newOrder = {

        orderId,
        date,
        products,

    }

    orders.unshift(newOrder);

    saveInLocalStorage();

}

function generateOrderHtml(){





}

