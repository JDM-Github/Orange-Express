
const quantityInput     = document.querySelector('.quantity-input');
const openProduct       = document.querySelector(".open-product");
const mainBox           = document.querySelector(".open-product .main-box");
const backgroundProduct = document.querySelector(".open-product .background");
let   allProduct        = document.querySelectorAll(".pdiscover .product");

function backProductView() {
	document.body.style.overflowY = "auto";
	openProduct.style.zIndex      = "-1";
	openProduct.querySelector(".main-box").style.transform = "translateX(-50%) translateY(100vh)";
	backgroundProduct.style.display         = "none";
	backgroundProduct.style.backgroundColor = "#00000000";
}

function addCartProduct() {
	const allOrder = JSON.parse(localStorage.getItem('allOrder')) || [];

	for (let i = 0; i < allOrder.length; i++) {
		if (allOrder[i].name == mainBox.querySelector(".main-name" ).textContent) {
			allOrder[i].quantity = `${parseInt(allOrder[i].quantity) + parseInt(quantityInput.value)}`;
			localStorage.setItem('allOrder', JSON.stringify(allOrder));
			alert(`PRODUCT: 0x${quantityInput.value} ${allOrder[i].name} has been added in CART.`);
			return;
		}
	}
	const productData = {
    	imageSrc: mainBox.querySelector(".main-image").getAttribute("src"),
    	name: mainBox.querySelector(".main-name" ).textContent,
    	price: mainBox.querySelector(".main-price-container .price").textContent,
    	quantity: quantityInput.value
	};
	allOrder.push(productData);
	localStorage.setItem('allOrder', JSON.stringify(allOrder));
	alert(`PRODUCT: 0x${productData.quantity} ${productData.name} has been added in CART.`);
}

backgroundProduct.addEventListener("click", backProductView);
mainBox.querySelector(".main-return").addEventListener("click", backProductView);

function addAllProductListener() {
	allProduct.forEach(e => {
		e.addEventListener("click", async () => {
			document.body.style.overflowY = "hidden";
			quantityInput.value           = "1";
			openProduct.style.zIndex      = "2";
			openProduct.querySelector(".main-box").style.transform = "translateX(-50%) translateY(0)";
			backgroundProduct.style.display         = "inline-block";
			backgroundProduct.style.backgroundColor = "#000000cc";

			const productName  = e.querySelector('.product-name').textContent;
			if (e.querySelector('.product-real-price') != null) {
				mainBox.querySelector(".main-price-container .real-price").textContent =
					e.querySelector('.product-real-price').textContent;
			}
			const productPrice = e.querySelector('.product-price').childNodes[0].textContent;
			const imgSrc       = e.querySelector('img').getAttribute('src');

			mainBox.querySelector(".main-image").setAttribute("src", imgSrc);
			mainBox.querySelector(".main-name" ).textContent = productName;
			mainBox.querySelector(".main-price-container .price").textContent = productPrice;
		});
	});
}
addAllProductListener();
