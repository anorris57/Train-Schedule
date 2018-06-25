
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPLuODN9Bmoumh56RNbAiTU6UyywboGD0",
    authDomain: "trainscheduler-90c20.firebaseapp.com",
    databaseURL: "https://trainscheduler-90c20.firebaseio.com",
    projectId: "trainscheduler-90c20",
    storageBucket: "",
    messagingSenderId: "119974610499"
  };
  firebase.initializeApp(config);
  


  var dataRef = firebase.database(); 

  var trainName;
  var trainDestination;
  var firstTrainTime;
  var frequency;
  var nextArrival;
  var minutesAway;


  $("#submitBtn").on("click", function(event) {
      event.preventDefault();

      trainName = $("#inputTrainName").val().trim();
      trainDestination = $("#destination").val().trim();  
      firstTrainTime = $("#firstTrainTime").val().trim(); 
      frequency = $("#frequency").val().trim();
      

      dataRef.ref().push({  

          trainName: trainName,
          trainDestination: trainDestination,
          firstTrainTime: firstTrainTime,
          frequency: frequency

      });

  });
 
  dataRef.ref().on("child_added", function(childSnapshot) {

      trainNameTd = $("<td>").text(childSnapshot.val().trainName);
      destinationTd = $("<td>").text(childSnapshot.val().trainDestination);
      frequencyTd = $("<td>").text(childSnapshot.val().frequency);

    
    var tFrequency = parseInt($("#frequency").val().trim());
    console.log(typeof tFrequency);

    var firstTime =  $("#firstTrainTime").val().trim(); 
    console.log(typeof firstTime);
    

    
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log( typeof firstTimeConverted);

    // Current Time
    var currentTime = moment();
    var miltaryTime =  moment(currentTime).format("HH:mm")//give current time in 24 hours

    //var futureTime = "20:00";

    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
   

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);



    // Next Train
    var nextArrival = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    
    nextArrivalTd = $("<td>").text(moment(nextArrival).format("hh:mm"));
    minutesAwayTd = $("<td>").text(tMinutesTillTrain);
    
    var tBody = $("tbody");
    var tRow = $("<tr>");

      // Append the newly created table data to the table row
      tRow.append(trainNameTd, destinationTd, frequencyTd, nextArrivalTd, minutesAwayTd );
      // Append the table row to the table body
      tBody.append(tRow);
    
     // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });