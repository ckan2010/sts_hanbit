package com.hanbit.web.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hanbit.web.controllers.MemberController;
import com.hanbit.web.domains.Command;
import com.hanbit.web.domains.MemberDTO;
import com.hanbit.web.domains.Retval;
import com.hanbit.web.domains.SubjectDTO;
import com.hanbit.web.mappers.MemberMapper;
import com.hanbit.web.services.MemberService;
@Service
public class MemberServiceImpl implements MemberService{
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired private SqlSession sqlSession;
	@Autowired private MemberDTO member;
	@Autowired private SubjectDTO subject;
	@Autowired Command command;
	MemberServiceImpl() {
		
	}
	@Override
	public String open(MemberDTO stu) {
		return (sqlSession.getMapper(MemberMapper.class).insert(stu)==0)?"fail":"success";
	}
	@Override
	public MemberDTO show() {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		return member;
	}
	@Override
	public String update(MemberDTO stu) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		int cnt = mapper.update(stu);
		String msg="";
		if (cnt==0) {
			msg = "FALSE";
		} else {
			msg = "TRUE";
		}
		return msg;
	}
	@Override
	public String delete(String id) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		String msg = "";
		if(mapper.delete(id)!=0){
			msg = "TRUE";
		}else{
			msg = "FALSE";
		}
		return msg;
	}
	public Retval count() {		
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		Retval retval = mapper.count();
		if(retval==null){
			System.out.println("Retval 은 null");
		}else{
			System.out.println("Retval 은 null 아님");
		}
		return retval;
	}
	@Override
	public void logout(MemberDTO mem) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		if (member.getId().equals(mem.getId()) &&
			member.getPw().equals(mem.getPw())	
		   ) {
			member = null;
		} 
	}
	@Override
	public MemberDTO findOne(Command command) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		return mapper.findOne(command);
	}
	@Override
	public int genderCount(String gender) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		return 0;
	}
	@Override
	public int findId(String id) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		return 0;
	}
	@Override
	public int findPw(MemberDTO mem) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public MemberDTO login(MemberDTO member) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		logger.info("MemberService login ID = {}",member.getId());
		Command command = new Command();
		command.setKeyword(member.getId());
		command.setKeyField("mem_id");
		MemberDTO mem = this.findOne(command);
		if (member.getPw().equals(mem.getPw())) {
			logger.info("MemberService LOGIN IS {}","SUCCESS");
			return mem;
		}
		mem.setId("NONE");
		logger.info("MemberService LOGIN IS {}","FAIL");
		return mem;
	}
	@Override
	public int existId(String id) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		logger.info("MemberService existId = {}",id);
		return mapper.existId(id);
	}
	@Override
	public List<MemberDTO> list(Command command) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		return mapper.list(command);
	}
	@Override
	public List<?> find(Command command) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		return mapper.find(command);
	}
}
