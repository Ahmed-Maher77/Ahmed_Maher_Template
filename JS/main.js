// ====================== Select Elements ======================
// Header
const subLinks = document.querySelector(".sub-links");
const otherLinksContainer = document.querySelector(".other-links");
// Stats
const statsSection = document.getElementById("stats");
const clientsStats = document.querySelector("#stats .clients-stats");
const projectsStats = document.querySelector("#stats .projects-stats");
const countriesStats = document.querySelector("#stats .countries-stats");
const revenueStats = document.querySelector("#stats .revenue-stats");
// Discount Section
const discountForm = document.getElementById("discount-form");
// Articles Section
const articlesLinks = document.querySelectorAll("#articles main figure .button");
// Features Section
const featuresLinks = document.querySelectorAll("#features article");
// Pricing Section
const choosePlanButtons = document.querySelectorAll("#pricing aside a[title='Choose Plan']");
// Events Section
const eventsSection = document.querySelector("#events");
const eventsDays = document.querySelector("#events .time .unit .event-days");
const eventsHours = document.querySelector("#events .time .unit .event-hours");
const eventsMinutes = document.querySelector("#events .time .unit .event-minutes");
const eventsSeconds = document.querySelector("#events .time .unit .event-seconds");



// ====================== Handle Header Other Links ======================
// open and close sub links
otherLinksContainer.onclick = function (e) {
	e.preventDefault();
	if (subLinks.style.display === "flex") {
		subLinks.style.display = "none";
	} else {
		subLinks.style.display = "flex";
	}
};
// close sub links when click on other links or outside of it
document.addEventListener("click", function (e) {
	if (
		!subLinks.contains(e.target) &&
		!otherLinksContainer.contains(e.target)
	) {
		subLinks.style.display = "none";
	}
});

// ====================== Handle Articles Content Popup ======================
// when click on any article link, show the article content
articlesLinks.forEach((articleLink) => {
	articleLink.addEventListener("click", function (e) {
		e.preventDefault();
		console.log(articleLink.parentElement);
		const articleImage = articleLink.parentElement.querySelector("img");
		const articleTitle = articleLink.parentElement.querySelector("h3");
		const articleContent = articleLink.parentElement.querySelector("p");
		showArticleContent(articleImage, articleTitle, articleContent);
	});
});
// show the article content in a popup
function showArticleContent(articleImage, articleTitle, articleContent) {
	const articleContentPopup = document.createElement("figure");
	const articleContentContainer = document.createElement("div");
	articleContentPopup.classList.add("article-content-popup");
	articleContentContainer.innerHTML = `
		<img src="${articleImage.src}" alt="${articleTitle.textContent}" />
		<h3>${articleTitle.textContent}</h3>
		<p>${articleContent.textContent}</p>
		<button class="close-article-content"><i class="fa-solid fa-xmark"></i></button>
	`;
	articleContentPopup.appendChild(articleContentContainer);
	document.body.appendChild(articleContentPopup);

	// Animate the container
	setTimeout(() => {
		articleContentContainer.classList.add("show");
	}, 10);

	// Add event listener to the close button after it is created
	const closeBtn = articleContentPopup.querySelector(
		".close-article-content"
	);
	closeBtn.addEventListener("click", function (e) {
		e.preventDefault();
		closeArticleContentPopup();
	});
}
// close the article content popup
function closeArticleContentPopup() {
	const articleContentPopup = document.querySelector(
		".article-content-popup"
	);
	if (articleContentPopup) {
		articleContentPopup.remove();
	}
}

// ====================== Features Section ======================
// when click on any feature section, go to my portfolio
featuresLinks.forEach((featureLink) => {
	featureLink.addEventListener("click", function (e) {
		e.preventDefault();
		window.open("https://ahmedmaher-portfolio.vercel.app/", "_blank");
	});
});

// ====================== Events Section ======================
// Countdown Timer
const targetDate = new Date("2040-07-24T12:00:00").getTime();

