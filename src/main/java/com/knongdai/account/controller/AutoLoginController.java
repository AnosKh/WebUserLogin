package com.knongdai.account.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.knongdai.account.entities.User;
import com.knongdai.account.services.UserService;

@Controller
public class AutoLoginController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/auto-login" , method= RequestMethod.GET)
	public String autoLogin(@RequestParam("user-hash") String userId , @RequestParam(name="continue-site", required=false , defaultValue="http://www.knongdai.com") String continueSite) {

		User user = userService.findUserByUserId(userId);

		System.out.println("Username : " + user.getUsername());
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());

		SecurityContext context = new SecurityContextImpl();
		context.setAuthentication(authentication);

		SecurityContextHolder.setContext(context);

		return "redirect:"+continueSite;

	}
	
	/*@RequestMapping(value = "/isLogin", method = RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> isUserLogin(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		Cookie[] cookies = request.getCookies();
		String userId = null;
		for(Cookie cookie : cookies){
		    if("KNONG_DAI_USER_ID".equals(cookie.getName())){
		    	userId = cookie.getValue();
		    	map.put("USER_ID", userId);
		    	map.put("STATUS", true);
		    	break;
		    }
		}
		return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
	}*/
	
	
	
	
	


}