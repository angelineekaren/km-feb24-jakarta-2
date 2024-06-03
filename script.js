function returnOptions(
  type,
  data,
  title,
  xDesc,
  yDesc,
  xStacked,
  yStacked,
  indexAxis
) {
  const options = {
    type: type,
    data: data,
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          color: "white",
        },
        title: {
          display: true,
          text: title,
          color: "#2B262D",
          font: {
            size: 20,
            family: "DM Sans",
          },
        },
        tooltip: {
          titleFont: {
            size: 16,
          },
          bodyFont: {
            size: 16,
          },
        },
        legend: {
          labels: {
            color: "#2B262D",
            font: {
              size: 12,
            },
          },
        },
      },
      indexAxis: indexAxis,
      scales: {
        x: {
          stacked: xStacked,
          title: {
            display: true,
            text: xDesc,
            font: {
              size: 14,
            },
            padding: {
              top: 10,
            },
            color: "#2B262D",
          },
          ticks: {
            color: "#2B262D",
            font: {
              size: 16,
            },
          },
          grid: {
            color: "#C7C7CB",
          },
        },
        y: {
          stacked: yStacked,
          title: {
            display: true,
            text: yDesc,
            font: {
              size: 16,
            },
            padding: {
              bottom: 10,
            },
            color: "#2B262D",
          },
          ticks: {
            color: "#2B262D",
            font: {
              size: 16,
            },
          },
          grid: {
            color: "#C7C7CB",
          },
        },
      },
    },
  };

  return options;
}

const category = ["Carbonated", "Food", "Non Carbonated", "Water"];
const vmLocation = [
  "Brunswick Sq Mall",
  "EB Public Library",
  "Earle Asphalt",
  "GuttenPlans",
];
const categorySales = {};
const totalSaleFromMachine = {};
const totalTransactionsFromMachine = {};
const cashSalesFromMachine = {};
const creditSalesFromMachine = {};
const transactionOnVendingMachineEachMonth = [];
const transactionOnVendingMachineEachcategory = [];
const test = [];
const uniquePlace = [];
const uniqueDate = [];
const avgSales = [];

categorySales["Carbonated"] = parseFloat(0);
categorySales["Food"] = parseFloat(0);
categorySales["Water"] = parseFloat(0);
categorySales["Non Carbonated"] = parseFloat(0);

