const cityCoords = [7.839787077334735, 123.43426797277807];
const cityBorder = [
    [7.7908, 123.4206],
    [7.8054, 123.4261],
    [7.8147, 123.4495],
    [7.8272, 123.4659],
    [7.8342, 123.4796],
    [7.8779, 123.4613],
    [7.8850, 123.4441],
    [7.9102, 123.3889],
    [7.9006, 123.3314],
    [7.9062, 123.2800],
    [7.9330, 123.2207],
    [7.8886, 123.2638],
    [7.8767, 123.2852],
    [7.8434, 123.3282],
    [7.8375, 123.3440],
    [7.7908, 123.4206],
];

const custommarker = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 0L400 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-79.3 0 89.6 64L512 160c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64l-176 0 0-112c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 112L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l101.7 0L256 95.5 256 32c0-17.7 14.3-32 32-32zm48 240a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM80 224c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0zm368 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM80 352c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0zm384 0c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0z"/></svg>
`

var svgIcon = L.divIcon({
    className: 'custom-svg-icon', // Add a class for potential CSS styling
    html: custommarker,
    iconSize: [32, 32], // Set the size of your SVG
    iconAnchor: [16, 32], // Adjust anchor to the bottom center of your SVG
    popupAnchor: [0, -28] // Adjust popup anchor relative to the iconAnchor
});

const barangayCoords = [
    {
        name: "Alegria",
        lat: 7.8910,
        lng: 123.4199,
        data: {
            population: 1237
        }
    },
    {
        name: "Balangasan",
        lat: 7.8233,
        lng: 123.4283,
        data: {
            population: 15006
        }
    },
    {
        name: "Balintawak",
        lat: 7.8315,
        lng: 123.4089,
        data: {
            population: 3005
        }
    },
    {
        name: "Baloyboan",
        lat: 7.8348,
        lng: 123.3872,
        data: {
            population: 1167
        }
    },
    {
        name: "Banale",
        lat: 7.8347,
        lng: 123.4269,
        data: {
            population: 8724
        }
    },
    {
        name: "Bogo",
        lat: 7.8658,
        lng: 123.4280,
        data: {
            population: 1167
        }
    },
    {
        name: "Bomba",
        lat: 7.8054,
        lng: 123.4261,
        data: {
            population: 1660
        }
    },
    {
        name: "Buenavista",
        lat: 7.8268,
        lng: 123.3975,
        data: {
            population: 9217
        }
    },
    {
        name: "Bulatok",
        lat: 7.8458,
        lng: 123.4477,
        data: {
            population: 5516
        }
    },
    {
        name: "Bulawan",
        lat: 7.8746,
        lng: 123.3834,
        data: {
            population: 1237
        }
    },
    {
        name: "Dampalan",
        lat: 7.9062,
        lng: 123.2800,
        data: {
            population: 972
        }
    },
    {
        name: "Danlugan",
        lat: 7.8829,
        lng: 123.4054,
        data: {
            population: 9217
        }
    },
    {
        name: "Dao",
        lat: 7.8407,
        lng: 123.4282,
        data: {
            population: 6479
        }
    },
    {
        name: "Datagan",
        lat: 7.8926,
        lng: 123.4137,
        data: {
            population: 1542
        }
    },
    {
        name: "Deborok",
        lat: 7.8859,
        lng: 123.3107,
        data: {
            population: 9217
        }
    },
    {
        name: "Ditoray",
        lat: 7.8620,
        lng: 123.3291,
        data: {
            population: 1135
        }
    },
    {
        name: "Dumagoc",
        lat: 7.8170,
        lng: 123.4281,
        data: {
            population: 8522
        }
    },
    {
        name: "Gatas",
        lat: 7.8270,
        lng: 123.4351,
        data: {
            population: 2259
        }
    },
    {
        name: "Gubac",
        lat: 7.8755,
        lng: 123.3495,
        data: {
            population: 1047
        }
    },
    {
        name: "Gubang",
        lat: 7.8909,
        lng: 123.3715,
        data: {
            population: 1932
        }
    },
    {
        name: "Kagawasan",
        lat: 7.8698,
        lng: 123.4224,
        data: {
            population: 3024
        }
    },
    {
        name: "Kahayagan",
        lat: 7.8665,
        lng: 123.4020,
        data: {
            population: 1569
        }
    },
    {
        name: "Kalasan",
        lat: 7.8850,
        lng: 123.4441,
        data: {
            population: 1604
        }
    },
    {
        name: "Kawit",
        lat: 7.8246,
        lng: 123.4493,
        data: {
            population: 9510
        }
    },
    {
        name: "La Suerte",
        lat: 7.8767,
        lng: 123.2852,
        data: {
            population: 838
        }
    },
    {
        name: "Lala",
        lat: 7.8375,
        lng: 123.3440,
        data: {
            population: 9217
        }
    },
    {
        name: "Lapidian",
        lat: 7.8614,
        lng: 123.3504,
        data: {
            population: 1602
        }
    },
    {
        name: "Lenienza",
        lat: 7.8509,
        lng: 123.4574,
        data: {
            population: 5053
        }
    },
    {
        name: "Lizon Valley",
        lat: 7.9330,
        lng: 123.2207,
        data: {
            population: 2862
        }
    },
    {
        name: "Lordes",
        lat: 7.8886,
        lng: 123.2638,
        data: {
            population: 1313
        }
    },
    {
        name: "Lower Sibatang",
        lat: 7.9006,
        lng: 123.3314,
        data: {
            population: 959
        }
    },
    {
        name: "Lumad",
        lat: 7.8446,
        lng: 123.3680,
        data: {
            population: 1492
        }
    },
    {
        name: "Lumbia",
        lat: 7.8306,
        lng: 123.4449,
        data: {
            population: 4226
        }
    },
    {
        name: "Macasing",
        lat: 7.8631,
        lng: 123.3644,
        data: {
            population: 1890
        }
    },
    {
        name: "Manga",
        lat: 7.8639,
        lng: 123.4473,
        data: {
            population: 4351
        }
    },
    {
        name: "Muricay",
        lat: 7.8272,
        lng: 123.4659,
        data: {
            population: 3367
        }
    },
    {
        name: "Napolan",
        lat: 7.8106,
        lng: 123.4138,
        data: {
            population: 9031
        }
    },
    {
        name: "Palpalan",
        lat: 7.8523,
        lng: 123.3918,
        data: {
            population: 774
        }
    },
    {
        name: "Pedulonan",
        lat: 7.8735,
        lng: 123.3259,
        data: {
            population: 401
        }
    },
    {
        name: "Poloyagan",
        lat: 7.7908,
        lng: 123.4206,
        data: {
            population: 3246
        }
    },
    {
        name: "San Francisco",
        lat: 7.8279,
        lng: 123.4386,
        data: {
            population: 3091
        }
    },
    {
        name: "San Jose",
        lat: 7.8323,
        lng: 123.4359,
        data: {
            population: 7991
        }
    },
    {
        name: "San Pedro",
        lat: 7.8237,
        lng: 123.4429,
        data: {
            population: 8110
        }
    },
    {
        name: "Sta. Lucia",
        lat: 7.8189,
        lng: 123.4326,
        data: {
            population: 5859
        }
    },
    {
        name: "Sta. Maria",
        lat: 7.8332,
        lng: 123.4398,
        data: {
            population: 4553
        }
    },
    {
        name: "Santiago",
        lat: 7.8218,
        lng: 123.4393,
        data: {
            population: 3125
        }
    },
    {
        name: "Sto. Niño",
        lat: 7.8291,
        lng: 123.4283,
        data: {
            population: 8611
        }
    },
    {
        name: "Tawagan Sur",
        lat: 7.8342,
        lng: 123.4796,
        data: {
            population: 2529
        }
    },
    {
        name: "Tiguma",
        lat: 7.8406,
        lng: 123.4634,
        data: {
            population: 12604
        }
    },
    {
        name: "Tuburan",
        lat: 7.8373,
        lng: 123.4481,
        data: {
            population: 9535
        }
    },
    {
        name: "Tulangan",
        lat: 7.9102,
        lng: 123.3889,
        data: {
            population: 833
        }
    },
    {
        name: "Tulawas",
        lat: 7.8779,
        lng: 123.4613,
        data: {
            population: 1321
        }
    },
    {
        name: "Upper Sibatang",
        lat: 7.8434,
        lng: 123.3282,
        data: {
            population: 1024
        }
    },
    {
        name: "White Beach",
        lat: 7.8147,
        lng: 123.4495,
        data: {
            population: 2052
        }
    }
    
];

const fullcityborder = [
    {
        name: "Poloyagan",
        lat: 7.7908,
        lng: 123.4206,
        data: {
            population: 3246
        }
    },
    {
        name: "Bomba",
        lat: 7.8054,
        lng: 123.4261,
        data: {
            population: 1660
        }
    },
    {
        name: "White Beach",
        lat: 7.8147,
        lng: 123.4495,
        data: {
            population: 2052
        }
    },
     {
        name: "Muricay",
        lat: 7.8272,
        lng: 123.4659,
        data: {
            population: 3367
        }
    },
    {
        name: "Tawagan Sur",
        lat: 7.8342,
        lng: 123.4796,
        data: {
            population: 2529
        }
    },
    {
        name: "Tulawas",
        lat: 7.8779,
        lng: 123.4613,
        data: {
            population: 1321
        }
    },
    {
        name: "Kalasan",
        lat: 7.8850,
        lng: 123.4441,
        data: {
            population: 1604
        }
    },
    {
        name: "Tulangan",
        lat: 7.9102,
        lng: 123.3889,
        data: {
            population: 833
        }
    },
    {
        name: "Lower Sibatang",
        lat: 7.9006,
        lng: 123.3314,
        data: {
            population: 959
        }
    },
    {
        name: "Dampalan",
        lat: 7.9062,
        lng: 123.2800,
        data: {
            population: 972
        }
    },
    {
        name: "Lizon Valley",
        lat: 7.9330,
        lng: 123.2207,
        data: {
            population: 2862
        }
    },
    {
        name: "Lordes",
        lat: 7.8886,
        lng: 123.2638,
        data: {
            population: 1313
        }
    },
    {
        name: "La Suerte",
        lat: 7.8767,
        lng: 123.2852,
        data: {
            population: 838
        }
    },
    {
        name: "Upper Sibatang",
        lat: 7.8434,
        lng: 123.3282,
        data: {
            population: 1024
        }
    },
    {
        name: "Lala",
        lat: 7.8375,
        lng: 123.3440,
        data: {
            population: 9217
        }
    },
]

const baseLayers = {
  "Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri',
    maxZoom: 20
  }),
  "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  })
};

const map = L.map('map', {
  center: [7.839787077334735, 123.43426797277807],
  zoom: 15,
  minZoom: 13,  
  maxZoom: 18, 
  layers: [baseLayers["Satellite"]]
});

const mapElement = document.getElementById('map');
const allbarangay = JSON.parse(mapElement.getAttribute('data-allBarangays'));
const allsubmissions = JSON.parse(mapElement.getAttribute('data-allsubmissions'));

let barangayStats;
let selected_barangay;
console.log(allsubmissions);

try {
  barangayStats = JSON.parse(mapElement.dataset.barangay);
} catch (err) {
  console.error('Failed to parse barangay data:', err);
}
console.log(barangayStats);

L.control.layers(baseLayers).addTo(map);

// main
L.marker(cityCoords).addTo(map)
.bindPopup("Pagadian City")
.openPopup();

function createBarangaySvgIcon(fillColor = '#3388ff') {
   
    const svgContent = `
            <svg class="text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 0L400 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-79.3 0 89.6 64L512 160c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64l-176 0 0-112c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 112L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l101.7 0L256 95.5 256 32c0-17.7 14.3-32 32-32zm48 240a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM80 224c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0zm368 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM80 352c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0zm384 0c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-32 0z"/></svg>
    `;

    return L.divIcon({
        className: 'custom-barangay-marker', 
        html: svgContent,
        iconSize: [24, 24], 
        iconAnchor: [12, 12], 
        popupAnchor: [0, -12] 
    });
}

allbarangay.forEach(b => {
    // console.log(b);
    const stats = barangayStats[b.name];
    if (stats) {
        b.employed = stats.employed;
        b.unemployed = stats.unemployed;
    } else {
        // Fallback if no data found for this barangay
        b.employed = 0;
        b.unemployed = 0;
    }
    
    const markerColor = getRandomColor(); 
    const svgHtml = createBarangaySvgIcon(markerColor).options.html;
    const customIcon = L.divIcon({
        className: '',
        html: `
            <div class="flex flex-col items-center text-center">
                ${svgHtml}
                <span class="text-xs font-semibold text-white mt-1">${b.name}</span>
            </div>
        `,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
    });

    const marker = L.marker([b.lat, b.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
            <div class="flex flex-col gap-0 p-0 m-0 h-fit">
                <div class="flex flex-row gap-2 h-fit">
                    <p class="text-gray-500 font-semibold text-xs p-0 m-0 h-fit">Barangay</p>
                    <p class="text-black font-bold text-xs p-0 m-0 h-fit">${b.name}</p>
                </div>
                <div class="flex flex-row gap-2 p-0 m-0 h-fit">
                    <p class="text-gray-500 font-semibold text-xs p-0 m-0 h-fit">Population</p>
                    <p class="text-black font-bold text-xs p-0 m-0 h-fit">${b.population.toLocaleString()}</p>
                </div>
                <div class="flex flex-row gap-2 p-0 m-0 h-fit">
                    <p class="text-gray-500 font-semibold text-xs p-0 m-0 h-fit">Employed</p>
                    <p class="text-black font-bold text-xs p-0 m-0 h-fit">${b.employed}</p>
                </div>
                <div class="flex flex-row gap-2 p-0 m-0 h-fit">
                    <p class="text-gray-500 font-semibold text-xs p-0 m-0 h-fit">Unemployed</p>
                    <p class="text-black font-bold text-xs p-0 m-0 h-fit">${b.unemployed}</p>
                </div>
                <div class="viewmorebtn cursor-pointer flex flex-row gap-2 p-0 m-0 h-fit">
                    <p class="text-blue-400 font-semibold text-xs p-0 m-0 h-fit">View More</p>
                </div>
            </div>
        `);

    
        marker.on('popupopen', function(e) {
            const popupNode = e.popup.getElement();
            const viewMoreBtn = popupNode.querySelector('.viewmorebtn');
            console.log(b);        
            if (viewMoreBtn) {
                viewMoreBtn.addEventListener('click', () => {
                console.log('View More clicked for:', b.name);
                barangayanalticscontainer.classList.remove('hidden');
                barangayanalticscontainer.classList.add('flex');

                selected_barangay = b.name;

                let dates = [];
                let counts = [];
                selectedPeriod = 'last 90 days'
                if (allsubmissions[selected_barangay]) {
                    filteredDates = Object.keys(allsubmissions[selected_barangay].byDate);
                    filteredCounts = Object.values(allsubmissions[selected_barangay].byDate);
                }

                console.log('submission total:', allsubmissions[selected_barangay]?.total ?? 0);
                
                const maxCount = Math.max(...filteredCounts, 1);
                const options = {
                    chart: {
                    height: "300px",
                    maxWidth: "100%",
                    type: "area",
                    fontFamily: "Inter, sans-serif",
                    dropShadow: { enabled: false },
                    toolbar: { show: false },
                    },
                    fill: {
                    type: "gradient",
                    gradient: {
                        opacityFrom: 0.55,
                        opacityTo: 0,
                        shade: "#CFFAE5",
                        gradientToColors: ["#007A56"],
                    },
                    },
                    dataLabels: { enabled: false },
                    stroke: { width: 6 },
                    grid: { show: false, strokeDashArray: 4, padding: { left: 2, right: 2, top: 0 } },
                    series: [
                    {
                        name: "Submissions",
                        data: filteredCounts, // Now safely declared
                        color: "#007A56",
                    },
                    ],
                    xaxis: {
                        categories: filteredDates, // Now safely declared
                        labels: { show: true, style: { fontSize: "12px" } },
                        axisBorder: { show: false },
                        axisTicks: { show: false },
                    },
                    yaxis: {
                    min: 0,
                    max: maxCount,
                    tickAmount: maxCount + 1, // one tick per integer value
                    labels: {
                            formatter: val => Math.round(val),
                        },
                    },

                    tooltip: {
                        enabled: true,
                        y: {
                            formatter: function (val) {
                                return Math.round(val); // no decimals in tooltip values
                            },
                        },
                        x: {
                            show: true,
                        },
                    },
                };

                // If no data, clear the chart
                if (!allsubmissions[selected_barangay]) {
                    options.series = [{ name: "Submissions", data: [] }];
                    options.xaxis.categories = [];
                }

                if (document.getElementById("area-chart") && typeof ApexCharts !== "undefined") {
                    const chart = new ApexCharts(document.getElementById("area-chart"), options);
                    chart.render();
                }


                const getChartOptions = () => {
                return {
                    series: [b.employed, b.unemployed],
                    colors: ["#185DFA", "#E7070D"],
                    chart: {
                    height: 350,
                    width: "100%",
                    type: "pie",
                    },
                    stroke: {
                    colors: ["white"],
                    lineCap: "",
                    },
                    plotOptions: {
                    pie: {
                        labels: {
                        show: true,
                        },
                        size: "100%",
                        dataLabels: {
                        offset: -25
                        }
                    },
                    },
                    labels: ["Employed", "Unemployed"],
                    dataLabels: {
                    enabled: true,
                    style: {
                        fontFamily: "Inter, sans-serif",
                    },
                    },
                    legend: {
                    position: "bottom",
                    fontFamily: "Inter, sans-serif",
                    },
                    yaxis: {
                    labels: {
                        formatter: function (value) {
                        return value;
                        },
                    },
                    },
                    xaxis: {
                    labels: {
                        formatter: function (value) {
                        return value;
                        },
                    },
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                    },
                }
                }

                if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
                    const chart = new ApexCharts(document.getElementById("pie-chart"), getChartOptions());
                    chart.render();
                }


                barangayanalticscontainer.querySelector('.submissioncount').textContent = allsubmissions[selected_barangay]?.total ?? 0;
                });
            }
        });


    const color = getRandomColor(); // This `color` is for your circle, keep it separate if you want

    // Scale radius based on population (max 800 at 1900 pop)
    const maxPopulation = 1900;
    const maxRadius = 800;
    const radius = Math.max(200, Math.min((b.population / maxPopulation) * maxRadius, maxRadius));

    // console.log(b.lat);
    // console.log(b.lng);

    L.circle([parseFloat(b.lat), parseFloat(b.lng)], {
        radius: radius,
        color: color,
        fillColor: color,
        fillOpacity: 0.4
    }).addTo(map);

});


