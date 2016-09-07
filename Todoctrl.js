var appX = angular.module('todoapp', []);

appX.controller('TodoController', function($scope) {

	$scope.items=[];

	var itemData = localStorage['Item_List'];

	if (itemData != undefined) {
		$scope.items = JSON.parse(itemData);
	}


	$scope.searchEnter=function() {
		if(event.which==13 && $scope.item != ""){
				$scope.addItem();
		}
	};

	$scope.addItem = function() {
		$scope.items.push({'itemName':$scope.item, completed: false});
		$scope.item = "";
		localStorage['Item_List'] = JSON.stringify($scope.items);
	};

	$scope.contentEdit = function(x){
		/*console.log($scope.items);
		console.log($scope.items.itemName.indexOf(x));*/
		event.target.contentEditable = event.target.contentEditable == "false" ? "true" : "false";
		localStorage['Item_List'] = JSON.stringify($scope.items);

	};

	$scope.enterAgain = function(msg) {
		if(event.which==13 && msg!= ""){
				$scope.contentEdit(msg);
		}
	};


	$scope.statusCompleted = function(oneItem, completed) {

		if(angular.isDefined(completed)) {
			oneItem.completed = completed;
		}
		localStorage['Item_List'] = JSON.stringify($scope.items);
		
	};

	$scope.markAll = function(completed) {

		$scope.items.forEach(function(oneItem) {
			if (oneItem.completed !== completed) {
				$scope.statusCompleted(oneItem, completed);
			}
		});

	};


	$scope.removeItem = function(oneItem) {

		$scope.items.splice($scope.items.indexOf(oneItem), 1);
		localStorage['Item_List'] = JSON.stringify($scope.items);

	};

	$scope.clearCompletedItems = function() {

		var originalItems = $scope.items.slice(0);
		var incompleteItems = [];
		var completeItems = [];

		$scope.items.forEach(function (oneItem){
			if (oneItem.completed) {
				completeItems.push(oneItem);
			} else {
				incompleteItems.push(oneItem);
			}
		});
			
		$scope.items = incompleteItems;	
	};

	
});


