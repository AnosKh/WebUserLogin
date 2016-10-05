/**
 * angular get, add, delete, update user
 */

var app = angular.module('myApp', []);


// TODO: VIEW USER FRONT END
app.controller('registerCtrl', function($scope, $http, $rootScope) {
	
	$scope.register = function(){
		
		//get Universal Unique ID for new user
		$scope.verification_code = $scope.generateUUID();
	
		$http(
				{
					url : '/rest/user/insert-user-register',
					method : 'POST',
					data : {
					  "EMAIL": $scope.email,
					  "PASSWORD": $scope.password,
					  "USERNAME": $scope.username,
					  "GENDER": $scope.gender,
					  "VERIFICATION_CODE": $scope.verification_code				
					}
				}).then(function(respone) {

					  alert("Please go to your mailbox and click on confrimation link")
					  $scope.sendMail();
					  window.location.href = '/';
				
					
				});
	}
	
	
	// Check email exists or not to avoid duplicate email when register. Ean Sokchomrenr (05/10/2016)
	$scope.checkEmailExistsOrNot = function(){
		$http.get("/rest/user/is-email-exists/"+$scope.email).
		success(function(response){
			
			if(response.STATUS==true){
				alert("You’ve already registered with that email address. Sign in below.")
			}else{
				$scope.register();
			}
		}).error(function(response){
			alert("Sorry, your email is invalid")
		});
	}
	
	// ======= Generate Universal Unique ID
	$scope.generateUUID = function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
				.replace(/[xy]/g, function(c) {
					var r = (d + Math.random() * 16) % 16 | 0;
					d = Math.floor(d / 16);
					return (c == 'x' ? r : (r & 0x3 | 0x8))
							.toString(16);
				});
		return uuid;
	};
	// ======= End Generate UID
	
	// ======= Send email to verify
	// send user message to our mailbox by using our email
	// because we don't want to configure email of user anymore
	
	$scope.sendMail = function() {
		
		var kh_msg = "សូមស្វាគមន៍, \r\n"
				+ "គណនីរបស់អ្នកត្រូវបានបង្កើត⁣។ ដើម្បីដំនើរការ⁣ សូមចុចលើតំណរភ្អាប់ខាងក្រោម៖\r\n"
				+ "http://localhost:2016/welcome/confirm/"
				+ $scope.verification_code
				+ "\r\n"				
				+ "រីករាយក្នុងការប្រើប្រាស់សេវាកម្មរបស់យើងខ្ញំុ\r\n\r\n";

		var en_msg = "Welcome,\r\n"
				+ "Your account "
				+ $scope.email
				+ " has been created. To activate it, please confirm your email address: "
				+ "http://localhost:2016/welcome/confirm/"
				+ $scope.verification_code
				+ "\r\n" + "Have a great day.";
		var msg = kh_msg + en_msg;
		$http({
			url : 'rest/user/send-mail',
			method : 'POST',
			data : {

				"body" : msg,
				"subject" : "Knongdai - Email Confirmation",
				"to" : $scope.email // user send mail to
											// us

			}
		}).then(function(response) {
			//alert("Please login to your mailbox and click on confrimation link")
		});
		
	}
	// ======= End Send email to verify
	
})




function ValidateForm(inputText, inputText1)  
		{  
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
			if(inputText.value==""){
				myAlert("Warning! Email can not be empty!");
				frmLogin.email.focus(); 
			}
			else if(inputText1.value==""){
				myAlert("Warning! Password can not be empty!");
				frmLogin.password.focus(); 
			}
			else if(inputText.value.match(mailformat))  
			{  
				return true;  
			}  
			else if(!inputText.value.match(mailformat))  
			{  
				myAlert("Warning! You have entered an invalid email address!");
				frmLogin.email.focus();  
				return false; 
			}
		}  
 function myAlert(msg){
        	$('#alert-5').text(msg);
			$('.page-alerts').slideDown();
		        
		        //Is autoclosing alert
		       var delay = 3000;
		        var timeOut;
		        if(delay != undefined)
		        {
		            clearTimeout(timeOut);
		            timeOut = window.setTimeout(function() {
		            		$('.page-alerts').slideUp();
		                }, delay);
		        } 
        }
