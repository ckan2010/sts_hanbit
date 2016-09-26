package com.hanbit.web.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import com.hanbit.web.domains.Command;
import com.hanbit.web.domains.MemberDTO;
import com.hanbit.web.domains.Retval;
import com.hanbit.web.service.impl.MemberServiceImpl;

@Controller // has a 관계
@SessionAttributes({"user","context","js","css","img"})
@RequestMapping("/member")
public class MemberController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	public static int PG_SIZE = 5;
	@Autowired MemberServiceImpl service;
	@Autowired MemberDTO member;
	@Autowired Command command;
	@Autowired Retval retval;
	@RequestMapping("/search/{option}/{keyword}")
	public @ResponseBody MemberDTO find(@PathVariable("option") String option,
			@PathVariable("keyword")String keyword,HttpSession session){
		logger.info("TO SERCH OPTION IS {}",option);
		logger.info("TO SERCH KEYWORD IS {}",keyword);
		if(keyword.equals("-zzzzzzz")){
			return (MemberDTO) session.getAttribute("user");
		}
		command.setKeyword(keyword);
		command.setOption(option);
		return service.findOne(command);
	}
	@RequestMapping(value="/count/{option}",consumes="application/json")
	public Model count(@PathVariable("option") String option,
			Model model){
		logger.info("TO COUNT OPTION IS {}",option);
		model.addAttribute("count", service.count());
		return model;
	}
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public @ResponseBody MemberDTO login(@RequestParam("id") String id,
			@RequestParam("pw") String pw,
			HttpSession session) {
		logger.info("TO LOGIN ID IS {}",id);
		logger.info("TO LOGIN PW IS {}",pw);
		member.setId(id);
		member.setPw(pw);
		MemberDTO user = service.login(member);
		if (user.getId().equals("NONE")) {
			logger.info("Controller LOGIN {}","FAIL");
			return user;
		}else{
			logger.info("Controller LOGIN {}","SUCCESS");
			session.setAttribute("user",user);
			return user;
		}
		
	}
	@RequestMapping("/logined/header")
	public String loginedHeader(){
		logger.info("TO COUNT CONDITION IS : {}","LOGINED_HEADER");
		return "user/header.jsp";
	}
	@RequestMapping("/main")
	public String moveMain() {
		logger.info("GO TO {}","main");
		return "admin:member/content.tiles";
	}
	@RequestMapping(value="/signup",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody  Retval singup(@RequestBody MemberDTO param) {		
		logger.info("SIGN UP {}","EXEUTE");
		logger.info("SIGN UP ID = {}",param.getId());
		logger.info("SIGN UP PW = {}",param.getPw());
		logger.info("SIGN UP SSN = {}",param.getSsn());
		logger.info("SIGN UP EMAIL = {}",param.getEmail());
		logger.info("SIGN UP PHONE = {}",param.getPhone());
		retval.setMessage(service.open(param));
		//retval.setMessage("success");
		logger.info("Message = {}",retval.getMessage());
		return retval;
	}
	@RequestMapping("/check_dup/{id}")
	public @ResponseBody  Retval check_dup(@PathVariable String id) {
		logger.info("CHECK DUP {}","EXEUTE");
		if (service.existId(id) == 1) {
			retval.setFlag("TRUE");
			retval.setMessage("존재하는 ID입니다.");
		} else {
			retval.setFlag("FALSE");
			retval.setMessage("사용가능 ID입니다.");
			retval.setTemp(id);
		}
		logger.info("RETURN VALUE IS {}",retval.getFlag());
		logger.info("RETURN VALUE IS {}",retval.getMessage());
		return retval;
	}
	@RequestMapping("/a_detail")
	public String moveDetail(@RequestParam("key")String key) {
		logger.info("GO TO {}","a_detail");
		logger.info("KEY IS {}",key);
		return "admin:member/a_detail.tiles";
	}
	@RequestMapping("/detail")
	public @ResponseBody  MemberDTO moveDetail(HttpSession session) {
		logger.info("GO TO {}","detail");
		return (MemberDTO) session.getAttribute("user");
	}
	@RequestMapping(value="/update",method=RequestMethod.POST,consumes="application/json")
	public @ResponseBody  Retval update(@RequestBody MemberDTO param,HttpSession session) {
		logger.info("MEMBER UPDATE {}","EXEUTE");
		logger.info("MEMBER UPDATE ID = {}",param.getId());
		logger.info("MEMBER UPDATE PW = {}",param.getPw());		
		logger.info("MEMBER UPDATE EMAIL = {}",param.getEmail());
		logger.info("MEMBER UPDATE PHONE = {}",param.getPhone());
		MemberDTO temp = (MemberDTO) session.getAttribute("user");
		temp.setPw(param.getPw());
		temp.setEmail(param.getEmail());
		temp.setPhone(param.getPhone());
		retval.setFlag(service.update(temp));
		if(retval.getFlag()=="TRUE"){
			session.setAttribute("user",service.update(temp));
		}
		return retval;
	}
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	public @ResponseBody Retval delete(@RequestParam("pw") String pw,
			                           HttpSession session) {
		logger.info("GO TO {}","delete");
		logger.info("DELETE IS PW {}",pw);		
		MemberDTO user = (MemberDTO) session.getAttribute("user");	
		logger.info("MemberDTO IS PW {}",user.getPw());
		if (pw.equals(user.getPw())) {
			logger.info("PW 가 같으면");
			String msg = service.delete(user.getId());
			//retval.setFlag(service.delete(user.getId()));
			retval.setFlag(msg);
			
		} else {
			
			retval.setFlag("FALSE");
		}
		return retval;
	}
	@RequestMapping("/logout")
	public String logout(SessionStatus status) {
		logger.info("GO TO {}","LOGOUT");
		status.setComplete();
		logger.info("SESSION IS {}","CLEAR");
		return "redirect:/";
	}
	@RequestMapping("/list/{pgNum}")
	public String list(@PathVariable String strPagNum,
			           Model model) {
		logger.info("GO TO {}","list");
		List<MemberDTO> list = new ArrayList<MemberDTO>();
		int pgNum = Integer.parseInt(strPagNum);
		int totCount = service.count();
		int startRow = 0;
		int endRow = 0;
		int pgCount = totCount/PG_SIZE;
		if (totCount%PG_SIZE==0) {
			startRow = 0;
			endRow = 0;
		} else {
			startRow = 0;
			endRow = 0;
		}
		command.setStart(startRow);
		command.setEnd(endRow);
		model.addAttribute("list",service.list(command));
		return "admin:member/list.tiles";
	}
	@RequestMapping("/search")
	public String search(@RequestParam(value="pgNum") String strPgNum,
						 @RequestParam(value="keyword") String keyword,
						 @RequestParam(value="pgNum") String pgNum,
			           Model model) {
		logger.info("GO TO {}","Search");		
		List<MemberDTO> list = new ArrayList<MemberDTO>();
		//service.list();
		model.addAttribute("list",list);
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
