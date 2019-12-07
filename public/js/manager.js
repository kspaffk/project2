$(document).ready(function() {
  $(".returns").on("click", function(event) {
    $(".container").empty();
  });
  $(".assets").on("click", function(event) {
    $(".container").empty();
  });
  $(".types").on("click", function(event) {
    $(".container").empty();
    itemTypes();
  });
  $(".users").on("click", function(event) {
    $(".container").empty();
  });
});

$(".sidebar-header").text("Manager");
$(".sidebar-header").on("click", function() {
    $(location).attr("href", "/manager/");
});

var itemTypes = function() {
    var header = $("<div>")
    .addClass("sub-header")
    .text("Items and their descriptions");
    var errorDiv = $("<div>").addClass("error-txt");
    var instructions = $("<div>")
    .addClass("instructions")
    .html(
        "<p>A count of all item types</p>"
    );
    var table = $("<table>").addClass("item-types");
    var tableHeadType = $("<th>").text("Item Type");
    var tableHeadID = $("<th>").text("Item ID");
    var tableHead = $("<tr>").append(tableHeadType, tableHeadID)
    table.append(tableHead);
    $(".container").append(header, errorDiv, instructions);
    $(".container").append(table)
    $.ajax({
        type: "POST",
        url: "/api/itemTypes",
        contentType: "application/json",
    }).then(function(itemTypesChanged) {
        $(".container").empty();
        var header = $("<div>")
        .addClass("sub-header")
        .text("Item type changed");
        var instructions = $("<div>")
        .addClass("instructions")
        .html(
            "<p>You have succesfully edited this item type</p>"
        )
    });
}

const formatDate = function(dateStr) {
  return moment(dateStr, "MM/DD/YYYY", false).format();
};

const createItemTypeTable = function() {
    var itemTable;
    
}