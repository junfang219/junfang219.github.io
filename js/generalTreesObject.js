let oneCueTree = {



	maxPop: function max_factor(p, q, r, s) {
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
}

let oneCueThreeValueTree = {

}

let threeHypoTree = {

}

let twoCuesTree = {

}

let threeCuesTree = {

}