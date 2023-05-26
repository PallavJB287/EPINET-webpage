// const csvData = `Geology,2022-01-01,ABC123
// Geology,2021-02-15,DEF456
// Geology,2022-08-10,GHI789
// Geology,2022-04-20,JKL012
// Geology,2022-05-05,MNO345
// Geology,2022-06-18,PQR678
// Lab,2022-07-30,STU901
// Lab,2022-08-08,VWX234
// Lab,2022-09-25,YZA567
// Logs,2022-10-31,BCD890`;

// const csvData = `Geology,2022-01-01,ABC123
// Geology,2022-02-15,DEF456
// Geology,2022-03-10,GHI789
// Geology,2022-04-20,JKL012
// Geology,2022-05-05,MNO345
// Geology,2022-06-18,PQR678
// Lab,2022-07-30,STU901
// Lab,2022-08-08,VWX234
// Lab,2022-09-25,YZA567
// Lab,2022-10-31,BCD890
// Drilling,2022-11-15,EFG123
// Drilling,2022-12-05,HIJ456
// Drilling,2023-01-20,KLM789
// Drilling,2023-02-10,NOP012
// Reservoir,2023-03-25,QRS345
// Reservoir,2023-04-18,TUV678
// Reservoir,2023-05-01,WXY901
// Reservoir,2023-06-12,ZAB234
// Production,2023-07-30,BCD567
// Production,2023-08-08,CDE890
// Production,2023-09-25,DEF123
// Seismic,2023-10-31,EFG456
// Seismic,2023-11-15,FGH789
// Seismic,2023-12-05,GHI012
// Logs,2024-01-20,HIJ345
// Logs,2024-02-10,IJK678
// Documents,2024-03-25,JKL901
// Documents,2024-04-18,KLM234`;

// Parse CSV data into rows
// const rows = csvData.split('\n');

// Make a request to the CSV file
fetch('./datacombined.csv')
    .then(response => response.text())
    .then(csvData => {
        // Parse CSV data into rows
        const rows = csvData.split('\n');

        // Sort rows based on date (latest first)
        rows.sort((a, b) => {
            const dateA = new Date(a.split(',')[1]);
            const dateB = new Date(b.split(',')[1]);
            return dateB - dateA;
        });
        const currentDate = new Date();
        const past30Days = new Date();
        past30Days.setDate(currentDate.getDate() - 365);
        // Categorize and store data in separate arrays
        const geologyData = [];
        const labData = [];
        const drillingData = [];
        const reservoirData = [];
        const productionData = [];
        const seismicData = [];
        const logsData = [];
        const documentsData = [];

        rows.forEach(row => {
            const [category, date, wellID] = row.split(',');
            const rowDate = new Date(date);

            if (rowDate >= past30Days && rowDate <= currentDate) {
                if (category === 'Geology') {
                    geologyData.push([date, wellID]);
                } else if (category === 'Lab') {
                    labData.push([date, wellID]);
                }
                else if (category === 'Drilling') {
                    drillingData.push([date, wellID]);
                }
                else if (category === 'Reservoir') {
                    reservoirData.push([date, wellID]);
                }
                else if (category === 'Production') {
                    productionData.push([date, wellID]);
                }
                else if (category === 'Seismic') {
                    seismicData.push([date, wellID]);
                }
                else if (category === 'Logs') {
                    logsData.push([date, wellID]);
                }
                else if (category === 'Documents') {
                    documentsData.push([date, wellID]);
                }
            }
        });

        // Generate CSV content
        const geologyCSV = geologyData.join('\n');
        const labCSV = labData.join('\n');
        const drillingCSV = drillingData.join('\n');
        const reservoirCSV = reservoirData.join('\n');
        const productionCSV = productionData.join('\n');
        const seismicCSV = seismicData.join('\n');
        const logsCSV = logsData.join('\n');
        const documentsCSV = documentsData.join('\n');

        // Display the generated CSV content
        console.log('Geology Data:\n', geologyData);
        console.log('Lab Data:\n', labCSV);
        console.log('Drilling data:\n', drillingCSV);
        console.log('Reservoir Data:\n', reservoirCSV);
        console.log('Production Data:\n', productionCSV);
        console.log('Seismic Data:\n', seismicCSV);
        console.log('logs Data:\n', logsCSV);
        console.log('Documents Data:\n', documentsCSV);

    })
    .catch(error => {
        console.error('Error:', error);
    });
