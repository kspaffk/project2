$(document).ready(function() {
    $(".assign-asset").on("click", function(event) {
        $(".container").empty();
        assignAsset();
    });
    $(".create-one-asset").on("click", function(event) {
        $(".container").empty();
    });
    $(".edit-one-asset").on("click", function(event) {
        $(".container").empty();
    });
    $(".return-one-asset").on("click", function(event) {
        $(".container").empty();
    });
    $(".create-bulk-asset").on("click", function(event) {
        $(".container").empty();
        createBulk();
    });
    $(".return-bulk-asset").on("click", function(event) {
        $(".container").empty();
    });
});

var assignAsset = function() {
    var header = $("<div>")
        .addClass("body-header")
        .text("Assign Asset");
    var selectAsset = $("<select>").attr("id", "select-asset");

    var selectUser = $("<select>").attr("id", "select-user");

    $(".container").append(header);
};

var createBulk = function() {
    var header = $("<div>")
        .addClass("body-header")
        .text("Bulk Create Assets");
    var dropCSV = $("<div>").attr("id", "dropcsv").text("Drop your CSV file here!")

    $(".container").append(header, dropCSV);

    // FileDrop and PapaParse section for importing CSV files
    var options = { input: false };
    var dropzone = new FileDrop("dropcsv", options);

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
        jsonString = JSON.stringify(jsonObject);

        $.ajax({
            type: "POST",
            url: "/api/assets",
            contentType: "application/json",
            data: jsonString
        });
    }
};
