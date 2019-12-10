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
    users();
  });
});

$(".sidebar-header").text("Manager");
$(".sidebar-header").on("click", function() {
  $(location).attr("href", "/manager");
});

var logoutDiv = $("<div>").addClass("logout btn-orange");
var logoutLink = $("<a>")
  .text("Logout")
  .attr({ href: "/logout", id: "logout-link" });
logoutDiv.append(logoutLink);
$(".sidebar").append(logoutDiv);

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
    }).then(function() {
      window.location.href = "/manager";
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

  var departmentForm = createForm("Department");
  var descriptionForm = createForm("Description");
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
    departmentForm,
    descriptionForm,
    btnDiv
  );

  $("#btn-create").on("click", function(event) {
    var department = $("#Department");
    var description = $("#Description");
    var newDepartment = {
      name: department.val().trim(),
      description: description.val().trim()
    };
    submitData(newDepartment, "departments");
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
  userDropdown = createDropdown("Users");
  dropdownContainer.append(userDropdown);

  var btnDiv = $("<div>").addClass("button-div");
  var button = $("<button>")
    .attr({
      type: "button",
      id: "btn-select"
    })
    .addClass("btn-green")
    .text("Change user department and role");
  btnDiv.append(button);
  $(".container").append(
    header,
    errorDiv,
    instructions,
    dropdownContainer,
    btnDiv
  );
  $("#btn-select").on("click", function(event) {
    var userSelected = $("#select-Users").val();
    $(".Users-drop, .btn-green").remove();
    departmentDropdown = createDropdown("Departments");
    roleDropdown = createDropdown("Roles");
    var btnUpdate = $("<button>")
      .addClass("btn-update btn-green")
      .text("Update user");
    $(".container").append(departmentDropdown, roleDropdown, btnUpdate);
    $("#select-Roles, #select-Departments").select2();
    $(".btn-update").on("click", function(event) {
      var updateUserObj = {};
      updateUserObj.RoleId = $("#select-Roles").val();
      updateUserObj.DepartmentId = $("#select-Departments").val();
      var userStr = JSON.stringify(updateUserObj);
      console.log(userStr);
      $.ajax({
        type: "PUT",
        url: "/api/user/" + userSelected,
        contentType: "application/json",
        data: userStr
      }).then(function() {
        window.location.href = "/manager";
      });
    });
  });
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
          break;
        case "Roles":
          optionText = item.roleName;
          dataID = item.id;
          console.log(dataID);
          break;
        case "Departments":
          optionText = item.name;
          dataID = item.id;
          console.log(dataID);
          break;
        case "Users":
          optionText = item.firstName + " " + item.lastName;
          dataID = item.empID;
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
  $.post("/api/" + dataType, post).then(function() {
    window.location.href = "/manager";
  });
};
