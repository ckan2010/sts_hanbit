<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="context" value="<%=request.getContextPath()%>"/>
<c:set var="img" value="${context}/resources/img"/>
<c:set var="css" value="${context}/resources/css"/>
<c:set var="js" value="${context}/resources/js"/> 
<div class="box2" style='padding-top:0;width:90%'>
	<ul class="list-group">
	   	<li class="list-group-item">총학생수 : ${totCount}</li>
	</ul>
<div class="panel panel-primary">
  	<div class="panel-heading">학생 리스트</div>
<table id="member_list_table">
  <tr>
    <th>I D</th>
    <th>이   름</th>
    <th>등 록 일</th>
    <th>생 년 월 일</th>
    <th>이 메 일</th>
    <th>전 화 번 호</th>
    <th>성적</th>
  </tr>
  <tbody>
  <c:forEach items="${list}" var="member" >
  <tr>
  	<td>${member.id}</td>
  	<td><a class="name">${member.name}</a></td>
  	<td>${member.regDate}</td>
  	<td>${member.birth}</td>
  	<td>${member.email}</td>
  	<td>${member.phone}</td>
  	<td><a class="regist">등록</a> / <a class="update">수정</a></td>
  	</tr>
  	</c:forEach>
  </tbody>
</table>	  
<nav aria-label="Page navigation">
  <ul class="pagination">
  <c:if test="${startPg - pgSize gt 0 }">
  	<li>
      <a href="${context}/member/list/${startPg-pgSize}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  </c:if>
  <c:forEach begin="${startPg}" end="${lastPg}" step="1" varStatus="i">
  	<c:choose>
  		<c:when test="${i.index == pgNum }">
  			<font color="red">${i.index}</font>	  				
  		</c:when>
  		<c:otherwise>
  			<a href="${context}/member/list/${i.index}">${i.index}</a>
  		</c:otherwise>
  	</c:choose>
  </c:forEach>
  <c:if test="${startPg + pgSize le totPg }">
  	<li>
  		<a href="${context}/member/list/${startPg-pgSize}" aria-label="Next">
  			<span aria-hidden="true">&raquo;</span>
  		</a>
  	</li>
  </c:if>
  </ul>
</nav>
<div align="center">
	<form action="${context}/member/search" method="post">
		<select name="keyField" id="">
			<option value="name" selected>이름</option>
			<option value="mem_id">ID</option>			
		</select>
		<input type="text" name="keyword">
		<input type="submit" name="검 색">
	</form>
</div>
</div>
</div>