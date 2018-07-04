// Connect nav tabs with its tree HTML
const tabTree = {
	"E1tab": "E1Tree",
	"E2tab": "E2Tree",
	"E3tab": "E3Tree",
	"E4tab": "E4Tree",
	"E5tab": "E5Tree",
}

const ACTIVATED_BUTTON_CLASS = "active1";



// Function that selects tree for a tab
let selectTree = function() {
	let tree = document.getElementById(tabTree[this.id]);
	let treeDiv;
	
	if (tree.id == "E1Tree") {
		let main = tree.firstElementChild;

		// Declare input
		let baseRate;
		let nbaseRate;
		let hitRate;
		let missRate;
		let faRate;
		let crRate;

		// Declare tree output
		let popOutput;
		let baseOutput;
		let noiseOutput;

		let hit;
		let miss;
		let falseAlarm;
		let correctReject;

		// Probability div output
		let results;
		let hitResult_sup;
		let hitResult_bottom;
		let falseAlarmResult;

		//Probability & Percentage btn
		let probability;
		let percentage;

		// check probability or percentage
		let isProb = true;


		// Get input and output from DOM
		for (let i = 0; i < main.children.length; i++) {
			let currChild = main.children[i];
			if (currChild.className == "tree") {
				treeDiv = currChild;
				for (let j = 0; j < treeDiv.children.length; j++) {	
					
					let childClass = treeDiv.children[j].className;
	    			if (treeDiv.children[j].classList.contains('probability')) {
						probability = treeDiv.children[j];
					}
					else if (treeDiv.children[j].classList.contains('percentage')) {
						percentage = treeDiv.children[j]; 
					}
					else if (childClass == "pop_number") {
						popOutput = treeDiv.children[j];
					}
					else if (childClass == "baseRate") {
						baseRate = treeDiv.children[j];	
					}
					else if (childClass == "base") {
						baseOutput = treeDiv.children[j];
					}
					else if (childClass == "nbaseRate") {
						nbaseRate = treeDiv.children[j];
					}
					else if (childClass == "noise") {
						noiseOutput = treeDiv.children[j];
					}
					else if (childClass == "bottom") {
						
						let bottomDiv = treeDiv.children[j];

						for (let jj = 0; jj < bottomDiv.children.length; jj++) {
							
							let bottomDivClass = bottomDiv.children[jj].className;
							if (bottomDivClass == "hitRate") {
								hitRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "hit") {
								hit = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "missRate") {
								missRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "miss") {
								miss = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "faRate") {
								faRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "fa") {
								falseAlarm = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "crRate") {
								crRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "cr") {
								correctReject = bottomDiv.children[jj];
							}
						}
					}
					else if (childClass == "probability1") {

						let probDiv = treeDiv.children[j];

						for (let jjj = 0; jjj < probDiv.children.length; jjj++) {
							
							let probDivClass = probDiv.children[jjj].className;
							if (probDivClass == "innerProb") {

								let innerProbDiv = probDiv.children[jjj];

								for (let jjjj = 0; jjjj < innerProbDiv.children.length; jjjj++) {
									
									let innerProbClass = innerProbDiv.children[jjjj].className;

									if (innerProbClass == "hitResult prob_sup") {
										hitResult_sup = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "hitResult prob_bottom") {
										hitResult_bottom = innerProbDiv.children[jjjj];

									}
									else if (innerProbClass == "faResult prob_bottom") {
										falseAlarmResult = innerProbDiv.children[jjjj];						
									}
								}
							}
							else if (probDivClass == "results") {
								results = probDiv.children[jjj];
							}
							
						}
					}
					
				}
			}	
	    } 

	    function probPercToggle(event) {
	    	// If the same button is clicked, do nothing
	    	if (event.target.classList.contains(ACTIVATED_BUTTON_CLASS)) {
	    		return;
	    	}

			let probActive = probability.classList.contains(ACTIVATED_BUTTON_CLASS);
			if (probActive) {
				probability.className = probability.className.replace(" " + ACTIVATED_BUTTON_CLASS, "");
				percentage.className += " " + ACTIVATED_BUTTON_CLASS;
			} else {
				percentage.className = percentage.className.replace(" " + ACTIVATED_BUTTON_CLASS, "");
				probability.className += " " + ACTIVATED_BUTTON_CLASS;
			}
		}

		//output initilization
		function OutputInitialize() {
			 //Tree
			 popOutput.innerHTML = 1000;
			 baseOutput.innerHTML = 500;
			 noiseOutput.innerHTML = 500;

			 hit.innerHTML = 250;
			 miss.innerHTML = 250;
			 falseAlarm.innerHTML= 250;
			 correctReject.innerHTML = 250;

			 // equation result
			 hitResult_sup.innerHTML = 250;
			 hitResult_bottom.innerHTML = 250;
			 falseAlarmResult.innerHTML = 250;
			 
		}
	  		
	  	probability.addEventListener("click", function(e) {
	  		 // initialize input values
	  		 isProb = true;
			 baseRate.value = 0.5;
			 nbaseRate.value = 0.5;
			 hitRate.value = 0.5;
			 missRate.value = 0.5;
			 faRate.value = 0.5;
			 crRate.value = 0.5;

			 results.innerHTML = 0.5;

			 probPercToggle(e);
			 OutputInitialize();
	  	});

	  	percentage.addEventListener("click", function(e) {
	  		 isProb = false;
			 baseRate.value = 50;
			 nbaseRate.value = 50;
			 hitRate.value = 50;
			 missRate.value = 50;
			 faRate.value = 50;
			 crRate.value = 50;

			 results.innerHTML = 50+'%';

			 probPercToggle(e);
			 OutputInitialize();

	  	});

	    baseRate.addEventListener("change", changeEventHandler);
		nbaseRate.addEventListener("change", changeEventHandler);
		hitRate.addEventListener("change", changeEventHandler);
		missRate.addEventListener("change", changeEventHandler);
		faRate.addEventListener("change", changeEventHandler);
		crRate.addEventListener("change", changeEventHandler);


		function changeEventHandler(event) {
			let one, targetValue, result;

			// probability
			if (isProb) {
				if (event.target.value < 0 || event.target.value > 1) {	
					alert("Please enter probability between 0 and 1");
					return;
				}

				one = new Decimal(1);
				targetValue = new Decimal(event.target.value);
				result = one.minus(targetValue);

				if (event.target.className == "baseRate") {
					nbaseRate.value = result.toPrecision(4);
				} else if (event.target.className == "nbaseRate") {
					baseRate.value = result.toPrecision(4);
				} else if (event.target.className == "hitRate") {
					missRate.value = result.toPrecision(4);
				} else if (event.target.className == "missRate") {
					hitRate.value = result.toPrecision(4);
				} else if (event.target.className == "faRate") {
					crRate.value = result.toPrecision(4);
				} else if (event.target.className == "crRate") {
					faRate.value = result.toPrecision(4);
				}

				let nb = new Decimal(nbaseRate.value);
				let h = new Decimal(hitRate.value);
				let b = new Decimal(baseRate.value);
				let m = new Decimal(missRate.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);

				let fhit = h.times(b);
				let fmiss = m.times(b);
				let ffa = fa.times(nb);
				let fcr = cr.times(nb);

				// Results
				let f_max = max_factor(fhit,fmiss,ffa,fcr);
				let popOutputTreeResult= f_max;
				let baseOutputTreeResult = f_max.times(b);
				let noiseOutputTreeResult = f_max.times(nb);		

				let hitTreeResult = (f_max.times(b)).times(h);
				let missTreeResult = (f_max.times(b)).times(m);
				let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);

				// assigned values for tree output
				popOutput.innerHTML = popOutputTreeResult.toNumber();
				baseOutput.innerHTML = baseOutputTreeResult.toNumber();
				noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				hit.innerHTML = hitTreeResult.toNumber();
				miss.innerHTML = missTreeResult.toNumber();
				falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				correctReject.innerHTML = corretRejectTreeResult.toNumber();


				// assigned values for the equation
				hitResult_sup.innerHTML = hitTreeResult.toNumber();
				hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).toNumber().toPrecision(3);


			} else {
			
				//Percentage

				if (event.target.value < 0 || event.target.value > 100) {	
				alert("Please enter percentage between 0 and 100");
				return;
				}
				result = new Decimal(100 - event.target.value);

				if (event.target.className == "baseRate") {
					nbaseRate.value = result;
				} else if (event.target.className == "nbaseRate") {
					baseRate.value = result;
				} else if (event.target.className == "hitRate") {
					missRate.value = result;
				} else if (event.target.className == "missRate") {
					hitRate.value = result;
				} else if (event.target.className == "faRate") {
					crRate.value = result;
				} else if (event.target.className == "crRate") {
					faRate.value = result;
				}

				let nb = new Decimal(nbaseRate.value).dividedBy(100);
				let h = new Decimal(hitRate.value).dividedBy(100);
				let b = new Decimal(baseRate.value).dividedBy(100);
				let m = new Decimal(missRate.value).dividedBy(100);
				let fa = new Decimal(faRate.value).dividedBy(100);
				let cr = new Decimal(crRate.value).dividedBy(100);

				let fhit = h.times(b);
				let fmiss = m.times(b);
				let ffa = fa.times(nb);
				let fcr = cr.times(nb);

				// Results
				let f_max = max_factor(fhit,fmiss,ffa,fcr);
				let popOutputTreeResult= f_max;
				let baseOutputTreeResult = f_max.times(b);
				let noiseOutputTreeResult = f_max.times(nb);

				let hitTreeResult = (f_max.times(b)).times(h);
				let missTreeResult = (f_max.times(b)).times(m);
				let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);

				// Output for tree
				popOutput.innerHTML = popOutputTreeResult.toNumber();
				baseOutput.innerHTML = baseOutputTreeResult.toNumber();
				noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				hit.innerHTML = hitTreeResult.toNumber();
				miss.innerHTML = missTreeResult.toNumber();
				falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				correctReject.innerHTML = corretRejectTreeResult.toNumber();


				// assigned values for the equation
				hitResult_sup.innerHTML = hitTreeResult.toNumber();
				hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				let oneHundred = new Decimal(100);
				results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).times(oneHundred).toNumber().toPrecision(3)+"%";
				

			}
		}
	} else if(tree.id == "E2Tree") {
		let main = tree.firstElementChild;

		// Declare input
		let baseRate;
		let nbaseRate;
		let hitRate;
		let missRate;
		let faRate;
		let crRate;
		let unclearRate1
		let unclearRate2

		// Declare tree output
		let popOutput;
		let baseOutput;
		let noiseOutput;

		let hit;
		let miss;
		let falseAlarm;
		let correctReject;
		let unclear1
		let unclear2

		// Probability div output
		let results;
		let hitResult_sup;
		let hitResult_bottom;
		let falseAlarmResult;

		//Probability & Percentage btn
		let probability;
		let percentage;

		// check probability or percentage
		let isProb = true;


		// Get input and output from DOM
		for (let i = 0; i < main.children.length; i++) {
			let currChild = main.children[i];
			if (currChild.className == "tree") {
				treeDiv = currChild;
				for (let j = 0; j < treeDiv.children.length; j++) {	
					
					let childClass = treeDiv.children[j].className;
	    			if (treeDiv.children[j].classList.contains('probability')) {
						probability = treeDiv.children[j];
					}
					else if (treeDiv.children[j].classList.contains('percentage')) {
						percentage = treeDiv.children[j]; 
					}
					else if (childClass == "oneC3Vpop_number") {
						popOutput = treeDiv.children[j];
					}
					else if (childClass == "oneC3VbaseRate") {
						baseRate = treeDiv.children[j];	
					}
					else if (childClass == "oneC3Vbase") {
						baseOutput = treeDiv.children[j];
					}
					else if (childClass == "oneC3VnbaseRate") {
						nbaseRate = treeDiv.children[j];
					}
					else if (childClass == "oneC3Vnoise") {
						noiseOutput = treeDiv.children[j];
					}
					else if (childClass == "bottom") {
						
						let bottomDiv = treeDiv.children[j];

						for (let jj = 0; jj < bottomDiv.children.length; jj++) {
							
							let bottomDivClass = bottomDiv.children[jj].className;
							if (bottomDivClass == "oneC3VhitRate") {
								hitRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3Vhit") {
								hit = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3VunclearRate1") {
								unclearRate1 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3Vunclear1") {
								unclear1 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3VmissRate") {
								missRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3Vmiss") {
								miss = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3VfaRate") {
								faRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3Vfa") {
								falseAlarm = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3VunclearRate2") {
								unclearRate2 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3Vunclear2") {
								unclear2 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3VcrRate") {
								crRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "oneC3Vcr") {
								correctReject = bottomDiv.children[jj];
							}
						}
					}
					else if (childClass == "oneC3Vprobability1") {

						let probDiv = treeDiv.children[j];

						for (let jjj = 0; jjj < probDiv.children.length; jjj++) {
							
							let probDivClass = probDiv.children[jjj].className;
							if (probDivClass == "innerProb") {

								let innerProbDiv = probDiv.children[jjj];

								for (let jjjj = 0; jjjj < innerProbDiv.children.length; jjjj++) {
									
									let innerProbClass = innerProbDiv.children[jjjj].className;

									if (innerProbClass == "hitResult prob_sup") {
										hitResult_sup = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "hitResult prob_bottom") {
										hitResult_bottom = innerProbDiv.children[jjjj];

									}
									else if (innerProbClass == "faResult prob_bottom") {
										falseAlarmResult = innerProbDiv.children[jjjj];						
									}
								}
							}
							else if (probDivClass == "results") {
								results = probDiv.children[jjj];
							}
							
						}
					}
					
				}
			}	
	    } 

	    function probPercToggle(event) {
	    	// If the same button is clicked, do nothing
	    	if (event.target.classList.contains(ACTIVATED_BUTTON_CLASS)) {
	    		return;
	    	}

			let probActive = probability.classList.contains(ACTIVATED_BUTTON_CLASS);
			if (probActive) {
				probability.className = probability.className.replace(" " + ACTIVATED_BUTTON_CLASS, "");
				percentage.className += " " + ACTIVATED_BUTTON_CLASS;
			} else {
				percentage.className = percentage.className.replace(" " + ACTIVATED_BUTTON_CLASS, "");
				probability.className += " " + ACTIVATED_BUTTON_CLASS;
			}
		}

		//output initilization
		function OutputInitialize() {
			 //Tree
			 popOutput.innerHTML = 600;
			 baseOutput.innerHTML = 300;
			 noiseOutput.innerHTML = 300;

			 hit.innerHTML = 100;
			 miss.innerHTML = 100;
			 falseAlarm.innerHTML= 100;
			 correctReject.innerHTML = 100;
			 unclear1.innerHTML = 100;
			 unclear2.innerHTML = 100;

			 // equation result
			 hitResult_sup.innerHTML = 100;
			 hitResult_bottom.innerHTML = 100;
			 falseAlarmResult.innerHTML = 100;
			 
		}
	  		
	  	probability.addEventListener("click", function(e) {
	  		 // initialize input values
	  		 isProb = true;
			 baseRate.value = 0.5;
			 nbaseRate.value = 0.5;
			 hitRate.value = 0.33;
			 missRate.value = 0.33;
			 faRate.value = 0.33;
			 crRate.value = 0.33;
			 unclearRate1.value = 0.33
			 unclearRate2.value = 0.33

			 results.innerHTML = 0.5;

			 probPercToggle(e);
			 OutputInitialize();
	  	});

	  	percentage.addEventListener("click", function(e) {
	  		 isProb = false;
			 baseRate.value = 50;
			 nbaseRate.value = 50;
			 hitRate.value = 33;
			 missRate.value = 33;
			 faRate.value = 33;
			 crRate.value = 33;
			 unclearRate1.value = 33;
			 unclearRate2.value = 33;

			 results.innerHTML = 50+'%';

			 probPercToggle(e);
			 OutputInitialize();

	  	});

	    baseRate.addEventListener("change", changeEventHandler);
		nbaseRate.addEventListener("change", changeEventHandler);
		hitRate.addEventListener("change", changeEventHandler);
		missRate.addEventListener("change", changeEventHandler);
		faRate.addEventListener("change", changeEventHandler);
		crRate.addEventListener("change", changeEventHandler);
		unclearRate1.addEventListener("change", changeEventHandler);
		unclearRate2.addEventListener("change", changeEventHandler);


		function changeEventHandler(event) {
			let one, targetValue, result;

			// probability
			if (isProb) {
				if (event.target.value < 0 || event.target.value > 1) {	
					alert("Please enter probability between 0 and 1");
					return;
				}

				one = new Decimal(1);
				targetValue = new Decimal(event.target.value);
				result = one.minus(targetValue);

				if (event.target.className == "oneC3VbaseRate") {
					nbaseRate.value = result.toPrecision(4);
				} else if (event.target.className == "oneC3VnbaseRate") {
					baseRate.value = result.toPrecision(4);
				} 

				let nb = new Decimal(nbaseRate.value);
				let h = new Decimal(hitRate.value);
				let b = new Decimal(baseRate.value);
				let m = new Decimal(missRate.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);
				let uc1 = new Decimal(unclearRate1.value);
				let uc2 = new Decimal(unclearRate2.value);

				let fhit = h.times(b);
				let fmiss = m.times(b);
				let ffa = fa.times(nb);
				let fcr = cr.times(nb);
				let fuc1 = uc1.times(b);
				let fuc2 = uc2.times(nb);

				// Results
				let f_max = oneC3V_max_factor(fhit,fuc1,fmiss,ffa,fuc2,fcr);
				let popOutputTreeResult= f_max;
				let baseOutputTreeResult = f_max.times(b);
				let noiseOutputTreeResult = f_max.times(nb);		

				let hitTreeResult = (f_max.times(b)).times(h);
				let missTreeResult = (f_max.times(b)).times(m);
				let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				let unclear1TreeResult = (f_max.times(b)).times(uc1);
				let unclear2TreeResult = (f_max.times(nb)).times(uc2);

				// assigned values for tree output
				popOutput.innerHTML = popOutputTreeResult.toNumber();
				baseOutput.innerHTML = baseOutputTreeResult.toNumber();
				noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				hit.innerHTML = hitTreeResult.toNumber();
				miss.innerHTML = missTreeResult.toNumber();
				falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				correctReject.innerHTML = corretRejectTreeResult.toNumber();
				unclear1.innerHTML = unclear1TreeResult.toNumber();
				unclear2.innerHTML = unclear2TreeResult.toNumber();


				// assigned values for the equation
				hitResult_sup.innerHTML = hitTreeResult.toNumber();
				hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).toNumber().toPrecision(3);


			} else {
			
				//Percentage

				if (event.target.value < 0 || event.target.value > 100) {	
				alert("Please enter percentage between 0 and 100");
				return;
				}
				result = new Decimal(100 - event.target.value);
				
				if (event.target.className == "oneC3VbaseRate") {
					nbaseRate.value = result.toPrecision(4);
				} else if (event.target.className == "oneC3VnbaseRate") {
					baseRate.value = result.toPrecision(4);
				}

				let nb = new Decimal(nbaseRate.value).dividedBy(100);
				let h = new Decimal(hitRate.value).dividedBy(100);
				let b = new Decimal(baseRate.value).dividedBy(100);
				let m = new Decimal(missRate.value).dividedBy(100);
				let fa = new Decimal(faRate.value).dividedBy(100);
				let cr = new Decimal(crRate.value).dividedBy(100);
				let uc1 = new Decimal(unclearRate1.value).dividedBy(100);
				let uc2 = new Decimal(unclearRate2.value).dividedBy(100);

				let fhit = h.times(b);
				let fmiss = m.times(b);
				let ffa = fa.times(nb);
				let fcr = cr.times(nb);
				let fuc1 = uc1.times(b);
				let fuc2 = uc2.times(nb);

				// Results
				let f_max = oneC3V_max_factor(fhit,fuc1,fmiss,ffa,fuc2,fcr);
				let popOutputTreeResult= f_max;
				let baseOutputTreeResult = f_max.times(b);
				let noiseOutputTreeResult = f_max.times(nb);

				let hitTreeResult = (f_max.times(b)).times(h);
				let missTreeResult = (f_max.times(b)).times(m);
				let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				let unclear1TreeResult = (f_max.times(b)).times(uc1);
				let unclear2TreeResult = (f_max.times(nb)).times(uc2);

				// Output for tree
				popOutput.innerHTML = popOutputTreeResult.toNumber();
				baseOutput.innerHTML = baseOutputTreeResult.toNumber();
				noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				hit.innerHTML = hitTreeResult.toNumber();
				miss.innerHTML = missTreeResult.toNumber();
				falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				correctReject.innerHTML = corretRejectTreeResult.toNumber();
				unclear1.innerHTML = unclear1TreeResult.toNumber();
				unclear2.innerHTML = unclear2TreeResult.toNumber();


				// assigned values for the equation
				hitResult_sup.innerHTML = hitTreeResult.toNumber();
				hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				let oneHundred = new Decimal(100);
				results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).times(oneHundred).toNumber().toPrecision(3)+"%";
				

			}
		}

	}
}

