//get all tab1 elements
let BT = document.querySelector("#BT");

let cue1 = document.querySelector("#cue1");
let cue1v3 = document.querySelector("#c1v3");
let h3 = document.querySelector("#h3");
let cue2 = document.querySelector("#c2");
let cue3 = document.querySelector("#c3");

// get html elements for tab1
let content = document.querySelector(".dropdown-content");

let cue1Content = document.querySelector("#cue1C");
let cue1v3Content = document.querySelector("#c1v3C");
let h3Content = document.querySelector("#h3C");
let cue2Content = document.querySelector("#c2C");
let cue3Content = document.querySelector("#c3C");

cue1.addEventListener("click", function() {
	BT.innerHTML = "Basic Task";
	content.innerHTML = cue1Content.innerHTML;
	BT.style.cssText = "border:1px solid lightgrey";
	SC.style.cssText = "border:none";
	BS.style.border="none";
});

cue1v3.addEventListener("click", function() {
	BT.innerHTML = "1 cue 3 values";
	content.innerHTML = cue1v3Content.innerHTML;
	BT.style.cssText = "border:1px solid lightgrey";
	SC.style.cssText = "border:none";
	BS.style.border="none";
});

h3.addEventListener("click", function() {
	BT.innerHTML = "3 hypotheses";
	content.innerHTML = h3Content.innerHTML;
	BT.style.cssText = "border:1px solid lightgrey";
	SC.style.cssText = "border:none";
	BS.style.border="none";
});

cue2.addEventListener("click", function() {
	BT.innerHTML = "2 cues";
	content.innerHTML = cue2Content.innerHTML;
	BT.style.cssText = "border:1px solid lightgrey";
	SC.style.cssText = "border:none";
	BS.style.border="none";
});

cue3.addEventListener("click", function() {
	BT.innerHTML = "3 cues";
	content.innerHTML = cue3Content.innerHTML;
	BT.style.cssText = "border:1px solid lightgrey";
	SC.style.cssText = "border:none";
	BS.style.border="none";
});



//get tab 2 elements

let SC = document.querySelector("#SC");

let case1 = document.querySelector("#SC1");
let c1sNav = document.querySelector("#SC1S");
let c1qNav = document.querySelector("#SC1Q");

let case2 = document.querySelector("#SC2");
let c2sNav = document.querySelector("#SC2S");
let c2qNav = document.querySelector("#SC2Q");

let ccNav = document.querySelector("#Ncc");


//get content for tab 2
let c1Content = document.querySelector("#Case1");
let c1sContent = document.querySelector("#Case1S");
let c1qContent = document.querySelector("#Case1Q");

let c2Content = document.querySelector("#Case2");
let c2sContent = document.querySelector("#Case2S");
let c2qContent = document.querySelector("#Case2Q");

let ccContent = document.querySelector("#CaseComparison");

case1.addEventListener("click", function() {
	SC.innerHTML = "Stolen Cash Case";
	content.innerHTML = c1Content.innerHTML;
	SC.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none";
	BS.style.border="none";
});

c1sNav.addEventListener("click", function() {
	SC.innerHTML = "Case 1 Scenarios";
	content.innerHTML = c1sContent.innerHTML;
	SC.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none";
	BS.style.border="none";
});

c1qNav.addEventListener("click", function() {
	SC.innerHTML = "Case 1 Questions";
	content.innerHTML = c1qContent.innerHTML;
	SC.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none";
	BS.style.border="none";
});

case2.addEventListener("click", function() {
	SC.innerHTML = "Case 2";
	content.innerHTML = c2Content.innerHTML;
	SC.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none";
	BS.style.border="none";
});

c2sNav.addEventListener("click", function() {
	SC.innerHTML = "Case 2 Scenarios";
	content.innerHTML = c2sContent.innerHTML;
	SC.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none";
	BS.style.border="none";
});

c2qNav.addEventListener("click", function() {
	SC.innerHTML = "Case 2 Questions";
	content.innerHTML = c1qContent.innerHTML;
	SC.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none";
	BS.style.border="none";
});

ccNav.addEventListener("click", function() {
	SC.innerHTML = "Case Comparison";
	content.innerHTML = ccContent.innerHTML;
	SC.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none";
	BS.style.border="none";
});

// get tab 3 elements

let BS = document.querySelector("#BS");

let BScase = document.querySelector("#navBS");
let evidencesB =  document.querySelector("#navevidences");
let evidences1B = document.querySelector("#navevidence1");
let evidences2B = document.querySelector("#navevidence2");
let evidences3B = document.querySelector("#navevidence3");
let evidences4B = document.querySelector("#navevidence4");
let evidences5B = document.querySelector("#navevidence5");
let questionsB = document.querySelector("#navquestions");

// contents for tab 3

let BScaseC = document.querySelector("#BScase");

let evidencesC  = document.querySelector("#evidencesC");
let evidences1C = document.querySelector("#evidence1");
let evidences2C = document.querySelector("#evidence2");
let evidences3C = document.querySelector("#evidence3");
let evidences4C = document.querySelector("#evidence4");
let evidences5C = document.querySelector("#evidence5");

let questionsC = document.querySelector("#BSQuestions");

BScase.addEventListener("click", function() {
	BS.innerHTML = "Black Site Surveillance";
	content.innerHTML = BScaseC.innerHTML;
	BS.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none;";
	SC.style.cssText = "border:none;";

})

evidencesB.addEventListener("click", function() {
	BS.innerHTML = "List of sources";
	BS.style.cssText = "border:1px solid lightgrey";
	content.innerHTML = evidencesC.innerHTML;
	BT.style.cssText = "border:none;";
	SC.style.cssText = "border:none;";

});

questionsB.addEventListener("click", function() {
	BS.innerHTML = "Questions";
	content.innerHTML = questionsC.innerHTML;
	//content.style.cssText = "overflow:scroll";
	questionsB.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none;";
	SC.style.cssText = "border:none;";
});

evidences1B.addEventListener("click", function() {
	BS.innerHTML = "Evidence 1";
	content.innerHTML = evidences1C.innerHTML;
	BS.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none;";
	SC.style.cssText = "border:none;";

});

evidences2B.addEventListener("click", function() {
	BS.innerHTML = "Evidence 2";
	content.innerHTML = evidences2C.innerHTML;
	BS.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none;";
	SC.style.cssText = "border:none;";

});

evidences3B.addEventListener("click", function() {
	BS.innerHTML = "Evidence 3";
	content.innerHTML = evidences3C.innerHTML;
	BS.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none;";
	SC.style.cssText = "border:none;";

});

evidences4B.addEventListener("click", function() {
	BS.innerHTML = "Evidence 4";
	content.innerHTML = evidences4C.innerHTML;
	BS.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none;";
	SC.style.cssText = "border:none;";

});

evidences5B.addEventListener("click", function() {
	BS.innerHTML = "Evidence 5";
	content.innerHTML = evidences5C.innerHTML;
	BS.style.cssText = "border:1px solid lightgrey";
	BT.style.cssText = "border:none;";
	SC.style.cssText = "border:none;";

});

