const header = document.querySelector('.header');

export function setHeader(isSignedIn, user) {
	header.innerHTML = '';

	const signedInHtml = `
<div class="logo"><a href="./home.html" class="home-nav">Shooping</a></div>
<a class="cart" href="./cart.html">
    <svg class="cart_icon">
        <use xlink:href="./src/css/imgs/sprite.svg#icon-shopping-basket"></use>
    </svg>
    <span class="cart-num-items">${user?.cart?.length}</span>
</a>
<div class="nav-links">
    <ul class="links">
        <li><button class="nav-link logout-nav">Log out</button></li>
    </ul>
</div>`;

	const notSignedInHtml = `
<div class="logo"><a href="./home.html" class="home-nav">Shooping</a></div>
<div class="nav-links">
    <ul class="links">
        <li><a class="nav-link sign-nav" href="./regester.html">Sign up</a></li>
        <li><a class="nav-link login-nav" href="./signin.html">Log in</a></li>
    </ul>
</div>`;

	header.insertAdjacentHTML('beforeend', isSignedIn ? signedInHtml : notSignedInHtml);
}

export function handleLogOut(handler) {
	// const logoutBtn = document.querySelector('.logout-nav');
	// logoutBtn?.addEventListener('click', function () {
	// 	console.log('logout');
	// 	handler();
	// });

	header.addEventListener('click', function (e) {
		const logoutBtn = e.target.closest('.logout-nav');
		if (logoutBtn) {
			handler();
		}
	});

	// cartList?.addEventListener('click', function (e) {
	// 	const clearButton = e.target.closest('.clear-cart-btn');
	// 	if (clearButton) {
	// 		handler();
	// 	}
	// });
}
