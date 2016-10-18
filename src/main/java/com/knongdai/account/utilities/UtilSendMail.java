package com.knongdai.account.utilities;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.knongdai.account.entities.SendMail;

public class UtilSendMail {

	public boolean sendEmailToUser(SendMail sendMail){
		final String username = "sendonly@khmeracademy.org";
		final String password = "qwe123";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", "mail.khmeracademy.org");
		
		Session session = Session.getInstance(props,new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		try {
			Message message = new MimeMessage(session);
			//FROM
			message.setFrom(new InternetAddress("knongdai.noreply@khmeracademy.org"));
			// TO
			message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(sendMail.getTo()));
			// SUBJECT
			message.setSubject(sendMail.getSubject());
			// MESSAGE
			message.setContent(sendMail.getBody(), "text/html; charset=utf-8");
			
			Transport.send(message);
			
		} catch (MessagingException e) {
			return false;
		}
		return true;
	}
	
	
}