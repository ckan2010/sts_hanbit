<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<nav id="user_header" class="navbar navbar-inverse">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
    <a id="go_user_home">
 		<img id="header_brand" />
	  </a>
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
      	<li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">내 계좌 <span class="caret"></span></a>
          <ul id="account" class="dropdown-menu">
            <li><a >계좌 정보</a></li>
            <li><a id="account_open">계좌 생성</a></li>
            <li><a id="account_transaction">입출금</a></li>
            <li><a id="account_delete">계좌 해지</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">내 성적 <span class="caret"></span></a>
          <ul id="grade" class="dropdown-menu">
            <li><a>최근 성적표 보기</a></li>
            <li><a>지난 성적표 조회</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="과목명만 입력하세요">
        </div>
        <button type="submit" class="btn btn-default">점수조회</button>
      </form>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav navbar-right">
        <li style="text-align:right; margin-top:14px;color: white;">${user.name}님 환영합니다</li>
        <li><a id="logout"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span>로그아웃</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span>  <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a id="a_mypage">마이페이지</a></li>
            <li><a id="a_detail">내 정보 보기</a></li>
            <li><a id="a_update">내 정보 수정</a></li>
            <li><a id="a_delete">회 원 탈 퇴</a></li>
          </ul>
        </li>
      </ul>
    </div>
    </div>
  </div>
</nav>
<script type="text/javascript">
   $(function(){
	   $('#logout').click(function(){location.href=app.context()+'/member/logout';});
   });
</script>