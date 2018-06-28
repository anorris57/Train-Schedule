
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCbu1pITV3sWSBJinKwrsl9cEAZXLj87bw",
  authDomain: "traintwo-31e16.firebaseapp.com",
  databaseURL: "https://traintwo-31e16.firebaseio.com",
  projectId: "traintwo-31e16",
  storageBucket: "",
  messagingSenderId: "639102086248"
};

firebase.initializeApp(config);

var database = firebase.database();

var ref = database.ref('trainInfo');

ref.on('value', gotInfo, errData);

function gotInfo(data) {
  //console.log(data.val());
  $(".tableData").remove();

  var trainInfo = data.val();
  var keys = Object.keys(trainInfo);
  //console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];

    var frequency = parseInt(trainInfo[k].frequency);
    var destination = trainInfo[k].trainDestination;
    var trainName = trainInfo[k].trainName;

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(moment(trainInfo[k].firstTrainTime, "HH:mm").subtract(1, "years")), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % parseInt(trainInfo[k].frequency);
    //console.log(frequency);

    // Minute Until Train
    var tMinutesTillTrain = parseInt(trainInfo[k].frequency) - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextArrival = moment().add(tMinutesTillTrain, "minutes");

    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    trainNameTd = $("<td>").text(trainName);

    destinationTd = $("<td>").text(destination);

    frequencyTd = $("<td>").text(frequency);

    nextArrivalTd = $("<td>").text(moment(nextArrival).format("HH:mm"));

    minutesAwayTd = $("<td>").text(tMinutesTillTrain);

    var tBody = $("tbody");
    var tRow = $("<tr>").addClass("tableData");

    // Append the newly created table data to the table row
    tRow.append(trainNameTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd);
    // Append the table row to the table body
    tBody.append(tRow);

  }
}

function errData(errorObject) {
  console.log("Errors handled: " + errorObject.code);
}

//grabbing new information
$("#submitBtn").on("click", function (event) {
  event.preventDefault();

  var data = {
    trainName: $("#inputTrainName").val().trim(),
    trainDestination: $("#destination").val().trim(),
    firstTrainTime: $("#firstTrainTime").val().trim(),
    frequency: $("#frequency").val().trim()
  }

  var ref = database.ref('trainInfo');

  ref.push(data);

  $("#inputTrainName").val('');
  $("#destination").val('');
  $("#firstTrainTime").val('');
  $("#frequency").val('');

});
