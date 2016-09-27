<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<ul id="admin_nav" class="nav nav-tabs">
<li role="presentation" class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
       회원관리<span class="caret"></span>
    </a>
    <ul id="member_mgmt" class="dropdown-menu">    	
    	<li><a id="list" href="#">목 록</a></li>
 		<li><a id="find_by" href="#">검 색</a></li>
 		<li><a id="count" href="#">학생수</a></li>
    </ul>
  </li>
  <li role="presentation" class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
      성적관리 <span class="caret"></span>
    </a>
    <ul id="grade_mgmt" class="dropdown-menu">
    	<li><a id="g_regist" href="#">등 록</a></li>
 		<li><a id="g_update" href="#">수 정</a></li>
 		<li><a id="g_list" href="#">목 록</a></li>
    </ul>
  </li>
  <li role="presentation" class="dropdown">
    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
      계좌관리 <span class="caret"></span>
    </a>
    <ul id="account_mgmt" class="dropdown-menu">
    	<li><a id="c_list" href="#">목 록</a></li>
 		<li><a id="c_find" href="#">검 색</a></li>
 		<li><a id="c_count" href="#">통장수</a></li>
    </ul>
</ul>
<script type="text/javascript">
   $(function(){
	   $('#list').click(function(){admin.member_list();});
   });
</script>