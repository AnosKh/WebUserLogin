/**
 * angular get, add, delete, update user
 */

var app = angular.module('myApp', []);

app.controller('forgetPasswordCtrl', function($scope,$http,$rootScope){
	// Check user exists or not
	$scope.checkUserExists = function(){
		$http.get("/rest/user/get-verification-code-by-email/"+$scope.email).
		success(function(response){
			if(response.STATUS==false){
				
				ValidateForm(frmLogin.email);
				
			}else{
				$scope.verification_code = response.DATA;
				$scope.sendMail();
			}
		}).error(function(response){
			console.log(response);
			alert("We couldn’t find this email address.");
			
		});
	}
	
		
$scope.sendMail = function() {
		//show loading image
		$("#myLoading").show();
		var kh_msg = "សូមស្វាគមន៍\r\n"
				+ "ដើម្បីផ្លាស់ប្តូរលេខសំងាត់​ សូមចុចតំណភ្អាប់ខាងក្រោម\r\n"
				+ "http://login.knongdai.com/password/reset/"
				+ $scope.verification_code
				+ "\r\n"				
				+ "រីករាយក្នុងការប្រើប្រាស់សេវាកម្មរបស់យើងខ្ញំុ\r\n\r\n";

		var en_msg = "Welcome,\r\n"
				+ "To reset your password, please click on the link below "				
				+ "http://login.knongdai.com/password/reset/"
				+ $scope.verification_code
				+ "\r\n" + "Have a great day.";
		var msg = kh_msg + en_msg;
		$http({
			url : 'rest/user/send-mail',
			method : 'POST',
			data : {

				"body" : msg,
				"subject" : "Knongdai - Reset your password",
				"to" : $scope.email // user send mail to
											// us

			}
		}).then(function(response) {
			$("#myLoading").hide();
			alert("Please login to your mailbox and click on confrimation link");			
		});
		
	}
});

function ValidateForm(email)  
{  
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
	if(email.value==""){
		myAlert("Warning! Email can not be empty!");
		frmLogin.email.focus(); 
	}else if(!email.value.match(mailformat))  {  
		myAlert("Warning! You have entered an invalid email address!");
		frmLogin.email.focus();  
	}else{
		myAlert("We couldn’t find this email address.");
		
	}
}  
function myAlert(msg){
		$('#alert-5').addClass("alert alert-warning page-alert");
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

	