


function findAndUpdate(product, quantity) {
    const allOrder = JSON.parse(localStorage.getItem('allOrder')) || [];
    for (var i = allOrder.length - 1; i >= 0; i--) {
        if (product === allOrder[i].name) {
            allOrder[i].quantity = quantity;
            localStorage.setItem('allOrder', JSON.stringify(allOrder));
            return;
        }
    }
}
function findAndDelete(product) {
    const allOrder = JSON.parse(localStorage.getItem('allOrder')) || [];
    for (var i = allOrder.length - 1; i >= 0; i--) {
        if (product === allOrder[i].name) {
            allOrder.splice(i, 1);
            localStorage.setItem('allOrder', JSON.stringify(allOrder));
            alert(`PRODUCT: ${product} has been deleted in CART.`);
            return;
        }
    }
}

function createCartItem(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-product');

    const image = document.createElement('img');
    image.classList.add('cart-image');
    image.src = product.imageSrc;

    const name = document.createElement('div');
    name.classList.add('cart-name');
    name.innerHTML = product.name;

    const price = document.createElement('div');
    price.classList.add('cart-price');
    price.innerHTML = product.price;

    const quantityMaker = document.createElement('div');
    quantityMaker.classList.add('quantityMaker');

    const decreaseBtn = document.createElement('button');
    decreaseBtn.classList.add('quantity-btn');
    decreaseBtn.textContent = '-';
    decreaseBtn.onclick = function() {
        const quantityInput = cartItem.querySelector('.quantity-input');
        quantityInput.value = parseInt(quantityInput.value) - 1;
        if (quantityInput.value == "0") {
            document.querySelector('.cart-content .carted-items').removeChild(cartItem);
            findAndDelete(product.name);            
            return;
        }
        findAndUpdate(product.name, quantityInput.value);
    };

    const quantityInput = document.createElement('input');
    quantityInput.classList.add('quantity-input');
    quantityInput.type = 'text';
    quantityInput.value = product.quantity;
    quantityInput.readOnly = true;

    const increaseBtn = document.createElement('button');
    increaseBtn.classList.add('quantity-btn');
    increaseBtn.textContent = '+';
    increaseBtn.onclick = function() {
        const quantityInput = cartItem.querySelector('.quantity-input');
        quantityInput.value = parseInt(quantityInput.value) + 1;
        findAndUpdate(product.name, quantityInput.value);
    };

    quantityMaker.appendChild(decreaseBtn);
    quantityMaker.appendChild(quantityInput);
    quantityMaker.appendChild(increaseBtn);

    cartItem.appendChild(image);
    cartItem.appendChild(name);
    cartItem.appendChild(price);
    cartItem.appendChild(quantityMaker);

    return cartItem;
}

function addAllCartItem() {
    const allOrder = JSON.parse(localStorage.getItem('allOrder')) || [];
    const cartedItems = document.querySelector('.cart-content .carted-items');
    while (cartedItems.firstChild) {
        cartedItems.removeChild(cartedItems.firstChild);
    }
    allOrder.forEach(function(product) {
        cartedItems.appendChild(createCartItem(product));
    });
}

addAllCartItem();