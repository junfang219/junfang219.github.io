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

	}else if(tree.id == "E3Tree") {
		let main = tree.firstElementChild;

		// Declare input
		let baseRate1;
		let baseRate2;
		let nbaseRate;
		let hitRate1;
		let missRate1;
		let hitRate2;
		let missRate2;
		let faRate;
		let crRate;
		

		// Declare tree output
		let popOutput;
		let baseOutput1;
		let baseOutput2;
		let noiseOutput;

		let hit1;
		let miss1;
		let hit2;
		let miss2;
		let falseAlarm;
		let correctReject;
		

		// Probability div output
		let results1;
		let results2;
		let hitResult_sup;
		let hitResult_bottom1;
		let hitResult_bottom2;
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
					else if (childClass == "h3pop_number") {
						popOutput = treeDiv.children[j];
					}
					else if (childClass == "h3baseRate1") {
						baseRate1 = treeDiv.children[j];	
					}
					else if (childClass == "h3baseRate2") {
						baseRate2 = treeDiv.children[j];
					}
					else if (childClass == "h3base1") {
						baseOutput1 = treeDiv.children[j];
					}
					else if (childClass == "h3base2") {
						baseOutput2 = treeDiv.children[j];
					}
					else if (childClass == "h3nbaseRate") {
						nbaseRate = treeDiv.children[j];
					}
					else if (childClass == "h3noise") {
						noiseOutput = treeDiv.children[j];
					}
					else if (childClass == "bottom") {
						
						let bottomDiv = treeDiv.children[j];

						for (let jj = 0; jj < bottomDiv.children.length; jj++) {
							
							let bottomDivClass = bottomDiv.children[jj].className;
							if (bottomDivClass == "h3hitRate1") {
								hitRate1 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3hit1") {
								hit1 = bottomDiv.children[jj];
								console.log(hit1);
							}
							else if (bottomDivClass == "h3hitRate2") {
								hitRate2 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3hit2") {
								hit2 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3missRate1") {
								missRate1 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3miss1") {
								miss1 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3missRate2") {
								missRate2 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3miss2") {
								miss2 = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3faRate") {
								faRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3fa") {
								falseAlarm = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3crRate") {
								crRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "h3cr") {
								correctReject = bottomDiv.children[jj];
							}
						}
					}
					else if (childClass == "h3probability1") {

						let probDiv = treeDiv.children[j];

						for (let jjj = 0; jjj < probDiv.children.length; jjj++) {
							
							let probDivClass = probDiv.children[jjj].className;
							if (probDivClass == "innerProb") {

								let innerProbDiv = probDiv.children[jjj];

								for (let jjjj = 0; jjjj < innerProbDiv.children.length; jjjj++) {
									
									let innerProbClass = innerProbDiv.children[jjjj].className;

									if (innerProbClass == "hitResult1 prob_sup") {
										hitResult_sup = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "hitResult1 prob_bottom") {
										hitResult_bottom1 = innerProbDiv.children[jjjj];

									}
									else if (innerProbClass == "hitResult2 prob_bottom") {
										hitResult_bottom2 = innerProbDiv.children[jjjj];

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
			 popOutput.innerHTML = 900;
			 baseOutput1.innerHTML = 300;
			 baseOutput2.innerHTML = 300;
			 noiseOutput.innerHTML = 300;

			 hit1.innerHTML = 150;
			 miss1.innerHTML = 150;
			 hit2.innerHTML = 150;
			 miss2.innerHTML = 150;
			 falseAlarm.innerHTML= 150;
			 correctReject.innerHTML = 150;
			 

			 // equation result
			 hitResult_sup.innerHTML = 150;
			 hitResult_bottom1.innerHTML = 150;
			 hitResult_bottom2.innerHTML = 150;
			 falseAlarmResult.innerHTML = 150;
			 
		}
	  		
	  	probability.addEventListener("click", function(e) {
	  		 // initialize input values
	  		 isProb = true;
			 baseRate1.value = 0.33;
			 baseRate2.value = 0.33;
			 nbaseRate.value = 0.33;
			 hitRate1.value = 0.5;
			 missRate1.value = 0.5;
			 hitRate2.value = 0.5;
			 missRate2.value = 0.5;
			 faRate.value = 0.5;
			 crRate.value = 0.5;
			 

			 results.innerHTML = 0.33;

			 probPercToggle(e);
			 OutputInitialize();
	  	});

	  	percentage.addEventListener("click", function(e) {
	  		 isProb = false;
			 baseRate1.value = 33;
			 baseRate2.value = 33;
			 nbaseRate.value = 33;
			 hitRate1.value = 50;
			 missRate1.value = 50;
			 hitRate2.value = 50;
			 missRate2.value = 50;
			 faRate.value = 50;
			 crRate.value = 50;

			 results.innerHTML = 33+'%';

			 probPercToggle(e);
			 OutputInitialize();

	  	});

	    baseRate1.addEventListener("change", changeEventHandler);
	    baseRate2.addEventListener("change", changeEventHandler);
		nbaseRate.addEventListener("change", changeEventHandler);
		hitRate1.addEventListener("change", changeEventHandler);
		missRate1.addEventListener("change", changeEventHandler);
		hitRate2.addEventListener("change", changeEventHandler);
		missRate2.addEventListener("change", changeEventHandler);
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

				if (event.target.className == "h3hitRate1") {
					missRate1.value = result.toPrecision(4);
				} else if (event.target.className == "h3hitRate2") {
					missRate2.value = result.toPrecision(4);
				} else if (event.target.className == "h3missRate1") {
					hitRate1.value = result.toPrecision(4);
				} else if (event.target.className == "h3missRate2") {
					hitRate2.value = result.toPrecision(4);
				} else if (event.target.className == "h3crRate") {
					crRate.value = result.toPrecision(4);
				} else if (event.target.className == "h3faRate") {
					faRate.value = result.toPrecision(4);
				}

				let nb = new Decimal(nbaseRate.value);
				let b1 = new Decimal(baseRate1.value);
				let b2 = new Decimal(baseRate2.value);
				let h1 = new Decimal(hitRate1.value);
				let h2 = new Decimal(hitRate2.value);
				let m1 = new Decimal(missRate1.value);
				let m2 = new Decimal(missRate2.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);

				let fhit1 = h1.times(b1);
				let fhit2 = h2.times(b2);
				let fmiss1 = m1.times(b1);
				let fmiss2 = m2.times(b2);
				let ffa = fa.times(nb);
				let fcr = cr.times(nb);
				

				// Results
				let f_max = oneC3V_max_factor(fhit1,fhit2,fmiss1,fmiss2,ffa,fcr);
				let popOutputTreeResult= f_max;
				let baseOutput1TreeResult = f_max.times(b1);
				let baseOutput2TreeResult = f_max.times(b2);
				let noiseOutputTreeResult = f_max.times(nb);		

				let hit1TreeResult = (f_max.times(b1)).times(h1);
				let hit2TreeResult = (f_max.times(b2)).times(h2);
				let miss1TreeResult = (f_max.times(b1)).times(m1);
				let miss2TreeResult = (f_max.times(b2)).times(m2);
				let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				

				// assigned values for tree output
				popOutput.innerHTML = popOutputTreeResult.toNumber();
				baseOutput1.innerHTML = baseOutput1TreeResult.toNumber();
				baseOutput2.innerHTML = baseOutput2TreeResult.toNumber();
				noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				hit1.innerHTML = hit1TreeResult.toNumber();
				hit2.innerHTML = hit2TreeResult.toNumber();
				miss1.innerHTML = miss1TreeResult.toNumber();
				miss2.innerHTML = miss2TreeResult.toNumber();
				falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				correctReject.innerHTML = corretRejectTreeResult.toNumber();
				
				// assigned values for the equation
				hitResult_sup.innerHTML = hit1TreeResult.toNumber();
				hitResult_bottom1.innerHTML = hit1TreeResult.toNumber();
				hitResult_bottom2.innerHTML = hit2TreeResult.toNumber();
				falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				results.innerHTML = hit1TreeResult.dividedBy(hit2TreeResult.plus(hit1TreeResult.plus(falseAlarmTreeResult))).toNumber().toPrecision(3);


			} else {
			
				//Percentage

				if (event.target.value < 0 || event.target.value > 100) {	
				alert("Please enter percentage between 0 and 100");
				return;
				}
				result = new Decimal(100 - event.target.value);
				
				if (event.target.className == "h3hitRate1") {
					missRate1.value = result.toPrecision(4);
				} else if (event.target.className == "h3hitRate2") {
					missRate2.value = result.toPrecision(4);
				} else if (event.target.className == "h3missRate1") {
					hitRate1.value = result.toPrecision(4);
				} else if (event.target.className == "h3missRate2") {
					hitRate2.value = result.toPrecision(4);
				} else if (event.target.className == "h3crRate") {
					crRate.value = result.toPrecision(4);
				} else if (event.target.className == "h3faRate") {
					faRate.value = result.toPrecision(4);
				}

				
				let nb = new Decimal(nbaseRate.value).dividedBy(100);
				let b1 = new Decimal(baseRate1.value).dividedBy(100);
				let b2 = new Decimal(baseRate2.value).dividedBy(100);
				let h1 = new Decimal(hitRate1.value).dividedBy(100);
				let h2 = new Decimal(hitRate2.value).dividedBy(100);
				let m1 = new Decimal(missRate1.value).dividedBy(100);
				let m2 = new Decimal(missRate2.value).dividedBy(100);
				let fa = new Decimal(faRate.value).dividedBy(100);
				let cr = new Decimal(crRate.value).dividedBy(100);

				let fhit1 = h1.times(b1);
				let fhit2 = h2.times(b2);
				let fmiss1 = m1.times(b1);
				let fmiss2 = m2.times(b2);
				let ffa = fa.times(nb);
				let fcr = cr.times(nb);

				// Results
				let f_max = oneC3V_max_factor(fhit1,fhit2,fmiss1,fmiss2,ffa,fcr);
				let popOutputTreeResult= f_max;
				let baseOutput1TreeResult = f_max.times(b1);
				let baseOutput2TreeResult = f_max.times(b2);
				let noiseOutputTreeResult = f_max.times(nb);		

				let hit1TreeResult = (f_max.times(b1)).times(h1);
				let hit2TreeResult = (f_max.times(b2)).times(h2);
				let miss1TreeResult = (f_max.times(b1)).times(m1);
				let miss2TreeResult = (f_max.times(b2)).times(m2);
				let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				

				// assigned values for tree output
				popOutput.innerHTML = popOutputTreeResult.toNumber();
				baseOutput1.innerHTML = baseOutput1TreeResult.toNumber();
				baseOutput2.innerHTML = baseOutput2TreeResult.toNumber();
				noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				hit1.innerHTML = hit1TreeResult.toNumber();
				hit2.innerHTML = hit2TreeResult.toNumber();
				miss1.innerHTML = miss1TreeResult.toNumber();
				miss2.innerHTML = miss2TreeResult.toNumber();
				falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				correctReject.innerHTML = corretRejectTreeResult.toNumber();
				
				// assigned values for the equation
				hitResult_sup.innerHTML = hit1TreeResult.toNumber();
				hitResult_bottom1.innerHTML = hit1TreeResult.toNumber();
				hitResult_bottom2.innerHTML = hit2TreeResult.toNumber();
				falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				results.innerHTML = hit1TreeResult.dividedBy(hit2TreeResult.plus(hit1TreeResult.plus(falseAlarmTreeResult))).toNumber().toPrecision(3);


			}
		}

	}
}

//max function that calculates the population size
function max_factor(p, q, r, s) {
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
    }
    break;
  }
  return max;
 }

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

