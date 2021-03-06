package com.hanbit.web.domains;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Component
@Data
public class GradeDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	@Getter @Setter private int gradeSeq,birth,examSeq,subjSeq,score; 
	@Getter @Setter private String grade,id,term,pw,name,regDate,gender,ssn,profileImg,role,email,phone,subjName;
}