// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: "AIzaSyDnnB-9X7586c6Xh5iOxozw5_sBXNp51yc",
  authDomain: "campustec-12a23.firebaseapp.com",
  databaseURL: "https://campustec-12a23.firebaseio.com",
  projectId: "campustec-12a23",
  storageBucket: "campustec-12a23.appspot.com",
  messagingSenderId: "279356762572",
  appId: "1:279356762572:web:f4217678398e7453e71569",
  measurementId: "G-8QBG3HRBZ1"
};

export const environment = {
  production: false,
  firebase: firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
