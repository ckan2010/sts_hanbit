package com.hanbit.web.controllers;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		logger.info("SERVER START TIME IS {}", formattedDate);
		return "user/header.jsp";
		// return "public:public/content.tiles";
		//return "public:public/school_info.tiles";
	}
	@RequestMapping("public/school_info")
	public String school_info(){
		return "public:public/school_info.tiles";
	}
	@RequestMapping("public/free_board")
	public String freeBoard(){
		return "public:public/free_board.tiles";
	}
	@RequestMapping("public/contact")
	public String contact(){
		return "public:public/contact.tiles";
	}
}
