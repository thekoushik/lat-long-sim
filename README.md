# lat-long-sim
Web based Lat-Long Simulator

## Motivation
When developing geo location based applications, we often face a common problem to
go outside and test the application. But doing so makes it difficult to debug
and fix issues because its time consuming to come back and go outside again all
by ourselves. This tool will help those developers who are developing such projects
by cutting the moving part to just a click.


## Install
```
npm install
```

## Run
```
npm start
```

Then open `http://localhost:8888` in browser.

## Steps to use
 * Enter google map api key when asked( will be stored in browser's localstorage )
 * Allow location permission in browser to load the map/marker near your location
 * Copy the url from top-right corner to your project and create a polling with a GET request
 * `L-Click` to move the car to a location and `R-Click` to set target, Press `Esc` to pause/resume
 * You can also choose speed of the car from the dropdown menu at the top right corner.
 * Run your project in the same network

 When you call the API endpoint, you'll receive a `GeolocationPosition` same as `getCurrentPosition()`/`watchPosition()`.
 If its not moving then it will return `{ "idle": true }` so you can act accordingly when to to what.
 But keep in mind that always keep the polling running even if it is idle, because only through polling
 you'll know what's happening.

 Happy coding!
