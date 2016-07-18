// Function to send a message to the Pebble using AppMessage API
// We are currently only sending a message using the "status" appKey defined in appinfo.json/Settings
function sendMessage(summary) {
	Pebble.sendAppMessage({"message": summary}, messageSuccessHandler, messageFailureHandler);
}

// Called when the message send attempt succeeds
function messageSuccessHandler() {
  console.log("Message send succeeded.");  
}

// Called when the message send attempt fails
function messageFailureHandler() {
  console.log("Message send failed.");
  sendMessage();
}

// Called when JS is ready
Pebble.addEventListener("ready", function(e) {
  reqQuote();
});
												
// Called when incoming message from the Pebble is received
// We are currently only checking the "message" appKey defined in appinfo.json/Settings
Pebble.addEventListener("appmessage", function(e) {
  console.log("Received Message: " + e.payload.message);
  reqQuote();
});

function reqQuote() {
  var xmlhttp = new XMLHttpRequest();
  var url = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies";

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var infoFromAPI = JSON.parse(xmlhttp.responseText);
          var summary = infoFromAPI.quote;
          var author = infoFromAPI.author;
        
        sendMessage(author + ": " + summary);
      }
  };
  
  xmlhttp.open("GET", url, true);
  
  xmlhttp.setRequestHeader("X-Mashape-Key","WwB7M4iPFemshBnxMGPL8ZfWgbOBp12ktLGjsnj1DEmNuVZ3Xq");
  xmlhttp.send();
}