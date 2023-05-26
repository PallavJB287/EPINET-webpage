// const geologyData = [];
// const labData = [];
// const drillingData = [];
// const reservoirData = [];
// const productionData = [];
// const seismicData = [];
// const logsData = [];
// const documentsData = [];
//

// fetch('./datacombined.csv')
//     .then(response => response.text())
//     .then(csvData => {
//         // Parse CSV data into rows
//         const rows = csvData.split('\n');

//         // Sort rows based on date (latest first)
//         rows.sort((a, b) => {
//             const dateA = new Date(a.split(',')[1]);
//             const dateB = new Date(b.split(',')[1]);
//             return dateB - dateA;
//         });
//         const currentDate = new Date();
//         const past30Days = new Date();
//         past30Days.setDate(currentDate.getDate() - 365);

//         rows.forEach(row => {
//             const [category, date, wellID] = row.split(',');
//             const rowDate = new Date(date);

//             if (rowDate >= past30Days && rowDate <= currentDate) {
//                 if (category === 'Geology') {
//                     geologyData.push([date, wellID]);
//                 } else if (category === 'Lab') {
//                     labData.push([date, wellID]);
//                 }
//                 else if (category === 'Drilling') {
//                     drillingData.push([date, wellID]);
//                 }
//                 else if (category === 'Reservoir') {
//                     reservoirData.push([date, wellID]);
//                 }
//                 else if (category === 'Production') {
//                     productionData.push([date, wellID]);
//                 }
//                 else if (category === 'Seismic') {
//                     seismicData.push([date, wellID]);
//                 }
//                 else if (category === 'Logs') {
//                     logsData.push([date, wellID]);
//                 }
//                 else if (category === 'Documents') {
//                     documentsData.push([date, wellID]);
//                 }
//             }
//         });

//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// var type = [geologyData, labData, drillingData, reservoirData, productionData, seismicData, logsData, documentsData]
// var titles = ["Geology", "Lab", "Drilling", "Reservoir", "Production", "Seismic", "Logs", "Documents"]

const type = [];
const titles = [];

fetch('./datacombined.csv')
    .then(response => response.text())
    .then(csvData => {
        const rows = csvData.split('\n');

        rows.sort((a, b) => {
            const dateA = new Date(a.split(',')[1]);
            const dateB = new Date(b.split(',')[1]);
            return dateB - dateA;
        });
        const currentDate = new Date();
        const past30Days = new Date();
        past30Days.setDate(currentDate.getDate() - 30);

        rows.forEach(row => {
            const [category, date, wellID] = row.split(',');
            const rowDate = new Date(date);
            if (titles.indexOf(category) == -1) {
                titles.push(category);
                type.push([]);
                type[type.length - 1].push([date, wellID]);
            }
            else {
                type[titles.indexOf(category)].push([date, wellID]);
            }
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });

var currentCategoryIndex = 0;
fetchCategoryData(currentCategoryIndex);

function fetchCategoryData(index) {
    // Get the current category data
    var currentCategory = type[index];
    var name_file = titles[currentCategoryIndex];

    // Generate HTML content for the latest entries
    var outputDiv = document.getElementById('output');
    var html = '<h3 style="text-align: center;"><u>' + name_file + '</u></h3> ';
    if (currentCategory.length === 0) {
        html += '<p style="text-align: center;">No recent records found</p>'
    }
    else {
        html += '<table id="output-table" style="margin-left: auto; margin-right:auto;" class="table"><tr><th>Sr. No.</th><th scope="col">Date</th><th scope="col">Well ID</th></tr> ';

        // Iterate over the current category data
        var ind = 1;
        for (let i = 0; i < currentCategory.length; i++) {
            var date = currentCategory[i][0];
            var wellID = currentCategory[i][1];
            html += '<tr><td>' + ind + '</td><td> ' + formatDate(date) + '</td><td>' + wellID + '</td></tr>';
            ind++;
        }
        html += '</table>';


    }
    // Insert the HTML content into the output div
    outputDiv.innerHTML = html;
}

function showPrevious() {
    if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        fetchCategoryData(currentCategoryIndex);;
    }
}

function showNext() {
    if (currentCategoryIndex < type.length - 1) {
        currentCategoryIndex++;
        fetchCategoryData(currentCategoryIndex);;
    }
}

// Function to format the date as dd:mm:yy
function formatDate(dateString) {
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString().slice(-2);
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return day + '-' + month + '-' + year;
}

function incrementCategoryIndex() {
    currentCategoryIndex++;
    if (currentCategoryIndex >= type.length) {
        currentCategoryIndex = 0;
    }

    // Call the fetchCategoryData function with the updated index
    fetchCategoryData(currentCategoryIndex);
}

var intervalId = 0;
// Function to start the incrementing process
function startIncrementing() {
    // Clear any existing interval
    stopIncrementing();

    // Start the interval and store the interval ID
    intervalId = setInterval(incrementCategoryIndex, 3000);
}

// Function to stop the incrementing process
function stopIncrementing() {
    clearInterval(intervalId);
}

// Start the incrementing process initially
startIncrementing();

document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggleButton");
    var isPlaying = true;

    toggleButton.addEventListener("click", function () {
        if (isPlaying) {
            // Pause logic
            pauseFunction();
            toggleButton.textContent = "Continue";
        } else {
            // Play logic
            playFunction();
            toggleButton.textContent = "Pause";
        }

        // Toggle the state
        isPlaying = !isPlaying;
    });

    function playFunction() {
        // Code to play media or perform any other action
        startIncrementing();
    }

    function pauseFunction() {
        // Code to pause media or perform any other action
        stopIncrementing();
    }
});