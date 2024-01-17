const quantityInput     = document.querySelector('.quantity-input');
const openProduct       = document.querySelector(".open-product");
const mainBox           = document.querySelector(".open-product .main-box");
const backgroundProduct = document.querySelector(".open-product .background");
const allProduct        = document.querySelectorAll(".pdiscover .product");

function backProductView() {
	document.body.style.overflowY = "auto";
	openProduct.style.zIndex      = "-1";
	openProduct.querySelector(".main-box").style.transform = "translateX(-50%) translateY(100vh)";
	backgroundProduct.style.display         = "none";
	backgroundProduct.style.backgroundColor = "#00000000";
}

backgroundProduct.addEventListener("click", backProductView);
mainBox.querySelector(".main-return").addEventListener("click", backProductView);

allProduct.forEach(e => {
	e.addEventListener("click", async () => {
		document.body.style.overflowY = "hidden";
		quantityInput.value           = "1";
		openProduct.style.zIndex      = "2";
		openProduct.querySelector(".main-box").style.transform = "translateX(-50%) translateY(0)";
		backgroundProduct.style.display         = "inline-block";
		backgroundProduct.style.backgroundColor = "#000000cc";

		const productName = e.querySelector('.product-name').textContent;
		const productPrice = e.querySelector('.product-price').textContent;
		const imgSrc = e.querySelector('img').getAttribute('src');

		mainBox.querySelector(".main-image").setAttribute("src", imgSrc);
		mainBox.querySelector(".main-name" ).textContent = productName;
		mainBox.querySelector(".main-price-container .price").textContent = productPrice;
	});
});