const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

});

var select = document.getElementById("selectstate");
var values = {
  Choose: "0",
  Alabama: "0.1282",
  Alaska: "0.1973",
  Arizona: "0.1044",
  Arkansas: "0.0984",
  California: "0.21",
  Colorado: "0.1086",
  Connecticut: "0.1934",
  Delaware: "0.1025",
  "District of Columbia": "0.1516",
  "East North Central": "0.115",
  "East South Central": "0.1192",
  Florida: "0.1108",
  Georgia: "0.118",
  Hawaii: "0.3875",
  Idaho: "0.081",
  Illinois: "0.113",
  Indiana: "0.1262",
  Iowa: "0.0928",
  Kansas: "0.1131",
  Kentucky: "0.1147",
  Louisiana: "0.1087",
  Maine: "0.1704",
  Maryland: "0.1157",
  Massachusetts: "0.1741",
  Michigan: "0.1251",
  "Middle Atlantic": "0.1402",
  Minnesota: "0.1169",
  Mississippi: "0.1211",
  Missouri: "0.089",
  Montana: "0.1027",
  Mountain: "0.0992",
  Nebraska: "0.0868",
  Nevada: "0.0913",
  "New England": "0.1758",
  "New Hampshire": "0.174",
  "New Jersey": "0.1337",
  "New Mexico": "0.1061",
  "New York": "0.1632",
  "North Carolina": "0.084",
  "North Dakota": "0.0865",
  Ohio: "0.104",
  Oklahoma: "0.0899",
  Oregon: "0.0926",
  "Pacific Contiguous": "0.1758",
  "Pacific Noncontiguous": "0.2963",
  Pennsylvania: "0.1014",
  "Rhode Island": "0.1502",
  "South Atlantic": "0.104",
  "South Carolina": "0.1086",
  "South Dakota": "0.1006",
  Tennessee: "0.1151",
  Texas: "0.0848",
  Utah: "0.0831",
  Vermont: "0.1707",
  Virginia: "0.0877",
  Washington: "0.0938",
  "West North Central": "0.0995",
  "West South Central": "0.0885",
  "West Virginia": "0.1049",
  Wisconsin: "0.1134",
  Wyoming: "0.0952",

};

var select1 = document.getElementById("selectmetals");
var values1 = {
  Choose: "0",
  "Biax Fluorescent": "105",
  "Circline Fluorescent": "44",
  "Compact Fluorescent": "30",
  Halogen: "150",
  "High Pressure Sodium": "380",
  Incandescent: "100",
  "LED (Lamp or Fixture)": "150",
  "Linear Fluorescent": "160",
  "Low Pressure Sodium": "180",
  "Mercury Vapor": "372",
  "Metal Halide": "380",
  "U-Bend Fluorescent": "80",

}

var values2 = {
  Choose: "0",
  "Biax Fluorescent": "47",
  "Circline Fluorescent": "20",
  "Compact Fluorescent": "14",
  Halogen: "38",
  "High Pressure Sodium": "95",
  Incandescent: "25",
  "LED (Lamp or Fixture)": "135",
  "Linear Fluorescent": "72",
  "Low Pressure Sodium": "45",
  "Mercury Vapor": "93",
  "Metal Halide": "95",
  "U-Bend Fluorescent": "36",

}

let result, result1 , result_new;
select.oninput = function () {
  var selectedValue = select.options[select.selectedIndex].value;
  result = values[selectedValue];
 
  document.getElementById("cent-cost").value = "$" + result;
  document.getElementById("cent-cost2").value = "$" + result;
  
};

select1.oninput = function () {
  var selectedValue = select1.options[select1.selectedIndex].value;
  result1 = values1[selectedValue];
  result_new = values2[selectedValue];
  document.getElementById("wattage").value = result1;
  document.getElementById("avg-watt").value = result_new;
 
};

const elements = [
  document.getElementById('selectstate'),
  document.getElementById("selectmetals"),
  document.getElementById("selecthours"),
  document.getElementById("quantity"),
  document.getElementById("wattage")
];

const centCost = document.getElementById("cent-cost");
const wattage = document.getElementById("wattage");
const selectHours = document.querySelector('#selecthours');
const quantity = document.getElementById("quantity");
const annualKwh = document.getElementById("Annualkwh");
const annualCost = document.getElementById("Annualcost");
const fixture = document.getElementById("fixture");
const avgWatt = document.getElementById("avg-watt");
const annualKwhResult = document.getElementById("Annualkwh-result");
const annualCostResult = document.getElementById("Annualcost-result");

elements.forEach(element => {
  element.addEventListener('input', function () {
    const cent = Number(centCost.value.slice(1));
    const hours = Number(selectHours.options[selectHours.selectedIndex].value);
    const new_hour = document.getElementById("hours-operation");
    new_hour.value = hours * 0.8 ;
    annualKwh.value = Math.round((quantity.value * hours * wattage.value) / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    annualCost.value = formatter.format(Math.round((annualKwh.value.replace(/,/g, '') * cent), 2));
    fixture.value = quantity.value;
    annualKwhResult.value = (((new_hour.value * avgWatt.value * fixture.value) / 1000).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    annualCostResult.value = formatter.format(Math.round((annualKwhResult.value.replace(/,/g, '') * cent), 2));
    console.log(annualKwh.value, annualKwhResult.value);

    if (isNaN(annualKwh.value)) {
      annualKwh.value = 0.00;
    }
    if (annualCost.value == '$NaN') {
      annualCost.value = "$0.00";
    }
    

    calkwh(annualKwh.value.replace(/,/g, ''), annualKwhResult.value.replace(/,/g, ''), annualCost.value.replace(/,/g, ''), annualCostResult.value.replace(/,/g, ''));
  });
});


function calkwh(arg1, arg2, p1, p2) {

  const cal_function = (((arg2 - arg1) / arg1)) * 100;

  p1 = Number(p1.slice(1));
  p2 = Number(p2.slice(1));
  var cost = p1 - p2;
  if (isNaN(cost)) {
    cost = 0;
  }
  if (isNaN(cal_function)) {
    cal_function = 0;
  }


  document.getElementById("result-kwh").innerHTML = "Estimated Savings kWh: " + cal_function.toFixed(2) + "%"  + "<p>percent reduction</p>";
  document.getElementById("result-cost").innerHTML = "Estimated Savings: " +  formatter.format(cost) + "<p>Dollars per year</p>";
}

