
function setCookie(cname, cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires+ ";domain=knongdai.com";     // localhost"; //;domain=knongdai.com  ;domain=120.136.24.174;"
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

function isAnonymous(continueSite) {
	var USER_HASH = getCookie("KD_USER_HASH");
	if (USER_HASH != "") {
		location.href = continueSite+"/auto-login?user-hash="+ USER_HASH+"&continue-site="+continueSite;
	}
}

function isAuthenticated(continueSite){
	var USER_HASH = getCookie("KD_USER_HASH");
	if(USER_HASH != ""){
		if( continueSite != ""){
			location.href = continueSite+"/auto-login?user-hash="+USER_HASH+"&continue-site="+continueSite;
		}else{
			location.href = "http://www.knongdai.com/";
		}
	}
}
