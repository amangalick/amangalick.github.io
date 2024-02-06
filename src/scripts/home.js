// Icon links
var carIconSrc = "../images/car.png";
var phoneIconSrc = "../images/charging.png";
var gasIconSrc = "../images/gas-station.png";
var treeIconSrc = "../images/plant.png";
var carbonIconSrc = "../images/carbon-capture.png";
var compostIconSrc = "../images/compostable.png";
var shareIconSrc = "../images/share.png";
var qrCodeSrc = "../images/qrcode.png";

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

    let kgCo2 = convertToKgCO2(input.value, unit.value).toFixed(2);
    let kgDesc = "kg of CO² saved";

    let tonsOfCo2 = kgCo2 / 1000;

    let milesDriven = convertToMilesDriven(tonsOfCo2).toFixed(2);
    let mdDesc = "miles driven";

    let smartPhonesCharged = convertToSmartPhonesCharged(tonsOfCo2).toFixed(2);
    let spDesc = "phones charged";

    let gallonsOfGas = convertToGasConsumed(tonsOfCo2).toFixed(2);
    let gogDesc = "gallons of gas consumed";

    let treeSeedlingsGrown = convertToTreeSeedlingsGrown(tonsOfCo2).toFixed(2);
    let tsgDesc = "tree seedlings grown for 10 years";

    // Get the percentile of the user's composting
    let lbsComposted = kgCo2 / 0.1814;
    let galsComposted = lbsComposted / 6.18891540495;
    let map = {
      food: JSON.parse(localStorage.getItem("allFoodWasteComposted")),
      yard: JSON.parse(localStorage.getItem("allYardWasteComposted")),
      all: JSON.parse(localStorage.getItem("allWasteComposted")),
    };
    let description =
      "According to our data, you were in the top " +
      percentile(map[type.value], galsComposted).toFixed(2) +
      "% of composters in Santa Clara.";

    content.appendChild(createInfoContainerElement(description, "4/5", "1/2"));

    content.appendChild(
      createStatsContainerElement(
        kgCo2,
        kgDesc,
        carbonIconSrc,
        "25px",
        "4/5",
        "1/2",
      ),
    );
    // desktop computer
    if (window.screen.width >= 768) {
      content.appendChild(
        createTwoStatsRowContainer(
          milesDriven,
          smartPhonesCharged,
          mdDesc,
          spDesc,
          carIconSrc,
          phoneIconSrc,
          "30px",
          "18px",
          "4/5",
          "1/2",
        ),
      );

      content.appendChild(
        createTwoStatsRowContainer(
          gallonsOfGas,
          treeSeedlingsGrown,
          gogDesc,
          tsgDesc,
          gasIconSrc,
          treeIconSrc,
          "18px",
          "17px",
          "4/5",
          "1/2",
        ),
      );
    } // mobile
    else {
      content.appendChild(
        createStatsContainerElement(
          milesDriven,
          mdDesc,
          carIconSrc,
          "25px",
          "4/5",
          "1/2",
        ),
      );
      content.appendChild(
        createStatsContainerElement(
          smartPhonesCharged,
          spDesc,
          phoneIconSrc,
          "25px",
          "4/5",
          "1/2",
        ),
      );
      content.appendChild(
        createStatsContainerElement(
          gallonsOfGas,
          gogDesc,
          gasIconSrc,
          "25px",
          "4/5",
          "1/2",
        ),
      );
      content.appendChild(
        createStatsContainerElement(
          treeSeedlingsGrown,
          tsgDesc,
          treeIconSrc,
          "25px",
          "4/5",
          "1/2",
        ),
      );
    }
  }
}

