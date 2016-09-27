package com.hanbit.web.domains;

import java.io.Serializable;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;
@Component
public class Command implements Serializable{
	private static final long serialVersionUID = 1L;
	@Getter @Setter private String keyword,keyField;
	@Getter @Setter private int start,end;
}
