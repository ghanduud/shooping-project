export const state = {
	shoppingItems: [
		{
			id: 1,
			itemName: 'samsung A70',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
		{
			id: 2,
			itemName: 'OPPO A70',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
		{
			id: 3,
			itemName: 'Samsung A1000',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
		{
			id: 4,
			itemName: 'Nokia 990',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
		{
			id: 5,
			itemName: 'shaujg my 60',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
		{
			id: 6,
			itemName: 'Samsung A70',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
		{
			id: 7,
			itemName: 'Samsung A70',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
		{
			id: 8,
			itemName: 'Samsung A70',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
		{
			id: 9,
			itemName: 'Samsung A70',
			img: './src/css/imgs/samsungA70.jpg',
			description:
				' Good phone with a nice camer and huge nscreen have anice memory and a good storage and support all apps',
			cat: 'Phone',
			price: 10000,
			favourite: false,
		},
	],
	currentUser: {},
};

init();

export function setUserToLocalStorage(user) {
	const usersJSON = localStorage.getItem('users');
	const users = JSON.parse(usersJSON);
	const newUsers = users ? [...users, user] : [user];
	const updatedUsersJSON = JSON.stringify(newUsers);
	localStorage.setItem('users', updatedUsersJSON);
}

export function signin(user) {
	const usersJSON = localStorage.getItem('users');
	const users = JSON.parse(usersJSON);
	if (!users) return false;

	if (users) {
		const foundUser = users.find((u) => u.email === user.email);
		if (foundUser && foundUser.password === user.password) {
			const foundUserJSON = JSON.stringify(foundUser);
			localStorage.setItem('currentUser', foundUserJSON);
			return true;
		}
	}

	return false;
}

function setCurrentUser() {
	const currentUserJSON = localStorage.getItem('currentUser');
	state.currentUser = JSON.parse(currentUserJSON);
}

export function isSignedIn() {
	return state.currentUser?.email;
}

export function logout() {
	state.currentUser = {};
	const currentUserJSON = JSON.stringify(state.currentUser);
	localStorage.setItem('currentUser', currentUserJSON);
}

export function getList() {
	return state.shoppingItems;
}

export function addToTheCart(id) {
	const currentUser = state.currentUser;
	const shoppingItems = state.shoppingItems;

	const itemToAdd = shoppingItems.find((item) => item.id === Number(id));

	if (itemToAdd) {
		const isItemInCart = currentUser.cart.some((cartItem) => cartItem.id === itemToAdd.id);
		console.log(isItemInCart);

		if (!isItemInCart) {
			const cartItem = {
				itemName: itemToAdd.itemName,
				price: itemToAdd.price,
				quantity: 1,
				id: itemToAdd.id,
			};

			currentUser.cart.push(cartItem);

			const currentUserJSON = JSON.stringify(currentUser);
			localStorage.setItem('currentUser', currentUserJSON);

			const usersJSON = localStorage.getItem('users');
			const users = JSON.parse(usersJSON);
			if (users) {
				const updatedUsers = users.map((user) => {
					if (user.email === currentUser.email) {
						return currentUser;
					}
					return user;
				});
				const updatedUsersJSON = JSON.stringify(updatedUsers);
				localStorage.setItem('users', updatedUsersJSON);
			}
		}
	}
}

export function getCurrentUser() {
	return state.currentUser;
}

export function getCurrentUserCart() {
	return state.currentUser.cart;
}

export function clearCart() {
	const currentUser = state.currentUser;
	currentUser.cart = []; // Clear the cart by assigning an empty array

	const currentUserJSON = JSON.stringify(currentUser);
	localStorage.setItem('currentUser', currentUserJSON);

	const usersJSON = localStorage.getItem('users');
	const users = JSON.parse(usersJSON);
	if (users) {
		const updatedUsers = users.map((user) => {
			if (user.email === currentUser.email) {
				return currentUser;
			}
			return user;
		});
		const updatedUsersJSON = JSON.stringify(updatedUsers);
		localStorage.setItem('users', updatedUsersJSON);
	}
}

export function deleteItemFromCart(id) {
	const currentUser = state.currentUser;

	const itemIndex = currentUser.cart.findIndex((item) => item.id === Number(id));

	if (itemIndex !== -1) {
		currentUser.cart.splice(itemIndex, 1);

		const currentUserJSON = JSON.stringify(currentUser);
		localStorage.setItem('currentUser', currentUserJSON);

		const usersJSON = localStorage.getItem('users');
		const users = JSON.parse(usersJSON);
		if (users) {
			const updatedUsers = users.map((user) => {
				if (user.email === currentUser.email) {
					return currentUser;
				}
				return user;
			});
			const updatedUsersJSON = JSON.stringify(updatedUsers);
			localStorage.setItem('users', updatedUsersJSON);
		}
	}
}

export function incrementQuantity(id) {
	const currentUser = state.currentUser;
	const cartItem = currentUser.cart.find((item) => item.id === Number(id));

	if (cartItem) {
		cartItem.quantity += 1;

		const currentUserJSON = JSON.stringify(currentUser);
		localStorage.setItem('currentUser', currentUserJSON);

		const usersJSON = localStorage.getItem('users');
		const users = JSON.parse(usersJSON);
		if (users) {
			const updatedUsers = users.map((user) => {
				if (user.email === currentUser.email) {
					return currentUser;
				}
				return user;
			});
			const updatedUsersJSON = JSON.stringify(updatedUsers);
			localStorage.setItem('users', updatedUsersJSON);
		}
	}
}

export function decrementQuantity(id) {
	const currentUser = state.currentUser;
	const cartItem = currentUser.cart.find((item) => item.id === Number(id));

	if (cartItem) {
		if (cartItem.quantity > 1) {
			cartItem.quantity -= 1;
		} else {
			const itemIndex = currentUser.cart.findIndex((item) => item.id === Number(id));
			currentUser.cart.splice(itemIndex, 1);
		}

		const currentUserJSON = JSON.stringify(currentUser);
		localStorage.setItem('currentUser', currentUserJSON);

		const usersJSON = localStorage.getItem('users');
		const users = JSON.parse(usersJSON);
		if (users) {
			const updatedUsers = users.map((user) => {
				if (user.email === currentUser.email) {
					return currentUser;
				}
				return user;
			});
			const updatedUsersJSON = JSON.stringify(updatedUsers);
			localStorage.setItem('users', updatedUsersJSON);
		}
	}
}

function init() {
	setCurrentUser();
}
