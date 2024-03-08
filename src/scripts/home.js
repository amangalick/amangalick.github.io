// Icon links
var trashIMAGE = "../images/trashcanHolder.png";
var movingCar = "../images/movingcar.png";
var battery = ["../images/EmptyBattery.png", "../images/1:4Charged.png", "../images/1:2Charged.png","../images/3:4Charged.png","../images/FullCharge.png"];



window.onload = function () {
  document
    .getElementById("submit")
    .addEventListener("click", handleFormSubmission);

  // Live form validation.
  const inputField = document.getElementById("input-text");

  inputField.addEventListener("input", function (event) {
    const inputValue = event.target.value;
    const isValidInput = /^\d*\.?\d*$/.test(inputValue); // Regular expression to check for rational numbers

    if (!isValidInput) {
      inputField.value = inputField.value.substring(
        0,
        inputField.value.length - 1,
      ); // Clear the last inputted char if it was invalid.
    }
  });
};

function handleFormSubmission() {
  var content = document.getElementById("user-input-content");
  content.innerHTML = ""; // Clear the content div

  // Check bad inputs.
  if (
    document.getElementById("input-text").value.trim() == "" ||
    document.getElementById("measurement").value == "" ||
    document.getElementById("compost-type").value == ""
  ) {
    formValidation();
  } else {
    if (document.getElementById("form-validation-alert") != null) {
      document.getElementById("form-validation-alert").remove();
    }
    var input = document.getElementById("input-text");
    var unit = document.getElementById("measurement");
    var type = document.getElementById("compost-type");

    let Co2 = {
      val: convertToKgCO2(input.value, unit.value).toFixed(2),
      desc: "Your CO2 savings:",
      popUpDesc: "This is the description for the pop up for the CO2",
      modalID: "CO2Modal",
      title: "Carbon Dixode Savings",
    };

    let tonsOfCo2 = Co2.val / 1000;

    let milesDriven = {
      val: convertToMilesDriven(tonsOfCo2).toFixed(2),
      desc: "You can drive " + convertToMilesDriven(tonsOfCo2).toFixed(2) + " miles <br>or <br>San Jose to San Francisco " + (convertToMilesDriven(tonsOfCo2).toFixed(2)/57.1).toFixed(2) + " times",
      popUpDesc: "Passenger vehicles include cars, vans, pickups, and SUVs with 2 axles and 4 tires. In 2021, their fuel economy averaged 22.9 mpg, and CO2 accounted for 99.3% of their greenhouse gases (EPA 2023; FHWA 2023). CO2 emissions from gasoline are 8.89 kg per 1,000 gallons. To calculate emissions per mile: divide CO2 per gallon by fuel economy for CO2 per mile, adjusting for methane and nitrous oxide to reflect total greenhouse emissions.",
      modalID: "mdModal",
      title: "Miles Driven",
    };

    let smartPhonesCharged = {
      val: convertToSmartPhonesCharged(tonsOfCo2).toFixed(2),
      desc: "phones charged",
      popUpDesc: "The U.S. DOE states that a typical smartphone battery uses 22.596 Watt-hours over 24 hours, covering both charging from empty to full and maintaining the charge for a day. It takes about 2 hours to fully charge a smartphone battery (Ferreira et al. 2011). When a fully charged phone remains plugged in, it consumes 0.0415 Watts, known as 'maintenance mode' power (Dommu 2023). The energy for charging is calculated by subtracting the 'maintenance mode' energy (0.0415 Watts multiplied by 22 hours) from the total 24-hour consumption. <br> CO2 emissions for charging a smartphone are calculated by applying the energy used per charge to the 2021 national average CO2 emission rate of 1,540.1 lbs CO2 per megawatt-hour, which includes transmission and distribution losses (EPA 2023).",
      modalID: "spModal",
      title: "Smart Phones Charged",
    };
    

    let trashBagSaved = {
      val: convertToTrashBags(tonsOfCo2).toFixed(3),
      desc: "Trash bags of waste recycled instead of landfilled",
      popUpDesc: "WARM indicates that recycling mixed materials (like paper, metals, plastics) instead of landfilling them reduces emissions by 2.88 metric tons CO2 equivalent per short ton. The CO2 emissions savings for each trash bag of waste were calculated by applying the per ton savings to the waste quantity in an average trash bag. This quantity was derived by multiplying the mixed recyclables' average density (111 lbs per cubic yard, EPA 2016a) by the volume of a standard 25-gallon trash bag, typically between 20 to 30 gallons (EPA 2016b).",
      modalID: "trModal",
      title: "Trash bags Recycled Instead of Landfilled",
    };

    let gallonsOfGas = {
      val: convertToGasConsumed(tonsOfCo2).toFixed(2),
      desc: "gallons of gas consumed",
      popUpDesc: "In the introduction to the joint rulemaking by the EPA and the Department of Transportation on May 7, 2010, which set the initial fuel economy standards for model years 2012-2016, the agencies agreed to use a standard conversion factor of 8,887 grams of CO2 emissions for every gallon of gasoline used (Federal Register 2010). For context, this number of grams of CO2 per gallon of gasoline burned is calculated by multiplying the fuel's heat content per gallon by the CO2 emissions per unit of fuel heat content.<br> This calculation is based on the assumption that all carbon in the gasoline is fully converted into CO2 (IPCC 2006).",
      modalID: "gogModal",
      title: "Gallons of Gas Consumed",
    };

    let statistics = {
      desc: "The UCCE Composting Education Program (CEP) hosts a collection of composting workshops all throughout the year, where Santa Clara County residents come to learn the benefits of composting and how they can incorporate composting into their daily lives. Three months after these workshops, CEP sends out a survey to evaluate how workshop attendees are composting at home. With the survey they collect data such as weekly food composting, weekly yard waste composting, and challenges home composters may face. With this survey data, we are able to provide these statistics.",
      modalID: "statModal",
      title: "UCCE Composting Education Statistics",
    };

    var hyperlinkURL = "https://cesantaclara.ucanr.edu/Home_Composting_Education/Composting_Workshops/";
    statistics.desc = statistics.desc.replace(
      'composting workshops',
      '<a href="' + hyperlinkURL + '" target="_blank" style="text-decoration: underline">composting workshops</a>'
    );
    
    var transition = document.createElement("p");
    transition.classList.add(
      "font-heading",
      "mb-6",
      "mt-6",
      "text-3xl",
      "md:text-4xl",
      "font-bold",
      "tracking-tight",
      "max-w-full",
      "text-center"
    );

    transition.innerHTML += "What does " + Co2.val + " kilograms of CO2 savings look like?"
      
    // desktop computer
    if (window.screen.width >= 768) {
      content.appendChild(
        createCO2StatsticContainer(
          Co2,
          statistics,
          "4/5",
          "1/2",
        ),
      );
  
      content.appendChild(transition);
      
      content.appendChild(
        milesContainer(
          milesDriven,
          "4/5",
          "1/2",
        ),
        );
  
        content.appendChild(
          createThreeStatsRowContainer(
            gallonsOfGas,
            trashBagSaved,
            smartPhonesCharged,
            "4/5",
            "1/2",
          ),
        );
    } // mobile
    else {
      content.appendChild(
        createCO2Element(
          Co2,
          "4/5",
          "1/2",
        )
      );
      
      content.appendChild(
        createStatisticsDescription(
          statistics
        )
      );
      

      var milesCon = milesContainer(
        milesDriven,
        "4/5",
        "1/2",
      );

      var movingCarElement = milesCon.querySelector(".movingCar");
      var movingCarContainer = milesCon.querySelector(".mx-3");

      // Check if the movingCar element exists before attempting to add the class
      if (movingCarElement) {
          // Add the class "movingCarMobile" to the movingCar element
          movingCarElement.classList.add("movingCarMobile");
          movingCarContainer.classList.remove("mx-3");
      }

      
      content.appendChild(
        milesCon
        );

      content.appendChild(
        createStatsContainerElement(
          gallonsOfGas,
          "4/5",
          "1/2",
        ),
      );

      var trashContainer = createStatsContainerElement(trashBagSaved); 
    
      var icon = document.createElement("img");
      icon.classList.add(
        "w-3/4",
        "mb-3",
        "mx-auto"
      );
      icon.src = trashIMAGE;
      icon.alt = "icon";

      trashContainer.insertBefore(icon, trashContainer.firstChild);

      content.appendChild(trashContainer);

      var phoneContainer = createStatsContainerElement(smartPhonesCharged);
      phoneContainer.insertBefore(batteryContainer(), phoneContainer.firstChild);

      content.appendChild(phoneContainer);
    }
  }

  //Code to make pop-up window work
  const openModalButtons = document.querySelectorAll('[data-modal-target]');
  const closeModalButtons = document.querySelectorAll('[data-close-button]');
  const overlay = document.getElementById('overlay');

  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal, overlay)
    })
  });

  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal,overlay)
    })
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal,overlay)
    })
  });

}

