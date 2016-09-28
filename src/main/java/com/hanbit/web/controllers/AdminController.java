package com.hanbit.web.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller // has a 관계 
@RequestMapping("/admin")
public class AdminController {
	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	@RequestMapping("/main")
	public String goMain(){
		logger.info("AdminController ! goMain()");
		return "admin:admin/content.tiles";
	}
	@RequestMapping("/header")
	public String loginedHeader(){
		return "admin/header.jsp";
	}
	@RequestMapping("/nav")
	public String nav(){
		return "admin/nav.jsp";
	}
}
