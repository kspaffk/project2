$(document).ready(function() {
  $(".departments").on("click", function(event) {
    $(".container").empty();
    departments();
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
      id: "btn-create"
    })
    .addClass("btn-green")
    .text("Add Item Type");
  btnDiv.append(button);
  $(".container").append(header, errorDiv, instructions, formContainer, btnDiv);
  $("#btn-create").on("click", function(event) {
    var itemType = { itemType: $("#itemTypes").val() };
    var data = JSON.stringify(itemType);

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
    .html(
      "<p>Enter the name and description of the department you wish to add</p>"
    );

  var formContainer = createForm("Department");
  var formContainer2 = createForm("Description");
  var btnDiv = $("<div>").addClass("button-div");
  var button = $("<button>")
    .attr({
      type: "button",
      id: "btn-create"
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

  $("#btn-create").on("click", function(event) {
    var department = $("#Department");
    var description = $("#Description");
    var newDepartment = {
      name: department.val().trim(),
      description: description.val().trim()
    };
    submitData(newDepartment, "departments").then(function() {
      $("input").val("");
    });
  });
};

var users = function() {
  var header = $("<div>")
    .addClass("sub-header")
    .text("Edit users");
  var errorDiv = $("<div>").addClass("error-txt");
  var instructions = $("<div>")
    .addClass("instructions")
    .html(
      "<p>Select the  department and role for the user you wish to change</p>"
    );
  var dropdownContainer = $("<div>").addClass("dropdown-container");
  departmentDropdown = createDropdown("Departments");
  rolesDropdown = createDropdown("Roles");
  dropdownContainer.append(departmentDropdown, rolesDropdown);
  
  var btnDiv = $("<div>").addClass("button-div");
  var button = $("<button>")
    .attr({
      type: "button",
      id: "btn-submit"
    })
    .addClass("btn-green")
    .text("Add Department and Description");
  btnDiv.append(button);
  $(".container").append(
    header,
    errorDiv,
    instructions,
    departmentDropdown,
    rolesDropdown,
    btnDiv
  );
  $("#btn-submit").on("click", function(event) {
    var department = $("#Department");
    var role = $("#Role");
    var changeUser = {
      department: department.val(),
      role: role.val()
    };
    submitData(changeUser, "users").then(function() {
      $("input").val("");
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
  var form = $("<form>").addClass("form");
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

const submitData = function(post, dataType) {
  $.post("/api/" + dataType, post);
};
