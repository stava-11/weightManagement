// Calculate RMR, Metabolism with activity
let calculateMet = document.querySelector("#calcbtn"); 
calculateMet.addEventListener("click", function () { 
    let weight = document.querySelector("#weight").value;
    let height = document.querySelector("#height").value;
    let age = document.querySelector("#age").value;
    let gender = document.querySelector("#male").checked;
    let activity = parseFloat(document.querySelector("#activityLevel").value);
    let rmr;
    if (gender){
        rmr = 66.473+(13.751*(weight/2.2))+(5.0033*(height*2.54))-(6.755*age);
    } else {
        rmr = 655.0955+(9.463*(weight/2.2))+(1.8496*(height*2.54))-(4.6756*age);
    }
    let metRate = rmr * activity;
    document.querySelector("#rmr").textContent = parseInt(rmr);
    document.querySelector("#metRate").textContent = parseInt(metRate);

 })
 
// calculate calorie range
 let calculateLbs = document.querySelector("#calcLbs"); 
 calculateLbs.addEventListener("click", function () { 
     let metRate = parseInt(document.querySelector("#metRate").innerHTML);
     if (metRate == 0) {
        alert('Metabolism must be calculated first');
    } else {
       let lbsPerWk = parseFloat(document.querySelector("#lbsPerWk").value);
       let dailyCal = (lbsPerWk * 3500) / 7;
       let roundCalories = Math.ceil(parseInt(metRate - dailyCal)/100)*100;
       document.querySelector("#metRateLbs").textContent = roundCalories;
       getServings(roundCalories);
   } 
  })

// produce details/instruction for the calculated calorie range
function getServings(roundCalories) {
    document.querySelector('#foodCategories').textContent = '';
    let guide = document.createElement('ul');
    let calorieRangeLi = document.createElement('li');
    let fruitsAmtLi = document.createElement('li');
    let vegetablesAmtLi = document.createElement('li');
    let grainsAmtLi = document.createElement('li');
    let meatsBeansAmtLi = document.createElement('li');
    let milkDairyAmtLi = document.createElement('li');
    let waterAmtLi = document.createElement('li');
    let calPDFLi = document.createElement('li');
    if (roundCalories <= 1300){
        calorieRange = dietPlans[0]
    } else if (roundCalories > 1300 && roundCalories <= 1500){
        calorieRange = dietPlans[1]
    } else if (roundCalories > 1500 && roundCalories <= 1700){
        calorieRange = dietPlans[2]
    } else if (roundCalories > 1700 && roundCalories <= 1900){
        calorieRange = dietPlans[3]
    } else if (roundCalories > 1900 && roundCalories <= 2100){
        calorieRange = dietPlans[4]
    } else if (roundCalories > 2100 && roundCalories <= 2300){
        calorieRange = dietPlans[5]
    } else if (roundCalories > 2300 && roundCalories <= 2500){
        calorieRange = dietPlans[6]
    } else if (roundCalories > 2500 && roundCalories <= 2700){
        calorieRange = dietPlans[7]
    } else if (roundCalories > 2700 && roundCalories <= 2900){
        calorieRange = dietPlans[8]
    } else if (roundCalories > 2900){
        calorieRange = dietPlans[9]
    }
    // Set values to be shown on site
    calorieRangeLi.textContent = calorieRange.calorie + ' Calorie Plan';
    fruitsAmtLi.textContent = 'Fruit Servings: ' + calorieRange.fruits;
    vegetablesAmtLi.textContent = 'Vegetable Servings: ' + calorieRange.vegetables;
    grainsAmtLi.textContent = 'Grain Servings: ' + calorieRange.grains;
    meatsBeansAmtLi.textContent = 'Meat & Beans Servings: ' + calorieRange.meatsBeans;
    milkDairyAmtLi.textContent = 'Milk & Dairy Servings: ' + calorieRange.milkDairy;
    waterAmtLi.textContent = 'Water Servings: ' + calorieRange.water;
    calPDFLi.insertAdjacentHTML('beforeend','<a href="pdf/' + calorieRange.pdf + '.pdf" download target="_blank">Click for Detailed PDF</a>');
    // add values to ul
    guide.appendChild(calorieRangeLi);
    guide.appendChild(fruitsAmtLi);
    guide.appendChild(vegetablesAmtLi);
    guide.appendChild(grainsAmtLi);
    guide.appendChild(meatsBeansAmtLi);
    guide.appendChild(milkDairyAmtLi);
    guide.appendChild(waterAmtLi);
    guide.appendChild(calPDFLi);
    // place ul in correct location
    document.querySelector('#foodCategories').appendChild(guide);
}

// Sets the current year for the copyright
const currentDate = new Date();
document.querySelector('#year').textContent = currentDate.getFullYear();