function toggleAR() {
  // If device is mobile, open AR website in new tab (https://ytxxc.zappar.io/7543435830527519324/)
  // Else, open AR QR code website in popup modal

  // Regex function provided by http://detectmobilebrowsers.com/
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  if (check) {
    window.open("https://ytxxc.zappar.io/7543435830527519324/", "_blank");
  } else {
    document.getElementById("overlay-modal").classList.toggle("invisible");
    document.getElementById("popup-modal").classList.toggle("invisible");
    document.getElementById("overlay-modal").classList.toggle("opacity-0");
    document.getElementById("overlay-modal").classList.toggle("opacity-100");
    document.getElementById("popup-modal").classList.toggle("opacity-0");
    document.getElementById("popup-modal").classList.toggle("opacity-100");
  }
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
  totalFoodCompost,
  totalYardCompost,
  histogramLabels,
  histogramData,
  histogramStep,
  totalCO2Saved,
  averageCompostPerUser,
) {
  // Reformat data.
  if (totalCO2Saved > 1000) {
    totalCO2Saved = (totalCO2Saved / 1000).toFixed(2) + "K";
  } else totalCO2Saved = totalCO2Saved.toFixed(2);
  document.getElementById("pie-chart").ariaLabel =
    "Pie chart showing the amount of food waste composted compared to yard waste composted in gallons, where the total food waste composted was " +
    totalFoodCompost +
    " gallons and the total yard waste composted was " +
    totalYardCompost +
    " gallons.";

  document.getElementById("bar-chart").ariaLabel =
    "Histogram showing ranges of total food waste composted versus percentage of users who composted within that range, where the first range was between ";
  for (let i = 0; i < histogramLabels.length; i++) {
    document.getElementById("bar-chart").ariaLabel +=
      histogramLabels[i] -
      histogramStep / 2 +
      " and " +
      (histogramLabels[i] + histogramStep / 2) +
      " gallons, and the percentage of users who composted within that range was " +
      histogramData[i] +
      " percent, " +
      " the next range was between ";
  }

  const pieChartElement = document.getElementById("pie-chart").getContext("2d");
  new Chart(pieChartElement, {
    type: "pie",
    data: {
      labels: ["Food Waste (gallons)", "Yard Waste (gallons)"],
      datasets: [
        {
          labels: [],
          data: [totalFoodCompost, totalYardCompost],
          borderWidth: 2,
          borderColor: "#b8b8b8",
          backgroundColor: ["#fdbd10", "#3aa8e4"],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Total Food Waste vs Total Yard Waste",
        },
      },
      responsive: true,
      aspectRatio: 1,
      maintainAspectRatio: true,
    },
  });

  let mappedHistogramData = histogramData.map((k, i) => ({
    x: histogramLabels[i],
    y: k,
  }));

  const histogram = document.getElementById("bar-chart").getContext("2d");
  new Chart(histogram, {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Percentage of Users",
          data: mappedHistogramData,
          backgroundColor: "#3aa8e4",
          borderColor: "#0371ad",
          borderWidth: 1,
          barPercentage: 1,
          categoryPercentage: 1,
          borderRadius: 5,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          offset: false,
          grid: {
            offset: false,
          },
          ticks: {
            stepSize: histogramStep,
          },
          title: {
            display: true,
            text: "Weekly Compost (gallons)",
            font: {
              size: 14,
            },
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Percentage of Users",
            font: {
              size: 14,
            },
          },
        },
      },
      responsive: true,
      aspectRatio:
        window.innerWidth <= 900 ? (window.innerWidth < 530 ? 0.8 : 1) : 1.9, // Adjust the aspect ratio for mobile/tablet/desktop
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Weekly Compost Per User Distribution",
        },

        tooltip: {
          callbacks: {
            title: (items) => {
              if (!items.length) {
                return "";
              }
              const item = items[0];
              const x = item.parsed.x;
              const min = x - histogramStep / 2;
              const max = x + histogramStep / 2;
              return `Weekly Compost: ${min} - ${max} gallons`;
            },
          },
        },
      },
    },
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
                average gallons compost per survey respondent 
                </dt>
                <dd
                  class="order-1 text-5xl font-extrabold leading-none text-anr-off-blue"
                >
                ${averageCompostPerUser}
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

function createInfoContainerElement(
  description,
  mobileWidth = "4/5",
  desktopWidth = "3/12",
) {
  var display = document.createElement("div");
  display.innerHTML = description;
  display.classList.add(
    "bg-green-100",
    "border-l-4",
    "border-green-500",
    "text-green-700",
    "rounded",
    "p-4",
    "mt-4",
    `md:w-${desktopWidth}`,
    `w-${mobileWidth}`,
    "mx-auto",
  );

  var info = document.createElement("p");
  info.classList.add("font-bold", "text-center");
  display.appendChild(info);

  return display;
}

function createStatsContainerElement(
  statistic,
  description,
  iconSrc,
  iconSize = "30px",
  width = "4/5",
  desktopWidth = "3/12",
) {
  // Rewrite statistic with a K if over 1000
  if (statistic > 1000) {
    statistic = (statistic / 1000).toFixed(2) + "K";
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
  );
  stat.innerHTML = statistic;

  var desc = document.createElement("span");
  desc.classList.add(
    "font-heading",
    "mb-2",
    "text-base",
    "text-gray-700",
    "font-bold",
  );

  var icon = document.createElement("img");
  icon.classList.add("inline");
  icon.src = iconSrc;
  icon.style.height = iconSize;
  icon.alt = "icon";

  desc.appendChild(icon);
  desc.innerHTML += " " + description;

  container.appendChild(stat);
  container.appendChild(desc);

  return container;
}

