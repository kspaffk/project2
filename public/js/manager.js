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

  var formContainer = createForm("itemTypes");
  var dropdown = createDropdown("itemTypes");
  var btnDiv = $("<div>").addClass("button-div");
  var button = $("<button>")
    .attr({
      type: "button",
      id: "btn-return"
    })
    .addClass("btn-green")
    .text("Add Item Type");
  btnDiv.append(button);
  $(".container").append(
    header,
    errorDiv,
    instructions,
    dropdown,
    formContainer,
    btnDiv
  );
  $("#btn-return").on("click", function(event) {
    var itemTypeArray = [];
    var itemType = {};
    itemType.itemType = $("#itemType").val();
    itemTypeArray.push(itemType);
    var data = JSON.stringify(itemTypeArray);
    $.ajax({
      type: "POST",
      url: "/api/itemTypes",
      contentType: "application/json",
      data: data
    }).then(function(result) {
      if (result[0].wasCreated) {
        $(".error-txt").html("");
        $(".instructions").html(
          "<p>The item type was created successfully.</p>"
        );
        $(".form-container, #btn-create").remove();
        createBackBtn();
      } else {
        $(".error-txt").html(
          "<p>This item type already exists or there was another form error!</p>"
        );
      }
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
  console.log(dataType);
  var header = "<h3>" + dataType + "</h3>";
  var drop = $("<div>")
    .addClass(dataType + "-drop")
    .html(header);
  var select = $("<select>").attr("id", "select-" + dataType);
  $.get("/api/" + dataType, function(data) {
    console.log(data);
    data.forEach(item => {
      var optionText;
      switch (dataType) {
        case "itemTypes":
          optionText = item.itemType;
          dataID = item.id;
          console.log(dataID);
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
  var input = $("<label>")
    .attr("for", dataType)
    .text(dataType);
  var inputType = $("<input>")
    .attr({
      type: "text",
      id: dataType,
      placeholder: "Enter New " + dataType
    })
    .text(dataType);
  form.append(input, inputType);
  formContainer.append(form);
  dataForm = formContainer;

  return dataForm;
};
