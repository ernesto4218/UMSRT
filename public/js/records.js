
// analytics
const activities = JSON.parse(
  document.getElementById("area-chart-flexible").getAttribute("data-accident_logs") || '{}'
);
console.log(activities);


function loadQueries(data, range) {
  const today = new Date();
  let filteredData = [];

  // Filter data based on selected range
  if (range === "Today") {
    const todayStr = today.toISOString().split("T")[0];
    filteredData = data.filter(item => item.date_added.startsWith(todayStr));
  } else if (range === "Last 7 Days") {
    const last7 = new Date(today);
    last7.setDate(today.getDate() - 6);
    filteredData = data.filter(item => {
      const itemDate = new Date(item.date_added);
      return itemDate >= last7 && itemDate <= today;
    });
  } else if (range === "Last 30 Days") {
    const last30 = new Date(today);
    last30.setDate(today.getDate() - 29);
    filteredData = data.filter(item => {
      const itemDate = new Date(item.date_added);
      return itemDate >= last30 && itemDate <= today;
    });
  } else {
    filteredData = data; // All Time
  }

  // Group data
  const dateCounts = {};

  filteredData.forEach(item => {
    const dateObj = new Date(item.date_added);

    let key;
    if (range === "Today") {
      // Get hour (24h format) with leading zero
      const hour = dateObj.getHours().toString().padStart(2, "0");
      key = `${hour}:00`; // e.g., "14:00"
    } else {
      // Group by date
      key = item.date_added.split("T")[0];
    }

    if (!dateCounts[key]) {
      dateCounts[key] = 0;
    }
    dateCounts[key]++;
  });

  // Prepare x and y data
  let sortedKeys;
  if (range === "Today") {
    // Always show 24 hours even if empty
    sortedKeys = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0") + ":00");
  } else {
    sortedKeys = Object.keys(dateCounts).sort();
  }

  const chartData = {
    x: sortedKeys,
    y: sortedKeys.map(key => dateCounts[key] || 0), // fill 0 if no data
  };

  // ApexCharts options
  const options = {
    chart: {
      height: "300px",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: "#6366f1", opacity: 0.4 },
          { offset: 100, color: "#6366f1", opacity: 0 },
        ],
      },
    },
    colors: ["#E7070D"],
    tooltip: { enabled: true },
    legend: { show: false },
    series: [
      {
        name: "Process",
        data: chartData.y,
      },
    ],
    xaxis: {
      categories: chartData.x,
      labels: {
        show: true,
        rotate: range === "Today" ? -45 : 0,
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
        show: true,
        labels: {
            show: true,
            style: { fontSize: "14px" },
            formatter: function (val) {
            return Number.isInteger(val) ? val : ''; // only show if integer
            },
        },
        decimalsInFloat: 0,
        },

  };

  if (
    document.getElementById("area-chart-flexible") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("area-chart-flexible"),
      options
    );
    chart.render();
  }
}

const dropdownList = document.getElementById('dropdownList');
dropdownList.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      event.preventDefault(); // prevent default anchor behavior
      const selectedText = event.target.textContent.trim();
      handleSelection(selectedText);
    }
});


function handleSelection(selection) {
  console.log("User selected:", selection);
  document.getElementById('selectedDropdownTXT').textContent = selection;

  document.getElementById('area-chart-flexible').innerHTML = '';
  loadQueries(activities, selection); // Pass the selection to loadQueries
}


function triggerClickOnItem(textToClick) {
    const links = dropdownList.querySelectorAll('a');
    for (let link of links) {
      if (link.textContent.trim() === textToClick) {
        link.click(); // Triggers the click event
        break;
      }
    }
}

handleSelection('Today')

function downloadExcel() {
  const selection = document.getElementById('selectedDropdownTXT').textContent.trim() || "Today";

  const today = new Date();
  let filteredData = [];

  if (selection === "Today") {
    const todayStr = today.toISOString().split("T")[0];
    filteredData = activities.filter(item => item.date_added.startsWith(todayStr));
  } else if (selection === "Last 7 Days") {
    const last7 = new Date(today);
    last7.setDate(today.getDate() - 6);
    filteredData = activities.filter(item => {
      const itemDate = new Date(item.date_added);
      return itemDate >= last7 && itemDate <= today;
    });
  } else if (selection === "Last 30 Days") {
    const last30 = new Date(today);
    last30.setDate(today.getDate() - 29);
    filteredData = activities.filter(item => {
      const itemDate = new Date(item.date_added);
      return itemDate >= last30 && itemDate <= today;
    });
  } else {
    filteredData = activities;
  }

  if (filteredData.length === 0) {
    alert("No data to export.");
    return;
  }

  // Merge parsed json_string_data into each item
  const processedData = filteredData.map(item => {
    let merged = { ...item };
    if (item.json_string_data) {
      try {
        const parsed = JSON.parse(item.json_string_data);
        merged = { ...merged, ...parsed }; // Merge parsed values
      } catch (e) {
        console.warn("Invalid JSON in json_string_data", item.json_string_data);
      }
    }
    delete merged.json_string_data; // Optional: remove original string
    return merged;
  });

  // Convert to worksheet
  const ws = XLSX.utils.json_to_sheet(processedData);

  // Create workbook and append sheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Accident Logs");

  // Download
  XLSX.writeFile(wb, `accident_logs_${selection.replace(/\s/g, "_").toLowerCase()}.xlsx`);
}

document.querySelectorAll('.log-entry').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const logData = JSON.parse(this.dataset.logdata);
    const frames = logData.json_string_data?.detectedFrames || [];
    const firstIncident = frames[0]?.incidents?.[0];
    const dateAdded = new Date(logData.date_added).toLocaleString();

    // ==== 1. Update the image gallery ====
    const galleryGrid = document.querySelector('#gallery .grid');
    galleryGrid.innerHTML = ''; // Clear previous images
    frames.forEach(frame => {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'bg-white rounded-2xl p-1';
      imageWrapper.innerHTML = `<img src="/capturedincident/${frame.imageFile}" class="w-full h-auto rounded-2xl" alt="">`;
      galleryGrid.appendChild(imageWrapper);
    });
    document.getElementById('gallery').classList.remove('hidden');
    document.getElementById('gallery').classList.add('fixed');

    // ==== 2. Update the incident detail section ====
    const logDetails = document.getElementById('logDetails');
    if (firstIncident) {
      logDetails.innerHTML = `
        <div class="flex flex-row gap-1 w-fit">
          <span class="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-sm w-fit">
            ${firstIncident.confidence}%
          </span>
          <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-sm w-fit">
            ${firstIncident.type}
          </span>
        </div>
        <p class="text-xs font-normal text-gray-500 ml-2 w-fit">${firstIncident.description}</p>
        <div class="flex flex-row gap-1 ml-2 mt-2 items-center">
          <svg class="w-3 h-3 text-gray-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
          </svg>
          <p class="text-xs font-normal text-gray-500">${dateAdded}</p>
        </div>
      `;
    } else {
      logDetails.innerHTML = `<span class="text-xs text-gray-400">No incident data found</span>`;
    }
  });
});

// Close gallery when #closePreviewBTN is clicked
document.getElementById('closePreviewBTN').addEventListener('click', () => {
    const gallery = document.getElementById('gallery');
    gallery.classList.add('hidden');
    gallery.classList.remove('fixed');
});