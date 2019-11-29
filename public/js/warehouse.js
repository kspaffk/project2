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
    $.get("/api/users/", function(users) {
        $.get("/api/assets/", function(assets) {
            var header = $("<div>")
                .addClass("sub-header")
                .text("Assign Asset");
            var description = $("<div>")
                .addClass("description")
                .text(
                    "To assign an asset to a user, choose a user and an asset below and click Assign"
                );

            var selectAsset = $("<select>").attr("id", "select-asset");
            assets.forEach(asset => {
                var option = $("<option>")
                    .attr("value", asset.id)
                    .text(asset.serialNumber);
                selectAsset.append(option);
            });

            var selectUser = $("<select>").attr("id", "select-user");
            users.forEach(user => {
                var option = $("<option>")
                    .attr("value", user.empID)
                    .text(user.firstName + " " + user.lastName);
                selectUser.append(option);
            });

            var btnDiv = $("<div>").addClass("button-div");
            var button = $("<button>")
                .attr({
                    type: "button",
                    value: "Selected option",
                    id: "but-read"
                })
                .addClass("btn-green")
                .text("Assign");
            btnDiv.append(button);
            $(".container").append(header, selectUser, selectAsset, btnDiv);
            $("#select-user, #select-asset").select2();
        });
    });
};

var createBulk = function() {
    var header = $("<div>")
        .addClass("body-header")
        .text("Bulk Create Assets");
    var dropCSV = $("<div>")
        .attr("id", "dropcsv")
        .text("Drop your CSV file here!");

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
