// Connect nav tabs with its tree HTML
const tabTree = {
	"Dtab": "DanTree",
	"Rtab": "RobertTree",
	"Atab": "AnneTree",
	"Btab": "BrendaTree"
}

const ACTIVATED_BUTTON_CLASS = "active1";



// Function that selects tree for a tab
let selectTree = function() {
	let tree = document.getElementById(tabTree[this.id]);
	let treeDiv, tableDiv;
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

	//Table output
	let hitTableResult;
	let faTableResult;
	let marginalPositiveResult;
	let missTableResult;
	let crTableResult;
	let marginalNegativeResult;
	let baseTableResult;
	let noiseTableResult;
	let freTableTotal;

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
		} else if (currChild.className == "table") {
			tableDiv = currChild.children[0];
			
			for (let ii = 0; ii < tableDiv.children.length; ii++) {
				
				let tableDivClass = tableDiv.children[ii].className;
				if (tableDivClass == "row1") {
					let tableRow1Div = tableDiv.children[ii];
					for (let iii = 0; iii < tableRow1Div.children.length; iii++) {
						
						let tableRow1DivClass = tableRow1Div.children[iii].className;
						if (tableRow1DivClass == "row11") {
							let tableRow11Div = tableRow1Div.children[iii];
							hitTableResult = tableRow11Div.firstElementChild;
							
						}
						else if (tableRow1DivClass == "row12") {
							let tableRow12Div = tableRow1Div.children[iii];
							faTableResult = tableRow12Div.firstElementChild;
						}
						else if (tableRow1DivClass == "row13") {
							let tableRow13Div = tableRow1Div.children[iii];
							marginalPositiveResult = tableRow13Div.firstElementChild;
						}
					}
				}
				else if (tableDivClass == "row2") {
					let tableRow2Div = tableDiv.children[ii];

					for (let iiii = 0; iiii < tableRow2Div.children.length; iiii++) {
						
						let tableRow2DivClass = tableRow2Div.children[iiii].className;
						if (tableRow2DivClass == "row21") {
							let tableRow21Div = tableRow2Div.children[iiii];
							missTableResult = tableRow21Div.firstElementChild;
						}
						else if (tableRow2DivClass == "row22") {
							let tableRow22Div = tableRow2Div.children[iiii];
							crTableResult = tableRow22Div.firstElementChild;
						}
						else if (tableRow2DivClass == "row23") {
							let tableRow23Div = tableRow2Div.children[iiii];
							marginalNegativeResult = tableRow23Div.firstElementChild;
						}
					}
				}
				else if (tableDivClass == "row3") {
					let tableRow3Div = tableDiv.children[ii];

					for (let iiiii = 0; iiiii < tableRow3Div.children.length; iiiii++) {
						
						let tableRow3DivClass = tableRow3Div.children[iiiii].className;
						if (tableRow3DivClass == "baseTableResult") {
							baseTableResult = tableRow3Div.children[iiiii];
						}
						else if (tableRow3DivClass == "noiseTableResult") {
							noiseTableResult = tableRow3Div.children[iiiii];
						}
						else if (tableRow3DivClass == "freTableTotal") {
							freTableTotal = tableRow3Div.children[iiiii];
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
		 
		 //Table
		 hitTableResult.innerHTML = 250;
		 missTableResult.innerHTML = 250;
		 faTableResult.innerHTML = 250;
		 crTableResult.innerHTML= 250;
		 marginalPositiveResult.innerHTML = 500;
		 marginalNegativeResult.innerHTML = 500;
		 baseTableResult.innerHTML = 500;
		 noiseTableResult.innerHTML = 500;
		 freTableTotal.innerHTML = 1000;
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
					

			// assigned values for the table
			hitTableResult.innerHTML = hitTreeResult.toNumber();
			faTableResult.innerHTML = falseAlarmTreeResult.toNumber();
			missTableResult.innerHTML = missTreeResult.toNumber();
			crTableResult.innerHTML = corretRejectTreeResult.toNumber();
			marginalPositiveResult.innerHTML = postiveTestTreeResult.toNumber();
		 	marginalNegativeResult.innerHTML = negativeTestTreeResult.toNumber();
		 	baseTableResult.innerHTML = baseOutputTreeResult.toNumber();
		 	noiseTableResult.innerHTML = noiseOutputTreeResult.toNumber();
		 	freTableTotal.innerHTML = popOutputTreeResult.toNumber();


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
			
			// assigned values for the table
			hitTableResult.innerHTML = hitTreeResult.toNumber();
			faTableResult.innerHTML = falseAlarmTreeResult.toNumber();
			missTableResult.innerHTML = missTreeResult.toNumber();
			crTableResult.innerHTML = corretRejectTreeResult.toNumber();
			marginalPositiveResult.innerHTML = postiveTestTreeResult.toNumber();
		 	marginalNegativeResult.innerHTML = negativeTestTreeResult.toNumber();
		 	baseTableResult.innerHTML = baseOutputTreeResult.toNumber();
		 	noiseTableResult.innerHTML = noiseOutputTreeResult.toNumber();
		 	freTableTotal.innerHTML = popOutputTreeResult.toNumber();

		}
	}
}

// max function that calculates the population size
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


// Add event handlere to tabs

Dtab.addEventListener('click', selectTree);
Rtab.addEventListener('click', selectTree);
Atab.addEventListener('click', selectTree);
Btab.addEventListener('click', selectTree);
Dtab.click();

