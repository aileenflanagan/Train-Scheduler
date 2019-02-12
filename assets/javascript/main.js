


var config = {
  apiKey: "AIzaSyBkDpDnwZ7SABO4AOGA-49TMYXgCVABh1k",
  authDomain: "train-aa377.firebaseapp.com",
  databaseURL: "https://train-aa377.firebaseio.com",
  projectId: "train-aa377",
  storageBucket: "train-aa377.appspot.com",
  messagingSenderId: "718539676364"
};

firebase.initializeApp(config);

var database = firebase.database();

let trainName = "";
let destination = "";
let frequency = "";
let firstTrain = "";
let fTrainTime="";
let displayFirstTrain="";
// let trainsScheduled = 0;


let currentTime= moment().format("HH:mm");
console.log(currentTime);




$("#add-train-button").on("click", function (event) {
  event.preventDefault();

  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  firstTrain = $("#time-input").val().trim();

  fTrainTime= moment("HH:mm",firstTrain).format("HH:mm");
  displayFirstTrain=moment("HH:mm",fTrainTime).format("hh:mm a")
  console.log(fTrainTime,displayFirstTrain);

  database.ref().set({

    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstTrain: firstTrain
  });
});
 
let minSince= (currentTime-firstTrain)%frequency;
let minLeft= frequency-minSince;

console.log(minSince);

database.ref().on("value", function (childSnapshot) {
  // console.log(trainsScheduled);
  // if (trainsScheduled == 0) {
  //   $("#first-train").html("<tr><td scope='row'>" + trainName + "</td></tr>");
  //   trainsScheduled++;
  // }
  // else {
    childSnapshot.val().trainName;
    $("#train-schedule").append("<tr><td scope='row'>" + childSnapshot.val().trainName + "</td>"
    +"<td scope='row'>"+ childSnapshot.val().destination + "</td>"
    +"<td scope='row'>"+ childSnapshot.val().frequency + "</td>"
    // +"<td scope='row'>"+ childSnapshot.val().firstTrain + "</td>"
    +    "</tr>"
    );
    // trainsScheduled++;
  // }

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