function formValidation() {
  var alert =
    document.getElementById("form-validation-alert") != null
      ? document.getElementById("form-validation-alert")
      : document.createElement("div");
  alert.id = "form-validation-alert";
  var error = "";
  // handle different combinations of empty fields
  let prevError = false;
  let errMsgDetails = "";
  if (document.getElementById("input-text").value.trim() == "") {
    prevError = true;
    errMsgDetails += "quantity";
  }
  if (document.getElementById("measurement").value == "") {
    errMsgDetails += prevError ? "/unit" : "unit";
    prevError = true;
  }
  if (document.getElementById("compost-type").value == "") {
    errMsgDetails += prevError ? "/type" : "type";
    prevError = true;
  }
  error = "Please enter a valid " + errMsgDetails + " for composting.";
  alert.innerHTML =
    `<div class="w-4/5 md:w-[40%] mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Uh-oh! That's not how much you composted!</strong>
    <span class="block sm:inline">` +
    error +
    `</span>
  </div>`;
  document.getElementById("form").appendChild(alert);
}

function createCharts(
  pieChartLabels,
  pieChartData,
  histogramLabels,
  histogramData,
  totalCO2Saved,
  totalCombinedCompost,
) {
  // Reformat data.
  if (totalCO2Saved > 1000) {
    totalCO2Saved = (totalCO2Saved / 1000).toFixed(2) + "K";
  } else totalCO2Saved = totalCO2Saved.toFixed(2);

  //creating aria labels for the graphs
  let yardAria = "";
  for(let i = 0; i < pieChartLabels.length; i++){
    yardAria += pieChartData[i] + " entries of " + pieChartLabels[i]+ " gallons, ";
  }

  yardAria = yardAria.slice(0, -2);

  yardAria += ".";

  let foodAria = "";
  for(let i = 0; i < pieChartLabels.length; i++){
    foodAria += histogramData[i] + " entries of " + histogramLabels[i]+ " gallons, ";
  }

  foodAria = foodAria.slice(0, -2);

  foodAria += ".";


  document.getElementById("pie-chart").ariaLabel =
    "Pie chart showing the amount of yard waste composted in gallons, where there are " + yardAria;
    
    console.log(document.getElementById("pie-chart").ariaLabel);
  document.getElementById("bar-chart").ariaLabel =
    "Histogram showing ranges of total food waste composted where there is " + foodAria;
    console.log(document.getElementById("bar-chart").ariaLabel);

  //Creating Pie Chart
  const pieChartElement = document.getElementById("pie-chart").getContext("2d");
  new Chart(pieChartElement, {
    type: "pie",
    data: {
      labels: ["10 Gallons", "20 Gallons", "32 Gallons", "63 Gallons"],
      datasets: [
        {
          labels: pieChartLabels.map(String),
          data: pieChartData,
          borderWidth: 2,
          borderColor: "#b8b8b8",
          backgroundColor: ["#fdbd10", "#3aa8e4", "#EF7B45", "#D84727"],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Yard Waste Compost Distribution",
        },
      },
      responsive: true,
      aspectRatio: 1,
      maintainAspectRatio: true,
    },
  });

  //Creating Bar Chart
  const ctx = document.getElementById('bar-chart').getContext('2d');

  // Create the bar chart
  new Chart(ctx, {
    type: 'bar',
    data: {
        labels: histogramLabels.map(String), // Convert numbers to strings for labels
        datasets: [{
        data: histogramData, // Your actual y-axis values go here
        backgroundColor: '#3aa8e4',
        borderColor: '#0371ad',
        borderWidth: 1,
        borderRadius: 5,
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Food Waste Distribution",
        },
        legend:{
          display: false
        }
      },
      scales: {
        x: {
          type: 'linear',
          offset: false,
          title: {
            display: true,
            text: 'Food Waste Composting Value (Gallons)',
            font: {
              size: 14,
            },
          },
        },
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    }
  });

  const stats = document.getElementById("statistics-container");
  let bigStatsContainer = document.createElement("div");

  // This stats container template provided by Dipti Narayan via https://tailwindflex.com/@dipti/stats-section
  bigStatsContainer.innerHTML = `<div class="mt-10 pb-3">
      <div class="relative">
        <div class="absolute inset-0 h-1/2"></div>
        <div class="md:max-w-[75%] tablet:max-w-xl relative mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mx-auto md:max-w-[75%] tablet:max-w-xl">
            <dl class="rounded-lg border-[1px] border-gray-100 bg-white shadow-lg sm:grid sm:grid-cols-2">
              <div
                class="flex flex-col border-b border-gray-200 p-6 text-center sm:border-0 sm:border-r"
              >
                <dt
                  class="order-2 mt-2 text-lg font-medium leading-6 text-gray-700"
                  id="item-1"
                >
                  total kg CO² saved
                </dt>
                <dd
                  class="order-1 text-5xl font-extrabold leading-none text-anr-off-blue"
                  aria-describedby="item-1"
                >
                  ${totalCO2Saved}
                </dd>
              </div>
              <div
                class="flex flex-col border-b border-t border-gray-200 p-6 text-center sm:border-0 sm:border-l sm:border-r"
              >
                <dt
                  class="order-2 mt-2 text-lg font-medium leading-6 text-gray-700"
                >
                total gallons of food and yard waste composted
                </dt>
                <dd
                  class="order-1 text-5xl font-extrabold leading-none text-anr-off-blue"
                >
                ${totalCombinedCompost}
                </dd>
              </div>
              
            </dl>
          </div>
        </div>
      </div>
    </div>
    `;
  stats.after(bigStatsContainer);
}

function createStatsContainerElement(
  obj,
  width = "4/5",
  desktopWidth = "3/12",
) {
  // Rewrite statistic with a K if over 1000
  if (obj.val > 1000) {
    obj.val = (obj.val / 1000).toFixed(2) + "K";
  }

  var container = document.createElement("div");
  container.classList.add(
    "p-8",
    "border",
    "border-gray-300",
    "rounded-3xl",
    `w-${width}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
    "mt-2",
    "shadow-md",
  );

  var stat = document.createElement("p");
  stat.classList.add(
    "font-heading",
    "mb-6",
    "text-3xl",
    "md:text-5xl",
    "text-anr-off-blue",
    "font-black",
    "tracking-tight",
    "max-w-full",
    "text-center"
  );
  stat.innerHTML = obj.val;

  var desc = document.createElement("p");
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-base",
    "text-gray-700",
    "font-bold",
    "text-center"
  );

  desc.innerHTML += obj.desc;

  container.appendChild(stat);
  container.appendChild(desc);
  container.appendChild(
    popup(obj.title, obj.popUpDesc, obj.modalID),
  );

  return container;
}

// function createTwoStatsRowContainer(
//   stat1,
//   stat2,
//   desc1,
//   desc2,
//   // icon1,
//   // icon2,
//   // icon1Sz = "30px",
//   // icon2Sz = "30px",
//   mobileWidth = "4/5",
//   desktopWidth = "3/12",
// ) {
//   var container = document.createElement("div");
//   container.classList.add(
//     "flex",
//     `w-${mobileWidth}`,
//     `md:w-${desktopWidth}`,
//     "mx-auto",
//   );

//   var statCont1 = createStatsContainerElement(stat1, desc1); //, icon1, icon1Sz
//   statCont1.classList.remove("md:w-3/12");
//   statCont1.classList.add("mr-1", "md:w-1/2");
//   var statCont2 = createStatsContainerElement(stat2, desc2); //, icon2, icon2Sz
//   statCont2.classList.remove("md:w-3/12");
//   statCont2.classList.add("ml-1", "md:w-1/2");

//   container.appendChild(statCont1);
//   container.appendChild(statCont2);

//   return container;
// }

function convertToKgCO2(input, unit) {
  if (unit == "kilograms") {
    // Convert from kg to lbs.
    input *= 2.20462;
  }
  if (unit == "gallons") {
    // Convert from gallons to lbs.
    input *= 6.18891540495;
  }
  if (unit == "liters") {
    // Convert from liters to lbs.
    input *= 1.63493925492;
  }

  // Convert from lbs to kg CO2 saved.
  const KgCO2SavedPerPound = 0.1814;
  return input * KgCO2SavedPerPound;
}

function convertToMilesDriven(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.00039;
}

function convertToSmartPhonesCharged(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.00000822;
}

function convertToGasConsumed(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.008887;
}

function convertToTreeSeedlingsGrown(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.06;
}

function convertToAcresOfForest(MetricTonsOfCo2) {
  return MetricTonsOfCo2 / 0.84;
}

function convertToTrashBags(MetricTonsOfCo2){
  return MetricTonsOfCo2/0.023
}

function percentile(arr, value) {
  //remove empty values from array
  arr = arr.filter((x) => x !== null && x !== "");
  const currentIndex = 0;
  const totalCount = arr.reduce((count, currentValue) => {
    if (currentValue < value) {
      return count + 1; // add 1 to `count`
    } else if (currentValue === value) {
      return count + 0.5; // add 0.5 to `count`
    }
    return count + 0;
  }, currentIndex);
  return (totalCount * 100) / arr.length;
}

// Load data and create charts using Google Sheets API

const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

function handleClientLoad() {
  gapi.load("client", initClient);
}

function initClient() {
  try {
    gapi.client
      .init({
        apiKey: "AIzaSyAalwjvT0D5TWInJchaijnw6L7iap6nCJ0",
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(function () {
        loadSheets();
      });
  } catch (e) {
    console.log(e);
  }
}

function loadSheets() {
  // const spreadsheetId = "1QKrr4FgZQi-TJFIzq1uSpM4lPKgcVWxCohREJAllrD8";
  const spreadsheetId = "1Hf_BtKrpwQlFGfikgL9_53nSsnIUQn0CVcYxPSmoRbI";
  const sheetName = "QuialtrixRawData";
  // const sheetName = "QuialtrixData";

  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId,
      range: sheetName,
    })
    .then(
      function (response) {
        const values = response.result.values;
        let length = values.length-1;

        //Food Waste Data

        foodWasteValues = [0.25, 0.5, 1, 2, 3, 4];
        foodWasteCount = [];

        totalFoodCompost = 0;
        let j = 0;
        let totalUser = 0;
        for(let i = 1; i <= 6; i++){
          foodWasteCount.push(values[length][i]);
          totalFoodCompost += foodWasteValues[j]*foodWasteCount[j];
          totalUser += Number(foodWasteCount[j]);
          j++;
        }    

        yardWasteValues = [10, 20, 32, 63];
        yardWasteCount = [];

        totalYardCompost = 0;
        j = 0;
        for(let i = 7; i <= 10; i++){
          yardWasteCount.push(values[length][i]);
          totalYardCompost += yardWasteValues[j]*yardWasteCount[j];
          totalUser += Number(yardWasteCount[j]);
          j++;
        }

        totalCombinedCompost = totalFoodCompost + totalYardCompost;

        avgCombinedCompost = (totalCombinedCompost/totalUser).toFixed(2);


        localStorage.setItem(
          "allWasteComposted",
          JSON.stringify(totalCombinedCompost),
        );
        localStorage.setItem(
          "allFoodWasteComposted",
          JSON.stringify(totalFoodCompost),
        );
        localStorage.setItem(
          "allYardWasteComposted",
          JSON.stringify(totalYardCompost),
        );


        let totalCO2Saved = convertToKgCO2(
          totalCombinedCompost,
          "gallons",
        );
        
        createCharts(
          yardWasteValues,
          yardWasteCount,
          foodWasteValues,
          foodWasteCount,
          totalCO2Saved,
          totalCombinedCompost
        );
      },
      function (response) {
        console.error(
          "Error loading sheet data:",
          response.result.error.message,
        );
      },
    );
}

function createCO2StatsticContainer(
  obj1,
  obj2,
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
  var container = document.createElement("div");
  container.classList.add(
    "flex",
    `w-${mobileWidth}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
  );

  var statCont1 = createCO2Element(obj1);
  statCont1.classList.remove("md:w-3/12","w-4/5"); 
  statCont1.classList.add("mr-1","md:w-1/8", "w-1/3");
  var statCont2 = createStatisticsDescription(obj2);
  statCont2.classList.remove("md:w-3/12","w-4/5");
  statCont2.classList.add("ml-1","md:w-1/8","max-w-full", "w-2/3");

  container.appendChild(statCont1);
  container.appendChild(statCont2);

  return container;
}

function createCO2Element(
  obj,
  width = "4/5",
  desktopWidth = "3/12",
) {
  // Rewrite statistic with a K if over 1000
  if (obj.val > 1000) {
    obj.val = (obj.val / 1000).toFixed(2) + "K";
  }

  var container = document.createElement("div");
  container.classList.add(
    "p-8",
    "border",
    "border-gray-300",
    "rounded-3xl",
    `w-${width}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
    "mt-2",
    "shadow-md",
  );

  var stat = document.createElement("p"); //stat
  stat.classList.add(
    "font-heading",
    "mb-6",
    "text-3xl",
    "md:text-4xl",
    "text-anr-off-blue",
    "font-black",
    "tracking-tight",
    "max-w-full",
    "text-center"
  );
  stat.innerHTML = obj.val + " kg";

  var desc = document.createElement("p"); //your co2 saving
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-lg",
    "text-gray-700",
    "font-bold",
    "text-center"
  );

  desc.innerHTML += obj.desc;
  container.appendChild(desc);
  container.appendChild(stat);
  container.appendChild(
    popup(obj.title, obj.popUpDesc, obj.modalID),
  );
  
  return container;
}

function createStatisticsDescription(
  obj,
  width = "4/5",
  desktopWidth = "3/12",
){
  var container = document.createElement("div");
  container.classList.add(
    "p-8",
    "border",
    "border-gray-300",
    "rounded-3xl",
    `w-${width}`,
    `md:w-${desktopWidth}`,
    "mx-auto",
    "mt-2",
    "shadow-md",
  );

  var header = document.createElement("h3");
  header.classList.add(
    "font-heading",
    "mb-2",
    "text-xl",
    "font-bold",
    "text-anr-off-blue",
    "font-black",
    "text-center"
  );
  header.innerHTML += "Composting Education Program's Database";

  var desc = document.createElement("p");
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-sml",
    "text-gray-700",
    "font-bold",
    "text-center"
  );

  desc.innerHTML += obj.desc;
  
  container.appendChild(header);
  container.appendChild(desc);
  return container;
}

function createThreeStatsRowContainer(
  obj1,
  obj2,
  obj3,
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
    var container = document.createElement("div");
    container.classList.add(
      "flex",
      `w-${mobileWidth}`,
      `md:w-${desktopWidth}`,
      "mx-auto",
    );

    var statCont1 = createVerticleContainer(obj1, obj2);
    statCont1.classList.remove("md:w-3/12");
    statCont1.classList.add("mr-1", "md:w-1/2");
    var statCont2 = createStatsContainerElement(obj3);
    statCont2.classList.remove("md:w-3/12");
    statCont2.classList.add("ml-1", "md:w-1/2");
    statCont2.children[1].classList.remove("text-base");
    statCont2.children[1].classList.add("text-xl");

    statCont2.insertBefore(batteryContainer(), statCont2.firstChild);

    container.appendChild(statCont1);
    container.appendChild(statCont2)

    return container;
}

function createVerticleContainer(
  obj1,
  obj2,
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
    var container = document.createElement("div");
    container.classList.add(
      `w-${mobileWidth}`,
      `md:w-${desktopWidth}`,
      "mx-auto",
      "flex",
      "flex-col"
    );

    var statCont1 = createStatsContainerElement(obj1); 
    statCont1.classList.remove("md:w-3/12", "mx-auto");
    statCont1.classList.add("w-full","h-equal");
    var statCont2 = createStatsContainerElement(obj2);
    statCont2.classList.remove("md:w-3/12","mx-auto");
    statCont2.classList.add("w-full", "h-equal");
    
    var icon = document.createElement("img");
    icon.classList.add(
      "w-3/4",
      "mb-3",
      "mx-auto"
    );
    icon.src = trashIMAGE;
    icon.alt = "icon";

    statCont2.insertBefore(icon, statCont2.firstChild);

    container.appendChild(statCont1);
    container.appendChild(statCont2);

    return container;
}

function milesContainer(
  obj,
  width = "4/5",
  desktopWidth = "3/12",
){
  var container = createStatsContainerElement(
    obj,
    width,
    desktopWidth,
  );

  container.children[1].classList.remove("text-base"); 
  container.children[1].classList.add("text-lg");

  var movingCarContainer = document.createElement("div");
  movingCarContainer.classList.add(
    "mx-3",
  );

  var icon = document.createElement("img");
  icon.classList.add(
    "movingCar",
  );
  icon.src = movingCar;
  icon.alt = "icon";

  movingCarContainer.appendChild(icon);

  const childToDelete = container.firstChild;

  // Check if the child element exists before attempting to remove it
  if (childToDelete) {
      // Remove the child element
      container.removeChild(childToDelete);
  }

  const firstExistingChild = container.firstChild;

  container.insertBefore(movingCarContainer, firstExistingChild);

  return container;
}

function popup(
  title,
  desc,
  modalId = "modal"
){
  var container = document.createElement("div"); //contains modal and overlay
  container.classList.add("text-center");

  var moreInfo = document.createElement("button");
  moreInfo.setAttribute("data-modal-target",`#${modalId}`);
  moreInfo.classList.add('text-base', 'font-bold');
  moreInfo.innerHTML = "Learn More";
  container.append(moreInfo);

  var modal = document.createElement("div");
  modal.setAttribute("id", modalId);
  modal.classList.add(
    "modal",
  );

  var modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  var modalTitle = document.createElement("p");
  modalTitle.classList.add(
    'text-xl',
    'font-black'
  )
  modalTitle.innerHTML = title;

  var closeButton = document.createElement("button");
  closeButton.setAttribute("data-close-button", "close-button");
  closeButton.classList.add(
    'text-xl',
    'font-black'
  )
  closeButton.innerHTML = "&times;"

  var modalBody = document.createElement("div");
  modalBody.classList.add(
    'p-4'
    )
  modalBody.innerHTML = desc;

  var overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay");

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);
  modal.appendChild(modalHeader);
  modal.appendChild(modalBody);
  container.appendChild(moreInfo);
  container.appendChild(modal);
  container.appendChild(overlay);
  
  return container;
}

function openModal(modal, overlay) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal, overlay) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

function batteryContainer(){
  var container = document.createElement("div");
  container.classList.add("mySlides", "m-auto");

  var image = document.createElement("img");
  image.setAttribute("id", "image");

  container.appendChild(image);

  var battery = ["../images/EmptyBattery.png", "../images/1:4Charged.png", "../images/1:2Charged.png","../images/3:4Charged.png","../images/FullCharge.png"];
  let i = 0;
  setInterval(function(){
    image.src = battery[i];
    i++;
    if(i > 4){ i = 0;}
  },800);

  return container;
}

function calculateNormalDistribution(x, mean, stdDeviation) {
  return (1 / (stdDeviation * Math.sqrt(2 * Math.PI))) * Math.exp(-((x - mean) ** 2) / (2 * stdDeviation ** 2));
}