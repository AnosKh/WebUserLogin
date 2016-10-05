/**
 * angular get, add, delete, update user
 */

var app = angular.module('myApp', []);

app.controller('confirmEmailCtrl', function($scope,$http,$rootScope){
	$scope.confirmEmail = function() {
		var id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
		//alert(id);
		$http.put("/rest/user/updateUserVerifyEmail/"+id).
		success(function(response){
			//console.log(response);
		});
	}
	
	$scope.confirmEmail();
	
	
});
	