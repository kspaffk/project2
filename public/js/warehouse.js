var options = { input: false };
var dropzone = new FileDrop("dropcsv", options);
var jsonzone = document.getElementById("jsonoutput");

dropzone.event("send", function(files) {
  files.each(function(file) {
    file.readData(
      createJSON,
      function(e) {
        alert("Terrible Error!");
      },
      "text"
    );
  });
});

function createJSON(str) {
  dropzone.el.value = str;
  var config = {
    header: true
  };
  var jsonObject = Papa.parse(str, config).data;
  var jsonString = JSON.stringify(jsonObject);

  jsonzone.value = jsonString;
}
