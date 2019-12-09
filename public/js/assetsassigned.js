var userId = req.body.empID;

$.get("/api/assetsassigned/" + userId, function(data) {
 console.log(data)
  var card = $("<div>").addClass("card");
  var cardBody = $("<div>").addClass("card-body");

  var serialNum = $("<p>").html("Serial Number: <span class=sn></span>");
  var itemName = $("<p>").html("Item Name: <span class=item-name></span>");
  var assigned = $("<p>").html("Assigned Date: <span class=assigned></span>");
  var desc = $("<p>").html("Description: <span class=desc></span>");

  $(cardBody).append(serialNum, itemName, assigned, desc);
  $(card).append(cardBody);
  $(".container").append(card);


});