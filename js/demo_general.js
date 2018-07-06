const scripts = [
  {text:'Please click the tabs in turn. Your task is to answer the questions on each tab. The Bayesian tree on the right colunm will help you to solve the case. You can click the probability and percentage buttons above the tree to change the representations. '},

];

var inst = document.getElementById("inst");
var currentStep = 0;

prevInst = function() {
  if (currentStep !== 0) {
    currentStep--;
    inst.innerHTML = scripts[currentStep].text;
  }
};

nextInst = function() {
  if (currentStep !== scripts.length - 1) {
    currentStep++;
    inst.innerHTML = scripts[currentStep].text;
  }
};

function init() {
  inst.innerHTML = scripts[0].text;
}

init();
