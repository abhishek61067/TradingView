
const amountToWord = function (value) {
  
  if (!value || isNaN(value)){
    return '-'
  }
  value = parseFloat(value);
  let val = Math.abs(value)
  // console.log(val)
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(2) + ' Cr';
    // console.log("val", val)
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(2) + ' Lac';
  }
  return val;
}

function addCommas(value) {
  if (value === null || value === undefined) return "-";
  return value
    .toFixed(2)
    .split(".")[0]
    .replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
}

const getCommissionRate = (amount) => {
  let rate = 0.4; // Up to 50,000 	0.40%

  if (amount > 50000 && amount <= 500000) {  // Above 50,000 to 500,000	0.37%
    rate = 0.37
  } else if (amount > 500000 && amount <= 2000000) { // Above 500,000 to 2,000,000	0.34%
    rate = 0.34
  } else if (amount > 2000000 && amount <= 10000000 ) { // Above 2,000,000 to 10,000,000	0.30%
    rate = 0.30
  } else if (amount > 10000000) { // Above 10,000,000	    0.27%
    rate = 0.27
  }
  return rate;
}


function separateByCommas(num) {
  if (!num || isNaN(num)){
    return '-'
  }
    
  const parts = num.toString().split(".");
  let number = parts[0]
  number = parseInt(num).toLocaleString("en-IN");
  if (parts.length > 1) {
      return number + "." + parts[1].slice(0, 2);
  } else {
      return number;
  }
    
}

function formatDecimal(num) {
    if (!num || isNaN(num)){
      return '-'
    }
    return parseFloat(num).toFixed(2)
}

const getChangeClass = function (value){
  if (value < 0){
    return 'text-danger'
  }
  if (value > 0){
    return 'text-success'
  }
  return 'text-dark'
}

const sebonRate = 0.015
const dpCharge = 25

export default {
  amountToWord,
  getCommissionRate,
  sebonRate,
  dpCharge,
  separateByCommas,
  getChangeClass,
  formatDecimal,
  addCommas
}
