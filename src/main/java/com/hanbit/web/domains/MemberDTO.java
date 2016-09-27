/**
 * 
 */
package com.hanbit.web.domains;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.hanbit.web.contants.Values;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
/**
 * @date   :2016. 6. 17.
 * @author :ckan
 * @file   :Studente1.java
 * @story  :
 */
@Component
@ToString
@Data
public class MemberDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	@Getter @Setter private String id,pw,name,regDate,gender,ssn,profileImg,role,email,phone;
	@Getter @Setter private int    majorSeq,birth;
}