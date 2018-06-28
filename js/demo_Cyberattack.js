const scripts = [
  {text:'Please click the Case tab, Evidence dropdown menu and Questions in turn. Your task is to answer the questions on Questions Tab. The Bayesian tree on the right colunm will help you to solve the case. You can click the probability and percentage buttons above the tree to change the representations. Click Next after you finish reading the information. '},
  {text:'You believe that there is 33% chance that the cash was stolen. 33% is called the base rate, meaning that in general out of 1000 cases, 330 of them are theft. Please enter the base rate in the corresponding box on the tree. The box of "1 - base rate" indicates the possibility that the cash was not stolen. The numbers next to the boxes are the number of events among the population.'},
  {text:'In Case 1 Order 1 in the Case 1 Scenarios section, you received Robert\'s report on what Dan claims to have seen. So Dan is the first person to make an inference. The next step is to find Dan\'s hit rate, which means the probability that Dan\'s claim was correct given the cash was actually stolen. Please enter the hit rate in the corresponding box on the tree. The number next to the hit rate indicates the number of cases that Dan can correctly detect among all the theft cases. '},
  {text:'The miss rate next to the hit rate means the chance that Dan failed to report the theft when the cash was stolen. The miss rate will update accordingly when you update the hit rate because they add up to 1. The number next to the miss rate indicates the number of times that Dan would fail to report a theft when a theft did occur.'},
  {text:'Dan may also make a mistake reporting the cash was stolen but it actually was not. This is called a false positive (or false alarm). The false positive rate indicates the probability that Dan mistakenly reports the cash was stolen when it was not. Please enter the false positive rate in the corresponding box of the tree. The correct reject rate next to it means the probability that Dan made a correct inference that the cash is actually not stolen.'},
  {text:'Now you can get the probability that Dan\'s report was correct. That is among all the reports (it includes correct reports and incorrect ones), the number of the correct reports. You can get the probability from P(H/D) under the tree, which is called the posterior probability that Dan\'s report was correct. In the story, Dan told Robert about his thoughts. Thus, Dan\'s posterior probability became Robert\'s base rate. Robert made judgement based on what Dan had told him.' },
  {text:'Please click Robert\'s Tree tab. To calculate Robert\'s probability of making a correct inference, you need to enter Robert\'s base rate, that is Dan\'s posterior probability. Then enter Robert\'s hit rate and false positive rate at the bottom of the tree. Robert\'s posterior probability can be read from P(H/D). That is the chance you believe that the cash is actually stolen from Robert\'s report.'},
  {text:'In Case 1 Order 2, Dan and Robert swapped places. Robert became the first person to make an inference based on what he had seen. Let\'s start from Robert\'s tree. We need to calculate Robert\'s posterior probability first by entering the base rate, hit rate and false alarm rate in the tree. After getting Robert\'s posterior probability of a correct judgement, we use it as Dan\'s base rate because Dan made the inference based on what Robert told him.'},
  {text:'Please click Dan\'s Tree tab and enter the Robert\'s posterior probability as Dan\'s base rate. Then enter Dan\'s hit rate and false positive rate. The posterior probability from P(H/D) is the probability that you believe the cash was stolen based on Dan\'s report from Robert. Please use the posterior probabilities you calculated for Order 1 and Order 2 to answer the questions on Case 1 Questions tab.'},
  {text:'Please click the Case 2 dropdown menu and read Case 2, Case 2 Senarios, and Case 2 Questions in turn. Your task is to use the Bayesian tree to answer the questions on Case 2 Questions Tab.'},
  {text:'In Case 2 order 1, Brenda reports Anne\'s testimony to you. Anne\'s is the first person who made an inference. Let\'s start by calculating Anne\'s posterior probability of a correct judgement first. Please click Anne\'s tree Tab and enter the base rate, the hit rate and false positive rate in the corresponding boxes. Note that Anne\'s hit rate is 10 times more than false positive rate. You can read Anne\'s posterior probability of a correct inference from p(H/D).'},
  {text:'Please click Brenda\'s Tree Tab to calculate Brenda\'s posterior probability of a correct judgement. Brenda\'s inference was based on Anne\'s testimony, so she used Anne\'s posterior probability as her base rate. Then enter her hit rate and false positive rate to the corresponding boxes. Brenda\'s posterior probability of a correct report can be read from p(H/D).'},
  {text:'In Case 2 order 2, Anne and Brenda swapped places. Please repeat the procedures of calculating the posterior probability and make sure start from Brenda. After you calculate the posterior probabilities, please answer the questions on Case 2 Questions tab.'},
  {text:'Please click Case Comparison tab and answer the questions.'}
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
