/**
 * angular get, add, delete, update user
 */

var app = angular.module('myApp', []);

app.controller('resetPasswordCtrl', function($scope,$http,$rootScope){
	// Check user exists or not
	$scope.checkUserExists = function(){
		var isCorrectLength = false;
		var isMatchPwd = false;
		if($scope.password != $scope.re_type_password){
			$("p#missmatch_msg").css("display", "block");
			isMatchPwd = false;
		}else{
			$("p#missmatch_msg").css("display", "none");
			isMatchPwd = true;
		}	
		if($("#password").val().length < 8){
			$("p#password_length").css("display", "block");		
			isCorrectLength = false;
		} else {
			$("p#password_length").css("display", "none");	
			isCorrectLength = true;
		}
		if(isMatchPwd == true && isCorrectLength == true){
				
			var id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
			
			$http(
					{
						url : '/rest/user/update-user-password',
						method : 'PUT',
						data : {
							"PASSWORD": $scope.password,
							"VERIFICATION_CODE": id
						}
					}).then(function(response) {
						alert("Your new password is updated successfully");	
						window.location.href = '/';
					}, function(error) {
						alert("Fail to update!");
					});		
			
		}else{
			alert("Sorry, your new password cannot be updated");
		}
		
		
	}
	
		

});
	