const regesterForm = document.querySelector('.regester-form');

export function RegesterUserHandler(handler) {
	regesterForm?.addEventListener('submit', function (e) {
		e.preventDefault();
		const formData = new FormData(this);
		const userData = Object.fromEntries(formData);
		handler(userData);
	});
}
