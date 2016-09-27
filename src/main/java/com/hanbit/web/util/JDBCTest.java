package com.hanbit.web.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.hanbit.web.contants.Values;

import java.sql.Statement;

/**
 * @date   :2016. 6. 30.
 * @author :ckan
 * @file   :JDBCTest.java 
 * @story  :
 */
public class JDBCTest {
	public static void main(String[] args) {
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = "select * from member where mem_id = 'haesu' ",result="";
		List<String> list = new ArrayList<String>();
		try {
			Class.forName(Values.ORACLE_DRIVER);
			con = DriverManager.getConnection(Values.ORACLE_URL,Values.USER_ID,Values.USER_PW);
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			/*sql = "select * from test"; 
			rs = stmt.executeQuery(sql);*/ 
			while (rs.next()) {
				result = "id : "+rs.getString("MEM_ID")+" pw : "+rs.getString("pw");
				list.add(result);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
		System.out.println(list);
	}
}
