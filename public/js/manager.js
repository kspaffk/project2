$(document).ready(function() {
  $(".department").on("click", function(event) {
    $(".container").empty();
  });
  $(".roles").on("click", function(event) {
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
    .html("<p>A count of all item types</p>");
  var dropdown = createDropdown("itemTypes");
  var btnDiv = $("<div>").addClass("button-div");
  var button = $("<button>")
    .attr({
      type: "button",
      id: "btn-return"
    })
    .addClass("btn-green")
    .text("Return Asset");
  btnDiv.append(button);
  $(".container").append(header, errorDiv, instructions, dropdown, btnDiv);
  $("#btn-return").on("click", function(event) {
      var itemTypeID = $("#select-itemTypes").val();
    $.ajax({
      type: "POST",
      url: "/api/itemTypes",
      contentType: "application/json",
      data: itemTypes
    }).then(function(itemTypesChanged) {
      $(".instructions").html(
        "<p>You have succesfully edited this item type</p>"
      );
    });
  });
};

const formatDate = function(dateStr) {
  return moment(dateStr, "MM/DD/YYYY", false).format();
};

const createItemTypeTable = function(itemtypes) {
  var itemTable;
  var row = $("<tr>");
  $.get("/api/itemtypes", function(itemTypes) {
    itemTypes.forEach(element => {
      var tdID = $("<td>").text(itemTypes.id);
      var tdItemType = $("<td>").text(itemTypes.itemType);
      row.append(tdID, tdItemType);
      $(".item-types").append(row);
    });
  });
  itemTable = row;
  return itemTable;
};

const createDropdown = function(dataType) {
  var dropdown;
  console.log(dataType)
  var header = "<h3>" + dataType + "</h3>";
  var drop = $("<div>")
    .addClass(dataType + "-drop")
    .html(header);
  var select = $("<select>").attr("id", "select-" + dataType);
  $.get("/api/" + dataType, function(data) {
      console.log(data)
    data.forEach(item => {
      var optionText;
      switch (dataType) {
        case "itemTypes":
          optionText = item.itemType;
          dataID = item.id;
          console.log(dataID)
          break;
        case "roles":
          optionText = item.roleName;
          dataID = item.description;
          break;
        case "departments":
          optionText = item.name;
          dataID = item.description;
          break;
        case "users":
          optionText = item.firstName + " " + item.lastName;
          dataID = empID;
          break;
      }
      var option = $("<option>")
        .attr("value", dataID)
        .text(optionText);
      select.append(option);
    });
  });
  drop.append(select);
  dropdown = drop;
  return dropdown;
};

const createForm = function(dataType) {
    var dataForm;
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
