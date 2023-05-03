# Economics Indicator Dashboard
This application is a react dashboard that displays key insights and trends to Boston's Economy. The high-frequency data that powers it is maintained by the research department in a google sheet that has been leveraged as an API. 

![Screenshot of Application](https://i.imgur.com/SAaIbLf.png)

Technology Used:
* React
* Bootstrap
* Recharts
* Google Sheets
* Google App Script

## Back End
Prior to this application, the Research Team was maintaining a dashboard made in Tableau and they were using an spreadsheet to maintian the data. With this new application it was decided that 1. collaboration and 2. being able to copy & paste sections of data would be important to the research team. Because of this we decided to keep googlesheets as the interface where they maintain their data.

The google sheet can be found here: https://docs.google.com/spreadsheets/d/1mVztFT0iCkFQD0FX7kx6lMC7-uVSCe1OcDVl1q9SXcY/edit#gid=2071536899

The googlesheet can become an JSON API by extending Google Sheets with a Google Apps Script. To view the script that extends the workbook: `open up the google sheets workbook > hover over 'Extensions' > click 'Apps Script'. `
<details>
    <summary> In the event this piece of script is lost or corrupted, I've copied it here for safe keeping:</summary>

    ```
    function json(sheetName) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = spreadsheet.getSheetByName(sheetName)
    const data = sheet.getDataRange().getValues()
    const jsonData = convertToJson(data)
    return ContentService
            .createTextOutput(JSON.stringify(jsonData))
            .setMimeType(ContentService.MimeType.JSON)
    }

    function convertToJson(data) {
    const headers = data[0]
    const raw_data = data.slice(1,)
    let json = []
    raw_data.forEach(d => {
        let object = {}
        for (let i = 0; i < headers.length; i++) {
            object[headers[i]] = d[i]
        }
        json.push(object)
    });
    return json
    }

    function doGet(e) {
    const path = e.parameter.path
    return json(path)
    }
    ```
</details>
<br>
In the event you need to deploy your own script, here is how to do so: 

1. Deploy the script as a web application. Execute as yourself (your work email) and set 'Who Has Access' to 'Anyone'.
<br>

2. View your deployment (hover over deploy > click 'manage deployments')
<br>
    ![Hover over 'deploy' and click 'manage deployments'](https://i.imgur.com/g7TT5kC.png)

23. Copy the URL under "Web App"
<br>
    ![Example of Deployment Window](https://i.imgur.com/tmWeEaB.png)

4. Concatenate the following to get the full API URL:
    ```
    <Web App URL> + ?path= + <google sheet name>

    <!-- full example -->
    https://script.google.com/macros/s/AKfycbyy_JR7AM_AAnUB2DB_AnKXqsdqlIPJoBc-7CKW-S2In2_OslstV1XSz0Ex2MWobh9w/exec?path=LaborMarket_PayrollEst
    ```
5. Test the url in the browser, you should see the JSON response
## Front End
The front end leverages React Boot Strap & the Recharts library. Recharts was selected for the charts as it was most compatiable with how the G-Sheet JSON Data is formatted.
<br>
https://react-bootstrap.github.io/
<br>
https://recharts.org/en-US/

Useful functions & tools (and their descriptions) have been stored in src/utils.js and are called throughout the project. Where possible, tools & components should be made reusable/modular.

A script for responsive screen sizing is stored in src/useDeviceSize.js

Hash Routing is used instead of browser routing; browser routing is incompatible with how our server domain is set up.

Uses react's grid and breakpoints system to make a mobile & desktop friendly website
## Getting Started
1. Clone the repo to your local computer
2. While working in the project folder, run `npm install` in your terminal
3. While working in the project folder, run `npm start` in your terminal to start a live preview of the application
4. Once changes are made and you are ready to push them live: While working in the project folder, run `npm run build` in the terminal
5. Copy the contents in the `build` folder and replace the contents of the economic-indicators folder on the www.maps server


## Deployed Application
https://maps.bostonplans.org/economic-indicators