// max function that calculates the population size
// function max_factor(p, q, r, s) {
//   let max = new Decimal(10);
  
//   for (var i = 1; i < 10; i++) {
  
//     let f = new Decimal(Math.pow(10, i));
//     max = f;

//     if (!p.times(f).equals(p.times(f).round())) {
//       continue;
//     } else if (!q.times(f).equals(q.times(f).round())) {
//       continue;
//     } else if (!r.times(f).equals(r.times(f).round())) {
//       continue;
//     } else if (!s.times(f).equals(s.times(f).round())) {
//       continue;
//     }
//     break;
//   }
//   return max;
//  }
function oneC3V_max_factor(p, q, r, s, l, m) {
  let max = new Decimal(10);
  
  for (var i = 1; i < 10; i++) {
  
    let f = new Decimal(Math.pow(10, i));
    max = f;

    if (!p.times(f).equals(p.times(f).round())) {
      	continue;
    } else if (!q.times(f).equals(q.times(f).round())) {
      	continue;
    } else if (!r.times(f).equals(r.times(f).round())) {
      	continue;
    } else if (!s.times(f).equals(s.times(f).round())) {
      	continue;
    } else if (!l.times(f).equals(l.times(f).round())) {
    	continue;
    } else if (!m.times(f).equals(m.times(f).round())) {
    	continue;
    }
    break;
  }
  return max;
 }


// Add event handlere to tabs

E1tab.addEventListener('click', selectTree);
E2tab.addEventListener('click', selectTree);
E3tab.addEventListener('click', selectTree);
E4tab.addEventListener('click', selectTree);
E5tab.addEventListener('click', selectTree);
E1tab.click();

