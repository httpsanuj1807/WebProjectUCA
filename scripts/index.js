import productsData from "../data/products.js";
import { addToCart, getCartQuantity } from "./cart.js";
import { centsToActual } from "./utils/money.js";


// refresh quantity on load
updateCartQuantity();
searchButtonFunctionality();

// generating products HTML to show products on page

function searchButtonFunctionality(){

    const searchButtonElement = document.querySelector('.js-search-btn');
    const searchInputElement = document.querySelector('.js-search-bar');
    
    const handleSearch = () => {

        const searchQuery = searchInputElement.value.toLowerCase();

        // If searchQuery is empty, show all products
        if (searchQuery === "") {

            generateProductHtml(productsData);

        } else {
            

            let filteredProducts = productsData.filter((product) => {
                return (
                    product.name.toLowerCase().includes(searchQuery) || 
                    product.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery))
                );
            });

            // Render filtered products
            generateProductHtml(filteredProducts);

        }

    }

    searchButtonElement.addEventListener("click", handleSearch);
    searchInputElement.addEventListener("keyup", handleSearch);

}


function generateProductHtml(productsToRender){

    let html = "";
    productsToRender.forEach((product) => {

    html+=`<div class="product-container">
    <div class="product-image-container">
    <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
    ${product.name}
    </div>

    <div class="product-rating-container">
    <img class="product-rating-stars"
        src="images/ratings/rating${product.rating.stars * 10}.png">
    <div class="product-rating-count link-primary">
        ${product.rating.count}
    </div>
    </div>

    <div class="product-price">
    $${centsToActual(product.priceCents)}
    </div>

    <div class="product-quantity-container">
    <select class="js-select-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
    <img src="images/icons/checkmark.png">
    Added
    </div>

    <button class="add-to-cart-button js-add-to-cart-button button-primary" data-product-id=${
        product.id
    }>
    Add to Cart
    </button>
    </div>`

    });

    if(productsToRender.length == 0){
        
        html+= `<div style="width : 100vw; text-align:center; padding-top:15px;">
          <img src="/images/icons/sorry.png" />
        <p style="margin-top: 10px;">
          No items matched your search query. Try searching different
      </p>
        </div>`

    }

    const productsGridElement = document.querySelector('.js-products-grid');
    productsGridElement.innerHTML = html;

    addToCartButtons();

}


// add to cart button functionality


function addToCartButtons(){

    
    const addToCartButtonElements = document.querySelectorAll(".js-add-to-cart-button");

    addToCartButtonElements.forEach((button) => {

        button.addEventListener("click", () => {

            // get the product id of the click product
            const productId = button.dataset.productId;

            // get the select value of the click select element using the productID
            const selectElement = document.querySelector(`.js-select-${productId}`);

            const quantity = selectElement.value;

            // add 'added to cart image'

            const addImgElement = document.querySelector(`.js-added-to-cart-${productId}`);

            // adding class for opacity 1

            addImgElement.classList.add('js-added-to-cart');

            // placing a timer to remove added image

            const myTimeout = setTimeout(() => {

                addImgElement.classList.remove('js-added-to-cart');

            }, 2000);

            addToCart(productId, quantity);
            updateCartQuantity();

        });

    });

}

// refresh quantity after getting it from cart 

function updateCartQuantity(){

    const quantity = getCartQuantity();
    const quantityElement = document.querySelector(".js-cart-quantity");
    quantityElement.innerHTML = quantity;

}



// initial load -> Display all products
generateProductHtml(productsData);