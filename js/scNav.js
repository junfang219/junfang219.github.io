//get dropdowm menu
let c1buttom = document.querySelector("#case1Drop");
let c1Nav = document.querySelector("#navCase1");
let c1sNav = document.querySelector("#navCase1S");
let c1qNav = document.querySelector("#navCase1Q");

let c2buttom = document.querySelector("#case2Drop");
let c2Nav = document.querySelector("#navCase2");
let c2sNav = document.querySelector("#navCase2S");
let c2qNav = document.querySelector("#navCase2Q");

let ccNav = document.querySelector("#navCC");
//get content
let content = document.querySelector(".dropdown-content");
let c1Content = document.querySelector("#Case1");
let c1sContent = document.querySelector("#Case1S");
let c1qContent = document.querySelector("#Case1Q");

let c2Content = document.querySelector("#Case2");
let c2sContent = document.querySelector("#Case2S");
let c2qContent = document.querySelector("#Case2Q");

let ccContent = document.querySelector("#CaseComparison");

// B1 change content when click accordingly


c1Nav.addEventListener("click", function() {
	c1buttom.innerHTML = "Case 1";
	content.innerHTML = c1Content.innerHTML;
	c1buttom.style.cssText = "border:1px solid lightgrey";
	c2buttom.style.cssText = "border:none";
	ccNav.style.border="none";
});

c1sNav.addEventListener("click", function() {
	c1buttom.innerHTML = "Case 1 Senarios";
	content.innerHTML = c1sContent.innerHTML;
	c1buttom.style.cssText = "border:1px solid lightgrey";
	c2buttom.style.cssText = "border:none";
	ccNav.style.border="none";
	
});

c1qNav.addEventListener("click", function() {
	c1buttom.innerHTML = "Case 1 Questions";
	content.innerHTML = c1qContent.innerHTML;
	c1buttom.style.cssText = "border:1px solid lightgrey";
	c2buttom.style.cssText = "border:none";
	ccNav.style.border="none";
})

//B2 change content when click accordingly

c2Nav.addEventListener("click", function() {
	c2buttom.innerHTML = "Case 2";
	content.innerHTML = c2Content.innerHTML;
	c2buttom.style.cssText = "border:1px solid lightgrey";
	c1buttom.style.cssText = "border:none";
	ccNav.style.border="none";
});

c2sNav.addEventListener("click", function() {
	c2buttom.innerHTML = "Case 2 Senarios";
	content.innerHTML = c2sContent.innerHTML;
	c2buttom.style.cssText = "border:1px solid lightgrey";
	c1buttom.style.cssText = "border:none";
	ccNav.style.border="none";
});

c2qNav.addEventListener("click", function() {
	c2buttom.innerHTML = "Case 2 Questions";
	content.innerHTML = c2qContent.innerHTML;
	c2buttom.style.cssText = "border:1px solid lightgrey";
	c1buttom.style.cssText = "border:none";
	ccNav.style.border="none";
});


//B3

ccNav.addEventListener("click", function() {
	content.innerHTML = ccContent.innerHTML;
	ccNav.style.cssText = "border:1px solid lightgrey";
	c1buttom.style.cssText = "border:none";
	c2buttom.style.cssText = "border:none";
})