const signinForm = document.querySelector('.signin-form');

export function signinHandler(handler) {
	signinForm?.addEventListener('submit', function (e) {
		e.preventDefault();
		const formData = new FormData(this);
		const userData = Object.fromEntries(formData);
		handler(userData);
	});
}

export function userNotExist() {
	const html = '<p class="signin-message">Wrong email or password, please try again</p>';
	signinForm.insertAdjacentHTML('afterbegin', html);
}
