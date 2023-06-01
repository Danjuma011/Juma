const cart = document.getElementById("cart")
const logo = document.getElementById("cart-logo")
const close = document.getElementById("cancel")
logo.onclick = () => {
    cart.classList.add("active")
}

close.onclick = () => {
    cart.classList.remove("active")
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready()
}


function ready() {
    // recieve items from cart
    let removeCartButtons = document.getElementsByClassName("cart-remove")
    // console.log(removeCartButtons)
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }

    // quantity changes
    let quantityInputs = document.getElementsByClassName("cart-quantity")
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged);
    }

    // add to cart
    let addCart = document.getElementsByClassName("product-btn")
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener("click", addCartClicked);
        // console.log("clicked on add to cart")

    }

    // buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

}
// buy button
buyButtonClicked = () =>{
    alert("your order is placed");
    let cartContent = document.getElementsByClassName("cart-content")[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal()
}
// remove items from cart
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal()
}

// quantity Changes
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal()
}

// add to cart
function addCartClicked(e) {
    let button = e.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let productImage = shopProducts.getElementsByClassName("product-image")[0].src;

    addProductToCart(title, price, productImage);
    updatetotal();
    
}

function addProductToCart(title, price, productImage) {
    let cartShopBox = document.createElement("div")
    cartShopBox.classList.add("cart-box")
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for (let i = 0; i < cartItemsNames.length; i++)
        if (cartItemsNames[i].innerText == title) {
            alert("you have already added this item to cart");
            return;
        }



    let cartBoxContent = `
                       <img src="${productImage}" alt="" class="product-image">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="fa-solid fa-trash cart-remove"></i> `
    console.log(cartBoxContent)
    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

// update total 
function updatetotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0]
    let cartBoxes = cartContent.getElementsByClassName("cart-box")
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName("cart-price")[0]
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value
        total = total + price * quantity;
    }
        // IF PRICE CONTAINS SOME CENTS
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    

}