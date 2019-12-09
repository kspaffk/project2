$(".sidebar-header").text("User Page");
$(".sidebar-header").on("click", function() {
    $(location).attr("href", "/users/");
});
