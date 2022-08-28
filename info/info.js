// this section is data section, will be link to database in future
// these are sample guides which Oscar should put in the actual guides
const guides = {
	"guide 1": "Guide 1 Paragraph",
	"guide 2": "Guide 2 Paragraph",
	"guide 3": "Guide 3 Paragraph",
	"guide 4": "Guide 4 Paragraph",
	"guide 5": "Guide 5 Paragraph",
	"guide 6": "Guide 6 Paragraph",
	"guide 7": "Guide 7 Paragraph",
	"guide 8": "Guide 8 Paragraph",
	"guide 9": "Guide 9 Paragraph",
	"guide 10": "Guide 10 Paragraph",
	"guide 11": "Guide 11 Paragraph",
	"guide 12": "Guide 12 Paragraph",
	"guide 13": "Guide 13 Paragraph",
	"guide 14": "Guide 14 Paragraph",
	"guide 15": "Guide 15 Paragraph",
	"guide 16": "Guide 16 Paragraph",
	"guide 17": "Guide 17 Paragraph",
	"guide 18": "Guide 18 Paragraph",
	"local setting":
		"Local Setting Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget mattis sapien, non ultrices dolor. Integer a urna pharetra, fermentum neque quis, consectetur mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc bibendum dolor eu efficitur scelerisque. Vestibulum metus nisl, varius in faucibus at, commodo sed justo. Etiam mi velit, tempus nec ex ac, tristique pellentesque neque. Curabitur eget laoreet sapien. Sed libero diam, commodo nec fringilla quis, condimentum sed arcu. Pellentesque viverra massa condimentum nisi gravida, quis lobortis nunc viverra. Sed suscipit nibh nec tortor lobortis, eu eleifend nisi pulvinar. Phasellus quis feugiat purus. Fusce ornare fringilla sapien sit amet blandit. Duis tincidunt pellentesque velit eget vehicula. Maecenas commodo arcu at tellus rutrum lobortis. Integer tempor orci vel leo ultricies, tincidunt sagittis nulla cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget mattis sapien, non ultrices dolor. Integer a urna pharetra, fermentum neque quis, consectetur mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc bibendum dolor eu efficitur scelerisque. Vestibulum metus nisl, varius in faucibus at, commodo sed justo. Etiam mi velit, tempus nec ex ac, tristique pellentesque neque. Curabitur eget laoreet sapien. Sed libero diam, commodo nec fringilla quis, condimentum sed arcu. Pellentesque viverra massa condimentum nisi gravida, quis lobortis nunc viverra. Sed suscipit nibh nec tortor lobortis, eu eleifend nisi pulvinar. Phasellus quis feugiat purus. Fusce ornare fringilla sapien sit amet blandit. Duis tincidunt pellentesque velit eget vehicula. Maecenas commodo arcu at tellus rutrum lobortis. Integer tempor orci vel leo ultricies, tincidunt sagittis nulla cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget mattis sapien, non ultrices dolor. Integer a urna pharetra, fermentum neque quis, consectetur mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc bibendum dolor eu efficitur scelerisque. Vestibulum metus nisl, varius in faucibus at, commodo sed justo. Etiam mi velit, tempus nec ex ac, tristique pellentesque neque. Curabitur eget laoreet sapien. Sed libero diam, commodo nec fringilla quis, condimentum sed arcu. Pellentesque viverra massa condimentum nisi gravida, quis lobortis nunc viverra. Sed suscipit nibh nec tortor lobortis, eu eleifend nisi pulvinar. Phasellus quis feugiat purus. Fusce ornare fringilla sapien sit amet blandit. Duis tincidunt pellentesque velit eget vehicula. Maecenas commodo arcu at tellus rutrum lobortis. Integer tempor orci vel leo ultricies, tincidunt sagittis nulla cursus.",
};
const guideKeys = Object.keys(guides);

// credit for Developers
const creditDevelopers = [
	"Programming, Design and Management -- Oscar Liang",
	"Programming and Design -- Tommy Chen",
];

// credit for Wallpapers
const creditWallpapers = [
	"Sunset by AxiomDesign",
	"Forest by Mikael Gustafsson",
	"Cityscape by Louis Coyle",
	"Rainy by slippypenguin",
	"Blocks by Foxerbit",
	"Paint by Foxerbit",
	"Moon by ProductAdda",
	"Valley by Foxerbit",
	"Train by nyaoayn",
];
// credit for Scripts
const creditScripts = [
	"FitText by davatron5000",
	"Js-Cookie by Michael De Boey",
];

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

let guideTitleClickHandler = (guideTitles, current, previous) => {
	guideTitles[current].classList.add(
		"guide-title-readed",
		"guide-title-reading"
	);
	if (previous !== current) {
		guideTitles[previous].classList.remove("guide-title-reading");
	}
	// 2
	guideParagraph.textContent = guides[guideKeys[current]];
};
// handling guides, 1 - change the style of button, 2 - change the display guide
