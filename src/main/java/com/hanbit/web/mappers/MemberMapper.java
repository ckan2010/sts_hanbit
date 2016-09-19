package com.hanbit.web.mappers;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.hanbit.web.domains.Command;
import com.hanbit.web.domains.MemberDTO;
@Repository
public interface MemberMapper {
	public int insert(MemberDTO stu);
	public int update(MemberDTO stu);
	public int delete(String id);
	public List<MemberDTO> list();
	public MemberDTO findOne(Command command);
	public List<?> findByName(String name);
	public int count();
	public boolean login(MemberDTO param);
	public int findByGender(String gender);
	public int findId(String id);
	public int findPw(MemberDTO mem);
	public boolean existId(String id);
}
