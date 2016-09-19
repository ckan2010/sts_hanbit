/**
 * 
 */
package com.hanbit.web.services;

import com.hanbit.web.domains.Command;
import com.hanbit.web.domains.MemberDTO;
import com.hanbit.web.util.CommonService;

/**
 * @date   :2016. 6. 17.
 * @author :ckan
 * @file   :StudentService.java
 * @story  :
 */
public interface MemberService extends CommonService{
	public String open(MemberDTO stu);
	public MemberDTO show();
	public void update(MemberDTO stu);
	public String delete(String id);
	public MemberDTO findOne(Command command);
	public int genderCount(String gender);
	public MemberDTO login(MemberDTO member);
	public int findId(String id);
	public int findPw(MemberDTO mem);
	public void logout(MemberDTO mem);
}
