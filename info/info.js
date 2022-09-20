const guideKeys = Object.keys(guides);

// select all DOM objects
const guideTitleList = document.querySelector(".guide-title-list");
const guideParagraph = document.querySelector(".guide").children[0];
const creditListDevelopers = document.querySelector(".credit-list-developers");
const creditListWallpapers = document.querySelector(".credit-list-wallpapers");
const creditListScripts = document.querySelector(".credit-list-scripts");

// dynamic render function
let createListItem = (parent, keys) => {
	parent.innerHTML = "";
	if (parent.classList.contains("guide-title-list")) {
		// construst guide titles as buttons
		for (let i in keys) {
			parent.innerHTML += `<li><button class="guide-title" data-guideid="${
				parseInt(i) + 1
			}">${keys[i]}</button></li>`;
		}
	} else {
		// display credit lists
		for (let i in keys) {
			parent.innerHTML += `<li class="credit">${keys[i]}</li>`;
		}
	}
};

// make guide title buttons
window.addEventListener("DOMContentLoaded", () => {
	// change background image
	switch_theme_tommyVersion(document.body);
	// dynamic render list items such as guide title buttons and credits
	createListItem(guideTitleList, guideKeys);
	createListItem(creditListDevelopers, creditDevelopers);
	createListItem(creditListWallpapers, creditWallpapers);
	createListItem(creditListScripts, creditScripts);
	// select from freshly rendered elements
	const guideTitles = document.querySelectorAll(".guide-title");
	// initial guide on page set to <guide 1>
	let currentViewingGuideId = 0;
	let previousViewingGuideId = 0;
	guideTitleClickHandler(
		guideTitles,
		currentViewingGuideId,
		previousViewingGuideId
	);
	// add event listener for each guide title button
	guideTitles.forEach((guideTitle) => {
		guideTitle.addEventListener("click", (e) => {
			currentViewingGuideId = guideTitle.dataset.guideid - 1;
			guideTitleClickHandler(
				guideTitles,
				currentViewingGuideId,
				previousViewingGuideId
			);
			previousViewingGuideId = currentViewingGuideId;
		});
	});
});

// handling guides, 1 - change the style of button, 2 - change the display guide
let guideTitleClickHandler = (guideTitles, current, previous) => {
	guideTitles[current].classList.add(
		"guide-title-readed",
		"guide-title-reading"
	);
	if (previous !== current) {
		guideTitles[previous].classList.remove("guide-title-reading");
	}
	// 2
	guideParagraph.innerHTML = guides[guideKeys[current]];
};

// !this is a function that has exact same purpose to switch_theme() in function.js, but the former is not a valid global function and should be updated
let switch_theme_tommyVersion = (DOMobject) => {
	DOMobject.style.backgroundImage = `url('../data/wallpapers/${
		database["themeNames"][localStorage.getItem("settings_theme")]
	}')`;
};

// adjust guide to fit
let guideGlobalContainer = document.querySelector(".guide-global-container");
let creditGlobalContainer = document.querySelector(".credit-global-container");
let fixHeight = guideGlobalContainer.offsetHeight;
guideGlobalContainer.style.height = fixHeight + "px";
creditGlobalContainer.style.height = fixHeight + "px";