function updateCountdown() {
	const now = new Date().getTime();
	const diff = targetDate - now;

	if (diff <= 0) {
		eventsDays.textContent = "00";
		eventsHours.textContent = "00";
		eventsMinutes.textContent = "00";
		eventsSeconds.textContent = "00";
		clearInterval(timerInterval);
		return;
	}

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	eventsDays.textContent = days < 10 ? `0${days}` : days;
	eventsHours.textContent = hours < 10 ? `0${hours}` : hours;
	eventsMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
	eventsSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ====================== Subscribe Form ======================
const subscribeForm = document.querySelector(".subscribe form");
// when submit the form, show success message
subscribeForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const emailValue = subscribeForm.email.value;
	if (emailValue.trim() === "") {
		showErrorForm("Please enter your email");
		subscribeForm.email.focus();
		return;
	}
	showSuccessMessage("Thank you for subscribing!");
	hideErrorForm();
	subscribeForm.reset();
});



// ====================== Pricing Section: Choose Plan Success Popup ======================
choosePlanButtons.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		e.preventDefault();
		const aside = btn.closest("aside");
		if (!aside) return;

		const planName = aside.querySelector("h5")?.textContent || "";
		const planPrice =
			aside.querySelector(".price > span")?.textContent || "";
		const features = Array.from(aside.querySelectorAll("ul li")).map(
			(li) => li.textContent
		);

		let message = `<strong>Plan:</strong> ${planName}<br>`;
		message += `<strong>Price:</strong> ${planPrice}<br>`;
		message += `<strong>Features:</strong><ul style='text-align:left;'>`;
		features.forEach((f) => (message += `<li>${f}</li>`));
		message += "</ul>";

		showSuccessMessage(message);
	});
});



// ====================== Top Videos Section ======================
const topVideosLinks = document.querySelectorAll("#videos main aside ul li");
const videoPreview = document.querySelector("#videos main .preview");

topVideosLinks.forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();
		topVideosLinks.forEach((link) => {
			link.classList.remove("active");
		});
		link.classList.add("active");
		const videoTitle = link.querySelector(".video-title").textContent;
		videoPreview.querySelector("p").textContent = videoTitle;
	});
});



// ====================== Our Awesome Stats Section ======================
let clientInitialValue = 0,
	projectsInitialValue = 0,
	countriesInitialValue = 0,
	revenueInitialValue = 0;
let clientFinalValue = 200,
	projectsFinalValue = 180,
	countriesFinalValue = 30,
	revenueFinalValue = 1000000;
let statsStarted = false;

window.addEventListener("scroll", function () {
	if (!statsStarted && window.scrollY >= statsSection.offsetTop - 400) {
		statsStarted = true;
		const interval = setInterval(updateStats, 20);
		function updateStats() {
			let done = true;
			if (clientInitialValue < clientFinalValue) {
				clientInitialValue++;
				clientsStats.querySelector("p").textContent =
					clientInitialValue + "+";
				done = false;
			}
			if (projectsInitialValue < projectsFinalValue) {
				projectsInitialValue++;
				projectsStats.querySelector("p").textContent =
					projectsInitialValue;
				done = false;
			}
			if (countriesInitialValue < countriesFinalValue) {
				countriesInitialValue++;
				countriesStats.querySelector("p").textContent =
					countriesInitialValue;
				done = false;
			}
			if (revenueInitialValue < revenueFinalValue) {
				revenueInitialValue += 10000;
				if (revenueInitialValue > revenueFinalValue)
					revenueInitialValue = revenueFinalValue;
				revenueStats.querySelector("p").textContent =
					"$" + revenueInitialValue.toLocaleString();
				done = false;
			}
			if (done) clearInterval(interval);
		}
	}
});





