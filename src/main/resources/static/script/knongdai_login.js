
function setCookie(cname, cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + ( /*DAY*/1 * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	
	var domain =  getDomain();
	
	document.cookie = cname + "=" + cvalue + "; " + expires+ ";domain="+"localhost"+";path=/";     // localhost"; //;domain=knongdai.com  ;domain=120.136.24.174;"
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
	var domain =  getDomain(); 
	if(USER_HASH != ""){
		if( continueSite != ""){ 
			location.href = continueSite+"/auto-login?user-hash="+USER_HASH+"&continue-site="+continueSite;
		}else{ 
			location.href = "http://www."+domain; a
		}
	}
}

function deleteCookie() {
	var domain =  getDomain();
	document.cookie = "KD_USER_HASH=;expires=0;domain="+domain+";path=/";
}

function getDomain(){
	var domain =  window.location.hostname;
	
	if( domain.substr(domain.lastIndexOf('.'),4) == 'com'){
		domain = "knongdai.com";
	} else{
		domain = "khmeracademy.org";
	}
	
	return domain;
}