map.on('click', function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
//   alert(`Latitude: ${lat}\nLongitude: ${lng}`);
  console.log(`Lat: ${lat}, Lng: ${lng}`);
});

const closebarangayanalyticsbtn = document.querySelector('.closebarangayanalyticsbtn');
const barangayanalticscontainer = document.getElementById('barangayanalticscontainer');
closebarangayanalyticsbtn.onclick = function() {
    barangayanalticscontainer.classList.remove('flex');
    barangayanalticscontainer.classList.add('hidden');
};

let chartInstance = null;
let filteredDates = [];
let filteredCounts = [];
let selectedPeriod;
const dropdown = document.getElementById('lastDaysdropdown');
dropdown.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();

    selectedPeriod = e.target.textContent.trim();
    const dropdownButton = document.getElementById('dropdownDefaultButton');
    dropdownButton.innerHTML = `${selectedPeriod}`;

    let dates = [];
    let counts = [];

    if (allsubmissions[selected_barangay]) {
      dates = Object.keys(allsubmissions[selected_barangay].byDate);
      counts = Object.values(allsubmissions[selected_barangay].byDate);
    }

    // --- BEGIN date filtering ---

    // Helper functions
    function parseDate(str) {
      const [y, m, d] = str.split('-').map(Number);
      return new Date(y, m - 1, d);
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    function isInRange(date, start, end) {
      return date >= start && date <= end;
    }

    if (dates.length > 0) {
      const combined = dates.map((dateStr, i) => ({
        dateObj: parseDate(dateStr),
        dateStr,
        count: counts[i]
      }));

      let startDate;
      switch (selectedPeriod.toLowerCase()) {
        case 'today':
          startDate = today;
          break;
        case 'yesterday':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 1);
          break;
        case 'last 7 days':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 6);
          break;
        case 'last 30 days':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 29);
          break;
        case 'last 90 days':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 89);
          break;
        case 'last year':
          startDate = new Date(today);
          startDate.setFullYear(today.getFullYear() - 1);
          startDate.setDate(startDate.getDate() + 1);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filteredDates = combined.filter(({dateObj}) => isInRange(dateObj, startDate, today)).map(c => c.dateStr);
        filteredCounts = combined.filter(({dateObj}) => isInRange(dateObj, startDate, today)).map(c => c.count);
      } else {
        filteredDates = dates;
        filteredCounts = counts;
      }
    }

    // --- END date filtering ---

    // Now build chart options using filteredDates and filteredCounts

    const maxCount = Math.max(...filteredCounts, 1);

    const options = {
      chart: {
        height: "300px",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: { enabled: false },
        toolbar: { show: false },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#CFFAE5",
          gradientToColors: ["#007A56"],
        },
      },
      dataLabels: { enabled: false },
      stroke: { width: 6 },
      grid: { show: false, strokeDashArray: 4, padding: { left: 2, right: 2, top: 0 } },
      series: [
        {
          name: "Submissions",
          data: filteredCounts,
          color: "#007A56",
        },
      ],
      xaxis: {
        categories: filteredDates,
        labels: { show: true, style: { fontSize: "12px" } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 0,
        max: maxCount,
        tickAmount: maxCount + 1,
        labels: {
          formatter: val => Math.round(val),
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: val => Math.round(val),
        },
        x: { show: true },
      },
    };

    // Render chart code stays the same
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    chartInstance = new ApexCharts(document.getElementById("area-chart"), options);
    chartInstance.render();
  }
});


