$(document).ready(function() {
    $(".assign-asset").on("click", function(event) {
        $(".container").empty();
        assignAsset();
    });
    $(".create-one-asset").on("click", function(event) {
        $(".container").empty();
        createOneAsset();
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

$(".sidebar-header").text("Warehouse");
$(".sidebar-header").on("click", function() {
    $(location).attr("href", "/warehouse/");
});

var assignAsset = function() {
    $.get("/api/users/", function(users) {
        $.get("/api/assets/", function(assets) {
            var header = $("<div>")
                .addClass("sub-header")
                .text("Assign Asset");
            var errorDiv = $("<div>").addClass("error-txt");
            var instructions = $("<div>")
                .addClass("instructions")
                .html(
                    "<p>To assign an asset to a user, choose a user and an asset below and click <span class='code'>Assign</span></p>"
                );
            var dropdownContainer = $("<div>").addClass("dropdown-container");
            var assetDrop = $("<div>")
                .addClass("asset-drop")
                .html("<h1>Asset</h1>");
            var userDrop = $("<div>")
                .addClass("user-drop")
                .html("<h1>User</h1>");
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

            assetDrop.append(selectAsset);
            userDrop.append(selectUser);
            dropdownContainer.append(assetDrop, userDrop);

            var btnDiv = $("<div>").addClass("button-div");
            var button = $("<button>")
                .attr({
                    type: "button",
                    id: "btn-assign"
                })
                .addClass("btn-green")
                .text("Assign");
            btnDiv.append(button);
            $(".container").append(
                header,
                errorDiv,
                instructions,
                dropdownContainer,
                btnDiv
            );
            $("#select-user, #select-asset").select2();

            $("#btn-assign").on("click", function(event) {
                var assetID = $("#select-asset").val();
                var userEmpID = $("#select-user").val();
                var assignJSON = JSON.stringify({
                    UserEmpID: userEmpID,
                    id: assetID
                });

                $.ajax({
                    type: "PUT",
                    url: "/api/asset/assign",
                    contentType: "application/json",
                    data: assignJSON
                }).then(function(returnedError) {
                    if (returnedError) {
                        errorDiv.html(
                            "<p>There was a problem assigning the asset. Please try again.</p>"
                        );
                    } else {
                        $(".dropdown-container").remove();
                        $(".button-div").remove();
                        $(".instructions").html(
                            "<p>The asset was assigned successfully!</p>"
                        );
                        var btnWarehouse = $("<button>")
                            .addClass("btn-warehouse btn-orange")
                            .text("Back");
                        $(".container").append(btnWarehouse);
                        $(".btn-warehouse").on("click", function(event) {
                            $(location).attr("href", "/warehouse/");
                        });
                    }
                });
            });
        });
    });
};

var createOneAsset = function() {
    $.get("/api/itemtypes", function(itemTypes) {
      var header = $("<div>")
      .addClass("sub-header")
      .text("Create Asset Record");
  var errorDiv = $("<div>").addClass("error-txt");

  var instructions = $("<div>")
      .addClass("instructions")
      .html(
          "<p>Enter the information for the new asset.</p>");

        var formContainer = $("<div>").addClass("form-container");
        var form = $("<form>");
        var labelSN = $("<label>")
            .attr("for", "serial-num")
            .text("Serial Number:");
        var inputSN = $("<input>")
            .attr({
                type: "text",
                id: "serial-num",
                placeholder: "Enter Serial Number"
            })
            .text("Serial Number");
        var labelDesc = $("<label>")
            .attr("for", "description")
            .text("Description:");
        var inputDesc = $("<input>").attr({
            type: "text",
            id: "description",
            placeholder: "Enter Asset Description"
        });
        var labelModel = $("<label>")
            .attr("for", "item-name")
            .text("Item Name:");
        var inputModel = $("<input>").attr({
            type: "text",
            id: "item-name",
            placeholder: "Enter Asset Model or Item Name"
        });
        var labelPurchDate = $("<label>")
            .attr("for", "purchase-date")
            .text("Purchase Date:");
        var inputPurchDate = $("<input>").attr({
            type: "text",
            id: "purchase-date",
            placeholder: "Enter Purchase Date using MM/DD/YYYY"
        });
        var labelDrop = $("<label>")
            .attr("for", "select-itemtype")
            .text("Item Type:");
        var userDrop = $("<div>").addClass("user-drop");
        var selectItemType = $("<select>").attr("id", "select-itemtype");
        itemTypes.forEach(item => {
            var options = $("<option>")
                .attr("value", item.id)
                .text(item.itemType);
            selectItemType.append(options);
        });
        userDrop.append(selectItemType);
        var btnDiv = $("<div>").addClass("button-div");
        var button = $("<button>")
            .attr({
                type: "button",
                id: "btn-create"
            })
            .addClass("btn-green")
            .text("Create Asset");
        btnDiv.append(button);
        form.append(
            labelSN,
            inputSN,
            labelDesc,
            inputDesc,
            labelModel,
            inputModel,
            labelPurchDate,
            inputPurchDate,
            labelDrop,
            userDrop
        );
        formContainer.append(form);
        $(".container").append(header, errorDiv, instructions, formContainer, btnDiv);
        $("#select-itemtype").select2();

        $("#btn-create").on("click", function(event) {
            var assetArray = []
            var asset = {};
            asset.serialNumber = $("#serial-num").val();
            asset.description = $("#description").val();
            asset.itemName = $("#item-name").val();
            asset.purchaseDate = $("#purchase-date").val();
            asset.ItemTypeID = $("#select-itemtype").val();
            asset.StatusID = 2;

            assetArray.push(asset);
            var data = JSON.stringify(assetArray);

            $.ajax({
                type: "POST",
                url: "/api/assets",
                contentType: "application/json",
                data: data
            }).then(function(result) {
              if (result[0].wasCreated) {
                $(".error-txt").html("")
                $(".instructions").html("<p>The asset was created successfully.</p>")
                $(".form-container, #btn-create").remove();
                var btnDiv = $("<div>").addClass("button-div");
                var button = $("<button>")
                    .attr({
                        type: "button",
                        id: "btn-return"
                    })
                    .addClass("btn-green")
                    .text("Back");
                $(btnDiv).append(button);
                $(".container").append(btnDiv);

                $("#btn-return").on("click", function(event) {
                  $(location).attr("href", "/warehouse");
                });
              } else {
                $(".error-txt").html("<p>This asset already exists or there was another form error!</p>");
              }
            });
        });
    });
};

var createBulk = function() {
    var header = $("<div>")
        .addClass("sub-header")
        .text("Bulk Create Assets");
    var errorDiv = $("<div>").addClass("error-txt");

    var instructions = $("<div>")
        .addClass("instructions")
        .html(
            "<p>The CSV file must have a header with the following columns headings matching the same letter case:</p><ul class='code'><li>serialNumber</li><li>itemName</li><li>purchaseDate</li></ul><p><span class='code'>purchaseDate</span> must be in the following format: <span class='code'>MM/DD/YYYY</span>.<p><span class='code'>itemName</span> should be the model name where possible</p>"
        );
    var dropCSV = $("<div>")
        .attr("id", "dropcsv")
        .text("Drop your CSV file here!");

    $(".container").append(header, errorDiv, instructions, dropCSV);

    // FileDrop and PapaParse section for importing CSV files
    var options = { input: false };
    var dropzone = new FileDrop("dropcsv", options);

    dropzone.event("send", function(files) {
        files.each(function(file) {
            file.readData(
                createJSONFromCSV,
                function(e) {
                    console.log("There was an error reading the file: " + e);
                },
                "text"
            );
        });
    });

    function createJSONFromCSV(str) {
        var config = {
            header: true
        };

        validCSVArray = [];

        var jsonObject = Papa.parse(str, config).data;
        jsonObject.forEach(line => {
            if (
                line.serialNumber != "" &&
                line.serialNumber &&
                line.purchaseDate &&
                line.itemName
            ) {
                line.StatusId = 2;
                line.purchaseDate = formatDate(line.purchaseDate);
                validCSVArray.push(line);
            }
        });
        if (validCSVArray.length < 1) {
            errorDiv.html(
                "<p>You have not submitted a correct CSV file. Check the header names and data.</p>"
            );
        }
        validCSVStr = JSON.stringify(validCSVArray);

        $.ajax({
            type: "POST",
            url: "/api/assets",
            contentType: "application/json",
            data: validCSVStr
        }).then(function(itemsReturned) {
            $(".container").empty();
            var header = $("<div>")
                .addClass("sub-header")
                .text("Bulk Create Assets");
            var instructions = $("<div>")
                .addClass("instructions")
                .html(
                    "<p>You have submitted the CSV file succesfully. Here are the results</p>"
                );
            var btnWarehouse = $("<button>")
                .addClass("btn-warehouse btn-orange")
                .text("Back");
            var table = $("<table>").addClass("bulk-results");
            var tblHeadSN = $("<th>").text("Serial Number");
            var tblHeadResult = $("<th>").text("Result");
            var tblHead = $("<tr>").append(tblHeadSN, tblHeadResult);
            table.append(tblHead);
            itemsReturned.forEach(item => {
                var tblRow = $("<tr>");
                var tblDataSN = $("<td>").text(item.serialNumber);
                if (item.wasCreated) {
                    var tblDataResult = $("<td>").text("Asset added!");
                } else {
                    var tblDataResult = $("<td>").text("Asset already exists!");
                }
                tblRow.append(tblDataSN, tblDataResult);
                table.append(tblRow);
            });
            $(".container").append(header, instructions, btnWarehouse, table);
            $(".btn-warehouse").on("click", function(event) {
                $(location).attr("href", "/warehouse/");
            });
        });
    }
};

const formatDate = function(dateStr) {
    return moment(dateStr, "MM/DD/YYYY", false).format();
};
