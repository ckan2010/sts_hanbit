package com.hanbit.web.service.impl;

import static org.junit.Assert.assertEquals;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.hanbit.web.mappers.MemberMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations="classpath:META-INF/*-context.xml")
@WebAppConfiguration
public class MemberServiceImplTest{
	@Autowired private SqlSession sqlSession;
    
	@Test
	public void testLogin() {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
	    //assertEquals(mapper.findById("haesu").getName(),"김혜수");
	}
	@Test
	public void testFindById() {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
	    //assertEquals(mapper.findById("haesu").getName(),"김혜수");
	}
}
