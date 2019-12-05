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
        updateOneAsset();
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
    assetDrop = createAssetDropdown();
    userDrop = createUserDropdown();
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
                createBackBtn();
            }
        });
    });
};

var createOneAsset = function() {
    var header = $("<div>")
        .addClass("sub-header")
        .text("Create Asset Record");
    var errorDiv = $("<div>").addClass("error-txt");
    var instructions = $("<div>")
        .addClass("instructions")
        .html("<p>Enter the information for the new asset.</p>");

    var formContainer = createAssetForm();
    var btnDiv = $("<div>").addClass("button-div");
    var button = $("<button>")
        .attr({
            type: "button",
            id: "btn-create"
        })
        .addClass("btn-green")
        .text("Create Asset");
    btnDiv.append(button);

    $(".container").append(
        header,
        errorDiv,
        instructions,
        formContainer,
        btnDiv
    );
    $("#select-itemtype").select2();

    $("#btn-create").on("click", function(event) {
        var assetArray = [];
        var asset = {};
        asset.serialNumber = $("#serial-num").val();
        asset.description = $("#description").val();
        asset.itemName = $("#item-name").val();
        asset.purchaseDate = $("#purchase-date").val();
        asset.ItemTypeId = $("#select-itemtype option:selected").val();
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
                $(".error-txt").html("");
                $(".instructions").html(
                    "<p>The asset was created successfully.</p>"
                );
                $(".form-container, #btn-create").remove();
                createBackBtn();
            } else {
                $(".error-txt").html(
                    "<p>This asset already exists or there was another form error!</p>"
                );
            }
        });
    });
};

var updateOneAsset = function() {
    var header = $("<div>")
        .addClass("sub-header")
        .text("Update an Asset");
    var errorDiv = $("<div>").addClass("error-txt");
    var instructions = $("<div>")
        .addClass("instructions")
        .html(
            "<p>Choose an asset to update and then fill in the fields that need to be udpated.</p>"
        );
    var assetDrop = createAssetDropdown();

    var btnSelectAsset = $("<button>")
        .addClass("btn-select btn-blue")
        .text("Select Asset");
    $(".container").append(
        header,
        errorDiv,
        instructions,
        assetDrop,
        btnSelectAsset
    );
    $("#select-asset").select2();

    $(".btn-select").on("click", function(event) {
        assetVal = $("#select-asset").val();
        console.log(assetVal);
        $(".asset-drop, .btn-select").remove();
        form = createAssetForm();
        $(".container").append(form);
        $.get("/api/asset/" + assetVal, function(asset) {
            $("#serial-num").val(asset.serialNumber);
            $("#description").val(asset.description);
            $("#item-name").val(asset.itemName);
            $("#purchase-date").val(
                moment(asset.purchaseDate).format("MM/DD/YYYY")
            );
            var itemTypeVal = 0;
            if (asset.ItemTypeId) {
                itemTypeVal = asset.ItemTypeId;
            } else {
                $("#label-drop")
                    .text("Item Type (has not been selected)")
                    .addClass("error-txt");
            }
            $("#select-itemtype")
                .select2()
                .select2("val", itemTypeVal.toString());
            var btnUpdate = $("<button>")
                .addClass("btn-update btn-green")
                .text("Update Asset");
            $(".container").append(btnUpdate);
            $(".btn-update").on("click", function(event) {
                var updateAssetArray = [];
                updateAssetArray.push({ assetID: assetVal });
                var updateAssetObj = {};
                updateAssetObj.serialNumber = $("#serial-num").val();
                updateAssetObj.description = $("#description").val();
                updateAssetObj.itemName = $("#item-name").val();
                updateAssetObj.purchaseDate = formatDate(
                    $("#purchase-date").val()
                );
                updateAssetObj.ItemTypeId = $(
                    "#select-itemtype option:selected"
                ).val();
                updateAssetArray.push(updateAssetObj);
                var assetStr = JSON.stringify(updateAssetArray);
                    console.log(assetStr)
                $.ajax({
                    type: "PUT",
                    url: "/api/assets",
                    contentType: "application/json",
                    data: assetStr
                }).then(function(returnedError) {
                    if (returnedError) {
                        errorDiv.html(
                            "<p>There was a problem updating the asset. Please try again.</p>"
                        );
                    } else {
                        $("form, .btn-update").remove();
                        $(".instructions").html(
                            "<p>The asset was updated successfully!</p>"
                        );
                        createBackBtn();
                    }
                });
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
            $(".container").append(header, instructions);
            createBackBtn();
            $(".container").append(table);
        });
    }
};

const formatDate = function(dateStr) {
    return moment(dateStr, "MM/DD/YYYY", false).format();
};

const createAssetForm = function() {
    var assetForm;
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
        .attr({
            for: "select-itemtype",
            id: "label-drop"
        })
        .text("Item Type:");
    var userDrop = $("<div>").addClass("user-drop");
    var selectItemType = $("<select>").attr("id", "select-itemtype");
    $.get("/api/itemtypes", function(itemTypes) {
        itemTypes.forEach(item => {
            var options = $("<option>")
                .attr("value", item.id)
                .text(item.itemType);
            selectItemType.append(options);
        });
    });
    userDrop.append(selectItemType);

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
    assetForm = formContainer;

    return assetForm;
};

const createUserDropdown = function() {
    var userDropdown;
    var userDrop = $("<div>")
        .addClass("user-drop")
        .html("<h3>User</h3>");
    var selectUser = $("<select>").attr("id", "select-user");
    $.get("/api/users/", function(users) {
        users.forEach(user => {
            var option = $("<option>")
                .attr("value", user.empID)
                .text(user.firstName + " " + user.lastName);
            selectUser.append(option);
        });
    });

    userDrop.append(selectUser);
    userDropdown = userDrop;
    return userDropdown;
};

const createAssetDropdown = function() {
    var assetDropdown;
    var assetDrop = $("<div>")
        .addClass("asset-drop")
        .html("<h3>Asset</h3>");
    var selectAsset = $("<select>").attr("id", "select-asset");
    $.get("/api/assets/", function(assets) {
        assets.forEach(asset => {
            var option = $("<option>")
                .attr("value", asset.id)
                .text(asset.serialNumber);
            selectAsset.append(option);
        });
    });
    assetDrop.append(selectAsset);
    assetDropdown = assetDrop;
    return assetDropdown;
};

const createBackBtn = function() {
    var btnWarehouse = $("<button>")
        .addClass("btn-warehouse btn-orange")
        .text("Back");
    $(".container").append(btnWarehouse);
    $(".btn-warehouse").on("click", function(event) {
        $(location).attr("href", "/warehouse/");
    });
};
