function firstLast6(numbers) {
    return numbers[0] == 6 || numbers[numbers.length - 1] == 6;
   }
   
function has23(numbers) {
    return numbers.indexOf(2) >= 0 || numbers.indexOf(3) >= 0;
   }
   
function fix23(numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] === 2 && numbers[i + 1] === 3) {
        numbers[i + 1] = 0;
      }
    }
    return numbers;
}

function countYZ(s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
      let c = s[i].toUpperCase();
      let yOrZ = c == "Y" || c == "Z";
      let endOfWord = i + 1 == s.length || s[i + 1] == " ";
      if (yOrZ && endOfWord) {
        count += 1;
      }
    }
    return count;
   }

function endOther(s1, s2) {
    let lower1 = s1.toLowerCase();
    let lower2 = s2.toLowerCase();
    return lower1.endsWith(lower2) || lower2.endsWith(lower1);
}

function starOut(s) {
    let r = "";
    for (let i = 0; i < s.length; i++) {
        let beforeStar = i < s.length - 1 && s[i + 1] === "*";
        let afterStar = i > 0 && s[i - 1] === "*";
        let isStar = s[i] === "*";
        if (!(isStar || beforeStar || afterStar)) {
            r += s[i];
        }
    }
    return r;
}

function getSandwich(s) {
  let slice1 = s.indexOf("bread");
  let slice2 = s.lastIndexOf("bread");
  if (slice1 != -1 && slice2 != -1 && slice1 < slice2) {
    return s.substring(slice1 + "bread".length, slice2);
  } else{
    return "";
  }
}
 
  function canBalance(numbers) {
    for (let i = 0; i < numbers.length; i++) {
      let weight = 0;
      for (let j = 0; j <= i; j++) {
        weight += numbers[j];
      }
      for (let j = i + 1; j < numbers.length; j++) {
        weight -= numbers[j];
      }
      if (weight == 0) {
        return true;
      }
    }
    return false;
   }
   

   function countClumps(xs) {
    let clumps = 0;
    let i = 0;
    while (i < xs.length) {
      let s = i + 1;
      while (s < xs.length && xs[i] == xs[s]) s++;
      if (s - i > 1) clumps++;
      i = s;
    }
    return clumps;
   }
   
  
 function sameEnds(s) {
 for (let i = Math.floor(s.length / 2); i >= 0; i--) {
   if (s.substring(0, i) == s.substring(s.length - i)) {
     return s.substring(0, i);
   }
 }
}

//final

   