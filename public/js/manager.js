$(document).ready(function() {
  $(".departments").on("click", function(event) {
    $(".container").empty();
    departments();
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
  $(location).attr("href", "/manager");
});

var itemTypes = function() {
  var header = $("<div>")
    .addClass("sub-header")
    .text("Add a new item type");
  var errorDiv = $("<div>").addClass("error-txt");
  var instructions = $("<div>")
    .addClass("instructions")
    .html("<p>Enter the name of the item you wish to add</p>");

  var formContainer = createForm("itemTypes");
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
    formContainer,
    btnDiv
  );
  $("#btn-return").on("click", function(event) {
    var itemType = {itemType: $("#itemTypes").val()};
    var data = JSON.stringify(itemType);
    console.log(data)
    $.ajax({
      type: "POST",
      url: "/api/itemTypes",
      contentType: "application/json",
      data: data
    });
  });
};

var departments = function() {
    var header = $("<div>")
      .addClass("sub-header")
      .text("Add a new department");
    var errorDiv = $("<div>").addClass("error-txt");
    var instructions = $("<div>")
      .addClass("instructions")
      .html("<p>Enter the name and description of the department you wish to add</p>");
  
    var formContainer = createForm("Department");
    var formContainer2 = createForm("Description");
    var btnDiv = $("<div>").addClass("button-div");
    var button = $("<button>")
      .attr({
        type: "button",
        id: "btn-return"
      })
      .addClass("btn-green")
      .text("Add Department and Description");
    btnDiv.append(button);
    $(".container").append(
      header,
      errorDiv,
      instructions,
      formContainer,
      formContainer2,
      btnDiv
    );
    $("#btn-return").on("click", function(event) {
      var department = {department: $("#Department").val()};
      var data = JSON.stringify(department, description);
      console.log(data)
      $.ajax({
        type: "POST",
        url: "/api/departments",
        contentType: "application/json",
        data: data
      });
    });
  };

const formatDate = function(dateStr) {
  return moment(dateStr, "MM/DD/YYYY", false).format();
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

const createBackBtn = function() {
    var btnWarehouse = $("<button>")
        .addClass("btn-manager btn-orange")
        .text("Back");
    $(".container").append(btnWarehouse);
    $(".btn-manager").on("click", function(event) {
        $(location).attr("href", "/manager");
    });
};