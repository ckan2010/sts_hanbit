/**
 * 
 */
package com.hanbit.web.services;

import java.util.List;

import com.hanbit.web.domains.Command;
import com.hanbit.web.domains.MemberDTO;
import com.hanbit.web.domains.Retval;

/**
 * @date   :2016. 6. 17.
 * @author :ckan
 * @file   :StudentService.java
 * @story  :
 */
public interface MemberService{
	public String open(MemberDTO stu);
	public MemberDTO show();
	public String update(MemberDTO stu);
	public String delete(String id);
	public MemberDTO findOne(Command command);
	public int genderCount(String gender);
	public MemberDTO login(MemberDTO member);
	public int findId(String id);
	public int findPw(MemberDTO mem);
	public void logout(MemberDTO mem);
	public int existId(String id);
	public List<MemberDTO> list(Command command);
	public List<?> find(Command command);
	public Retval count();
}