document.getElementById("exportchartdatabtn").addEventListener("click", function () {
  if (filteredDates.length === 0 || filteredCounts.length === 0) {
    showToast('error', "No data to export.");
    return;
  }

  const exportData = filteredDates.map((date, i) => ({
    Date: date,
    Submissions: filteredCounts[i],
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

  XLSX.writeFile(workbook, `${selected_barangay}_submissions_${selectedPeriod.replace(/\s+/g, '_').toLowerCase()}.xlsx`);
});

const submissionanalyticscontainer = document.getElementById('submissionanalyticscontainer');
const submittedbtn = document.getElementById('submittedbtn');
submittedbtn.onclick = function() {
    submissionanalyticscontainer.classList.remove('hidden');
    submissionanalyticscontainer.classList.add('flex');
    submissionanalyticscontainer.querySelector('.submissioncount').textContent = mapElement.getAttribute('data-allsubmissionscount');
    const data = [];

    Object.entries(allsubmissions)
    .sort(([a], [b]) => a.localeCompare(b)) // sort barangay names alphabetically
    .forEach(([barangay, info]) => {
        const submit = {
        x: barangay,
        y: info.total
        };
        data.push(submit);
    });

    const chartWidth = data.length * 50;
    const options = {
        colors: ["#009966"],
        series: [
            {
            name: "Submission",
            color: "#1A56DB",
            data: data,
            },
        ],
        chart: {
            type: "bar",
            height: "320px",
            width: chartWidth,
            fontFamily: "Inter, sans-serif",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
            horizontal: false,
            columnWidth: "70%",
            borderRadiusApplication: "end",
            borderRadius: 8,
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            style: {
            fontFamily: "Inter, sans-serif",
            },
        },
        states: {
            hover: {
            filter: {
                type: "darken",
                value: 1,
            },
            },
        },
        stroke: {
            show: true,
            width: 0,
            colors: ["transparent"],
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
            left: 2,
            right: 2,
            top: -14
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        xaxis: {
            floating: false,
            labels: {
            show: true,
            style: {
                fontFamily: "Inter, sans-serif",
                cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
            },
            axisBorder: {
            show: false,
            },
            axisTicks: {
            show: false,
            },
        },
        yaxis: {
            show: false,
        },
        fill: {
            opacity: 1,
        },
    }

    if(document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("column-chart"), options);
    chart.render();
    }

};

submissionanalyticscontainer.querySelector('.closesubmissionanalyticsbtn').onclick = function() {
    submissionanalyticscontainer.classList.remove('flex');
    submissionanalyticscontainer.classList.add('hidden');
};

// city border
const cityBorderLine = L.polyline(cityBorder, {
  color: '#009966',
  weight: 2,
  fillOpacity: 0
}).addTo(map);

cityBorderLine.on('click', function (e) {
  L.popup()
    .setLatLng(e.latlng)
    .setContent("City map border")
    .openOn(map);
});

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
