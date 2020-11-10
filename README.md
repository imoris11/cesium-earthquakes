# Getting Started Earthquakes Visualization UI

This project is meant to visualize earthquake data on a map. The data is gotten from [USGS](https://earthquake.usgs.gov/earthquakes/search/) and visualized using [resium](https://resium.darwineducation.com/), a react package built on cesium. The package implements a component based approach to cesium.

The app displays the top 100 earthquakes based on the magnitude but can be filtered by city/country. When filtered, it maintains it's ordering. Cesium provides a search feature that compliments the functionality of the app.

P.S: There are a total of 2.8k records from USGS.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
I couldn't add tests to the App.js component because I kept getting WebGL not in browser error. However, tests exists for other components and helper functions.
