const itemList = document.querySelector('.item-list');
const searchBar = document.querySelector('.search');

export function setList(list) {
	if (!itemList) return;
	itemList.innerHTML = '';
	const html = list
		.map(
			(li) => `<li class="item-card" data-id="${li.id}">
          <div class="card-img">
            <img src="${li.img}" alt="${li.itemName}" />
          </div>
          <div class="card-details">
            <h3>${li.itemName}</h3>
            <p class="item-description">
              ${li.description}
            </p>
            <div class="card-footer">
              <p class="price">$${li.price}</p>
              <div class="buttons">
                <button class="add-to-cart-btn" title="Add to cart">
                  <svg class="card-cart-icon">
                    <use xlink:href="./src/css/imgs/sprite.svg#icon-shopping-basket"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>`
		)
		.join(' ');

	itemList?.insertAdjacentHTML('afterbegin', html);
}

export function handleSearch(handler) {
	searchBar?.addEventListener('input', function (e) {
		const value = e.target.value;
		handler(value);
	});
}

export function handleAddToCart(handler) {
	itemList?.addEventListener('click', function (e) {
		const addToCartButton = e.target.closest('.add-to-cart-btn');
		if (addToCartButton) {
			const itemCard = addToCartButton.closest('.item-card');
			const itemId = itemCard.dataset.id;
			handler(itemId);
		}
	});
}
