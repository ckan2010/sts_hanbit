package com.hanbit.web.member;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.hanbit.web.subject.SubjectMemberVO;

@Controller // has a 관계
@SessionAttributes({"user","context","js","css","img"})
@RequestMapping("/member")
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired MemberServiceImpl service;
	
	@RequestMapping("/search")
	public String find(@RequestParam("keyword") String keyword,
			@RequestParam("search_option")String option,
			@RequestParam("context")String context,
			Model model){
		logger.info("GO TO {}","search");
		logger.info("KEYWORD IS {}",keyword);
		logger.info("OPTION IS {}",option);
		logger.info("CONTEXT IS {}",context);
		MemberVO member = (MemberVO) service.findById(keyword);
		logger.info("NAME IS {}",member.getName());
		model.addAttribute("member", member);
		model.addAttribute("img", context+"/resources/img");
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
		MemberVO member = new MemberVO();
		member.setId(id);
		member.setPw(pw);
		SubjectMemberVO sm = service.login(member);
		model.addAttribute("user", sm);
		model.addAttribute("context", context);
		model.addAttribute("js", context+"/resources/js");
		model.addAttribute("css", context+"/resources/css");
		model.addAttribute("img", context+"/resources/img");
		return "user:user/content.tiles";
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
	@RequestMapping("/detail")
	public String detail() {
		logger.info("GO TO {}","detail");
		return "admin:member/detail.tiles";
	}
	@RequestMapping("/update")
	public String update() {
		logger.info("GO TO {}","update");
		return "admin:member/update.tiles";
	}
	@RequestMapping("/delete")
	public String delete() {
		logger.info("GO TO {}","delete");
		return "admin:member/delete.tiles";
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
}