// ====================== Discount Section ======================
// Validate Discount Form
if (discountForm) {
	const discountInputs = discountForm.querySelectorAll(
		".input-field input, .input-field textarea"
	);
	const submitBtn = discountForm.querySelector('input[type="submit"]');
	let validName = false;
	let validEmail = false;
	let validPhone = false;
	let validNeeds = false;
	let formSubmitLoading = false;

	discountInputs.forEach((input) => {
		input.addEventListener("input", handleDiscountInput);
		input.addEventListener("blur", handleDiscountInput);
	});

	function handleDiscountInput(e) {
		validateDiscountInput(
			e.target.name,
			e.target.value,
			e.target.parentElement
		);
	}

	// Submit Discount Form
	discountForm.onsubmit = (e) => {
		e.preventDefault();
		discountInputs.forEach((input) =>
			validateDiscountInput(input.name, input.value, input.parentElement)
		);
		const validForm = validName && validEmail && validPhone && validNeeds;
		if (validForm) {
			formSubmitLoading = true;
			discountFormLoading();

			const formData = {
				name: discountForm.querySelector('[name="name"]').value,
				email: discountForm.querySelector('[name="email"]').value,
				phone: discountForm.querySelector('[name="phone"]').value,
				needs: discountForm.querySelector('[name="needs"]').value,
			};
			// Show success message
			showSuccessMessage(
				"Thank you for your request! We will contact you soon."
			);

			// Clear inputs after successful submission
			discountForm.reset();
			validName = validEmail = validPhone = validNeeds = false;
			formSubmitLoading = false;
			discountFormLoading();
		}
	};

	function discountFormLoading() {
		if (formSubmitLoading) {
			submitBtn.setAttribute("disabled", true);
			submitBtn.value = "Loading...";
		} else {
			submitBtn.removeAttribute("disabled");
			submitBtn.value = "Send";
		}
	}

	function validateDiscountInput(type, value, inputField) {
		const errorSpan = inputField.querySelector(
			".invalid-input span:nth-of-type(2)"
		);
		switch (type) {
			case "name":
				if (value.trim().length === 0) {
					showError(inputField, errorSpan, "Name is required");
					validName = false;
				} else if (/^[A-Za-z][A-Za-z0-9_ ]{2,29}$/.test(value)) {
					clearError(inputField);
					validName = true;
				} else {
					showError(
						inputField,
						errorSpan,
						"Name must be 3-30 characters, start with a letter"
					);
					validName = false;
				}
				break;
			case "email":
				if (value.trim().length === 0) {
					showError(inputField, errorSpan, "Email is required");
					validEmail = false;
				} else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
					clearError(inputField);
					validEmail = true;
				} else {
					showError(
						inputField,
						errorSpan,
						"Invalid email address, ex: example@gmail.com"
					);
					validEmail = false;
				}
				break;
			case "phone":
				if (value.trim().length === 0) {
					showError(inputField, errorSpan, "Phone is required");
					validPhone = false;
				} else if (/^\+?\d{8,15}$/.test(value.replace(/\s+/g, ""))) {
					clearError(inputField);
					validPhone = true;
				} else {
					showError(
						inputField,
						errorSpan,
						"Invalid phone (8-15 digits, can start with +)"
					);
					validPhone = false;
				}
				break;
			case "needs":
				if (value.trim().length < 10) {
					showError(
						inputField,
						errorSpan,
						"Please describe your needs (min 10 chars)"
					);
					validNeeds = false;
				} else {
					clearError(inputField);
					validNeeds = true;
				}
				break;
			default:
				break;
		}
	}
}

// ======== Utility functions for input error handling ========
function showError(inputField, errorSpan, message) {
    inputField.classList.add("activeError");
    if (errorSpan) errorSpan.innerText = message;
}

function clearError(inputField) {
    inputField.classList.remove("activeError");
}






// =========================================== Helper Functions ===========================================
// ======== Manage Error Message Visibility ========
// show error message
function showErrorForm(message) {
	const errorMessage = document.querySelector(".error-message");
	errorMessage.style.display = "block";
	errorMessage.innerHTML = `<p>${message}</p>`;
}
// hide error message
function hideErrorForm() {
	const errorMessage = document.querySelector(".error-message");
	errorMessage.style.display = "none";
}

// ======== Manage Success Message Visibility ========
// show success message
function showSuccessMessage(message) {
	const parent = document.createElement("div");
	parent.classList.add("success-message-container");
	const successMessage = document.createElement("div");
	successMessage.classList.add("success-message");
	successMessage.innerHTML = `
		<i class="fa-solid fa-check"></i>
		<p>${message}</p>
		<button class="close-success-message"><i class="fa-solid fa-xmark"></i></button>
	`;
	parent.appendChild(successMessage);
	document.body.appendChild(parent);

	// Attach the event listener to the close button
	const closeBtn = parent.querySelector(".close-success-message");
	closeBtn.addEventListener("click", function (e) {
		e.preventDefault();
		closeSuccessMessage();
	});
}
// close success message
function closeSuccessMessage() {
	const successMessageContainer = document.querySelector(
		".success-message-container"
	);
	successMessageContainer.remove();
}
