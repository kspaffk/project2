$(".sidebar-header").text("User Page");
$(".sidebar-header").on("click", function() {
    $(location).attr("href", "/users/");
});

var logoutDiv = $("<div>").addClass("logout btn-orange");
var logoutLink = $("<a>").text("Logout").attr({ "href": "/logout", "id": "logout-link"});
logoutDiv.append(logoutLink);
$(".sidebar").append(logoutDiv);
