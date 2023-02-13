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
  "Biax Fluorescent": "121.58",
  "Circline Fluorescent": "40.50",
  "Compact Fluorescent": "30.57",
  Halogen: "370.28",
  "High Pressure Sodium": "367.57",
  Incandescent: "279.77",
  "LED (Lamp or Fixture)": "103.57",
  "Linear Fluorescent": "196.25",
  "Linear Fluorescent - Shatter Coated": "196.25",
  "Low Pressure Sodium": "137.00",
  "Mercury Vapor": "349.67",
  "Metal Halide": "580.96",
  "U-Bend Fluorescent": "72.89",
  "U-Bend Fluorescent - Shatter Coated": "72.89",

}
let result, result1;
select.oninput = function () {
  var selectedValue = select.options[select.selectedIndex].value;
  result = values[selectedValue];
  document.getElementById("cent-cost").value = "$" + result;
  document.getElementById("cent-cost2").value = "$" + result;
  console.log(result);
};

select1.oninput = function () {
  var selectedValue = select1.options[select1.selectedIndex].value;
  result1 = values1[selectedValue];
  document.getElementById("wattage").value = result1;
  console.log(result1);
};

const elements = [
  document.getElementById('selectstate'),
  document.getElementById("selectmetals"),
  document.getElementById("cent-cost"),
  document.getElementById('avg-watt'),
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
    document.getElementById("hours-operation").value = Number(selectHours.options[selectHours.selectedIndex].value);
    annualKwh.value = Math.round((quantity.value * hours * wattage.value) / 1000);
    annualCost.value = "$" + Math.round((annualKwh.value * cent), 2);
    fixture.value = ((quantity.value * 0.95)).toFixed(2);
    annualKwhResult.value = ((hours * avgWatt.value * fixture.value) / 1000).toFixed(2);
    annualCostResult.value = "$" + Math.round((annualKwhResult.value * cent), 2);
    console.log(annualKwh.value, annualKwhResult.value);

    calkwh(annualKwh.value, annualKwhResult.value, annualCost.value, annualCostResult.value);
  });
});


function calkwh(arg1, arg2, p1, p2) {

  const cal_function = (((arg2 - arg1) / arg1).toFixed(2)) * 100;

  p1 = Number(p1.slice(1));
  p2 = Number(p2.slice(1));
  var cost = p1 - p2;
  if (isNaN(cost)) {
    cost = 0;
  }
  if (isNaN(cal_function)) {
    cal_function = 0;
  }
  document.getElementById("result-kwh").innerHTML = "Est Savings kWh:" + cal_function + "%"  + "<p>percent reduction</p>";
  document.getElementById("result-cost").innerHTML = "Est Savings: " + "$" + cost + "<p>Dollars per year</p>";
}

{/* <html>
  <head>
    <script>
      document.addEventListener("DOMContentLoaded", function(){
        var count = 0;
        var intervalId = setInterval(function(){
          if (count === 100) {
            clearInterval(intervalId);
            return;
          }
          document.getElementById("result").innerHTML = "Count: " + count;
          count++;
        }, 100);
      });
    </script>
  </head>
  <body>
    <div id="result"></div>
  </body>
</html>
<html>
  <head>
    <script>
      document.addEventListener("DOMContentLoaded", function(){
        var count = 0;
        var intervalId = setInterval(function(){
          if (count === -100) {
            clearInterval(intervalId);
            return;
          }
          document.getElementById("result").innerHTML = "Count: " + count;
          count--;
        }, 100);
      });
    </script>
  </head>
  <body>
    <div id="result"></div>
  </body>
</html> */}
