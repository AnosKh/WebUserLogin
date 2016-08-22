
function setCookie(cname, cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires+ ";domain=.khmeracademy.org;domain=localhost;";
	alert(expires);
}
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function isAnonymous() {
	var USER_ID = getCookie("KNONG_DAI_USER_ID");
	if (USER_ID != "") {
		location.href = window.location.origin+"/auto-login?user-id="+ USER_ID+"&continue-site="+window.location.href;
	}
}

function isAuthenticated(continueSite){
	var USER_ID = getCookie("KNONG_DAI_USER_ID");
	if( continueSite != ""){
		alert(USER_ID);
  	    location.href = continueSite+"/auto-login?user-id="+USER_ID+"&continue-site="+continueSite;
    }else{
    	location.href = "http://www.knongdai.com/";
    }
}