function createTwoStatsRowContainer(
  stat1,
  stat2,
  desc1,
  desc2,
  icon1,
  icon2,
  icon1Sz = "30px",
  icon2Sz = "30px",
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

  var statCont1 = createStatsContainerElement(stat1, desc1, icon1, icon1Sz);
  statCont1.classList.remove("md:w-3/12");
  statCont1.classList.add("mr-1", "md:w-1/2");
  var statCont2 = createStatsContainerElement(stat2, desc2, icon2, icon2Sz);
  statCont2.classList.remove("md:w-3/12");
  statCont2.classList.add("ml-1", "md:w-1/2");

  container.appendChild(statCont1);
  container.appendChild(statCont2);

  return container;
}

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
  const spreadsheetId = "1QKrr4FgZQi-TJFIzq1uSpM4lPKgcVWxCohREJAllrD8";
  const sheetName = "QuialtrixRawData";

  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId,
      range: sheetName,
    })
    .then(
      function (response) {
        const values = response.result.values;
        totalFoodCompost = values[1][3];
        totalYardCompost = values[1][4];

        // Used for calculating percentiles.
        allFoodWasteComposted = values
          .slice(1)
          .map((row) => parseFloat(row[1]));

        allYardWasteComposted = values
          .slice(1)
          .map((row) => parseFloat(row[2]));

        // For the total, total[i] = allFoodWasteComposted[i] + allYardWasteComposted[i]
        allWasteComposted = allFoodWasteComposted.map(
          (value, index) => value + allYardWasteComposted[index],
        );

        localStorage.setItem(
          "allWasteComposted",
          JSON.stringify(allWasteComposted),
        );
        localStorage.setItem(
          "allFoodWasteComposted",
          JSON.stringify(allFoodWasteComposted),
        );
        localStorage.setItem(
          "allYardWasteComposted",
          JSON.stringify(allYardWasteComposted),
        );

        let maxTotalCompost = 0;
        let averageTotalCompostPerUser = 0;
        let totalUsers = 0;
        for (var i = 1; i < values.length; i++) {
          if (
            !values[i][1] ||
            !values[i][2] ||
            values[i][1].trim() == "" ||
            values[i][2].trim() == ""
          )
            continue;
          totalUsers++;
          averageTotalCompostPerUser += parseFloat(values[i][1]);
          averageTotalCompostPerUser += parseFloat(values[i][2]);
          if (
            maxTotalCompost <
            parseFloat(values[i][1]) + parseFloat(values[i][2])
          ) {
            maxTotalCompost =
              parseFloat(values[i][1]) + parseFloat(values[i][2]);
          }
        }
        // Round maxTotalCompost to nearest integer divisible by 8.
        maxTotalCompost = Math.ceil(maxTotalCompost / 8) * 8;
        // Create labels for a histogram, starting at 0, ending at maxTotalCompost, with 8 bins.
        let histogramLabels = [];
        for (
          var i = maxTotalCompost / 8;
          i <= maxTotalCompost;
          i += maxTotalCompost / 8
        ) {
          histogramLabels.push(i - maxTotalCompost / 16);
        }

        let histogramStep = maxTotalCompost / 8;
        // Create data for the histogram: the percentage of users who composted between each bin.
        let histogramData = [];
        for (var i = 0; i < histogramLabels.length; i++) {
          histogramData.push(
            (
              percentile(
                allWasteComposted,
                histogramLabels[i] + histogramStep / 2,
              ) -
              percentile(
                allWasteComposted,
                histogramLabels[i] - histogramStep / 2,
              )
            ).toFixed(2),
          );
        }

        let totalCO2Saved = convertToKgCO2(
          averageTotalCompostPerUser,
          "gallons",
        );
        averageTotalCompostPerUser = (
          averageTotalCompostPerUser / totalUsers
        ).toFixed(2);
        createCharts(
          totalFoodCompost,
          totalYardCompost,
          histogramLabels,
          histogramData,
          histogramStep,
          totalCO2Saved,
          averageTotalCompostPerUser,
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
