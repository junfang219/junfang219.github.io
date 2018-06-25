

// input
let baseRate = document.querySelectorAll('.baseRate');
let nbaseRate = document.querySelectorAll('.nbaseRate');

let hitRate = document.querySelectorAll('.hitRate');
let missRate = document.querySelectorAll('.missRate');

let faRate = document.querySelectorAll('.faRate');
let crRate = document.querySelectorAll('.crRate');

//Output
let popOutput = document.querySelectorAll('.pop_number');
let baseOutput = document.querySelectorAll('.base');
let noiseOutput = document.querySelectorAll('.noise');

let hit = document.querySelectorAll('.hit');
let miss = document.querySelectorAll('.miss');
let falseAlarm = document.querySelectorAll('.fa');
let corretReject = document.querySelectorAll('.cr');


// Off tree output
let results = document.querySelectorAll('.results');
let hitResult = document.querySelectorAll('.hitResult');
let missResult = document.querySelectorAll('.missResult');
let falseAlarmResult = document.querySelectorAll('.faResult');
let corretRejectResult = document.querySelectorAll('.crResult');

//Table output
let marginalPositiveResult = document.querySelectorAll('.marginalPositiveResult');
let marginalNegativeResult = document.querySelectorAll('.marginalNegativeResult');
let baseResult = document.querySelectorAll('.baseResult');
let noiseResult = document.querySelectorAll('.noiseResult');
let freTableTotal = document.querySelectorAll('.freTableTotal');


// For buttoms
// let header = document.getElementsByClassName("myDIV");
let btns = header.getElementsByClassName("btn");
let probability = document.querySelectorAll('.probability');
let percentage = document.querySelectorAll('.percentage');

// check probability or percentage
let isProb = true;

 // buttoms
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active1");
    current[0].className = current[0].className.replace(" active1", "");
    this.className += " active1";
   });
}

function initialize() {
	 //Tree
	 popOutput.innerHTML = 1000;
	 baseOutput.innerHTML = 500;
	 noiseOutput.innerHTML = 500;

	 hit.innerHTML = 250;
	 miss.innerHTML = 250;
	 falseAlarm.innerHTML= 250;
	 corretReject.innerHTML = 250;

	 //Table
	 hitResult.forEach(function(e) {
			e.innerHTML = 250;
		})
	 falseAlarmResult.forEach(function(e) {
			e.innerHTML = 250;
		})
	 missResult[0].innerHTML = 250;
	 corretRejectResult[0].innerHTML = 250;
	 marginalPositiveResult.innerHTML = 500;
	 marginalNegativeResult.innerHTML = 500;	

	 baseResult.innerHTML = 500;
	 noiseResult.innerHTML = 500;
	 freTableTotal.innerHTML = 1000;
}

percentage.addEventListener('click', function() {
	 isProb = false;
	 baseRate.value = 50;
	 nbaseRate.value = 50;
	 hitRate.value = 50;
	 missRate.value = 50;
	 faRate.value = 50;
	 crRate.value = 50;

	 results.innerHTML = 50+'%';

	 initialize();

}, false)


probability.addEventListener('click', function() {
	 isProb = true;
	 baseRate.value = 0.5;
	 nbaseRate.value = 0.5;
	 hitRate.value = 0.5;
	 missRate.value = 0.5;
	 faRate.value = 0.5;
	 crRate.value = 0.5;

	 results.innerHTML = 0.5;
	initialize();

}, false)


