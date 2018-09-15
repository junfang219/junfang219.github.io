		const ACTIVATED_BUTTON_CLASS = "active1";
		let main = document.querySelector('.main');
		
		// Declare input
		let h1Input;
		let h2Input;
		let test = document.getElementsByClassName("test");

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

		let testL1 = document.getElementById('testL1');
		let testL2 = document.getElementById('testL2');
		let testR1 = document.getElementById('testR1');
		let testR2 = document.getElementById('testR2');

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
				h2Input = hypoDiv.children[2];
				test = hypoDiv.lastElementChild;
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
					results.innerHTML = ((parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0))))*100).toFixed(2) + "%";

				}
	  	});

	  	h1Input.addEventListener("change", function(){
	  		h1Output.innerHTML = h1Input.value;
	  	});

		h2Input.addEventListener("change", function(){
	  		h2Output.innerHTML = h2Input.value;
	  	});

		test.addEventListener("change", function(){
	  		testL1.innerHTML = test.value;
	  		testR1.innerHTML = test.value;
	  		testL2.innerHTML = 'no  ' + test.value;
	  		testR2.innerHTML = 'no  ' + test.value;
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

				//results.innerHTML = (parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0)))).toFixed(4);
				results.innerHTML = ((parseInt(lhit.toFixed(0)) / (parseInt(lhit.toFixed(0)) + parseInt((lfa).toFixed(0))))*100).toFixed(2) + "%";
				sugPop.innerHTML = f_max.toNumber();

			}
		}



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