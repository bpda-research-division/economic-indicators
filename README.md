# Economics Indicator Dashboard
This application is a react dashboard that displays key insights and trends to Boston's Economy. The high-frequency data that powers it is maintained by the research department in a google sheet that has been leveraged as an API. 

![Screenshot of Application](https://i.imgur.com/SAaIbLf.png)

Technology Used:
* React
* Node
* Bootstrap
* Recharts
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
Deploy the script as a web application. Execute as yourself (your work email) and set 'Who Has Access' to 'Anyone'.
<br>
To access a g-sheet as a JSON API:
1. View your deployment (hover over deploy > click 'manage deployments')
![Hover over 'deploy' and click 'manage deployments'](https://i.imgur.com/g7TT5kC.png)

2. Copy the URL under "Web App"
![Example of Deployment Window](https://i.imgur.com/tmWeEaB.png)

3. Concatenate the following:
    ```
    <Web App URL> + ?path= + <google sheet name>

    <!-- full example -->
    https://script.google.com/macros/s/AKfycbyy_JR7AM_AAnUB2DB_AnKXqsdqlIPJoBc-7CKW-S2In2_OslstV1XSz0Ex2MWobh9w/exec?path=LaborMarket_PayrollEst
    ```
## Front End
The front end leverages React Boot Strap & the Recharts library. Recharts was selected for the charts as it was most compatiable with how the G-Sheet JSON Data is formatted.
<br>
https://react-bootstrap.github.io/
<br>
https://recharts.org/en-US/

Useful functions & tools (and their descriptions) have been stored in src/utils.js and are called throughout the project. Where possible, tools & components should be made reusable/modular.

## Deployed Application
https://maps.bostonplans.org/economic-indicators

## Future Enchancements