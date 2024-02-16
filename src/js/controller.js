import * as model from './model.js';
import * as regesterView from './view/regesterView.js';
import * as signinView from './view/signinView.js';
import * as headerView from './view/headerView.js';
import * as homeView from './view/homeView.js';
import * as cartView from './view/cartView.js';

init();

function controlSignin(user) {
	const userExist = model.signin(user);
	if (!userExist) {
		signinView.userNotExist();
		return;
	}
	window.location.href = 'home.html';
}

function controlRegister(user) {
	if (!user) return;
	const userData = { ...user, cart: [] };
	model.setUserToLocalStorage(userData);
	window.location.href = 'signin.html';
}

function controlLogout() {
	model.logout();
	headerView.setHeader(model.isSignedIn());
	window.location.href = 'home.html';
}

function controlSearch(search) {
	const list = model.getList();
	const searchTerm = search.toLowerCase();
	const filteredList = list.filter((item) => {
		return item.itemName.toLowerCase().includes(searchTerm);
	});
	homeView.setList(filteredList);
}

function controlAddToTheCart(id) {
	if (!model.isSignedIn()) window.location.href = 'signin.html';
	model.addToTheCart(id);
	headerView.setHeader(model.isSignedIn(), model.getCurrentUser());
}

function controlClearCart() {
	model.clearCart();
	cartView.addingToCartList(model.getCurrentUserCart());
	headerView.setHeader(model.isSignedIn(), model.getCurrentUser());
}

function controlDeleteItemFromCart(id) {
	model.deleteItemFromCart(id);
	cartView.addingToCartList(model.getCurrentUserCart());
	headerView.setHeader(model.isSignedIn(), model.getCurrentUser());
}

function controlIncrementQuantity(id) {
	model.incrementQuantity(id);
	cartView.addingToCartList(model.getCurrentUserCart());
	headerView.setHeader(model.isSignedIn(), model.getCurrentUser());
}

function controlDecrementQuantity(id) {
	model.decrementQuantity(id);
	cartView.addingToCartList(model.getCurrentUserCart());
	headerView.setHeader(model.isSignedIn(), model.getCurrentUser());
}

function init() {
	headerView.setHeader(model.isSignedIn(), model.getCurrentUser());
	headerView.handleLogOut(controlLogout);
	regesterView.RegesterUserHandler(controlRegister);
	signinView.signinHandler(controlSignin);
	homeView.setList(model.getList());
	homeView.handleSearch(controlSearch);
	homeView.handleAddToCart(controlAddToTheCart);
	cartView.addingToCartList(model.getCurrentUserCart());
	cartView.handleClearCart(controlClearCart);
	cartView.handleDeleteItem(controlDeleteItemFromCart);
	cartView.handleIncrementQuantity(controlIncrementQuantity);
	cartView.handleDecrementQuantity(controlDecrementQuantity);
}
