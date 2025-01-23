# Economics Indicator Dashboard
This application is a react dashboard that displays key insights and trends to Boston's Economy. The high-frequency data that powers it is maintained by the research department in a google sheet that has been leveraged as an API. 

![Screenshot of Application](https://i.imgur.com/yftst1X.png)

Technology Used:
* React
* Bootstrap
* Recharts
* Google Sheets
* Google App Script

## Front End / Design
The front end leverages React Boot Strap & the Recharts library. Recharts was selected for the charts as it was most compatiable with how the G-Sheet JSON Data is formatted.
<br>
https://react-bootstrap.github.io/
<br>
https://recharts.org/en-US/

### Layout
The pages are laid out using Bootstrap's [Grid System](https://getbootstrap.com/docs/5.0/layout/grid/). You'll notice that all the pages follow a similar pattern shown in the image below: Columns are nested inside Rows, which are nested inside a Container. 

![Screenshot Bootstrap Grid setup](https://i.imgur.com/BKwFmF5.png)
For example, within our code:
```js
<div className="row mh-20 gx-0 gy-0 graph-row">
          <div className="col-12 col-md-6 graph-column">
```

There's quite a bit of additional information here, all focused on layout, so here's a breakdown:
```js
// we start with a row. 
// mh = refers to max height,
// gx & gy = size of the gutters, aka the spacing between rows & columns
// graph-row = a classname I came up with, which is used to style the row in index.css
<div className="row mh-20 gx-0 gy-0 graph-row">
        // Inside the row, we define a column.
        // col-# specifies the number of columns to occupy out of the available 12 in a row. 
        // col-12: On SMALLER devices, this column will span all 12 columns, i.e., the full width of the row. Bootstrap uses a mobile-first design approach, so the default applies to small devices, and any behavior for larger devices must be explicitly specified.
        // col-md-6: On MEDIUM devices or larger (defined by the "md" breakpoint), this column spans 6 out of 12 columns, meaning it takes up half the width of the row. 
        <div className="col-12 col-md-6 graph-column">
```

Useful functions & tools (and their descriptions) have been stored in src/utils.js and are called throughout the project. Where possible, tools & components should be made reusable/modular.

A script for responsive screen sizing is stored in src/useDeviceSize.js

Hash Routing is used instead of browser routing; browser routing is incompatible with how our server domain is set up.

Uses react's grid and breakpoints system to make a mobile & desktop friendly website

## Back End / Data
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

3. Copy the URL under "Web App"
<br>
    ![Example of Deployment Window](https://i.imgur.com/tmWeEaB.png)

4. Concatenate the following to get the full API URL:
    ```
    <Web App URL> + ?path= + <google sheet name>

    <!-- full example -->
    https://script.google.com/macros/s/AKfycbyy_JR7AM_AAnUB2DB_AnKXqsdqlIPJoBc-7CKW-S2In2_OslstV1XSz0Ex2MWobh9w/exec?path=LaborMarket_PayrollEst
    ```
5. Test the url in the browser, you should see the JSON response


## Getting Started 
### To get a coding setup started on your computer:
1. Install chocolatey (https://chocolatey.org/install) with powershell
2. Download a code editor, I use Visual Studio Code (https://code.visualstudio.com/) 
3. Install git with `choco install git.install`
4. Configure global git ignore (https://www.notion.so/Configure-Global-Git-Ignore-789b8a01088e4d069cfbe48ec5231a5c?pvs=25)
5. Install NVM (https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/), use it to install node (https://nodejs.org/en). 
6. Set up your github ssh key (https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)


### To get started with the app:
1. Clone the repo to your local computer
2. While working in the project folder, run `npm install` in your terminal
3. While working in the project folder, run `npm start` in your terminal to start a live preview of the application on local host
4. Once changes are made and you are ready to push them live: While working in the project folder, run `npm run build` in the terminal
5. Copy the contents in the `build` folder and replace the contents of the economic-indicators folder on the server

## Guidelines
### 1. Branding
- Ensure all branding adheres to [Planning Department Brand Guidelines](https://creative-bostonplanning.super.site/brand-guidelines-logo-color-font-1).
- Follow specific guidance for colors and fonts (e.g., *Use dark blue for headers or to add contrast and weight to lighter pages.*).

### 2. Test Thoroughly
- Test changes on **local host** then on **staging server or seperate folder** before deploying to **production environment**.
- Ensure cross-browser compatibility (e.g., Chrome, Safari, edge, mobile browsers).
- Verify the design is mobile-friendly and fully screen-size-responsive.
- Have a coworker test in addition to your own checks—more eyes catch more issues.
- Confirm new features and bug fixes don’t introduce regressions.

### 3. Review Dependencies
- Use tools like `npm audit` regularly to check for outdated or vulnerable dependencies/packages.
- Update dependencies cautiously to avoid breaking changes.

### 4. Document Changes
- Keep comments and project documentation up to date.
- Write clear and concise commit messages to communicate updates effectively.
- Use detailed descriptions in pull or merge requests.

### 5. React Based Design  
- Build with small, reusable components that follow React’s design philosophy.

### 6. Use Version Control Effectively
- Work in feature branches and adhere to the project's branching strategy.
- Use clear, descriptive commit messages to document changes.

### 7. Monitor After Deployment
- Before deploying a new build, always create a backup of the current production build.
- Be prepared to roll back or implement hotfixes if issues arise post-deployment.

### 8. Before Deleting an Application
- Always check in with IT admins to coordinate proper re-routing and ensure no disruptions occur.
- If you're ever uncertain about best practices for server or web management, don't hesitate to reach out to Julie, Jeff, or Mike for guidance.

### Deployed Application
https://maps.bostonplans.org/economic-indicators

