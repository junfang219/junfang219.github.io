//get evidence dropdown menu
let caseB = document.querySelector("#navCase");

let evidenceDropdown = document.querySelector("#evidence");
let evidencesB =  document.querySelector("#navevidences");
let evidences1B = document.querySelector("#navevidence1");
let evidences2B = document.querySelector("#navevidence2");
let evidences3B = document.querySelector("#navevidence3");
let evidences4B = document.querySelector("#navevidence4");
let evidences5B = document.querySelector("#navevidence5");

let questionsB = document.querySelector("#navQuestions");

//get content
let content = document.querySelector(".dropdown-content");

let caseC = document.querySelector("#Case");

let evidencesC  = document.querySelector("#evidencesC");
let evidences1C = document.querySelector("#evidence1");
let evidences2C = document.querySelector("#evidence2");
let evidences3C = document.querySelector("#evidence3");
let evidences4C = document.querySelector("#evidence4");
let evidences5C = document.querySelector("#evidence5");

let questionsC = document.querySelector("#Questions");

// B1 change content when click accordingly

caseB.addEventListener("click", function() {
	content.innerHTML = caseC.innerHTML;
	content.style.cssText = "overflow:scroll";
	caseB.style.cssText = "border:1px solid lightgrey";
	evidenceDropdown.style.cssText = "border:none;";
	questionsB.style.cssText = "border:none;";

})

evidencesB.addEventListener("click", function() {
	evidenceDropdown.innerHTML = "List of  evidence resources";
	evidenceDropdown.style.cssText = "border:1px solid lightgrey";
	content.innerHTML = evidencesC.innerHTML;
	caseB.style.cssText = "border:none";
	questionsB.style.cssText = "border:none;";

});

questionsB.addEventListener("click", function() {
	content.innerHTML = questionsC.innerHTML;
	content.style.cssText = "overflow:scroll";
	questionsB.style.cssText = "border:1px solid lightgrey";
	evidenceDropdown.style.cssText = "border:none;";
	caseB.style.cssText = "border:none";
});

evidences1B.addEventListener("click", function() {
	evidenceDropdown.innerHTML = "Evidence 1";
	content.innerHTML = evidences1C.innerHTML;
	evidenceDropdown.style.cssText = "border:1px solid lightgrey";
	caseB.style.cssText = "border:none";
	questionsB.style.cssText = "border:none;";

});

evidences2B.addEventListener("click", function() {
	evidenceDropdown.innerHTML = "Evidence 2";
	content.innerHTML = evidences2C.innerHTML;
	evidenceDropdown.style.cssText = "border:1px solid lightgrey";
	caseB.style.cssText = "border:none";
	questionsB.style.cssText = "border:none;";

});

evidences3B.addEventListener("click", function() {
	evidenceDropdown.innerHTML = "Evidence 3";
	content.innerHTML = evidences3C.innerHTML;
	evidenceDropdown.style.cssText = "border:1px solid lightgrey";
	caseB.style.cssText = "border:none";
	questionsB.style.cssText = "border:none;";

});

evidences4B.addEventListener("click", function() {
	evidenceDropdown.innerHTML = "Evidence 4";
	content.innerHTML = evidences4C.innerHTML;
	content.style.cssText = "overflow:scroll";
	evidenceDropdown.style.cssText = "border:1px solid lightgrey";
	caseB.style.cssText = "border:none";
	questionsB.style.cssText = "border:none;";

});

evidences5B.addEventListener("click", function() {
	evidenceDropdown.innerHTML = "Evidence 5";
	content.innerHTML = evidences5C.innerHTML;
	content.style.cssText = "overflow:scroll";
	evidenceDropdown.style.cssText = "border:1px solid lightgrey";
	caseB.style.cssText = "border:none";
	questionsB.style.cssText = "border:none;";

});

// c1sNav.addEventListener("click", function() {
// 	c1buttom.innerHTML = "Case 1 Senarios";
// 	content.innerHTML = c1sContent.innerHTML;
// 	c1buttom.style.cssText = "border:1px solid lightgrey";
// 	c2buttom.style.cssText = "border:none";
// 	ccNav.style.border="none";
	
// });

// c1qNav.addEventListener("click", function() {
// 	c1buttom.innerHTML = "Case 1 Questions";
// 	content.innerHTML = c1qContent.innerHTML;
// 	c1buttom.style.cssText = "border:1px solid lightgrey";
// 	c2buttom.style.cssText = "border:none";
// 	ccNav.style.border="none";
// })

// //B2 change content when click accordingly

// c2Nav.addEventListener("click", function() {
// 	c2buttom.innerHTML = "Case 2";
// 	content.innerHTML = c2Content.innerHTML;
// 	c2buttom.style.cssText = "border:1px solid lightgrey";
// 	c1buttom.style.cssText = "border:none";
// 	ccNav.style.border="none";
// });

// c2sNav.addEventListener("click", function() {
// 	c2buttom.innerHTML = "Case 2 Senarios";
// 	content.innerHTML = c2sContent.innerHTML;
// 	c2buttom.style.cssText = "border:1px solid lightgrey";
// 	c1buttom.style.cssText = "border:none";
// 	ccNav.style.border="none";
// });

// c2qNav.addEventListener("click", function() {
// 	c2buttom.innerHTML = "Case 2 Questions";
// 	content.innerHTML = c2qContent.innerHTML;
// 	c2buttom.style.cssText = "border:1px solid lightgrey";
// 	c1buttom.style.cssText = "border:none";
// 	ccNav.style.border="none";
// });


// //B3

// ccNav.addEventListener("click", function() {
// 	content.innerHTML = ccContent.innerHTML;
// 	ccNav.style.cssText = "border:1px solid lightgrey";
// 	c1buttom.style.cssText = "border:none";
// 	c2buttom.style.cssText = "border:none";
// })