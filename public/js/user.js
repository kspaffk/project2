var storage = window.localStorage;
var userId = storage.getItem(dbUser.empID);

$.get("/api/assetsassigned/4", function(data) {
  data.forEach(asset => {
  var card = $("<div>").addClass("card");
  var cardBody = $("<div>").addClass("card-body");

  var snText = "Serial Number: " + asset.serialNumber;
  var itemNameText = "Item Name: " + asset.itemName;
  var assignDate = "Assigned Date: " + asset.assignDate;
  var descText = "Description: " + asset.description;

  var serialNum = $("<p>").text(snText);
  var itemName = $("<p>").text(itemNameText);
  var assigned = $("<p>").text(assignDate);
  var desc = $("<p>").text(descText);

  $(cardBody).append(serialNum, itemName, assigned, desc);
  $(card).append(cardBody);
  $(".container").append(card);
  });


});