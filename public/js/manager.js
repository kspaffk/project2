$(document).ready(function() {
  $(".returns").on("click", function(event) {
    $(".container").empty();
    returns();
  });
  $(".assets").on("click", function(event) {
    $(".container").empty();
  });
  $(".types").on("click", function(event) {
    $(".container").empty();
  });
  $(".users").on("click", function(event) {
    $(".container").empty();
  });
});

$(".sidebar-header").text("Manager");
$(".sidebar-header").on("click", function() {
  $(location).attr("href", "/manager/");
});

var returns = function() {
  $.get("api/returns/", function(returns) {
      var header = $("<div>")
      .addClass("sub-header")
      .text("Returns");
      var errorDiv = $("<div>").addClass("error-txt");
      var instructions = $("<div>")
      .addClass("instructions")
      .html("<p></p>")
  });
};

const formatDate = function(dateStr) {
  return moment(dateStr, "MM/DD/YYYY", false).format();
};
