const cartList = document.querySelector('.cart-list');

export function addingToCartList(cart) {
	if (!cartList) return;

	cartList.innerHTML = '';

	if (cart?.length === 0) {
		console.log('cart Empty');
		const html = `<p>Your cart is empty</p>`;
		cartList.insertAdjacentHTML('afterbegin', html);
		return;
	}

	const html = `${cart
		.map(
			(cartItem) => `<li class="cart-item" data-id="${cartItem.id}">
    <div>
        <p><span>1x</span>${cartItem.itemName}</p>
        <p>$${cartItem.price}</p>
    </div>
    <div>
        <button class="cart-btn dec-cart-btn">-</button>
        <span>${cartItem.quantity}</span>
        <button class="cart-btn inc-cart-btn">+</button>
        <button class="delete-item-btn btn-cart-action">delete</button>
    </div>
</li>`
		)
		.join(' ')} <div class="cart-buttons">
        <button class="order-btn btn-cart-action">Place your order</button>
        <button class="clear-cart-btn">Clear Cart</button>
    </div>`;

	cartList.insertAdjacentHTML('afterbegin', html);
}

export function handleClearCart(handler) {
	const clearBtn = document.querySelector('.clear-cart-btn');
	clearBtn?.addEventListener('click', function () {
		handler();
	});
}

export function handleDeleteItem(handler) {
	cartList?.addEventListener('click', function (e) {
		const deleteButton = e.target.closest('.delete-item-btn');
		if (deleteButton) {
			const cartItem = deleteButton.closest('.cart-item');
			const itemId = cartItem.dataset.id;
			handler(itemId);
		}
	});
}

export function handleIncrementQuantity(handler) {
	cartList?.addEventListener('click', function (e) {
		const incrementButton = e.target.closest('.inc-cart-btn');
		if (incrementButton) {
			const cartItem = incrementButton.closest('.cart-item');
			const itemId = cartItem.dataset.id;
			handler(itemId);
		}
	});
}

export function handleDecrementQuantity(handler) {
	cartList?.addEventListener('click', function (e) {
		const decrementButton = e.target.closest('.dec-cart-btn');
		if (decrementButton) {
			const cartItem = decrementButton.closest('.cart-item');
			const itemId = cartItem.dataset.id;
			handler(itemId);
		}
	});
}
