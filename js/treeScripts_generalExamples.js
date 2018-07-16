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
		let h1Input;
		let h2Input;

		let popSize;
		let popSinput;

		let baseRate;
		let nbaseRate;
		let hitRate;
		let missRate;
		let faRate;
		let crRate;

		// Declare tree output
		let popOutput;
		let h1Output;
		let h2Output;
		let baseOutput;
		let noiseOutput;

		let hit;
		let miss;
		let falseAlarm;
		let correctReject;

		let sugPop;

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

			if (currChild.className == "hypothesis") {
				let hypoDiv = currChild;
				
				h1Input = hypoDiv.firstElementChild;
				h2Input = hypoDiv.lastElementChild;
			} 
			else if (currChild.className == "popSize") {
				let popDiv = currChild;
				popSize = popDiv.lastElementChild;
			}
			else if (currChild.className == "tree") {
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
					else if (childClass == "h1Output") {
						h1Output = treeDiv.children[j];
						
					}
					else if (childClass == "h2Output") {
						h2Output = treeDiv.children[j];
						
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
					else if (childClass == "sugPop") {
							sugPop = treeDiv.children[j];
							
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
			 sugPop.innerHTML = 1000;
			 
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


	  	popSinput = popSize.value;

	  	popSize.addEventListener("change", function() {
	  		popSinput = popSize.value;
	  		popOutput.innerHTML = popSinput;
	  		popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
			let ps = new Decimal(popSinputNum);

				if (isProb) {
				let nb = new Decimal(nbaseRate.value);
				let h = new Decimal(hitRate.value);
				let b = new Decimal(baseRate.value);
				let m = new Decimal(missRate.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);


				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit.toFixed(0);
				hitResult_bottom.innerHTML = lhit.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);
				results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				//results.innerHTML = ps.times(b).times(h).dividedBy(ps.times(b).times(h).plus(ps.times(nb).times(fa))).toNumber().toPrecision(3);
				//sugPop.innerHTML = 1000;
				}
				else {
					let nb = new Decimal(nbaseRate.value).dividedBy(100);
					let h = new Decimal(hitRate.value).dividedBy(100);
					let b = new Decimal(baseRate.value).dividedBy(100);
					let m = new Decimal(missRate.value).dividedBy(100);
					let fa = new Decimal(faRate.value).dividedBy(100);
					let cr = new Decimal(crRate.value).dividedBy(100);

					let lp = ps;
					let lb = ps.times(b);
					let lnb = lp.minus(lb);

					let lhit = ps.times(b).times(h);
					let lmiss = lb.minus(lhit);
					let lfa = ps.times(nb).times(fa);
					let lcr = lnb.minus(lfa);

					popOutput.innerHTML = popSinput;
					baseOutput.innerHTML = lb.toFixed(0);
					noiseOutput.innerHTML = lnb.toFixed(0);

					hit.innerHTML = lhit.toFixed(0);
					miss.innerHTML = lmiss.toFixed(0);
					falseAlarm.innerHTML = lfa.toFixed(0);
					correctReject.innerHTML = lcr.toFixed(0);

					hitResult_sup.innerHTML = lhit.toFixed(0);
					hitResult_bottom.innerHTML = lhit.toFixed(0);
					falseAlarmResult.innerHTML = lfa.toFixed(0);
					results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);

				}
	  	});

	  	h1Input.addEventListener("change", function(){
	  		h1Output.innerHTML = h1Input.value;
	  	});

		h2Input.addEventListener("change", function(){
	  		h2Output.innerHTML = h2Input.value;
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
				// let popOutputTreeResult= f_max;
				// let baseOutputTreeResult = f_max.times(b);
				// let noiseOutputTreeResult = f_max.times(nb);		

				// let hitTreeResult = (f_max.times(b)).times(h);
				// let missTreeResult = (f_max.times(b)).times(m);
				// let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				// let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);

				// assigned values for tree output

				// popOutput.innerHTML = popOutputTreeResult.toNumber();
				// baseOutput.innerHTML = baseOutputTreeResult.toNumber();
				// noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				
				popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
				let ps = new Decimal(popSinputNum);

				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit.toFixed(0);
				hitResult_bottom.innerHTML = lhit.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);

				results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				sugPop.innerHTML = f_max.toNumber();

				// hit.innerHTML = hitTreeResult.toNumber();
				// miss.innerHTML = missTreeResult.toNumber();
				// falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				// correctReject.innerHTML = corretRejectTreeResult.toNumber();


				// assigned values for the equation
				// hitResult_sup.innerHTML = hitTreeResult.toNumber();
				// hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				// falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				// results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).toNumber().toPrecision(3);

				//results.innerHTML = ps.times(b).times(h).dividedBy(ps.times(b).times(h).plus(ps.times(nb).times(fa))).toNumber().toPrecision(3);


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
				// let popOutputTreeResult= f_max;
				// let baseOutputTreeResult = f_max.times(b);
				// let noiseOutputTreeResult = f_max.times(nb);

				// let hitTreeResult = (f_max.times(b)).times(h);
				// let missTreeResult = (f_max.times(b)).times(m);
				// let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				// let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);

				// Output for tree
				// popOutput.innerHTML = popOutputTreeResult.toNumber();
				// baseOutput.innerHTML = baseOutputTreeResult.toNumber();
				// noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();
			
				// h1Output.innerHTML = h1Input.value;
				// h2Output.innerHTML = h2Input.value;

				// hit.innerHTML = hitTreeResult.toNumber();
				// miss.innerHTML = missTreeResult.toNumber();
				// falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				// correctReject.innerHTML = corretRejectTreeResult.toNumber();


				// // assigned values for the equation
				// hitResult_sup.innerHTML = hitTreeResult.toNumber();
				// hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				// falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				// let oneHundred = new Decimal(100);
				// results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).times(oneHundred).toNumber().toPrecision(3)+"%";
				
				popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
				let ps = new Decimal(popSinputNum);

				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit.toFixed(0);
				hitResult_bottom.innerHTML = lhit.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);

				results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				sugPop.innerHTML = f_max.toNumber();

			}
		}
	} else if(tree.id == "E2Tree") {
		let main = tree.firstElementChild;

		// Declare input
		let h1Input;
		let h2Input;

		let popSize;
		let popSinput;

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
		let h1Output;
		let h2Output;
		let baseOutput;
		let noiseOutput;

		let hit;
		let miss;
		let falseAlarm;
		let correctReject;
		let unclear1;
		let unclear2;

		let sugPop;

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

			if (currChild.className == "hypothesis") {
				let hypoDiv = currChild;

				h1Input = hypoDiv.firstElementChild;
				h2Input = hypoDiv.lastElementChild;
			}
			else if (currChild.className == "popSize") {
				let popDiv = currChild;

				popSize = popDiv.lastElementChild;
			}
			else if (currChild.className == "tree") {
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
					else if (childClass == "h1Output") {
						h1Output = treeDiv.children[j];
					}
					else if (childClass == "h2Output") {
						h2Output = treeDiv.children[j];	
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
					else if (childClass == "sugPop") {
							sugPop = treeDiv.children[j];
							
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
			 sugPop.innerHTML = 1000;
			 
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

	  	popSinput = popSize.value;

	  	popSize.addEventListener("change", function() {
	  		popSinput = popSize.value;
	  		popOutput.innerHTML = popSinput;
	  		popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
			let ps = new Decimal(popSinputNum);

				if (isProb) {
				let nb = new Decimal(nbaseRate.value);
				let h = new Decimal(hitRate.value);
				let b = new Decimal(baseRate.value);
				let m = new Decimal(missRate.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);
				let uc1 = new Decimal(unclearRate1.value);
				let uc2 = new Decimal(unclearRate2.value);


				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lunclear1 = ps.times(b).times(uc1)
				let lmiss = lb.minus(lhit.plus(lunclear1));
				
				let lfa = ps.times(nb).times(fa);
				let lunclear2 = ps.times(nb).times(uc2);
				let lcr = lnb.minus(lfa.plus(lunclear2));

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				unclear1.innerHTML = lunclear1.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				unclear2.innerHTML = lunclear2.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit.toFixed(0);
				hitResult_bottom.innerHTML = lhit.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);
				results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				//results.innerHTML = ps.times(b).times(h).dividedBy(ps.times(b).times(h).plus(ps.times(nb).times(fa))).toNumber().toPrecision(3);
				//sugPop.innerHTML = 1000;
				}
				else {
					let nb = new Decimal(nbaseRate.value).dividedBy(100);
					let h = new Decimal(hitRate.value).dividedBy(100);
					let b = new Decimal(baseRate.value).dividedBy(100);
					let m = new Decimal(missRate.value).dividedBy(100);
					let fa = new Decimal(faRate.value).dividedBy(100);
					let cr = new Decimal(crRate.value).dividedBy(100);
					let uc1 = new Decimal(unclearRate1.value).dividedBy(100);
					let uc2 = new Decimal(unclearRate2.value).dividedBy(100);

					let lp = ps;
					let lb = ps.times(b);
					let lnb = lp.minus(lb);

					let lhit = ps.times(b).times(h);
					let lunclear1 = ps.times(b).times(uc1)
					let lmiss = lb.minus(lhit).minus(lunclear1);
					
					let lfa = ps.times(nb).times(fa);
					let lunclear2 = ps.times(nb).times(uc2);
					let lcr = lnb.minus(lfa).minus(lunclear2);

					popOutput.innerHTML = popSinput;
					baseOutput.innerHTML = lb.toFixed(0);
					noiseOutput.innerHTML = lnb.toFixed(0);

					hit.innerHTML = lhit.toFixed(0);
					unclear1.innerHTML = lunclear1.toFixed(0);
					miss.innerHTML = lmiss.toFixed(0);
					falseAlarm.innerHTML = lfa.toFixed(0);
					unclear2.innerHTML = lunclear2.toFixed(0);
					correctReject.innerHTML = lcr.toFixed(0);

					hitResult_sup.innerHTML = lhit.toFixed(0);
					hitResult_bottom.innerHTML = lhit.toFixed(0);
					falseAlarmResult.innerHTML = lfa.toFixed(0);
					results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);

				}
	  	});

	  	h1Input.addEventListener("change", function(){
	  		h1Output.innerHTML = h1Input.value;
	  	});

		h2Input.addEventListener("change", function(){
	  		h2Output.innerHTML = h2Input.value;
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
				// let popOutputTreeResult= f_max;
				// let baseOutputTreeResult = f_max.times(b);
				// let noiseOutputTreeResult = f_max.times(nb);		

				// let hitTreeResult = (f_max.times(b)).times(h);
				// let missTreeResult = (f_max.times(b)).times(m);
				// let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				// let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				// // let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// // let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				// let unclear1TreeResult = (f_max.times(b)).times(uc1);
				// let unclear2TreeResult = (f_max.times(nb)).times(uc2);

				// // assigned values for tree output
				// popOutput.innerHTML = popOutputTreeResult.toNumber();
				// baseOutput.innerHTML = baseOutputTreeResult.toNumber();
				// noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				// hit.innerHTML = hitTreeResult.toNumber();
				// miss.innerHTML = missTreeResult.toNumber();
				// falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				// correctReject.innerHTML = corretRejectTreeResult.toNumber();
				// unclear1.innerHTML = unclear1TreeResult.toNumber();
				// unclear2.innerHTML = unclear2TreeResult.toNumber();

				popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
				let ps = new Decimal(popSinputNum);
				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lunclear1 = ps.times(b).times(uc1)
				let lmiss = lb.minus(lhit.plus(lunclear1));
				
				let lfa = ps.times(nb).times(fa);
				let lunclear2 = ps.times(nb).times(uc2);
				let lcr = lnb.minus(lfa.plus(lunclear2));

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				unclear1.innerHTML = lunclear1.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				unclear2.innerHTML = lunclear2.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit.toFixed(0);
				hitResult_bottom.innerHTML = lhit.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);

				results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				sugPop.innerHTML = f_max.toNumber();


				// assigned values for the equation
				// hitResult_sup.innerHTML = hitTreeResult.toNumber();
				// hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				// falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				// results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).toNumber().toPrecision(3);


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
				
				popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
				let ps = new Decimal(popSinputNum);
				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lunclear1 = ps.times(b).times(uc1)
				let lmiss = lb.minus(lhit.plus(lunclear1));
				
				let lfa = ps.times(nb).times(fa);
				let lunclear2 = ps.times(nb).times(uc2);
				let lcr = lnb.minus(lfa.plus(lunclear2));

				// Results
				let f_max = oneC3V_max_factor(fhit,fuc1,fmiss,ffa,fuc2,fcr);
				// let popOutputTreeResult= f_max;
				// let baseOutputTreeResult = f_max.times(b);
				// let noiseOutputTreeResult = f_max.times(nb);

				// let hitTreeResult = (f_max.times(b)).times(h);
				// let missTreeResult = (f_max.times(b)).times(m);
				// let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
				// let corretRejectTreeResult = (f_max.times(nb)).times(cr);
				// // let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// // let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				// let unclear1TreeResult = (f_max.times(b)).times(uc1);
				// let unclear2TreeResult = (f_max.times(nb)).times(uc2);

				// Output for tree

				// popOutput.innerHTML = popOutputTreeResult.toNumber();
				// baseOutput.innerHTML = baseOutputTreeResult.toNumber();
				// noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();

				// hit.innerHTML = hitTreeResult.toNumber();
				// miss.innerHTML = missTreeResult.toNumber();
				// falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
				// correctReject.innerHTML = corretRejectTreeResult.toNumber();
				// unclear1.innerHTML = unclear1TreeResult.toNumber();
				// unclear2.innerHTML = unclear2TreeResult.toNumber();


				// assigned values for the equation
				// hitResult_sup.innerHTML = hitTreeResult.toNumber();
				// hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				// falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				// let oneHundred = new Decimal(100);
				// results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).times(oneHundred).toNumber().toPrecision(3)+"%";
				
				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				unclear1.innerHTML = lunclear1.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				unclear2.innerHTML = lunclear2.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit.toFixed(0);
				hitResult_bottom.innerHTML = lhit.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);

				results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				sugPop.innerHTML = f_max.toNumber();
				// // assigned values for the equation
				// hitResult_sup.innerHTML = hitTreeResult.toNumber();
				// hitResult_bottom.innerHTML = hitTreeResult.toNumber();
				// falseAlarmResult.innerHTML = falseAlarmTreeResult.toNumber();
				// results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).toNumber().toPrecision(3);

			}
		}

	}else if(tree.id == "E3Tree") {
		let main = tree.firstElementChild;

		// Declare input
		let h1Input;
		let h2Input;
		let h3Input;

		let popSize;
		let popSinput;

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
		let h1Output;
		let h2Output;
		let h3Output;

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

		let sugPop;

		//Probability & Percentage btn
		let probability;
		let percentage;

		// check probability or percentage
		let isProb = true;


		// Get input and output from DOM
		for (let i = 0; i < main.children.length; i++) {
			let currChild = main.children[i];

			if (currChild.className == "hypothesis") {
				let hypoDiv = currChild;

				h1Input = hypoDiv.firstElementChild.firstElementChild;
			
				h2Input = hypoDiv.firstElementChild.firstElementChild.nextSibling.nextSibling.nextSibling;

				h3Input = hypoDiv.firstElementChild.firstElementChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;

			}
			else if (currChild.className == "popSize") {
				let popDiv = currChild;
				popSize = popDiv.lastElementChild;
			}
			else if (currChild.className == "tree") {
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
					else if (childClass == "h1Output") {
						h1Output = treeDiv.children[j];
					}
					else if (childClass == "h2Output") {
						h2Output = treeDiv.children[j];	
					}
					else if (childClass == "h3Output") {
						h3Output = treeDiv.children[j];
						
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
					else if (childClass == "sugPop") {
							sugPop = treeDiv.children[j];
							
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
			 sugPop.innerHTML = 1000;
			 
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


	  	popSinput = popSize.value;

	  	popSize.addEventListener("change", function() {
	  		popSinput = popSize.value;
	  		popOutput.innerHTML = popSinput;
	  		popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
			let ps = new Decimal(popSinputNum);

				if (isProb) {

				let nb = new Decimal(nbaseRate.value);
				let b1 = new Decimal(baseRate1.value);
				let b2 = new Decimal(baseRate2.value);
				let h1 = new Decimal(hitRate1.value);
				let h2 = new Decimal(hitRate2.value);
				let m1 = new Decimal(missRate1.value);
				let m2 = new Decimal(missRate2.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);


				let lp = ps;
				let lb1 = ps.times(b1);
				let lb2 = ps.times(b2)
				let lnb = lp.minus(lb1).minus(lb2);

				let lhit1 = ps.times(b1).times(h1);
				let lmiss1 = lb1.minus(lhit1);
				let lhit2 = ps.times(b2).times(h2);
				let lmiss2 = lb2.minus(lhit2);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);
				

				popOutput.innerHTML = popSinput;
				baseOutput1.innerHTML = lb1.toFixed(0);
				baseOutput2.innerHTML = lb2.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit1.toFixed(0);
				hitResult_bottom1.innerHTML = lhit1.toFixed(0);
				hitResult_bottom2.innerHTML = lhit2.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);
				results.innerHTML = (parseInt(lhit1.toFixed(0)) / (parseInt(lhit2.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				//results.innerHTML = ps.times(b).times(h).dividedBy(ps.times(b).times(h).plus(ps.times(nb).times(fa))).toNumber().toPrecision(3);
				//sugPop.innerHTML = 1000;
				}
				else {

					let nb = new Decimal(nbaseRate.value).dividedBy(100);
					let b1 = new Decimal(baseRate1.value).dividedBy(100);
					let b2 = new Decimal(baseRate2.value).dividedBy(100);
					let h1 = new Decimal(hitRate1.value).dividedBy(100);
					let h2 = new Decimal(hitRate2.value).dividedBy(100);
					let m1 = new Decimal(missRate1.value).dividedBy(100);
					let m2 = new Decimal(missRate2.value).dividedBy(100);
					let fa = new Decimal(faRate.value).dividedBy(100);
					let cr = new Decimal(crRate.value).dividedBy(100);

					let lp = ps;
					let lb1 = ps.times(b1);
					let lb2 = ps.times(b2)
					let lnb = lp.minus(lb1).minus(lb2);

					let lhit1 = ps.times(b1).times(h1);
					let lmiss1 = lb1.minus(lhit1);
					let lhit2 = ps.times(b2).times(h2);
					let lmiss2 = lb2.minus(lhit2);
					let lfa = ps.times(nb).times(fa);
					let lcr = lnb.minus(lfa);
					

					popOutput.innerHTML = popSinput;
					baseOutput1.innerHTML = lb1.toFixed(0);
					baseOutput2.innerHTML = lb2.toFixed(0);
					noiseOutput.innerHTML = lnb.toFixed(0);

					hit1.innerHTML = lhit1.toFixed(0);
					miss1.innerHTML = lmiss1.toFixed(0);
					hit2.innerHTML = lhit2.toFixed(0);
					miss2.innerHTML = lmiss2.toFixed(0);
					falseAlarm.innerHTML = lfa.toFixed(0);
					correctReject.innerHTML = lcr.toFixed(0);

					hitResult_sup.innerHTML = lhit1.toFixed(0);
					hitResult_bottom1.innerHTML = lhit1.toFixed(0);
					hitResult_bottom2.innerHTML = lhit2.toFixed(0);
					falseAlarmResult.innerHTML = lfa.toFixed(0);
					results.innerHTML = (parseInt(lhit1.toFixed(0)) / (parseInt(lhit2.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				}
	  	});

	  	h1Input.addEventListener("change", function(){
	  		h1Output.innerHTML = h1Input.value;
	  	});

		h2Input.addEventListener("change", function(){
	  		h2Output.innerHTML = h2Input.value;
	  	});

	  	h3Input.addEventListener("change", function(){
	  		h3Output.innerHTML = h3Input.value;
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
					faRate.value = result.toPrecision(4);
				} else if (event.target.className == "h3faRate") {
					crRate.value = result.toPrecision(4);
				} else if (event.target.className == "h3baseRate2") {
					nbaseRate.value = result.minus(baseRate1.value);
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
			
				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
				let ps = new Decimal(popSinputNum);
				let lp = ps;
				let lb1 = ps.times(b1);
				let lb2 = ps.times(b2)
				let lnb = lp.minus(lb1).minus(lb2);

				let lhit1 = ps.times(b1).times(h1);
				let lmiss1 = lb1.minus(lhit1);
				let lhit2 = ps.times(b2).times(h2);
				let lmiss2 = lb2.minus(lhit2);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);
				

				popOutput.innerHTML = popSinput;
				baseOutput1.innerHTML = lb1.toFixed(0);
				baseOutput2.innerHTML = lb2.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit1.toFixed(0);
				hitResult_bottom1.innerHTML = lhit1.toFixed(0);
				hitResult_bottom2.innerHTML = lhit2.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);
				results.innerHTML = (parseInt(lhit1.toFixed(0)) / (parseInt(lhit2.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				sugPop.innerHTML = f_max.toNumber();

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
					faRate.value = result.toPrecision(4);
				} else if (event.target.className == "h3faRate") {
					crRate.value = result.toPrecision(4);
				} else if (event.target.className == "h3baseRate2") {
					nbaseRate.value = result.minus(baseRate1.value);
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
				
				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
				let ps = new Decimal(popSinputNum);
				let lp = ps;
				let lb1 = ps.times(b1);
				let lb2 = ps.times(b2)
				let lnb = lp.minus(lb1).minus(lb2);

				let lhit1 = ps.times(b1).times(h1);
				let lmiss1 = lb1.minus(lhit1);
				let lhit2 = ps.times(b2).times(h2);
				let lmiss2 = lb2.minus(lhit2);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);
				

				popOutput.innerHTML = popSinput;
				baseOutput1.innerHTML = lb1.toFixed(0);
				baseOutput2.innerHTML = lb2.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hitResult_sup.innerHTML = lhit1.toFixed(0);
				hitResult_bottom1.innerHTML = lhit1.toFixed(0);
				hitResult_bottom2.innerHTML = lhit2.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);
				results.innerHTML = (parseInt(lhit1.toFixed(0)) / (parseInt(lhit2.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				sugPop.innerHTML = f_max.toNumber();
			}
		}

	}else if(tree.id == "E4Tree") {
		let main = tree.firstElementChild;

		// Declare input
		let h1Input;
		let h2Input;

		let popSize;
		let popSinput;

		let baseRate;
		let nbaseRate;
		let hitRate;
		let missRate;
		let faRate;
		let crRate;
		let hitRate1;
		let missRate1;
		let hitRate2;
		let missRate2;
		let faRate1;
		let crRate1;
		let faRate2;
		let crRate2;
		

		// Declare tree output
		let popOutput;
		let baseOutput;
		let noiseOutput;
		let h1Output;
		let h2Output;

		let hit;
		let miss;
		let falseAlarm;
		let correctReject;
		let hit1;
		let miss1;
		let hit2;
		let miss2;
		let falseAlarm1;
		let correctReject1;
		let falseAlarm2;
		let correctReject2;

		let sugPop;
		

		// Probability div output
		let results;
		let hitResult1_sup;
		let hitResult2_sup;
		let hitResult1_bottom;
		let hitResult2_bottom;
		let falseAlarmResult1;
		let falseAlarmResult2;

		//Probability & Percentage btn
		let probability;
		let percentage;

		// check probability or percentage
		let isProb = true;


		// Get input and output from DOM
		for (let i = 0; i < main.children.length; i++) {
			let currChild = main.children[i];

			if (currChild.className == "hypothesis") {
				let hypoDiv = currChild;
				
				h1Input = hypoDiv.firstElementChild.firstElementChild;

				h2Input = hypoDiv.lastElementChild.lastElementChild;

			} 
			else if (currChild.className == "popSize") {
				let popDiv = currChild;
				popSize = popDiv.lastElementChild;
			}
			else if (currChild.className == "tree") {
				treeDiv = currChild;
				for (let j = 0; j < treeDiv.children.length; j++) {	
					
					let childClass = treeDiv.children[j].className;
	    			if (treeDiv.children[j].classList.contains('probability')) {
						probability = treeDiv.children[j];
					}
					else if (treeDiv.children[j].classList.contains('percentage')) {
						percentage = treeDiv.children[j]; 
					}
					else if (childClass == "c2pop_number") {
						popOutput = treeDiv.children[j];
					}
					else if (childClass == "h1Output") {
						h1Output = treeDiv.children[j];
					}
					else if (childClass == "h2Output") {
						h2Output = treeDiv.children[j];
					}
					else if (childClass == "c2baseRate") {
						baseRate = treeDiv.children[j];	
					}
					else if (childClass == "c2base") {
						baseOutput = treeDiv.children[j];
					}
					else if (childClass == "c2nbaseRate") {
						nbaseRate = treeDiv.children[j];
					}
					else if (childClass == "c2noise") {
						noiseOutput = treeDiv.children[j];
					}
					else if (childClass == "bottom") {
						
						let bottomDiv = treeDiv.children[j];

						for (let jj = 0; jj < bottomDiv.children.length; jj++) {
							
							let bottomDivClass = bottomDiv.children[jj].className;
							if (bottomDivClass == "c2hitRate") {
								hitRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c2hit") {
								hit = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c2missRate") {
								missRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c2miss") {
								miss = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c2faRate") {
								faRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c2fa") {
								falseAlarm = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c2crRate") {
								crRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c2cr") {
								correctReject = bottomDiv.children[jj];
							}
						}
					}
					else if (childClass == "bottom2") {
						
						let bottom2Div = treeDiv.children[j];

						for (let jjjjj = 0; jjjjj < bottom2Div.children.length; jjjjj++) {
							
							let bottom2DivClass = bottom2Div.children[jjjjj].className;
							
							if (bottom2DivClass == "c2hitRate1") {
								hitRate1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2hit1") {
								hit1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2hitRate2") {
								hitRate2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2hit2") {
								hit2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2missRate1") {
								missRate1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2miss1") {
								miss1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2missRate2") {
								missRate2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2miss2") {
								miss2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2faRate1") {
								faRate1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2fa1") {
								falseAlarm1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2faRate2") {
								faRate2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2fa2") {
								falseAlarm2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2crRate1") {
								crRate1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2cr1") {
								correctReject1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2crRate2") {
								crRate2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c2cr2") {
								correctReject2 = bottom2Div.children[jjjjj];
							}
						}
					}
					else if (childClass == "c2probability1") {

						let probDiv = treeDiv.children[j];

						for (let jjj = 0; jjj < probDiv.children.length; jjj++) {
							
							let probDivClass = probDiv.children[jjj].className;
							if (probDivClass == "innerProb") {

								let innerProbDiv = probDiv.children[jjj];

								for (let jjjj = 0; jjjj < innerProbDiv.children.length; jjjj++) {
									
									let innerProbClass = innerProbDiv.children[jjjj].className;

									
									if (innerProbClass == "hitResult1 prob_bottom") {
										hitResult1_bottom = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "hitResult2 prob_bottom") {
										hitResult2_bottom = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "faResult1 prob_bottom") {
										falseAlarmResult1 = innerProbDiv.children[jjjj];						
									}
									else if (innerProbClass == "faResult2 prob_bottom") {
										falseAlarmResult2 = innerProbDiv.children[jjjj];						
									}
									else if (innerProbClass == "prob_sup") {
										let subProbDiv = innerProbDiv.children[jjjj];
										for( let jjjjjj = 0; jjjjjj < subProbDiv.children.length; jjjjjj++) {
											let subProbDivClass = subProbDiv.children[jjjjjj].className;
												
											if (subProbDivClass == "hitResult1_sup") {
												hitResult1_sup = subProbDiv.children[jjjjjj];
											}
											else if (subProbDivClass == "hitResult2_sup") {
												hitResult2_sup = subProbDiv.children[jjjjjj];
												
											}
										}
									}

									
								}
							}
							else if (probDivClass == "results") {
								results = probDiv.children[jjj];
							}
							
						}
					}
					else if (childClass == "sugPop") {
							sugPop = treeDiv.children[j];
							
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
			 popOutput.innerHTML = 800;
			 baseOutput.innerHTML = 400;
			 noiseOutput.innerHTML = 400;

			 hit.innerHTML = 200;
			 miss.innerHTML = 200;
			 falseAlarm.innerHTML= 200;
			 correctReject.innerHTML = 200;
			 hit1.innerHTML = 100;
			 miss1.innerHTML = 100;
			 hit2.innerHTML = 100;
			 miss2.innerHTML = 100;
			 falseAlarm1.innerHTML = 100;
			 correctReject1.innerHTML = 100;
			 falseAlarm2.innerHTML = 100;
			 correctReject2.innerHTML = 100;


			 
			 // equation result
			 hitResult1_sup.innerHTML = 100;
			 hitResult2_sup.innerHTML = 100;
			 hitResult1_bottom.innerHTML = 100;
			 hitResult2_bottom.innerHTML = 100;
			 falseAlarmResult1.innerHTML = 100;
			 falseAlarmResult2.innerHTML = 100;

			 sugPop.innerHTML = 1000;
			 
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


			 hitRate1.value = 0.5;
			 missRate1.value = 0.5;
			 hitRate2.value = 0.5;
			 missRate2.value = 0.5;
			 faRate1.value = 0.5;
			 crRate1.value = 0.5;
			 faRate2.value = 0.5;
			 crRate2.value = 0.5;
			 

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

			 hitRate1.value = 50;
			 missRate1.value = 50;
			 hitRate2.value = 50;
			 missRate2.value = 50;
			 faRate1.value = 50;
			 crRate1.value = 50;
			 faRate2.value = 50;
			 crRate2.value = 50;

			 results.innerHTML = 50+'%';

			 probPercToggle(e);
			 OutputInitialize();

	  	});

	  	popSinput = popSize.value;

	  	popSize.addEventListener("change", function() {
	  		popSinput = popSize.value;
	  		popOutput.innerHTML = popSinput;
	  		popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
			let ps = new Decimal(popSinputNum);

				if (isProb) {
				let nb = new Decimal(nbaseRate.value);
				let h = new Decimal(hitRate.value);
				let b = new Decimal(baseRate.value);
				let m = new Decimal(missRate.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);

				let h1 = new Decimal(hitRate1.value);
				let h2 = new Decimal(hitRate2.value);
				let m1 = new Decimal(missRate1.value);
				let m2 = new Decimal(missRate2.value);
				let fa1 = new Decimal(faRate1.value);
				let cr1 = new Decimal(crRate1.value);
				let fa2 = new Decimal(faRate2.value);
				let cr2 = new Decimal(crRate2.value);


				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(lnb).times(fa);
				let lcr = ps.times(lnb).times(cr);

				let lhit1 = ps.times(b).times(h).times(h1);
				let lmiss1 = lhit.minus(lhit1);

				let lhit2 = ps.times(b).times(m).times(h2);
				let lmiss2 = lmiss.minus(lhit2);

				let lfa1 = ps.times(nb).times(fa).times(fa1);
				let lcr1 = lnb.minus(lfa1);

				let lfa2 = ps.times(nb).times(fa).times(fa2);
				let lcr2 = lnb.minus(lfa2);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);

				falseAlarm1.innerHTML = lfa1.toFixed(0);
				correctReject1.innerHTML = lcr1.toFixed(0);
				falseAlarm2.innerHTML = lfa2.toFixed(0);
				correctReject2.innerHTML = lcr2.toFixed(0);

				hitResult1_sup.innerHTML = lhit1.toFixed(0);
				hitResult2_sup.innerHTML = lhit2.toFixed(0);
				hitResult1_bottom.innerHTML = lhit1.toFixed(0);
				hitResult2_bottom.innerHTML = lhit2.toFixed(0);
				falseAlarmResult1.innerHTML = lfa1.toFixed(0);
				falseAlarmResult2.innerHTML = lfa2.toFixed(0);
				results.innerHTML = (parseInt(lhit1.plus(lhit2).toFixed(0)) / (parseInt(lhit1.plus(lhit2).toFixed(0)) + parseInt((lfa1).plus(lfa2).toFixed(0)))).toFixed(4);
				//results.innerHTML = ps.times(b).times(h).dividedBy(ps.times(b).times(h).plus(ps.times(nb).times(fa))).toNumber().toPrecision(3);
				//sugPop.innerHTML = 1000;
				}
				else {
					let nb = new Decimal(nbaseRate.value).dividedBy(100);
					let h = new Decimal(hitRate.value).dividedBy(100);
					let b = new Decimal(baseRate.value).dividedBy(100);
					let m = new Decimal(missRate.value).dividedBy(100);
					let fa = new Decimal(faRate.value).dividedBy(100);
					let cr = new Decimal(crRate.value).dividedBy(100);

					let h1 = new Decimal(hitRate1.value).dividedBy(100);
					let h2 = new Decimal(hitRate2.value).dividedBy(100);
					let m1 = new Decimal(missRate1.value).dividedBy(100);
					let m2 = new Decimal(missRate2.value).dividedBy(100);
					let fa1 = new Decimal(faRate1.value).dividedBy(100);
					let cr1 = new Decimal(crRate1.value).dividedBy(100);
					let fa2 = new Decimal(faRate2.value).dividedBy(100);
					let cr2 = new Decimal(crRate2.value).dividedBy(100);

					let lp = ps;
					let lb = ps.times(b);
					let lnb = lp.minus(lb);

					let lhit = ps.times(b).times(h);
					let lmiss = lb.minus(lhit);
					let lfa = ps.times(lnb).times(fa);
					let lcr = ps.times(lnb).times(cr);

					let lhit1 = ps.times(b).times(h).times(h1);
					let lmiss1 = lhit.minus(lhit1);

					let lhit2 = ps.times(b).times(m).times(h2);
					let lmiss2 = lmiss.minus(lhit2);

					let lfa1 = ps.times(nb).times(fa).times(fa1);
					let lcr1 = lnb.minus(lfa1);

					let lfa2 = ps.times(nb).times(fa).times(fa2);
					let lcr2 = lnb.minus(lfa2);

					popOutput.innerHTML = popSinput;
					baseOutput.innerHTML = lb.toFixed(0);
					noiseOutput.innerHTML = lnb.toFixed(0);

					hit.innerHTML = lhit.toFixed(0);
					miss.innerHTML = lmiss.toFixed(0);
					falseAlarm.innerHTML = lfa.toFixed(0);
					correctReject.innerHTML = lcr.toFixed(0);

					hit1.innerHTML = lhit1.toFixed(0);
					miss1.innerHTML = lmiss1.toFixed(0);
					hit2.innerHTML = lhit2.toFixed(0);
					miss2.innerHTML = lmiss2.toFixed(0);

					falseAlarm1.innerHTML = lfa1.toFixed(0);
					correctReject1.innerHTML = lcr1.toFixed(0);
					falseAlarm2.innerHTML = lfa2.toFixed(0);
					correctReject2.innerHTML = lcr2.toFixed(0);

					hitResult1_sup.innerHTML = lhit1.toFixed(0);
					hitResult2_sup.innerHTML = lhit2.toFixed(0);
					hitResult1_bottom.innerHTML = lhit1.toFixed(0);
					hitResult2_bottom.innerHTML = lhit2.toFixed(0);
					falseAlarmResult1.innerHTML = lfa1.toFixed(0);
					falseAlarmResult2.innerHTML = lfa2.toFixed(0);
					results.innerHTML = (parseInt(lhit1.plus(lhit2).toFixed(0)) / (parseInt(lhit1.plus(lhit2).toFixed(0)) + parseInt((lfa1).plus(lfa2).toFixed(0)))).toFixed(4);
				}
	  	});

	  	h1Input.addEventListener("change", function(){
	  		h1Output.innerHTML = h1Input.value;
	  	});

		h2Input.addEventListener("change", function(){
	  		h2Output.innerHTML = h2Input.value;
	  	});

	    baseRate.addEventListener("change", changeEventHandler);
		nbaseRate.addEventListener("change", changeEventHandler);
		
		hitRate.addEventListener("change", changeEventHandler);
		missRate.addEventListener("change", changeEventHandler);
		faRate.addEventListener("change", changeEventHandler);
		crRate.addEventListener("change", changeEventHandler);

		hitRate1.addEventListener("change", changeEventHandler);
		missRate1.addEventListener("change", changeEventHandler);
		hitRate2.addEventListener("change", changeEventHandler);
		missRate2.addEventListener("change", changeEventHandler);
		faRate1.addEventListener("change", changeEventHandler);
		crRate1.addEventListener("change", changeEventHandler);
		faRate2.addEventListener("change", changeEventHandler);
		crRate2.addEventListener("change", changeEventHandler);


		

		function changeEventHandler(event) {
			let one, targetValue, result;
			popSinput = popSize.value;
	  		popOutput.innerHTML = popSinput;
	  		popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
			let ps = new Decimal(popSinputNum);
			// probability
			if (isProb) {
				if (event.target.value < 0 || event.target.value > 1) {	
					alert("Please enter probability between 0 and 1");
					return;
				}

				one = new Decimal(1);
				targetValue = new Decimal(event.target.value);
				result = one.minus(targetValue);

				if (event.target.className == "c2hitRate") {
					missRate.value = result.toPrecision(4);
				} else if (event.target.className == "c2missRate") {
					hitRate.value = result.toPrecision(4);
				} else if (event.target.className == "c2hitRate1") {
					missRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c2missRate1") {
					hitRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c2hitRate2") {
					missRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c2missRate2") {
					hitRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c2crRate1") {
					faRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c2faRate1") {
					crRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c2crRate2") {
					faRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c2faRate2") {
					crRate2.value = result.toPrecision(4);
				} else if(event.target.className == "c2faRate") {
					crRate.value = result.toPrecision(4);
				} else if(event.target.className == "c2crRate") {
					faRate.value = result.toPrecision(4);
				} else if (event.target.className == "c2baseRate") {
					nbaseRate.value = result.toPrecision(4);
				} else if (event.target.className == "c2nbaseRate") {
					baseRate.value = result.toPrecision(4);
				} 

				let nb = new Decimal(nbaseRate.value);
				let b = new Decimal(baseRate.value);

				let h  = new Decimal(hitRate.value);
				let m  = new Decimal(missRate.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);

				let h1 = new Decimal(hitRate1.value);
				let h2 = new Decimal(hitRate2.value);
				let m1 = new Decimal(missRate1.value);
				let m2 = new Decimal(missRate2.value);
				let fa1 = new Decimal(faRate1.value);
				let cr1 = new Decimal(crRate1.value);
				let fa2 = new Decimal(faRate2.value);
				let cr2 = new Decimal(crRate2.value);

				let fhit1 = h1.times(h).times(b);
				let fhit2 = h2.times(m).times(b);
				let fmiss1 = m1.times(h).times(b);
				let fmiss2 = m2.times(m).times(b);
				let ffa1 = fa1.times(fa).times(nb);
				let fcr1 =cr1.times(fa).times(nb);
				let ffa2 = fa2.times(cr).times(nb);
				let fcr2 = cr2.times(cr).times(nb);
				

				// Results
				let f_max = c2_max_factor(fhit1,fhit2,fmiss1,fmiss2,ffa1,fcr1,ffa2,fcr2);
				

				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(lnb).times(fa);
				let lcr = ps.times(lnb).times(cr);

				let lhit1 = ps.times(b).times(h).times(h1);
				let lmiss1 = lhit.minus(lhit1);

				let lhit2 = ps.times(b).times(m).times(h2);
				let lmiss2 = lmiss.minus(lhit2);

				let lfa1 = ps.times(nb).times(fa).times(fa1);
				let lcr1 = lnb.minus(lfa1);

				let lfa2 = ps.times(nb).times(fa).times(fa2);
				let lcr2 = lnb.minus(lfa2);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);

				falseAlarm1.innerHTML = lfa1.toFixed(0);
				correctReject1.innerHTML = lcr1.toFixed(0);
				falseAlarm2.innerHTML = lfa2.toFixed(0);
				correctReject2.innerHTML = lcr2.toFixed(0);

				hitResult1_sup.innerHTML = lhit1.toFixed(0);
				hitResult2_sup.innerHTML = lhit2.toFixed(0);
				hitResult1_bottom.innerHTML = lhit1.toFixed(0);
				hitResult2_bottom.innerHTML = lhit2.toFixed(0);
				falseAlarmResult1.innerHTML = lfa1.toFixed(0);
				falseAlarmResult2.innerHTML = lfa2.toFixed(0);
				results.innerHTML = (parseInt(lhit1.plus(lhit2).toFixed(0)) / (parseInt(lhit1.plus(lhit2).toFixed(0)) + parseInt((lfa1).plus(lfa2).toFixed(0)))).toFixed(4);

				sugPop.innerHTML = f_max;

			} else {
			
				//Percentage

				if (event.target.value < 0 || event.target.value > 100) {	
				alert("Please enter percentage between 0 and 100");
				return;
				}
				result = new Decimal(100 - event.target.value);
				
				
				
				if (event.target.className == "c2hitRate") {
					missRate.value = result.toPrecision(4);
				} else if (event.target.className == "c2missRate") {
					hitRate.value = result.toPrecision(4);
				} else if (event.target.className == "c2hitRate1") {
					missRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c2missRate1") {
					hitRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c2hitRate2") {
					missRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c2missRate2") {
					hitRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c2crRate1") {
					faRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c2faRate1") {
					crRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c2crRate2") {
					faRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c2faRate2") {
					crRate2.value = result.toPrecision(4);
				} else if(event.target.className == "c2faRate") {
					crRate.value = result.toPrecision(4);
				} else if(event.target.className == "c2crRate") {
					faRate.value = result.toPrecision(4);
				} else if (event.target.className == "c2baseRate") {
					nbaseRate.value = result.toPrecision(4);
				} else if (event.target.className == "c2nbaseRate") {
					baseRate.value = result.toPrecision(4);
				}

				let nb = new Decimal(nbaseRate.value).dividedBy(100);
				let b = new Decimal(baseRate.value).dividedBy(100);

				let h  = new Decimal(hitRate.value).dividedBy(100);
				let m  = new Decimal(missRate.value).dividedBy(100);
				let fa = new Decimal(faRate.value).dividedBy(100);
				let cr = new Decimal(crRate.value).dividedBy(100);

				let h1 = new Decimal(hitRate1.value).dividedBy(100);
				let h2 = new Decimal(hitRate2.value).dividedBy(100);
				let m1 = new Decimal(missRate1.value).dividedBy(100);
				let m2 = new Decimal(missRate2.value).dividedBy(100);
				let fa1 = new Decimal(faRate1.value).dividedBy(100);
				let cr1 = new Decimal(crRate1.value).dividedBy(100);
				let fa2 = new Decimal(faRate2.value).dividedBy(100);
				let cr2 = new Decimal(crRate2.value).dividedBy(100);

				let fhit1 = h1.times(h).times(b);
				let fhit2 = h2.times(m).times(b);
				let fmiss1 = m1.times(h).times(b);
				let fmiss2 = m2.times(m).times(b);
				let ffa1 = fa1.times(fa).times(nb);
				let fcr1 =cr1.times(fa).times(nb);
				let ffa2 = fa2.times(cr).times(nb);
				let fcr2 = cr2.times(cr).times(nb);


				// Results
				let f_max = c2_max_factor(fhit1,fhit2,fmiss1,fmiss2,ffa1,fcr1,ffa2,fcr2);
				
				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(lnb).times(fa);
				let lcr = ps.times(lnb).times(cr);

				let lhit1 = ps.times(b).times(h).times(h1);
				let lmiss1 = lhit.minus(lhit1);

				let lhit2 = ps.times(b).times(m).times(h2);
				let lmiss2 = lmiss.minus(lhit2);

				let lfa1 = ps.times(nb).times(fa).times(fa1);
				let lcr1 = lnb.minus(lfa1);

				let lfa2 = ps.times(nb).times(fa).times(fa2);
				let lcr2 = lnb.minus(lfa2);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);

				falseAlarm1.innerHTML = lfa1.toFixed(0);
				correctReject1.innerHTML = lcr1.toFixed(0);
				falseAlarm2.innerHTML = lfa2.toFixed(0);
				correctReject2.innerHTML = lcr2.toFixed(0);

				hitResult1_sup.innerHTML = lhit1.toFixed(0);
				hitResult2_sup.innerHTML = lhit2.toFixed(0);
				hitResult1_bottom.innerHTML = lhit1.toFixed(0);
				hitResult2_bottom.innerHTML = lhit2.toFixed(0);
				falseAlarmResult1.innerHTML = lfa1.toFixed(0);
				falseAlarmResult2.innerHTML = lfa2.toFixed(0);
				results.innerHTML = (parseInt(lhit1.plus(lhit2).toFixed(0)) / (parseInt(lhit1.plus(lhit2).toFixed(0)) + parseInt((lfa1).plus(lfa2).toFixed(0)))).toFixed(4);

				sugPop.innerHTML = f_max;
			}
		}

	}else if(tree.id == "E5Tree") {
		let main = tree.firstElementChild;

		// Declare input
		let h1Input;
		let h2Input;

		let popSize;
		let popSinput;

		let baseRate;
		let nbaseRate;
		let hitRate;
		let missRate;
		let faRate;
		let crRate;

		let hitRate1;
		let missRate1;
		let hitRate2;
		let missRate2;
		let faRate1;
		let crRate1;
		let faRate2;
		let crRate2;

		let hitRate11;
		let missRate11;
		let hitRate12;
		let missRate12;
		let hitRate21;
		let missRate21;
		let hitRate22;
		let missRate22;

		let faRate11;
		let crRate11;
		let faRate12;
		let crRate12;
		let faRate21;
		let crRate21;
		let faRate22;
		let crRate22;

		let sugPop;
		
		// Declare tree output
		let popOutput;
		let baseOutput;
		let noiseOutput;

		let h1Output;
		let h2Output;

		let hit;
		let miss;
		let falseAlarm;
		let correctReject;

		let hit1;
		let miss1;
		let hit2;
		let miss2;
		let falseAlarm1;
		let correctReject1;
		let falseAlarm2;
		let correctReject2;

		let hit11;
		let miss11;
		let hit12;
		let miss12;
		let hit21;
		let miss21;
		let hit22;
		let miss22;

		let falseAlarm11;
		let correctReject11;
		let falseAlarm12;
		let correctReject12;
		let falseAlarm21;
		let correctReject21;
		let falseAlarm22;
		let correctReject22;
		

		// Probability div output
		let results;
		let hitResult1_sup;
		let hitResult2_sup;
		let hitResult3_sup;
		let hitResult4_sup;

		let hitResult1_bottom;
		let hitResult2_bottom;
		let hitResult3_bottom;
		let hitResult4_bottom;
		let falseAlarmResult1;
		let falseAlarmResult2;
		let falseAlarmResult3;
		let falseAlarmResult4;

		//Probability & Percentage btn
		let probability;
		let percentage;

		// check probability or percentage
		let isProb = true;


		// Get input and output from DOM
		for (let i = 0; i < main.children.length; i++) {
			let currChild = main.children[i];
			if (currChild.className == "hypothesis") {
				let hypoDiv = currChild;
				
				h1Input = hypoDiv.firstElementChild.firstElementChild;
				h2Input = hypoDiv.lastElementChild.lastElementChild;

			} 
			else if (currChild.className == "popSize") {
				let popDiv = currChild;
				popSize = popDiv.lastElementChild;
			}
			else if (currChild.className == "tree") {
				treeDiv = currChild;
				for (let j = 0; j < treeDiv.children.length; j++) {	
					
					let childClass = treeDiv.children[j].className;
	    			if (treeDiv.children[j].classList.contains('probability')) {
						probability = treeDiv.children[j];
					}
					else if (treeDiv.children[j].classList.contains('percentage')) {
						percentage = treeDiv.children[j]; 
					}
					else if (childClass == "c3pop_number") {
						popOutput = treeDiv.children[j];
					}
					else if (childClass == "h1Output") {
						h1Output = treeDiv.children[j];
						
					}
					else if (childClass == "h2Output") {
						h2Output = treeDiv.children[j];
						
					}
					else if (childClass == "c3baseRate") {
						baseRate = treeDiv.children[j];	
					}
					else if (childClass == "c3base") {
						baseOutput = treeDiv.children[j];
					}
					else if (childClass == "c3nbaseRate") {
						nbaseRate = treeDiv.children[j];
					}
					else if (childClass == "c3noise") {
						noiseOutput = treeDiv.children[j];
					}
					else if (childClass == "bottom") {
						
						let bottomDiv = treeDiv.children[j];

						for (let jj = 0; jj < bottomDiv.children.length; jj++) {
							
							let bottomDivClass = bottomDiv.children[jj].className;
							if (bottomDivClass == "c3hitRate") {
								hitRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c3hit") {
								hit = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c3missRate") {
								missRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c3miss") {
								miss = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c3faRate") {
								faRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c3fa") {
								falseAlarm = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c3crRate") {
								crRate = bottomDiv.children[jj];
							}
							else if (bottomDivClass == "c3cr") {
								correctReject = bottomDiv.children[jj];
							}
						}
					}
					else if (childClass == "bottom2") {
						
						let bottom2Div = treeDiv.children[j];

						for (let jjjjj = 0; jjjjj < bottom2Div.children.length; jjjjj++) {
							
							let bottom2DivClass = bottom2Div.children[jjjjj].className;
							
							if (bottom2DivClass == "c3hitRate1") {
								hitRate1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3hit1") {
								hit1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3hitRate2") {
								hitRate2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3hit2") {
								hit2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3missRate1") {
								missRate1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3miss1") {
								miss1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3missRate2") {
								missRate2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3miss2") {
								miss2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3faRate1") {
								faRate1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3fa1") {
								falseAlarm1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3faRate2") {
								faRate2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3fa2") {
								falseAlarm2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3crRate1") {
								crRate1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3cr1") {
								correctReject1 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3crRate2") {
								crRate2 = bottom2Div.children[jjjjj];
							}
							else if (bottom2DivClass == "c3cr2") {
								correctReject2 = bottom2Div.children[jjjjj];
							}
						}
					} 
					else if (childClass == "bottom3") {
						let bottom3Div = treeDiv.children[j];
						for (let jjjjjjj = 0; jjjjjjj < bottom3Div.children.length; jjjjjjj++) {

							let bottom3DivClass = bottom3Div.children[jjjjjjj].className;

							if (bottom3DivClass == "c3hitRate11") {
								hitRate11 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3hit11") {
								hit11 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3hitRate12") {
								hitRate12 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3hit12") {
								hit12 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3hitRate21") {
								hitRate21 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3hit21") {
								hit21 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3hitRate22") {
								hitRate22 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3hit22") {
								hit22 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3missRate11") {
								missRate11 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3miss11") {
								miss11 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3missRate12") {
								missRate12 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3miss12") {
								miss12 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3missRate21") {
								missRate21 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3miss21") {
								miss21 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3missRate22") {
								missRate22 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3miss22") {
								miss22 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3faRate11") {
								faRate11 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3fa11") {
								falseAlarm11 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3faRate12") {
								faRate12 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3fa12") {
								falseAlarm12 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3faRate21") {
								faRate21 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3fa21") {
								falseAlarm21 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3faRate22") {
								faRate22 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3fa22") {
								falseAlarm22 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3crRate11") {
								crRate11 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3cr11") {
								correctReject11 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3crRate12") {
								crRate12 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3cr12") {
								correctReject12 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3crRate21") {
								crRate21 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3cr21") {
								correctReject21 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3crRate22") {
								crRate22 = bottom3Div.children[jjjjjjj];
							}
							else if (bottom3DivClass == "c3cr22") {
								correctReject22 = bottom3Div.children[jjjjjjj];
							}


						}

					}
					else if (childClass == "c3probability1") {

						let probDiv = treeDiv.children[j];

						for (let jjj = 0; jjj < probDiv.children.length; jjj++) {
							
							let probDivClass = probDiv.children[jjj].className;
							if (probDivClass == "innerProb") {

								let innerProbDiv = probDiv.children[jjj];

								for (let jjjj = 0; jjjj < innerProbDiv.children.length; jjjj++) {
									
									let innerProbClass = innerProbDiv.children[jjjj].className;

									
									if (innerProbClass == "hitResult1 prob_bottom") {
										hitResult1_bottom = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "hitResult2 prob_bottom") {
										hitResult2_bottom = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "hitResult3 prob_bottom") {
										hitResult3_bottom = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "hitResult4 prob_bottom") {
										hitResult4_bottom = innerProbDiv.children[jjjj];
									}
									else if (innerProbClass == "faResult1 prob_bottom") {
										falseAlarmResult1 = innerProbDiv.children[jjjj];						
									}
									else if (innerProbClass == "faResult2 prob_bottom") {
										falseAlarmResult2 = innerProbDiv.children[jjjj];						
									}
									else if (innerProbClass == "faResult3 prob_bottom") {
										falseAlarmResult3 = innerProbDiv.children[jjjj];						
									}
									else if (innerProbClass == "faResult4 prob_bottom") {
										falseAlarmResult4 = innerProbDiv.children[jjjj];						
									}
									else if (innerProbClass == "prob_sup") {
										let subProbDiv = innerProbDiv.children[jjjj];
										for( let jjjjjj = 0; jjjjjj < subProbDiv.children.length; jjjjjj++) {
											let subProbDivClass = subProbDiv.children[jjjjjj].className;
												
											if (subProbDivClass == "hitResult1_sup") {
												hitResult1_sup = subProbDiv.children[jjjjjj];
											}
											else if (subProbDivClass == "hitResult2_sup") {
												hitResult2_sup = subProbDiv.children[jjjjjj];	
											}
											else if (subProbDivClass == "hitResult3_sup") {
												hitResult3_sup = subProbDiv.children[jjjjjj];	
											}
											else if (subProbDivClass == "hitResult4_sup") {
												hitResult4_sup = subProbDiv.children[jjjjjj];	
											}
										}
									}

									
								}
							}
							else if (probDivClass == "results") {
								results = probDiv.children[jjj];
							}
							
						}
					}
					else if (childClass == "sugPop") {
							sugPop = treeDiv.children[j];
							
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
			 popOutput.innerHTML = 800;
			 baseOutput.innerHTML = 400;
			 noiseOutput.innerHTML = 400;

			 hit.innerHTML = 200;
			 miss.innerHTML = 200;
			 falseAlarm.innerHTML= 200;
			 correctReject.innerHTML = 200;

			 hit1.innerHTML = 100;
			 miss1.innerHTML = 100;
			 hit2.innerHTML = 100;
			 miss2.innerHTML = 100;
			 falseAlarm1.innerHTML = 100;
			 correctReject1.innerHTML = 100;
			 falseAlarm2.innerHTML = 100;
			 correctReject2.innerHTML = 100;

			 hit11.innerHTML = 50;
			 hit12.innerHTML = 50;
			 hit21.innerHTML = 50;
			 hit22.innerHTML = 50;

			 miss11.innerHTML = 50;
			 miss12.innerHTML = 50;
			 miss21.innerHTML = 50;
			 miss22.innerHTML = 50;

			 falseAlarm11.innerHTML = 50;
			 falseAlarm12.innerHTML = 50;
			 falseAlarm21.innerHTML = 50;
			 falseAlarm22.innerHTML = 50;

			 correctReject11.innerHTML = 50;
			 correctReject12.innerHTML = 50;
			 correctReject21.innerHTML = 50;
			 correctReject22.innerHTML = 50;


			 
			 // equation result
			 hitResult1_sup.innerHTML = 50;
			 hitResult2_sup.innerHTML = 50;
			 hitResult3_sup.innerHTML = 50;
			 hitResult4_sup.innerHTML = 50;
			 hitResult1_bottom.innerHTML = 50;
			 hitResult2_bottom.innerHTML = 50;
			 hitResult3_bottom.innerHTML = 50;
			 hitResult4_bottom.innerHTML = 50;
			 falseAlarmResult1.innerHTML = 50;
			 falseAlarmResult2.innerHTML = 50;
			 falseAlarmResult3.innerHTML = 50;
			 falseAlarmResult4.innerHTML = 50;
			 
			 sugPop.innerHTML = 1000;
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


			 hitRate1.value = 0.5;
			 missRate1.value = 0.5;
			 hitRate2.value = 0.5;
			 missRate2.value = 0.5;
			 faRate1.value = 0.5;
			 crRate1.value = 0.5;
			 faRate2.value = 0.5;
			 crRate2.value = 0.5;

			 hitRate11.value = 0.5;
			 missRate11.value = 0.5;
			 hitRate12.value = 0.5;
			 missRate12.value = 0.5;

			 hitRate21.value = 0.5;
			 missRate21.value = 0.5;
			 hitRate22.value = 0.5;
			 missRate22.value = 0.5;

			 faRate11.value = 0.5;
			 crRate11.value = 0.5;
			 faRate12.value = 0.5;
			 crRate12.value = 0.5;

			 faRate21.value = 0.5;
			 crRate21.value = 0.5;
			 faRate22.value = 0.5;
			 crRate22.value = 0.5;
			 

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

			 hitRate1.value = 50;
			 missRate1.value = 50;
			 hitRate2.value = 50;
			 missRate2.value = 50;
			 faRate1.value = 50;
			 crRate1.value = 50;
			 faRate2.value = 50;
			 crRate2.value = 50;

			 hitRate11.value = 50;
			 missRate11.value = 50;
			 hitRate12.value = 50;
			 missRate12.value = 50;

			 hitRate21.value = 50;
			 missRate21.value = 50;
			 hitRate22.value = 50;
			 missRate22.value = 50;

			 faRate11.value = 50;
			 crRate11.value = 50;
			 faRate12.value = 50;
			 crRate12.value = 50;

			 faRate21.value = 50;
			 crRate21.value = 50;
			 faRate22.value = 50;
			 crRate22.value = 50;

			 results.innerHTML = 50+'%';

			 probPercToggle(e);
			 OutputInitialize();

	  	});

	  	popSinput = popSize.value;

	  	popSize.addEventListener("change", function() {
	  		popSinput = popSize.value;
	  		popOutput.innerHTML = popSinput;
	  		popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
			let ps = new Decimal(popSinputNum);

				if (isProb) {
			
				let nb = new Decimal(nbaseRate.value);
				let b = new Decimal(baseRate.value);

				let h  = new Decimal(hitRate.value);
				let m  = new Decimal(missRate.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);

				let h1 = new Decimal(hitRate1.value);
				let h2 = new Decimal(hitRate2.value);
				let m1 = new Decimal(missRate1.value);
				let m2 = new Decimal(missRate2.value);
				let fa1 = new Decimal(faRate1.value);
				let cr1 = new Decimal(crRate1.value);
				let fa2 = new Decimal(faRate2.value);
				let cr2 = new Decimal(crRate2.value);

				let h11 = new Decimal(hitRate11.value);
				let h12 = new Decimal(hitRate12.value);
				let h21 = new Decimal(hitRate21.value);
				let h22 = new Decimal(hitRate22.value);

				let m11 = new Decimal(missRate11.value);
				let m12 = new Decimal(missRate12.value);
				let m21 = new Decimal(missRate21.value);
				let m22 = new Decimal(missRate22.value);

				let fa11 = new Decimal(faRate11.value);
				let cr11 = new Decimal(crRate11.value);
				let fa12 = new Decimal(faRate12.value);
				let cr12 = new Decimal(crRate12.value);

				let fa21 = new Decimal(faRate21.value);
				let cr21 = new Decimal(crRate21.value);
				let fa22 = new Decimal(faRate22.value);
				let cr22 = new Decimal(crRate22.value);


				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);

				let lhit1 = ps.times(b).times(h).times(h1);
				let lmiss1 = lhit.minus(lhit1);

				let lhit2 = ps.times(b).times(m).times(h2);
				let lmiss2 = lmiss.minus(lhit2);

				let lfa1 = ps.times(nb).times(fa).times(fa1);
				let lcr1 = lnb.minus(lfa1);

				let lfa2 = ps.times(nb).times(fa).times(fa2);
				let lcr2 = lnb.minus(lfa2);

				let lhit11 = ps.times(b).times(h).times(h1).times(h11);
				let lmiss11 = lhit1.minus(lhit11);

				let lhit12 = ps.times(b).times(h).times(h1).times(h12);
				let lmiss12 = lmiss1.minus(lhit12);

				let lhit21 = ps.times(b).times(m).times(h2).times(h21);
				let lmiss21 = lhit2.minus(lhit21);

				let lhit22 = ps.times(b).times(m).times(h2).times(h22);
				let lmiss22 = lmiss2.minus(lhit22);

				let lfa11 = ps.times(nb).times(fa).times(fa1).times(fa11);
				let lcr11 = lfa1.minus(lfa11);

				let lfa12 = ps.times(nb).times(fa).times(fa1).times(fa12);
				let lcr12 = lcr1.minus(lfa12);

				let lfa21 = ps.times(nb).times(cr).times(fa2).times(fa21);
				let lcr21 = lfa2.minus(lfa21);

				let lfa22 = ps.times(nb).times(cr).times(fa2).times(fa22);
				let lcr22 = lcr2.minus(lfa22);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);
				falseAlarm1.innerHTML = lfa1.toFixed(0);
				correctReject1.innerHTML = lcr1.toFixed(0);
				falseAlarm2.innerHTML = lfa2.toFixed(0);
				correctReject2.innerHTML = lcr2.toFixed(0);

				hit11.innerHTML = lhit11.toFixed(0);
				hit12.innerHTML = lhit12.toFixed(0);
				hit21.innerHTML = lhit21.toFixed(0);
				hit22.innerHTML = lhit22.toFixed(0);
				miss11.innerHTML = lmiss11.toFixed(0);
				miss12.innerHTML = lmiss12.toFixed(0);
				miss21.innerHTML = lmiss21.toFixed(0);
				miss22.innerHTML = lmiss22.toFixed(0);

				falseAlarm11.innerHTML = lfa11.toFixed(0);
				falseAlarm12.innerHTML = lfa12.toFixed(0);
				falseAlarm21.innerHTML = lfa21.toFixed(0);
				falseAlarm22.innerHTML = lfa22.toFixed(0);

				correctReject11.innerHTML = lcr11.toFixed(0);
				correctReject12.innerHTML = lcr12.toFixed(0);
				correctReject21.innerHTML = lcr21.toFixed(0);
				correctReject22.innerHTML = lcr22.toFixed(0);

				hitResult_sup.innerHTML = lhit.toFixed(0);
				hitResult_bottom.innerHTML = lhit.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);

				let up_equation = lhit11.plus(lhit12).plus(lhit21).plus(lhit22);
				let down_equation = lhit11.plus(lhit12).plus(lhit21).plus(lhit22).plus(lfa11).plus(lfa12).plus(lfa21).plus(lfa22);
				results.innerHTML = (parseInt(up_equation.toFixed(0))).dividedBy(parseInt(down_equation.toFixed(0)).toFixed(4));
				//results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				//results.innerHTML = ps.times(b).times(h).dividedBy(ps.times(b).times(h).plus(ps.times(nb).times(fa))).toNumber().toPrecision(3);
				}
				else {
					
					let nb = new Decimal(nbaseRate.value).dividedBy(100);
					let b = new Decimal(baseRate.value).dividedBy(100);

					let h  = new Decimal(hitRate.value).dividedBy(100);
					let m  = new Decimal(missRate.value).dividedBy(100);
					let fa = new Decimal(faRate.value).dividedBy(100);
					let cr = new Decimal(crRate.value).dividedBy(100);

					let h1 = new Decimal(hitRate1.value).dividedBy(100);
					let h2 = new Decimal(hitRate2.value).dividedBy(100);
					let m1 = new Decimal(missRate1.value).dividedBy(100);
					let m2 = new Decimal(missRate2.value).dividedBy(100);
					let fa1 = new Decimal(faRate1.value).dividedBy(100);
					let cr1 = new Decimal(crRate1.value).dividedBy(100);
					let fa2 = new Decimal(faRate2.value).dividedBy(100);
					let cr2 = new Decimal(crRate2.value).dividedBy(100);

					let h11 = new Decimal(hitRate11.value).dividedBy(100);
					let h12 = new Decimal(hitRate12.value).dividedBy(100);
					let h21 = new Decimal(hitRate21.value).dividedBy(100);
					let h22 = new Decimal(hitRate22.value).dividedBy(100);

					let m11 = new Decimal(missRate11.value).dividedBy(100);
					let m12 = new Decimal(missRate12.value).dividedBy(100);
					let m21 = new Decimal(missRate21.value).dividedBy(100);
					let m22 = new Decimal(missRate22.value).dividedBy(100);

					let fa11 = new Decimal(faRate11.value).dividedBy(100);
					let cr11 = new Decimal(crRate11.value).dividedBy(100);
					let fa12 = new Decimal(faRate12.value).dividedBy(100);
					let cr12 = new Decimal(crRate12.value).dividedBy(100);

					let fa21 = new Decimal(faRate21.value).dividedBy(100);
					let cr21 = new Decimal(crRate21.value).dividedBy(100);
					let fa22 = new Decimal(faRate22.value).dividedBy(100);
					let cr22 = new Decimal(crRate22.value).dividedBy(100);

			
					let lp = ps;
					let lb = ps.times(b);
					let lnb = lp.minus(lb);

					let lhit = ps.times(b).times(h);
					let lmiss = lb.minus(lhit);
					let lfa = ps.times(nb).times(fa);
					let lcr = lnb.minus(lfa);

					let lhit1 = ps.times(b).times(h).times(h1);
					let lmiss1 = lhit.minus(lhit1);

					let lhit2 = ps.times(b).times(m).times(h2);
					let lmiss2 = lmiss.minus(lhit2);

					let lfa1 = ps.times(nb).times(fa).times(fa1);
					let lcr1 = lnb.minus(lfa1);

					let lfa2 = ps.times(nb).times(fa).times(fa2);
					let lcr2 = lnb.minus(lfa2);

					let lhit11 = ps.times(b).times(h).times(h1).times(h11);
					let lmiss11 = lhit1.minus(lhit11);

					let lhit12 = ps.times(b).times(h).times(h1).times(h12);
					let lmiss12 = lmiss1.minus(lhit12);

					let lhit21 = ps.times(b).times(m).times(h2).times(h21);
					let lmiss21 = lhit2.minus(lhit21);

					let lhit22 = ps.times(b).times(m).times(h2).times(h22);
					let lmiss22 = lmiss2.minus(lhit22);

					let lfa11 = ps.times(nb).times(fa).times(fa1).times(fa11);
					let lcr11 = lfa1.minus(lfa11);

					let lfa12 = ps.times(nb).times(fa).times(fa1).times(fa12);
					let lcr12 = lcr1.minus(lfa12);

					let lfa21 = ps.times(nb).times(cr).times(fa2).times(fa21);
					let lcr21 = lfa2.minus(lfa21);

					let lfa22 = ps.times(nb).times(cr).times(fa2).times(fa22);
					let lcr22 = lcr2.minus(lfa22);

					popOutput.innerHTML = popSinput;
					baseOutput.innerHTML = lb.toFixed(0);
					noiseOutput.innerHTML = lnb.toFixed(0);

					hit.innerHTML = lhit.toFixed(0);
					miss.innerHTML = lmiss.toFixed(0);
					falseAlarm.innerHTML = lfa.toFixed(0);
					correctReject.innerHTML = lcr.toFixed(0);

					hit1.innerHTML = lhit1.toFixed(0);
					hit2.innerHTML = lhit2.toFixed(0);
					miss1.innerHTML = lmiss1.toFixed(0);
					miss2.innerHTML = lmiss2.toFixed(0);
					falseAlarm1.innerHTML = lfa1.toFixed(0);
					correctReject1.innerHTML = lcr1.toFixed(0);
					falseAlarm2.innerHTML = lfa2.toFixed(0);
					correctReject2.innerHTML = lcr2.toFixed(0);

					hit11.innerHTML = lhit11.toFixed(0);
					hit12.innerHTML = lhit12.toFixed(0);
					hit21.innerHTML = lhit21.toFixed(0);
					hit22.innerHTML = lhit22.toFixed(0);
					miss11.innerHTML = lmiss11.toFixed(0);
					miss12.innerHTML = lmiss12.toFixed(0);
					miss21.innerHTML = lmiss21.toFixed(0);
					miss22.innerHTML = lmiss22.toFixed(0);

					falseAlarm11.innerHTML = lfa11.toFixed(0);
					falseAlarm12.innerHTML = lfa12.toFixed(0);
					falseAlarm21.innerHTML = lfa21.toFixed(0);
					falseAlarm22.innerHTML = lfa22.toFixed(0);

					correctReject11.innerHTML = lcr11.toFixed(0);
					correctReject12.innerHTML = lcr12.toFixed(0);
					correctReject21.innerHTML = lcr21.toFixed(0);
					correctReject22.innerHTML = lcr22.toFixed(0);

					hitResult_sup.innerHTML = lhit.toFixed(0);
					hitResult_bottom.innerHTML = lhit.toFixed(0);
					falseAlarmResult.innerHTML = lfa.toFixed(0);

					let up_equation = lhit11.plus(lhit12).plus(lhit21).plus(lhit22);
					let down_equation = lhit11.plus(lhit12).plus(lhit21).plus(lhit22).plus(lfa11).plus(lfa12).plus(lfa21).plus(lfa22);
					results.innerHTML = (parseInt(up_equation.toFixed(0))).dividedBy(parseInt(down_equation.toFixed(0)).toFixed(4));
				}
	  	});

	  	h1Input.addEventListener("change", function(){
	  		h1Output.innerHTML = h1Input.value;
	  	});

		h2Input.addEventListener("change", function(){
	  		h2Output.innerHTML = h2Input.value;
	  	});

	    baseRate.addEventListener("change", changeEventHandler);
		nbaseRate.addEventListener("change", changeEventHandler);
		
		hitRate.addEventListener("change", changeEventHandler);
		missRate.addEventListener("change", changeEventHandler);
		faRate.addEventListener("change", changeEventHandler);
		crRate.addEventListener("change", changeEventHandler);

		hitRate1.addEventListener("change", changeEventHandler);
		missRate1.addEventListener("change", changeEventHandler);
		hitRate2.addEventListener("change", changeEventHandler);
		missRate2.addEventListener("change", changeEventHandler);
		faRate1.addEventListener("change", changeEventHandler);
		crRate1.addEventListener("change", changeEventHandler);
		faRate2.addEventListener("change", changeEventHandler);
		crRate2.addEventListener("change", changeEventHandler);

		hitRate11.addEventListener("change", changeEventHandler);
		missRate11.addEventListener("change", changeEventHandler);
		hitRate12.addEventListener("change", changeEventHandler);
		missRate12.addEventListener("change", changeEventHandler);
		faRate11.addEventListener("change", changeEventHandler);
		crRate11.addEventListener("change", changeEventHandler);
		faRate12.addEventListener("change", changeEventHandler);
		crRate12.addEventListener("change", changeEventHandler);

		hitRate21.addEventListener("change", changeEventHandler);
		missRate21.addEventListener("change", changeEventHandler);
		hitRate22.addEventListener("change", changeEventHandler);
		missRate22.addEventListener("change", changeEventHandler);
		faRate21.addEventListener("change", changeEventHandler);
		crRate21.addEventListener("change", changeEventHandler);
		faRate22.addEventListener("change", changeEventHandler);
		crRate22.addEventListener("change", changeEventHandler);
		

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

				if (event.target.className == "c3hitRate") {
					missRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate") {
					hitRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate1") {
					missRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate1") {
					hitRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate2") {
					missRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate2") {
					hitRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate1") {
					faRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate1") {
					crRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate2") {
					faRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate2") {
					crRate2.value = result.toPrecision(4);
				} else if(event.target.className == "c3faRate") {
					crRate.value = result.toPrecision(4);
				} else if(event.target.className == "c3crRate") {
					faRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3baseRate") {
					nbaseRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3nbaseRate") {
					baseRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate11") {
					hitRate11.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate11") {
					missRate11.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate12") {
					hitRate12.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate12") {
					missRate12.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate21") {
					hitRate21.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate21") {
					missRate21.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate22") {
					hitRate22.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate22") {
					missRate22.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate11") {
					faRate11.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate11") {
					crRate11.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate12") {
					faRate12.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate12") {
					crRate12.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate21") {
					faRate21.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate21") {
					crRate21.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate22") {
					faRate22.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate22") {
					crRate22.value = result.toPrecision(4);
				}

				let nb = new Decimal(nbaseRate.value);
				let b = new Decimal(baseRate.value);

				let h  = new Decimal(hitRate.value);
				let m  = new Decimal(missRate.value);
				let fa = new Decimal(faRate.value);
				let cr = new Decimal(crRate.value);

				let h1 = new Decimal(hitRate1.value);
				let h2 = new Decimal(hitRate2.value);
				let m1 = new Decimal(missRate1.value);
				let m2 = new Decimal(missRate2.value);
				let fa1 = new Decimal(faRate1.value);
				let cr1 = new Decimal(crRate1.value);
				let fa2 = new Decimal(faRate2.value);
				let cr2 = new Decimal(crRate2.value);

				let h11 = new Decimal(hitRate11.value);
				let h12 = new Decimal(hitRate12.value);
				let h21 = new Decimal(hitRate21.value);
				let h22 = new Decimal(hitRate22.value);

				let m11 = new Decimal(missRate11.value);
				let m12 = new Decimal(missRate12.value);
				let m21 = new Decimal(missRate21.value);
				let m22 = new Decimal(missRate22.value);

				let fa11 = new Decimal(faRate11.value);
				let cr11 = new Decimal(crRate11.value);
				let fa12 = new Decimal(faRate12.value);
				let cr12 = new Decimal(crRate12.value);

				let fa21 = new Decimal(faRate21.value);
				let cr21 = new Decimal(crRate21.value);
				let fa22 = new Decimal(faRate22.value);
				let cr22 = new Decimal(crRate22.value);

				let fhit11 = h11.times(h1).times(h).times(b);
				let fmiss11 = m11.times(h1).times(h).times(b);

				let fhit12 = h12.times(m1).times(h).times(b);
				let fmiss12 = m12.times(m1).times(h).times(b);

				let fhit21 = h21.times(h2).times(m).times(b);
				let fmiss21 = m21.times(h2).times(m).times(b);

				let fhit22 = h22.times(m2).times(m).times(b);
				let fmiss22 = m22.times(m2).times(m).times(b);

				let ffa11 = fa11.times(fa1).times(fa).times(nb);
				let fcr11 = cr11.times(fa1).times(fa).times(nb);
				
				let ffa12 = fa12.times(cr1).times(fa).times(nb);
				let fcr12 = cr12.times(cr1).times(fa).times(nb);

				let ffa21 = fa21.times(fa2).times(cr).times(nb);
				let fcr21 = cr21.times(fa2).times(cr).times(nb);

				let ffa22 = fa22.times(cr2).times(cr).times(nb);
				let fcr22 = cr22.times(cr2).times(cr).times(nb);
				

				// Results
				let f_max = c3_max_factor(fhit11,fhit12,fhit21,fhit22,fmiss11,fmiss12,fmiss21,fmiss22,ffa11,fcr11,ffa12,fcr12,ffa21,fcr21,ffa22,fcr22);
				
				popSinput = popSize.value;
	  			popOutput.innerHTML = popSinput;
	  			popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
				let ps = new Decimal(popSinputNum);

				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);

				let lhit1 = ps.times(b).times(h).times(h1);
				let lmiss1 = lhit.minus(lhit1);

				let lhit2 = ps.times(b).times(m).times(h2);
				let lmiss2 = lmiss.minus(lhit2);

				let lfa1 = ps.times(nb).times(fa).times(fa1);
				let lcr1 = lnb.minus(lfa1);

				let lfa2 = ps.times(nb).times(fa).times(fa2);
				let lcr2 = lnb.minus(lfa2);

				let lhit11 = ps.times(b).times(h).times(h1).times(h11);
				let lmiss11 = lhit1.minus(lhit11);

				let lhit12 = ps.times(b).times(h).times(h1).times(h12);
				let lmiss12 = lmiss1.minus(lhit12);

				let lhit21 = ps.times(b).times(m).times(h2).times(h21);
				let lmiss21 = lhit2.minus(lhit21);

				let lhit22 = ps.times(b).times(m).times(h2).times(h22);
				let lmiss22 = lmiss2.minus(lhit22);

				let lfa11 = ps.times(nb).times(fa).times(fa1).times(fa11);
				let lcr11 = lfa1.minus(lfa11);

				let lfa12 = ps.times(nb).times(fa).times(fa1).times(fa12);
				let lcr12 = lcr1.minus(lfa12);

				let lfa21 = ps.times(nb).times(cr).times(fa2).times(fa21);
				let lcr21 = lfa2.minus(lfa21);

				let lfa22 = ps.times(nb).times(cr).times(fa2).times(fa22);
				let lcr22 = lcr2.minus(lfa22);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);
				falseAlarm1.innerHTML = lfa1.toFixed(0);
				correctReject1.innerHTML = lcr1.toFixed(0);
				falseAlarm2.innerHTML = lfa2.toFixed(0);
				correctReject2.innerHTML = lcr2.toFixed(0);

				hit11.innerHTML = lhit11.toFixed(0);
				hit12.innerHTML = lhit12.toFixed(0);
				hit21.innerHTML = lhit21.toFixed(0);
				hit22.innerHTML = lhit22.toFixed(0);
				miss11.innerHTML = lmiss11.toFixed(0);
				miss12.innerHTML = lmiss12.toFixed(0);
				miss21.innerHTML = lmiss21.toFixed(0);
				miss22.innerHTML = lmiss22.toFixed(0);

				falseAlarm11.innerHTML = lfa11.toFixed(0);
				falseAlarm12.innerHTML = lfa12.toFixed(0);
				falseAlarm21.innerHTML = lfa21.toFixed(0);
				falseAlarm22.innerHTML = lfa22.toFixed(0);

				correctReject11.innerHTML = lcr11.toFixed(0);
				correctReject12.innerHTML = lcr12.toFixed(0);
				correctReject21.innerHTML = lcr21.toFixed(0);
				correctReject22.innerHTML = lcr22.toFixed(0);

				

				let up_equation = lhit11.plus(lhit12).plus(lhit21).plus(lhit22);
				let down_equation = lhit11.plus(lhit12).plus(lhit21).plus(lhit22).plus(lfa11).plus(lfa12).plus(lfa21).plus(lfa22);
				results.innerHTML = (parseInt(up_equation.toFixed(0))).dividedBy(parseInt(down_equation.toFixed(0)).toFixed(4));

				// let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
				// let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);
				
				sugPop.innerHTML = f_max.toNumber();
				// assigned values for tree output
				


			} else {
			
				//Percentage

				if (event.target.value < 0 || event.target.value > 100) {	
				alert("Please enter percentage between 0 and 100");
				return;
				}
				result = new Decimal(100 - event.target.value);
				
				if (event.target.className == "c3hitRate") {
					missRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate") {
					hitRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate1") {
					missRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate1") {
					hitRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate2") {
					missRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate2") {
					hitRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate1") {
					faRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate1") {
					crRate1.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate2") {
					faRate2.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate2") {
					crRate2.value = result.toPrecision(4);
				} else if(event.target.className == "c3faRate") {
					crRate.value = result.toPrecision(4);
				} else if(event.target.className == "c3crRate") {
					faRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3baseRate") {
					nbaseRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3nbaseRate") {
					baseRate.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate11") {
					hitRate11.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate11") {
					missRate11.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate12") {
					hitRate12.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate12") {
					missRate12.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate21") {
					hitRate21.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate21") {
					missRate21.value = result.toPrecision(4);
				} else if (event.target.className == "c3missRate22") {
					hitRate22.value = result.toPrecision(4);
				} else if (event.target.className == "c3hitRate22") {
					missRate22.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate11") {
					faRate11.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate11") {
					crRate11.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate12") {
					faRate12.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate12") {
					crRate12.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate21") {
					faRate21.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate21") {
					crRate21.value = result.toPrecision(4);
				} else if (event.target.className == "c3crRate22") {
					faRate22.value = result.toPrecision(4);
				} else if (event.target.className == "c3faRate22") {
					crRate22.value = result.toPrecision(4);
				}

				let nb = new Decimal(nbaseRate.value).dividedBy(100);
				let b = new Decimal(baseRate.value).dividedBy(100);

				let h  = new Decimal(hitRate.value).dividedBy(100);
				let m  = new Decimal(missRate.value).dividedBy(100);
				let fa = new Decimal(faRate.value).dividedBy(100);
				let cr = new Decimal(crRate.value).dividedBy(100);

				let h1 = new Decimal(hitRate1.value).dividedBy(100);
				let h2 = new Decimal(hitRate2.value).dividedBy(100);
				let m1 = new Decimal(missRate1.value).dividedBy(100);
				let m2 = new Decimal(missRate2.value).dividedBy(100);
				let fa1 = new Decimal(faRate1.value).dividedBy(100);
				let cr1 = new Decimal(crRate1.value).dividedBy(100);
				let fa2 = new Decimal(faRate2.value).dividedBy(100);
				let cr2 = new Decimal(crRate2.value).dividedBy(100);

				let h11 = new Decimal(hitRate11.value).dividedBy(100);
				let h12 = new Decimal(hitRate12.value).dividedBy(100);
				let h21 = new Decimal(hitRate21.value).dividedBy(100);
				let h22 = new Decimal(hitRate22.value).dividedBy(100);

				let m11 = new Decimal(missRate11.value).dividedBy(100);
				let m12 = new Decimal(missRate12.value).dividedBy(100);
				let m21 = new Decimal(missRate21.value).dividedBy(100);
				let m22 = new Decimal(missRate22.value).dividedBy(100);

				let fa11 = new Decimal(faRate11.value).dividedBy(100);
				let cr11 = new Decimal(crRate11.value).dividedBy(100);
				let fa12 = new Decimal(faRate12.value).dividedBy(100);
				let cr12 = new Decimal(crRate12.value).dividedBy(100);

				let fa21 = new Decimal(faRate21.value).dividedBy(100);
				let cr21 = new Decimal(crRate21.value).dividedBy(100);
				let fa22 = new Decimal(faRate22.value).dividedBy(100);
				let cr22 = new Decimal(crRate22.value).dividedBy(100);

				let fhit11 = h11.times(h1).times(h).times(b);
				let fmiss11 = m11.times(h1).times(h).times(b);

				let fhit12 = h12.times(m1).times(h).times(b);
				let fmiss12 = m12.times(m1).times(h).times(b);

				let fhit21 = h21.times(h2).times(m).times(b);
				let fmiss21 = m21.times(h2).times(m).times(b);

				let fhit22 = h22.times(m2).times(m).times(b);
				let fmiss22 = m22.times(m2).times(m).times(b);

				let ffa11 = fa11.times(fa1).times(fa).times(nb);
				let fcr11 = cr11.times(fa1).times(fa).times(nb);
				
				let ffa12 = fa12.times(cr1).times(fa).times(nb);
				let fcr12 = cr12.times(cr1).times(fa).times(nb);

				let ffa21 = fa21.times(fa2).times(cr).times(nb);
				let fcr21 = cr21.times(fa2).times(cr).times(nb);

				let ffa22 = fa22.times(cr2).times(cr).times(nb);
				let fcr22 = cr22.times(cr2).times(cr).times(nb);


				// Results
				let f_max = c3_max_factor(fhit11,fhit12,fhit21,fhit22,fmiss11,fmiss12,fmiss21,fmiss22,ffa11,fcr11,ffa12,fcr12,ffa21,fcr21,ffa22,fcr22);
				
				popSinput = popSize.value;
	  			popOutput.innerHTML = popSinput;
	  			popSinputNum = parseFloat(popSinput.replace(/,/g, ''));
				let ps = new Decimal(popSinputNum);

				let lp = ps;
				let lb = ps.times(b);
				let lnb = lp.minus(lb);

				let lhit = ps.times(b).times(h);
				let lmiss = lb.minus(lhit);
				let lfa = ps.times(nb).times(fa);
				let lcr = lnb.minus(lfa);

				let lhit1 = ps.times(b).times(h).times(h1);
				let lmiss1 = lhit.minus(lhit1);

				let lhit2 = ps.times(b).times(m).times(h2);
				let lmiss2 = lmiss.minus(lhit2);

				let lfa1 = ps.times(nb).times(fa).times(fa1);
				let lcr1 = lnb.minus(lfa1);

				let lfa2 = ps.times(nb).times(fa).times(fa2);
				let lcr2 = lnb.minus(lfa2);

				let lhit11 = ps.times(b).times(h).times(h1).times(h11);
				let lmiss11 = lhit1.minus(lhit11);

				let lhit12 = ps.times(b).times(h).times(h1).times(h12);
				let lmiss12 = lmiss1.minus(lhit12);

				let lhit21 = ps.times(b).times(m).times(h2).times(h21);
				let lmiss21 = lhit2.minus(lhit21);

				let lhit22 = ps.times(b).times(m).times(h2).times(h22);
				let lmiss22 = lmiss2.minus(lhit22);

				let lfa11 = ps.times(nb).times(fa).times(fa1).times(fa11);
				let lcr11 = lfa1.minus(lfa11);

				let lfa12 = ps.times(nb).times(fa).times(fa1).times(fa12);
				let lcr12 = lcr1.minus(lfa12);

				let lfa21 = ps.times(nb).times(cr).times(fa2).times(fa21);
				let lcr21 = lfa2.minus(lfa21);

				let lfa22 = ps.times(nb).times(cr).times(fa2).times(fa22);
				let lcr22 = lcr2.minus(lfa22);

				popOutput.innerHTML = popSinput;
				baseOutput.innerHTML = lb.toFixed(0);
				noiseOutput.innerHTML = lnb.toFixed(0);

				hit.innerHTML = lhit.toFixed(0);
				miss.innerHTML = lmiss.toFixed(0);
				falseAlarm.innerHTML = lfa.toFixed(0);
				correctReject.innerHTML = lcr.toFixed(0);

				hit1.innerHTML = lhit1.toFixed(0);
				hit2.innerHTML = lhit2.toFixed(0);
				miss1.innerHTML = lmiss1.toFixed(0);
				miss2.innerHTML = lmiss2.toFixed(0);
				falseAlarm1.innerHTML = lfa1.toFixed(0);
				correctReject1.innerHTML = lcr1.toFixed(0);
				falseAlarm2.innerHTML = lfa2.toFixed(0);
				correctReject2.innerHTML = lcr2.toFixed(0);

				hit11.innerHTML = lhit11.toFixed(0);
				hit12.innerHTML = lhit12.toFixed(0);
				hit21.innerHTML = lhit21.toFixed(0);
				hit22.innerHTML = lhit22.toFixed(0);
				miss11.innerHTML = lmiss11.toFixed(0);
				miss12.innerHTML = lmiss12.toFixed(0);
				miss21.innerHTML = lmiss21.toFixed(0);
				miss22.innerHTML = lmiss22.toFixed(0);

				falseAlarm11.innerHTML = lfa11.toFixed(0);
				falseAlarm12.innerHTML = lfa12.toFixed(0);
				falseAlarm21.innerHTML = lfa21.toFixed(0);
				falseAlarm22.innerHTML = lfa22.toFixed(0);

				correctReject11.innerHTML = lcr11.toFixed(0);
				correctReject12.innerHTML = lcr12.toFixed(0);
				correctReject21.innerHTML = lcr21.toFixed(0);
				correctReject22.innerHTML = lcr22.toFixed(0);

				hitResult_sup.innerHTML = lhit.toFixed(0);
				hitResult_bottom.innerHTML = lhit.toFixed(0);
				falseAlarmResult.innerHTML = lfa.toFixed(0);

				let up_equation = lhit11.plus(lhit12).plus(lhit21).plus(lhit22);
				let down_equation = lhit11.plus(lhit12).plus(lhit21).plus(lhit22).plus(lfa11).plus(lfa12).plus(lfa21).plus(lfa22);
				results.innerHTML = (parseInt(up_equation.toFixed(0))).dividedBy(parseInt(down_equation.toFixed(0)).toFixed(4));
				sugPop.innerHTML = f_max.toNumber();
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

 function c2_max_factor(p, q, r, s, l, m, x, z) {
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
    } else if (!x.times(f).equals(x.times(f).round())) {
    	continue;
    } else if (!z.times(f).equals(z.times(f).round())) {
    	continue;
    }
    break;
  }
  return max;
 }

  function c3_max_factor(p, q, r, s, l, m, x, z, a, b, c, d, k, g, h, j) {
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
    } else if (!x.times(f).equals(x.times(f).round())) {
    	continue;
    } else if (!z.times(f).equals(z.times(f).round())) {
    	continue;
    } else if (!a.times(f).equals(a.times(f).round())) {
    	continue;
    } else if (!b.times(f).equals(b.times(f).round())) {
    	continue;
    } else if (!c.times(f).equals(c.times(f).round())) {
    	continue;
    } else if (!d.times(f).equals(d.times(f).round())) {
    	continue;
    } else if (!k.times(f).equals(k.times(f).round())) {
    	continue;
    } else if (!g.times(f).equals(g.times(f).round())) {
    	continue;
    } else if (!h.times(f).equals(h.times(f).round())) {
    	continue;
    } else if (!j.times(f).equals(j.times(f).round())) {
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

