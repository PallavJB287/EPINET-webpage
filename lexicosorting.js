// Function to read a CSV file and return an array of objects representing each row
function readCSVFile(csvData) {
    // Split the CSV data into rows
    const rows = csvData.split('\n');

    // Remove the header row if it exists
    const header = rows[0].split(',');
    if (header.length === 3 && header[0] === 'category' && header[1] === 'date' && header[2] === 'wellid') {
        rows.shift();
    }

    // Parse each row and create an object with category, date, and wellid properties
    const data = rows.map(row => {
        const [category, date, wellid] = row.split(',');
        return { category, date, wellid };
    });

    return data;
}

// Quick Sort implementation to sort the categories lexicographically
function quickSortCategories(data, low, high) {
    if (low < high) {
        const pivotIndex = partition(data, low, high);
        quickSortCategories(data, low, pivotIndex - 1);
        quickSortCategories(data, pivotIndex + 1, high);
    }
}

function partition(data, low, high) {
    const pivot = data[high].category;
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (data[j].category < pivot) {
            i++;
            swap(data, i, j);
        }
    }

    swap(data, i + 1, high);
    return i + 1;
}

function swap(data, i, j) {
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
}

// Example usage
const csvData = `category,date,wellid
Lab,2022-09-25,YZA567
Geology,2022-01-01,ABC123
Geology,2022-02-15,DEF456
Geology,2022-04-20,JKL012
Geology,2022-05-05,MNO345
Geology,2022-06-18,PQR678
Lab,2022-07-30,STU901
Lab,2022-08-08,VWX234
Drilling,2022-11-15,EFG123
Drilling,2022-12-05,HIJ456
Production,2023-09-25,DEF123
Geology,2022-03-10,GHI789
Drilling,2023-01-20,KLM789
Drilling,2023-02-10,NOP012
Reservoir,2023-03-25,QRS345
Reservoir,2023-04-18,TUV678
Reservoir,2023-05-01,WXY901
Reservoir,2023-06-12,ZAB234
Production,2023-07-30,BCD567
Production,2023-08-08,CDE890
Seismic,2023-10-31,EFG456
Lab,2022-10-31,BCD890
Seismic,2023-11-15,FGH789
Seismic,2023-12-05,GHI012
Logs,2024-01-20,HIJ345
Logs,2024-02-10,IJK678
Documents,2024-03-25,JKL901
Documents,2024-04-18,KLM234`;

const data = readCSVFile(csvData);
console.log('Original data:', data);

quickSortCategories(data, 0, data.length - 1);
console.log('Sorted data:', data);
