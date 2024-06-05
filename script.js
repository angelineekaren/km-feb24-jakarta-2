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
            size: 18,
          },
          bodyFont: {
            size: 16,
          },
        },
        legend: {
          labels: {
            color: "#2B262D",
            font: {
              size: 10,
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
              size: 11,
              weight: 'bold',
            },
            padding: {
              top: 9,
            },
            color: "#2B262D",
          },
          ticks: {
            color: "#2B262D",
            font: {
              size: 10,
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
              size: 11,
              weight: 'bold',
            },
            padding: {
              bottom: 10,
            },
            color: "#2B262D",
          },
          ticks: {
            color: "#2B262D",
            font: {
              size: 9,
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
let categorySales = {};
const totalSaleFromMachine = {};
const totalTransactionsFromMachine = {};
const cashSalesFromMachine = {};
const creditSalesFromMachine = {};
const transactionOnVendingMachineEachMonth = [];
const transactionOnVendingMachineEachcategory = [];
const test = [];
const uniquePlace = [];
const uniqueDate = [];
let avgSales = [];
let myChart1 = null;
let arr = [true, true, true, true]
let arrCategory = [true, true, true, true]

let checkboxes = document.getElementsByClassName('checkbox-location')
for (let index = 0; index < checkboxes.length; index++) {
  checkboxes[index].addEventListener('click', () => {
    selectedCheckbox(index)
  })
  checkboxes[index].checked = true
}

let checkboxes_category = document.getElementsByClassName('checkbox-category')
for (let index = 0; index < checkboxes_category.length; index++) {
  checkboxes_category[index].addEventListener('click', () => {
    selectedCheckboxCategory(index)
  })
  checkboxes_category[index].checked = true
}

function selectedCheckboxCategory(idx) {
  arrCategory[idx] = !arrCategory[idx]
  chartCategory()
}

function chartCategory() {
  selected_category = []

  new_cat = ['Carbonated', 'Non Carbonated', 'Food', 'Water']
  for (let i = 0; i < arrCategory.length; i++) {
    if (arrCategory[i] == true){
      selected_category.push(new_cat[i])
    }
  }
    categorySalesTemp = {}
  for (let i = 0; i < selected_category.length; i++) {
    categorySalesTemp[selected_category[i]] = categorySales[selected_category[i]]
  }

  // updateChart2()
  updateChart3(categorySalesTemp)
  updateChart5(selected_category)
}

function updateChart5(selected_category) {
  myChart5.destroy()
  let data = {
    labels: uniquePlace,
    datasets: []
  }
  ds = []

  for (let i = 0; i < selected_category.length; i++) {
    ob = {
      label: selected_category[i],
      data: test[selected_category[i]],
    }
      ds.push(ob)
  }
  data.datasets = ds
  const config = returnOptions(
    "bar",
    data,
    "Top Selling Category Across Machine",
    "Category",
    "Location",
    true,
    true,
    "y"
  );

  myChart5 = new Chart(document.getElementById("chart5"), config);

}
function updateChart3(catSales){
  myChart3.destroy()
  const data = {
    labels: category,
    datasets: [
      {
        label: "Total Sales",
        data: catSales,
        backgroundColor: "#033495",
        borderColor: "#033495",
        borderWidth: 1,
      },
    ],
  };

  const config = returnOptions(
    "bar",
    data,
    "Sales in each Category",
    "Category",
    "Total Sales",
    false,
    false,
    "x"
  );
  myChart3 = new Chart(document.getElementById("chart3"), config);

}
function selectedCheckbox(idx) {
  arr[idx] = !arr[idx]
  chart()

  selected_category = []

  new_cat = ['Brunswick Sq Mall', 'EB Public Library', 'Earle Asphalt', 'GuttenPlans']
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == true){
      selected_category.push(new_cat[i])
    }
  }
  updateChart2(selected_category)
  updateChart4(selected_category)
}

function updateChart2(selected_category) {
  newCash = {}
  newCredit = {}
  for (let i = 0; i < selected_category.length; i++) {
    newCash[selected_category[i]] =  cashSalesFromMachine[selected_category[i]];
    newCredit[selected_category[i]]=  creditSalesFromMachine[selected_category[i]];
  }
  myChart2.destroy()
  
  const data = {
    labels: uniquePlace,
    datasets: [
      {
        label: "Cash",
        data: newCash,
        backgroundColor: "#6A9CFD",
        borderColor: "#6A9CFD",
        borderWidth: 1,
      },
      {
        label: "Credit",
        data: newCredit,
        backgroundColor: "#FFB8D0",
        borderColor: "#FFB8D0",
        borderWidth: 1,
      },
    ],
  };

  const config = returnOptions(
    "bar",
    data,
    "Payment Type in each Machine",
    "Location",
    "Total Transaction",
    false,
    false,
    "x"
  );
  myChart2 = new Chart(document.getElementById("chart2"), config);
}

function updateChart4(selected_category) {
  myChart4.destroy()
  const data = {
    labels: uniqueDate
  }

  ds = []

  for (let i = 0; i < selected_category.length; i++) {
    obj = {
      label: selected_category[i],
      data: transactionOnVendingMachineEachMonth[selected_category[i]]
    }
    ds.push(obj)
  }
  data.datasets = ds
  console.log('ds:', data)

  const  config = returnOptions(
    "bar",
    data,
    "Peak Sales Date",
    "Transaction Date",
    "Transaction Count",
    false,
    false,
    "x"
  );
  myChart4 = new Chart(document.getElementById("chart4"), config);
}

function chart() {
  myChart1.destroy()
  avgSales = []
  uniquePlace.forEach((element, idx) => {
    var avg = totalSaleFromMachine[element] / totalTransactionsFromMachine[element];
    let number = arr[idx] ? avg : null
    avgSales.push(number);
  });
  const dataChart = {
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
  const configCharrt = returnOptions(
    "line",
    dataChart,
    "Average Value of Transaction",
    "Location",
    "Avg Transaction",
    false,
    false,
    "x"
  );

  myChart1 = new Chart(document.getElementById("chart1"), configCharrt);
}

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
    uniquePlace.forEach((element, idx) => {
      var avg = totalSaleFromMachine[element] / totalTransactionsFromMachine[element];
      let number = arr[idx] ? avg : null
      avgSales.push(number);
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

    myChart1 = new Chart(document.getElementById("chart1"), configChart1);

    myChart2 = new Chart(document.getElementById("chart2"), configChart2);

    myChart3 = new Chart(document.getElementById("chart3"), configChart3);

    myChart4 = new Chart(document.getElementById("chart4"), configChart4);

    myChart5 = new Chart(document.getElementById("chart5"), configChart5);

    const chartVersion = document.getElementById("chartVersion");
    chartVersion.innerText = Chart.version;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });


document.addEventListener("DOMContentLoaded", function() {
  const menuLinks = document.querySelectorAll(".menu-link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});

//coba1
document.addEventListener("DOMContentLoaded", function() {
  var dropdownBtns = document.getElementsByClassName("dropdown-btn");
  var dropdownContents = document.getElementsByClassName("dropdown-content");

  for (let i = 0; i < dropdownBtns.length; i++) {
    dropdownBtns[i].addEventListener("click", function() {
      var content = dropdownContents[i];
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  document.addEventListener("click", function(event) {
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

document.getElementById("feedbackBtn").addEventListener("click", function() {
  var feedbackForm = document.getElementById("feedbackForm");
  feedbackForm.style.display = "block";
});

//sini

document.getElementById('feedbackBtn').addEventListener('click', function () {
  var feedbackForm = document.getElementById('feedbackForm');
  feedbackForm.style.display = 'block';
  document.getElementById('feedbackText').value = ''; // Reset the form when the feedback button is clicked
});

document.getElementById('sendFeedbackBtn').addEventListener('click', function () {
  var feedbackText = document.getElementById('feedbackText').value;
  var notification = document.getElementById('notification');

  notification.style.display = 'block'; // Ensure the notification is displayed

  if (feedbackText.trim() === '') {
    notification.innerText = 'Please write some feedback before sending.';
    notification.style.color = 'red';
  } else if (feedbackText.length > 100) {
    notification.innerText = 'Feedback is too long. Please limit to 100 characters.';
    notification.style.color = 'red';
  } else {
    notification.innerText = 'Thank you for your feedback!';
    notification.style.color = 'green';
    document.getElementById('feedbackText').value = ''; // Reset the feedback text area
  }
});



document.addEventListener("click", function(event) {
  var feedbackForm = document.getElementById("feedbackForm");
  var feedbackBtn = document.getElementById("feedbackBtn");
  if (
    !feedbackForm.contains(event.target) &&
    !feedbackBtn.contains(event.target)
  ) {
    feedbackForm.style.display = "none";
  }
});
