package com.knongdai.account.services;



import com.knongdai.account.entities.User;
import com.knongdai.account.entities.UserRegister;
import com.knongdai.account.entities.forms.UserLogin;



public interface UserService {
	
	User findUserByEmail(UserLogin userLogin);
	User findUserByUserId(String userid);
	User findUserByUserHash(String userHash);

	// Update User status when verifying email -- Writer: Ean Sokchomrern, Date: 15/09/2016
	public boolean updateUserVerifyEmail(String verification_code);	
	
	// Register new user - Ean Sokchomrern, 16/09/2016
	public boolean insertUserRegister(UserRegister user);
	
	// Check user exists or not. If so, return verification_code to reset password. Ean Sokchomrern (19/09/2016)
	public String getVerificationCodeByEmail(String email);
	
	// Update password by verification_code. Ean Sokchomrern (20/09/2016)
	public boolean updateUserPassword(UserRegister user);
}
