package com.hanbit.web.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.hanbit.web.domains.Command;
import com.hanbit.web.domains.MemberDTO;
import com.hanbit.web.service.impl.MemberServiceImpl;

@Controller // has a 관계
@SessionAttributes({"user","context","js","css","img"})
@RequestMapping("/member")
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired MemberServiceImpl service;
	
	@Autowired Command command;
	@RequestMapping("/search/{option}/{keyword}")
	public MemberDTO find(@PathVariable("option") String option,
			@PathVariable("keyword")String keyword){
		logger.info("TO SERCH OPTION IS {}",option);
		logger.info("TO SERCH KEYWORD IS {}",keyword);
		command.setKeyword(keyword);
		command.setOption(option);
		return service.findOne(command);
	}
	@RequestMapping(value="/count/{condition}",method=RequestMethod.GET,consumes="application/json")
	public String count(@PathVariable String condition,
			Model model){
		logger.info("TO COUNT CONDITION IS {}",condition);
		int count = service.count();
		model.addAttribute("count", count);
		return "admin:member/detail.tiles";
	}
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public String login(@RequestParam("id") String id,
			@RequestParam("pw") String pw,
			@RequestParam("context")String context,
			Model model) {
		logger.info("GO TO {}","execute login");
		logger.info("TO LOGIN ID IS {}",id);
		logger.info("TO LOGIN PW IS {}",pw);
		logger.info("CONTXT IS {}",context);
		MemberDTO member = new MemberDTO();
		member.setId(id);
		member.setPw(pw);
		member = service.login(member);
		if (member.getId().equals("NONE")) {
			logger.info("Controller LOGIN {}","FAIL");
			return "public:member/login.tiles";
			
		}else{
			model.addAttribute("user", member);
			model.addAttribute("context", context);
			model.addAttribute("js", context+"/resources/js");
			model.addAttribute("css", context+"/resources/css");
			model.addAttribute("img", context+"/resources/img");
			return "user:user/content.tiles";
		}
		
	}
	@RequestMapping("/main")
	public String moveMain() {
		logger.info("GO TO {}","main");
		return "admin:member/content.tiles";
	}
	@RequestMapping("/regist")
	public String regist() {
		logger.info("GO TO {}","regist");
		return "public:member/regist.tiles";
	}
	@RequestMapping("/a_detail")
	public String moveDetail(@RequestParam("key")String key) {
		logger.info("GO TO {}","a_detail");
		logger.info("KEY IS {}",key);
		return "admin:member/a_detail.tiles";
	}
	@RequestMapping("/detail")
	public String moveDetail() {
		logger.info("GO TO {}","detail");
		return "user:member/detail.tiles";
	}
	@RequestMapping("/update")
	public String update() {
		logger.info("GO TO {}","update");
		return "user:member/update.tiles";
	}
	@RequestMapping("/delete")
	public String delete() {
		logger.info("GO TO {}","delete");
		return "user:member/delete.tiles";
	}
	@RequestMapping("/login")
	public String login() {
		logger.info("GO TO {}","login");
		return "public:member/login.tiles";
	}
	@RequestMapping("/logout")
	public String logout() {
		logger.info("GO TO {}","logout");
		return "admin:member/logout.tiles";
	}
	@RequestMapping("/list")
	public String list() {
		logger.info("GO TO {}","list");
		return "admin:member/list.tiles";
	}
	@RequestMapping("/find_by")
	public String find_by() {
		logger.info("GO TO {}","find_by");
		return "admin:member/find_by.tiles";
	}
	@RequestMapping("/count")
	public String count() {
		logger.info("GO TO {}","count");
		return "admin:member/count.tiles";
	}
	@RequestMapping("/content")
	public String moveUserContent() {
		logger.info("GO TO {}","content");
		return "user:user/content.tiles";
	}
	@RequestMapping("/kaup")
	public String moveKaup() {
		logger.info("GO TO {}","kaup");
		return "user:user/kaup.tiles";
	}
	@RequestMapping("/rock_sissor_paper")
	public String moveRockSissorPaper() {
		logger.info("GO TO {}","rock_sissor_paper");
		return "user:user/rock_sissor_paper.tiles";
	}
	@RequestMapping("/lotto")
	public String moveLotto() {
		logger.info("GO TO {}","lotto");
		return "user:user/lotto.tiles";
	}
}