// react probability
document.addEventListener('DOMContentLoaded',function(){
	baseRate.onchange = changeEventHandler;
	nbaseRate.onchange = changeEventHandler;
	hitRate.onchange = changeEventHandler;
	missRate.onchange = changeEventHandler;
	faRate.onchange = changeEventHandler;
	crRate.onchange = changeEventHandler;
}, false);


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
	

		if (event.target.id == "baseRate") {
			nbaseRate.value = result.toPrecision(4);
		} else if (event.target.id == "nbaseRate") {
			baseRate.value = result.toPrecision(4);
		} else if (event.target.id == "hitRate") {
			missRate.value = result.toPrecision(4);
		} else if (event.target.id == "missRate") {
			hitRate.value = result.toPrecision(4);
		} else if (event.target.id == "faRate") {
			crRate.value = result.toPrecision(4);
		} else if (event.target.id == "crRate") {
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

		popOutput.innerHTML = popOutputTreeResult.toNumber();
		baseOutput.innerHTML = baseOutputTreeResult.toNumber();
		noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();
		

		let hitTreeResult = (f_max.times(b)).times(h);
		let missTreeResult = (f_max.times(b)).times(m);
		let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
		let corretRejectTreeResult = (f_max.times(nb)).times(cr);
		let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
		let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);

		hit.innerHTML = hitTreeResult.toNumber();
		miss.innerHTML = missTreeResult.toNumber();
		falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
		corretReject.innerHTML = corretRejectTreeResult.toNumber();

		results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).toNumber().toPrecision(3);
		
		hitResult.forEach(function(e) {
			e.innerHTML = hitTreeResult;
		})

		missResult.forEach(function(e) {
			e.innerHTML = missTreeResult;
		})

		falseAlarmResult.forEach(function(e) {
			e.innerHTML = falseAlarmTreeResult;
		})

		corretRejectResult.forEach(function(e) {
			e.innerHTML = corretRejectTreeResult;
		})


		marginalPositiveResult.innerHTML = postiveTestTreeResult;
	 	marginalNegativeResult.innerHTML = negativeTestTreeResult;
	 	baseResult.innerHTML = baseOutputTreeResult;
	 	noiseResult.innerHTML = noiseOutputTreeResult;
	 	freTableTotal.innerHTML = popOutputTreeResult;


} else {
		
		//Percentage

		if (event.target.value < 0 || event.target.value > 100) {	
		alert("Please enter percentage between 0 and 100");
		return;
		}
		result = new Decimal(100 - event.target.value);

		if (event.target.id == "baseRate") {
			nbaseRate.value = result;
		} else if (event.target.id == "nbaseRate") {
			baseRate.value = result;
		} else if (event.target.id == "hitRate") {
			missRate.value = result;
		} else if (event.target.id == "missRate") {
			hitRate.value = result;
		} else if (event.target.id == "faRate") {
			crRate.value = result;
		} else if (event.target.id == "crRate") {
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

		popOutput.innerHTML = popOutputTreeResult.toNumber();
		baseOutput.innerHTML = baseOutputTreeResult.toNumber();
		noiseOutput.innerHTML = noiseOutputTreeResult.toNumber();
		

		let hitTreeResult = (f_max.times(b)).times(h);
		let missTreeResult = (f_max.times(b)).times(m);
		let falseAlarmTreeResult= (f_max.times(nb)).times(fa);
		let corretRejectTreeResult = (f_max.times(nb)).times(cr);
		let postiveTestTreeResult = hitTreeResult.plus(falseAlarmTreeResult);
		let negativeTestTreeResult = missTreeResult.plus(corretRejectTreeResult);

		hit.innerHTML = hitTreeResult.toNumber();
		miss.innerHTML = missTreeResult.toNumber();
		falseAlarm.innerHTML = falseAlarmTreeResult.toNumber();
		corretReject.innerHTML = corretRejectTreeResult.toNumber();

		results.innerHTML = hitTreeResult.dividedBy(hitTreeResult.plus(falseAlarmTreeResult)).toNumber().toPrecision(3)*100+"%";
		
		hitResult.forEach(function(e) {
			e.innerHTML = hitTreeResult;
		})

		missResult.forEach(function(e) {
			e.innerHTML = missTreeResult;
		})

		falseAlarmResult.forEach(function(e) {
			e.innerHTML = falseAlarmTreeResult;
		})

		corretRejectResult.forEach(function(e) {
			e.innerHTML = corretRejectTreeResult;
		})


		marginalPositiveResult.innerHTML = postiveTestTreeResult;
	 	marginalNegativeResult.innerHTML = negativeTestTreeResult;
	 	baseResult.innerHTML = baseOutputTreeResult;
	 	noiseResult.innerHTML = noiseOutputTreeResult;
	 	freTableTotal.innerHTML = popOutputTreeResult;

	
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