fetch("./data/Pivot_Table.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((response) => {
    console.log("asdf");

    response.data.map((value) => {
      const {
        Location,
        TotalSales,
        TotalTransactions,
        CashSales,
        CreditSales,
        CarbonatedSales,
        FoodSales,
        NonCarbonatedSales,
        WaterSales,
        Month,
      } = value;

      // Add unique locations
      if (!uniquePlace.includes(Location)) {
        uniquePlace.push(Location);
      }

      const [y, m] = Month.split("-");
      const date = new Date(null, m - 1);
      const monthName = date.toLocaleString("en", { month: "long" });

      // Add unique months
      if (!uniqueDate.includes(monthName)) {
        uniqueDate.push(monthName);
      }

      // Transactions by month
      if (!transactionOnVendingMachineEachMonth[Location]) {
        transactionOnVendingMachineEachMonth[Location] = {};
      }
      transactionOnVendingMachineEachMonth[Location][monthName] =
        parseFloat(TotalTransactions);

      // Sales by category
      if (!test[category[0]]) {
        test[category[0]] = {};
      }
      test[category[0]][Location] = parseFloat(CarbonatedSales);

      if (!test[category[1]]) {
        test[category[1]] = {};
      }
      test[category[1]][Location] = parseFloat(FoodSales);

      if (!test[category[2]]) {
        test[category[2]] = {};
      }
      test[category[2]][Location] = parseFloat(NonCarbonatedSales);

      if (!test[category[3]]) {
        test[category[3]] = {};
      }
      test[category[3]][Location] = parseFloat(WaterSales);

      // Total sales by location
      totalSaleFromMachine[Location] =
        (totalSaleFromMachine[Location] || 0) + parseFloat(TotalSales);
      totalTransactionsFromMachine[Location] =
        (totalTransactionsFromMachine[Location] || 0) +
        parseInt(TotalTransactions);

      // Cash and credit sales by location
      cashSalesFromMachine[Location] =
        (cashSalesFromMachine[Location] || 0) + parseFloat(CashSales);
      creditSalesFromMachine[Location] =
        (creditSalesFromMachine[Location] || 0) + parseFloat(CreditSales);

      // Sales by category
      categorySales["Carbonated"] += parseFloat(CarbonatedSales);
      categorySales["Food"] += parseFloat(FoodSales);
      categorySales["Water"] += parseFloat(WaterSales);
      categorySales["Non Carbonated"] += parseFloat(NonCarbonatedSales);
    });

    // Calculate average sales per transaction by location
    uniquePlace.forEach((element) => {
      var avg =
        totalSaleFromMachine[element] / totalTransactionsFromMachine[element];
      avgSales.push(avg);
    });

    const dataChart1 = {
      labels: uniquePlace,
      datasets: [
        {
          label: "Average Transaction",
          data: avgSales,
          borderColor: "#6A9CFD",
          backgroundColor: "#6A9CFD",
        },
      ],
    };

    const dataChart2 = {
      labels: uniquePlace,
      datasets: [
        {
          label: "Cash",
          data: cashSalesFromMachine,
          backgroundColor: "#6A9CFD",
          borderColor: "#6A9CFD",
          borderWidth: 1,
        },
        {
          label: "Credit",
          data: creditSalesFromMachine,
          backgroundColor: "#FFB8D0",
          borderColor: "#FFB8D0",
          borderWidth: 1,
        },
      ],
    };

    const dataChart3 = {
      labels: category,
      datasets: [
        {
          label: "Total Sales",
          data: categorySales,
          backgroundColor: "#033495",
          borderColor: "#033495",
          borderWidth: 1,
        },
      ],
    };

    const dataChart4 = {
      labels: uniqueDate,
      datasets: [
        {
          label: "Brunswick Sq Mall",
          data: transactionOnVendingMachineEachMonth["Brunswick Sq Mall"],
          backgroundColor: "#6A9CFD",
          borderColor: "#6A9CFD",
          borderWidth: 1,
        },
        {
          label: "EB Public Library",
          data: transactionOnVendingMachineEachMonth["EB Public Library"],
          backgroundColor: "#FFB8D0",
          borderColor: "#FFB8D0",
          borderWidth: 1,
        },
        {
          label: "Earle Asphalt",
          data: transactionOnVendingMachineEachMonth["Earle Asphalt"],
          backgroundColor: "#033495",
          borderColor: "#033495",
          borderWidth: 1,
        },
        {
          label: "GuttenPlans",
          data: transactionOnVendingMachineEachMonth["GuttenPlans"],
          backgroundColor: "#AEE4FF",
          borderColor: "#AEE4FF",
          borderWidth: 1,
        },
      ],
    };

    const dataChart5 = {
      labels: uniquePlace,
      datasets: [
        {
          label: category[0],
          data: test[category[0]],
          backgroundColor: "#6A9CFD",
          borderColor: "#6A9CFD",
          borderWidth: 1,
        },
        {
          label: category[1],
          data: test[category[1]],
          backgroundColor: "#FFB8D0",
          borderColor: "#FFB8D0",
          borderWidth: 1,
        },
        {
          label: category[2],
          data: test[category[2]],
          backgroundColor: "#033495",
          borderColor: "#033495",
          borderWidth: 1,
        },
        {
          label: category[3],
          data: test[category[3]],
          backgroundColor: "#AEE4FF",
          borderColor: "#AEE4FF",
          borderWidth: 1,
        },
      ],
    };

    const configChart1 = returnOptions(
      "line",
      dataChart1,
      "Average Value of Transaction",
      "Location",
      "Avg Transaction",
      false,
      false,
      "x"
    );
    const configChart2 = returnOptions(
      "bar",
      dataChart2,
      "Payment Type in each Machine",
      "Location",
      "Total Transaction",
      false,
      false,
      "x"
    );
    const configChart3 = returnOptions(
      "bar",
      dataChart3,
      "Sales in each Category",
      "Category",
      "Total Sales",
      false,
      false,
      "x"
    );
    const configChart4 = returnOptions(
      "bar",
      dataChart4,
      "Peak Sales Date",
      "Transaction Date",
      "Transaction Count",
      false,
      false,
      "x"
    );
    const configChart5 = returnOptions(
      "bar",
      dataChart5,
      "Top Selling Category Across Machine",
      "Category",
      "Location",
      true,
      true,
      "y"
    );

    const myChart1 = new Chart(document.getElementById("chart1"), configChart1);

    const myChart2 = new Chart(document.getElementById("chart2"), configChart2);

    const myChart3 = new Chart(document.getElementById("chart3"), configChart3);

    const myChart4 = new Chart(document.getElementById("chart4"), configChart4);

    const myChart5 = new Chart(document.getElementById("chart5"), configChart5);

    const chartVersion = document.getElementById("chartVersion");
    chartVersion.innerText = Chart.version;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu-link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});

//coba1
document.addEventListener("DOMContentLoaded", function () {
  var dropdownBtns = document.getElementsByClassName("dropdown-btn");
  var dropdownContents = document.getElementsByClassName("dropdown-content");

  for (let i = 0; i < dropdownBtns.length; i++) {
    dropdownBtns[i].addEventListener("click", function () {
      var content = dropdownContents[i];
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  document.addEventListener("click", function (event) {
    for (let i = 0; i < dropdownBtns.length; i++) {
      if (
        !dropdownBtns[i].contains(event.target) &&
        !dropdownContents[i].contains(event.target)
      ) {
        dropdownContents[i].style.display = "none";
      }
    }
  });
});
//
function hideAllCharts() {
  document.querySelectorAll(".chart-container").forEach((chart) => {
    chart.style.display = "none";
  });
}

function showChart(chartId) {
  document.getElementById(chartId).style.display = "block";
}

document.getElementById("feedbackBtn").addEventListener("click", function () {
  var feedbackForm = document.getElementById("feedbackForm");
  feedbackForm.style.display = "block";
});

//sini

document
  .getElementById("sendFeedbackBtn")
  .addEventListener("click", function () {
    var feedbackText = document.getElementById("feedbackText").value;
    if (feedbackText.trim() !== "") {
      alert("Thank you for your feedback!");
      document.getElementById("feedbackText").value = "";
      document.getElementById("feedbackForm").style.display = "none";
    } else {
      alert("Please write feedback before sending.");
    }
  });

document.addEventListener("click", function (event) {
  var feedbackForm = document.getElementById("feedbackForm");
  var feedbackBtn = document.getElementById("feedbackBtn");
  if (
    !feedbackForm.contains(event.target) &&
    !feedbackBtn.contains(event.target)
  ) {
    feedbackForm.style.display = "none";
  }
});
