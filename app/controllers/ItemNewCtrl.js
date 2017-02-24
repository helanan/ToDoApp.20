"use strict";

app.controller("ItemNewCtrl", function($scope, ItemStorage, $location, AuthFactory){

let user = AuthFactory.getUser();

$scope.title = "New ToDo";
$scope.btnText = "Submit";

$scope.newTask = {
  assignedTo: "",
  dependencies: "",
  dueDate: "",
  isCompleted: "",
  location: "",
  task: "",
  urgency: "",
  uid: user
};



$scope.addNewItem = function() {
  console.log("add new item");
  ItemStorage.postNewItem($scope.newTask)
  .then(function(response) {
    $location.url("/items/list");
  });
  $scope.newTask = {};
  };

});
