var csvFiles = ['data1.csv', 'data2.csv', 'data3.csv', 'data4.csv', 'data5.csv'];
var file_head = ['Report 1', 'Report 2', 'Report 3', 'Report 4', 'Report 5'];
var currentFileIndex = 0;

fetchCSVFile(currentFileIndex);

function fetchCSVFile(index) {
    // Make a request to the current CSV file
    fetch(csvFiles[index])
        .then(response => response.text())
        .then(data => {
            // Parse the CSV data
            var parsedData = CSVToArray(data, ',');
            var name_file = file_head[index];

            // Sort the data by date in descending order
            parsedData.sort(function (a, b) {
                var dateA = new Date(a[0]);
                var dateB = new Date(b[0]);
                return dateB - dateA;
            });

            // Process the data and insert the latest 5 entries into the HTML
            var outputDiv = document.getElementById('output');
            var html = '<h5 style="text-align: center;">' + name_file + '</h5>';
            html += '<table id="output-table" class="table"><thead><tr><th>Sr. No.</th><th scope="col">Date</th><th scope="col">Well ID</th></tr></thead> <tbody class="table-group-divider">';

            // Generate HTML content for the latest 5 entries
            var latestEntries = parsedData.slice(0, 5);
            var ind = 1;
            latestEntries.forEach(function (row) {
                var date = row[0];
                var wellID = row[1];
                html += '<tr><td>' + ind + '</td><td> ' + formatDate(date) + '</td><td>' + wellID + '</td></tr>';
                ind++;
            });
            html += '</tbody></table>';

            // Insert the HTML content into the output div
            outputDiv.innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showPrevious() {
    if (currentFileIndex > 0) {
        currentFileIndex--;
        fetchCSVFile(currentFileIndex);
    }
}

function showNext() {
    if (currentFileIndex < csvFiles.length - 1) {
        currentFileIndex++;
        fetchCSVFile(currentFileIndex);
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

// Function to parse CSV data
function CSVToArray(csvString, delimiter) {
    var rows = csvString.split('\n');
    var result = [];
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i].split(delimiter);
        result.push(row);
    }
    return result;
}

