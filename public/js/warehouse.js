var options = { input: false };
var dropzone = new FileDrop("dropcsv", options);
var jsonzone = document.getElementById("jsonoutput");

dropzone.event("send", function(files) {
  files.each(function(file) {
    file.readData(
      createJSON,
      function(e) {
        console.log("There was an error reading the file: " + e);
      },
      "text"
    );
  });
});

function createJSON(str) {
  var config = {
    header: true
  };
  var jsonObject = Papa.parse(str, config).data;
  var jsonArray = [];
  jsonObject.forEach(i => {
    if (i.serNum != "") {
      jsonArray.push(i.serNum);
    }
  });
  console.log(jsonArray);

  jsonString = JSON.stringify(jsonArray);

  $.ajax({
    type: "POST",
    url: "/api/assets",
    contentType: 'application/json',
    data: jsonString,
  });
}
