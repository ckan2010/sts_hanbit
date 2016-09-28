/*
========= META_GROUP ====
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-9-8
@UPDATE DATE : 2016-9-9
@DESC : 메타데이터
==============================
*/	
var app = (function(){
	var init = function(context) {
		session.init(context);
		onCreate();
		member.init();
		user.init();
		grade.init();
		nav.init();
		admin.init();
	};
	var context = function(){return session.getContextPath();};
	var js = function(){return session.getJavascriptPath('js');};
	var css = function(){return session.getCssPath('css');};
	var img = function(){return session.getImagePath('img');};
	var setContentView = function(){
		$('#header_brand').attr('src',app.img()+'/default/gof.JPG').css('height','60px').css('width','100px').css('padding-bottom','20px');
		$('#footer').addClass('bottom').addClass('footer');
		$('#global_content').addClass('box');
		$('#global_content a').addClass('cursor');
		$('#global_content_a_regist').text('SIGN UP').click(function(){member.pub_sign_up_form();});
		$('#global_content_a_login').text('LOG IN').click(function(){member.pub_login_form();});
		$('#global_content_a_admin').text('ADMIN MODE').click(function(){admin.check();});
	};
	var onCreate = function(){
		setContentView();
		$('#free_board_table .name').click(function(){controller.moveWithKey('member','a_detail','hong');});
		$('#free_board_table .regist').click(function(){controller.moveWithKey('grade','regist','hong');});
		$('#free_board_table .update').click(function(){controller.moveWithKey('grade','update','hong');});
		$('#go_public_home').click(function(){controller.home()});
		$('#a_school').click(function(){controller.move('public','school_info');});
		$('#contact').click(function(){controller.move('public','contact');});
		$('#free_board').click(function(){controller.move('public','free_board');});
		$('#user_content #kaup').addClass('cursor').click(function(){controller.move('member','kaup');});
		$('#user_content #rock_sissor_paper').addClass('cursor').click(function(){controller.move('member','rock_sissor_paper');});
		$('#user_content #lotto').addClass('cursor').click(function(){controller.move('member','lotto');});
		var key = $('#user_content_subject #major_subject_1 input[type="hidden"]').val();
		$('#user_content_subject #major_subject_1 input[type="button"]').click(function(){alert('************');controller.moveWithKey('subject','detail',key)});
		$('#user_content_subject #major_subject_2').click(function(){});
		$('#user_content_subject #major_subject_3').click(function(){});
	};
	
	return {
		init : init,
		onCreate : onCreate,
		setContentView : setContentView,
		context : context,
		img : img,
		js : js,
		css : css
	}
})();
var session = (function(){
	var init = function(context){
		sessionStorage.setItem('context',context);
		sessionStorage.setItem('js',context+'/resources/js');
		sessionStorage.setItem('css',context+'/resources/css');
		sessionStorage.setItem('img',context+'/resources/img');
	};
	var getContextPath = function(){return sessionStorage.getItem('context');};
	var getJavascriptPath = function(){return sessionStorage.getItem('js');};
	var getCssPath = function(){return sessionStorage.getItem('js');};
	var getImagePath = function(){return sessionStorage.getItem('img');};
	return {
		init : init,
		getContextPath : getContextPath,
		getJavascriptPath : getJavascriptPath,
		getCssPath : getCssPath,
		getImagePath : getImagePath
	};
	
})();
var controller = (function(){
	var _page,_directory,_key;
	var setPage=function(page){this._page=page;};
	var setDirectory=function(directory){this._directory=directory;};
	var setKey=function(key){this._key=key;};
	var getPage = function(){return this._page;};
	var getDirectory = function(){return this._directory;};
	var getKey = function(){return this._key;};
	return {
		setPage : setPage,
		getPage : getPage,
		setDirectory : setDirectory,
		getDirectory : getDirectory,
		setKey : setKey,
		getKey : getKey,
		moveWithKey : function(directory,page,key){
			setDirectory(directory);
			setPage(page);
			setKey(key);
			location.href = app.context()+'/'+getDirectory()+'/'+getPage()+'?key='+getKey();
		},
		move : function(directory,page){
			setDirectory(directory);
			setPage(page);
			location.href = app.context()+'/'+getDirectory()+'/'+getPage();
		},
		home : function(){location.href=app.context()+'/'}
	};
})();
var util = (function(){
	return {
		isNumber : function(value){
			return typeof value === 'number' && isFinite(value);
		},
		pwChecker : function(value){
			var pw_regex = /^.*(?=.{4,10})(?=.*[a-zA-Z0-9]).*$/;
			return pw_regex.test(value)?"yes":"no";
		}
	};
})();
var nav = (function(){
	var init = function(){onCreate();};
	var setContentView = function(){
		$('#nav ul').addClass('list_style_none').addClass('over_hidden').addClass('bg_color_black')
		.css('margin','0').css('padding','0');
		$('#nav li').addClass('float_left').addClass('display_inline')
		.css('border-right','1px').css('solid','#bbb');
		$('#nav li:last-child').css('border-right','none');
		$('#nav li a').addClass('display_block').addClass('font_color_white').addClass('text_center').addClass('text_deco_none')
		.css('padding','14px 16px')
		$('#nav li a:hover:not(.active)').addClass('bg_color_green')
		$('#nav .active').addClass('bg_color_black');
	};
	var onCreate = function(){
		setContentView();
	};
	return {
		init : init
	};
})();
/*
============ MAJOR_JS =====
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-9-8
@UPDATE DATE : 2016-9-9
@DESC : 전공
==============================
*/
var major = (function(){})();
/*
========= MEMBER_JS =======
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-9-8
@UPDATE DATE : 2016-9-9
@DESC : 회원(가입.로그인)
==============================
*/
var LOGIN_FORM = '<div class="box">'
	+'<form id="member_login_form" class="form-signin">' 
	+'<h2 class="form-signin-heading">Please sign in</h2>' 
	+'<label for="inputEmail" class="sr-only">Email address</label>' 
	+'<input type="text" id="id" name="id" class="form-control" placeholder="USER ID" required autofocus>' 
	+'<label for="inputPassword" class="sr-only">Password</label>' 
	+'<input type="password" id="pw" name="pw" class="form-control" placeholder="PASSWORD" required>' 
	+'<input type="hidden" name="context">' 
	+'<div class="checkbox">' 
	+'<label><input type="checkbox" name="remember_me" value="remember-me"> Remember me</label></div>' 
	+'<input id="login_btn" class="btn btn-lg btn-primary btn-block" type="submit" value="Sign in"/></form></div>';
var SIGN_UP_FORM = '<section id="member_regist"><form id="member_regist_form">'
	+'<div><label for="exampleInputEmail1">ID</label>'
	+'<div id="id_box"><input type="text" id="id" placeholder="문자 혹은 숫자로 4~10자 입력가능"><input type="button" id="check_dup" name="check_dup" value="중복체크"/></div></div>'
	+'<div><label for="exampleInputEmail1">비밀번호</label>'
	+'<div><input type="password" id="password" placeholder="PASSWORD"></div></div>'
	+'<div><label for="exampleInputEmail1">비밀번호확인</label>'
	+'<div><input type="password" id="check_password" placeholder="CHECK PASSWORD"></div></div>'
	+'<div id=check_pw><font size="2" color="red"></font></div></div>'
	+'<div><label for="exampleInputEmail1">이 름</label>'
	+'<div><input type="text" id="name" placeholder="예)홍 길 동"></div></div>'
	+'<div><label for="exampleInputEmail1">SSN</label>'
	+'<div><input type="text" id="ssn" placeholder="예)800101-2"></div></div>'
	+'<div><label for="exampleInputEmail1">E-MAIL</label>'
	+'<div><input type="email" id="email" placeholder="EMAIL"></div></div>'
	+'<div><label for="exampleInputEmail1">전화번호</label>'
	+'<div><input type="text" id="phone" placeholder="PHONE"></div></div>'
	+'<div id="rd_major">'
	+'<label for="exampleInputEmail1">전 공</label><br>'
	+'<label ><input type="radio" name="major" value="computer" checked> 컴공학부</label>'
	+'<label ><input type="radio" name="major" value="mgmt"> 경영학부</label>'
	+'<label ><input type="radio" name="major" value="math"> 수학부</label>'
	+'<label ><input type="radio" name="major" value="eng"> 영문학부</label></div>'
	+'<div><label for="exampleInputEmail1">수강과목</label><br>'
	+'<div><div id="ck_subject">'
	+'<label ><input type="checkbox" name="subject"  value="java"> Java</label>'
	+'<label ><input type="checkbox" name="subject"  value="sql"> SQL</label>'
	+'<label ><input type="checkbox" name="subject"  value="cpp"> C++	</label>'
	+'<label ><input type="checkbox" name="subject"  value="python"> 파이썬</label>'
	+'<label ><input type="checkbox" name="subject"  value="delphi"> 델파이</label>'
	+'<label ><input type="checkbox" name="subject"  value="html"> HTML</label></div></div> </div>'
	+'<input id="bt_join" type="submit" value="회원가입" />'
	+'<input id="bt_cancel" type="reset" value="취소" /></form></section>';
var DETAIL_FORM =
	 '<div class="box"> <h2>내정보보기</h2> <table id="member_detail"><tr>'
	+'<td rowspan="8" style="width:30%"><img id="img" src="" alt="W3Schools.com" width="104" height="142">'
	+'</td><td class="font_bold bg_color_yellow" style="width:20%">ID</td>'
	+'<td id="id" style="width:40%"></td></tr><tr>'
	+'<td class="font_bold bg_color_yellow">비밀번호</td><td id="u_pw"></td></tr><tr>'
	+'<td class="font_bold bg_color_yellow">이 름</td><td id="name" ></td></tr><tr>'
	+'<td class="font_bold bg_color_yellow">성 별</td><td id="gender" ></td>'
	+'</tr><tr><td class="font_bold bg_color_yellow">이메일</td>'
	+'<td id="u_email"></td></tr><tr><td class="font_bold bg_color_yellow">전공과목</td>'
	+'<td id="u_major"></td></tr><tr><td class="font_bold bg_color_yellow">수강과목</td>'
	+'<td id="u_subject" colspan="2"></td></tr><tr><td class="font_bold bg_color_yellow">전화번호</td>'
	+'<td id="u_phone"></td></tr><tr>'
	+'<td class="font_bold bg_color_yellow">생년월일</td><td id="birth" colspan="2"></td>'
	+'</tr><tr><td class="font_bold bg_color_yellow">등록일</td>'
	+'<td id="regdate" colspan="2"></td></tr></table>'
	+'<div id="bt_box"><input id="go_update" type="submit" value="정보수정하러가기" /><input id="unregist" type="submit" value="회원탈퇴" /></div></div>'
	;
var UNREGIST_FORM =
	 '<div class="box"><h3>탈퇴하시려면 비밀번호를 다시 입력해 주세요</h3>'
	+'<form id="member_delete_form" class="navbar-form navbar-center" role="search">'
	+'<div class="form-group"><input id="ch_pw" type="password" class="form-control" placeholder="PASSWORD">'
	+'</div><button id="unregist_bt" type="submit" class="btn btn-default">탈 퇴</button></form></div>';
var member = (function(){
	var _age,_gender,_name,_ssn;
	var setAge = function(age){this._age=age;}
	var setGender = function(gender){this._gender=gender;}
	var setSSN = function(ssn){this._ssn=ssn;}
	var setName = function(name){this._name=name;}
	var getAge = function(){return this._age;}
	var getSSN = function(){return this._ssn;}
	var getName = function(){return this._name;}
	var getGender = function(){return this._gender;}
	var init = function(){onCreate()};
	var setContentView = function(){
		$('#member_content_img_home').attr('src',app.img()+'/home.png').css('width','30px');
		$('#member_content_a_home').attr('alt','home').click(function(){controller.home();});
		$('#member_content').addClass('box').css('font-size','20px');
		$('#member_content > article').css('width','300px').addClass('center').addClass('text_left');
		$('#member_content a').css('font-size','15px').addClass('cursor');
		$('#member_content > h1').text('MEMBER MGMT');
		$('#member_content_ol > li > a').addClass('remove_underline');
		$('#member_content_ol > li:first > a').text('SIGN UP');
		$('#member_content_ol > li:nth(1) > a').text('DETAIL');
		$('#member_content_ol > li:nth(2) > a').text('UPDATE');
		$('#member_content_ol > li:nth(3) > a').text('DELETE');
		$('#member_content_ol > li:nth(4) > a').text('LOG IN');
		$('#member_content_ol > li:nth(5) > a').text('LOG OUT');
		$('#member_content_ol > li:nth(6) > a').text('LIST');
		$('#member_content_ol > li:nth(7) > a').text('SEARCH');
		$('#member_content_ol > li:nth(8) > a').text('COUNT');
		
		$('#member_regist').addClass('box');
		$('#member_regist #bt_join').addClass('btn').addClass(' btn-primary');
		$('#member_regist #bt_cancel').addClass('btn').addClass(' btn-danger');
		$('#member_regist #check_dup').addClass('btn').addClass(' btn-danger');
		$('#member_regist #re_check').addClass('btn').addClass(' btn-danger');
		$('#member_regist #use_input_id').addClass('btn').addClass(' btn-danger');
		$('#member_regist_form').addClass('form-horizontal');
		$('#member_regist_form > div').addClass('form-group').addClass('form-group-lg');
		$('#member_regist_form > div > label').addClass('col-sm-2').addClass('control-label');
		$('#member_regist_form > div > div').addClass('col-sm-10');		
		$('#member_regist_form > div > div > input').addClass('form-control');
		$('#member_regist #rd_major > label:gt(1)').addClass('radio-inline');
		$('#member_regist #ck_subject').addClass('checkbox');
		$('#member_regist #ck_subject > label').addClass('checkbox-inline');
		$('#member_find_form').attr('action',app.context()+'/member/search');
		$('#member_find_form input[type="hidden"]').attr('name','context').attr('value',app.context());
		$('#member_detail img').attr('src',app.img()+'/member/hong.jpg').css('width','104px').css('height','142px');
		$('#member_login_form').attr('method','post').attr('action',app.context()+'/member/login');
		$('#member_login_form input[type="hidden"]').attr('value',app.context());
		};
	var onCreate = function(){
		setContentView();
		$('#regist').click(function(){controller.move('member','regist');});
		$('#detail').click(function(){controller.move('member','detail');});
		$('#update').click(function(){controller.move('member','update');});
		$('#delete').click(function(){controller.move('member','delete');});
		$('#login').click(function(){controller.move('member','login');});
		$('#logout').click(function(){controller.move('member','logout');});
		/*$('#list').click(function(){controller.move('member','list');});*/
		$('#find_by').click(function(){controller.move('member','find_by');});
		$('#count').click(function(){controller.move('member','count');});
		$('#member_find_form input[type="submit"]').click(function(){$('#member_find_form').submit();});
		$('#member_list_table .name').click(function(){controller.moveWithKey('member','a_detail','hong');});
		$('#member_list_table .regist').click(function(){controller.moveWithKey('grade','regist','hong');});
		$('#member_list_table .update').click(function(){controller.moveWithKey('grade','update','hong');});
		$('#member_list_table .name').click(function(){controller.moveWithKey('member','a_detail','hong');});
		$('#member_list_table .regist').click(function(){controller.moveWithKey('grade','regist','hong');});
		$('#member_list_table .update').click(function(){controller.moveWithKey('grade','update','hong');});
		$('#member_login_form input[type="submit"]').click(function() {$('#member_login_form').submit();});
	};
	return {
		setSSN : setSSN,
		setName : setName,
		setAge : setAge,
		setGender : setGender,
		getName : getName,
		getAge : getAge,
		getSSN : getSSN,
		getGender : getGender,
		init : init,
		spec : function (){
		},
		pub_login_form : function(){
			$('#pub_article').html(LOGIN_FORM);
			$('#login_btn').click(function(e){
				e.preventDefault();
				$.ajax({
					url : app.context()+'/member/login',
					type : 'POST',
					data : {'id':$('#id').val(),'pw':$('#pw').val()},
					dataType: 'json',
					success : function(data){
						if(data.id === 'NONE'){
							alert('ID 나 비번이 일치하지 않습니다.');
						}else{
							$('#pub_header').empty().load(app.context()+'/member/logined/header');
							$('#pub_article').html(STUDENT_MAIN);
						}
					},
					error : function(xhr,status,msg){
						alert('로그인 실패 이유 :'+msg);
					}
				});
			});
		},
		pub_sign_up_form : function(){
			$('#pub_article').empty().append(SIGN_UP_FORM);
			member.init();			
			$('#check_dup').click(function(){
				if(util.pwChecker($('#id').val())==='yes'){
					$.ajax({
						url : app.context()+'/member/check_dup/'+$('#id').val(),
						success : function(data){
							if(data.flag==="TRUE"){
								$('#id_box').html('<input type="text" id="id" placeholder="'+data.message+'"><input type="button" id="re_check" name="check_dup" value="다시 조회"/>');
								member.init();
							}else{
								$('#id_box').html('<input type="text" id="id" value="'+data.temp+'"><input type="button" id="use_input_id" name="check_dup" value="그대로 사용"/>');
								member.init();								
								$('#bt_join').click(function(e){
									e.preventDefault();
									var join_info = {
										'id' : $('#id').val(),
										'pw' : $('#password').val(),
										'name' : $('#name').val(),
										'ssn' : $('#ssn').val(),
										'email' : $('#email').val(),
										'phone' : $('#phone').val()
									};
									//$('#radio').val()
									//$('#ck_subject').val()
									$.ajax({
										url : app.context()+'/member/signup',
										type : 'post',
										contentType : 'application/json',
										data : JSON.stringify(join_info),
										dataType : 'json',
										success : function(data){
											if(data.message==='success'){
												member.pub_login_form();
											}else{
												alert('회원가입 시 알 수 없는 에러가  발생했습니다.');
											}
										},
										error : function(x,s,m){
											alert("code:"+x.status+"\n"+"message:"+x.responseText+"\n"+"m:"+error);
										}
										
									});
								});
							}
						},
						error : function(x,s,m){
							alert('id 중복체크시 발생한 에러'+m);
						}
					});
				}else{
					alert('정규식에 맞지 않음');
					$('#id').val('').focus();
				}
				
			});
			
			$('#password').keyup(function(){
				$('#check_pw').text('');
			});
			
			$('#check_password').keyup(function(){
				$('#check_pw').text('');
				if($('#password').val().length === $('#check_password').val().length){
					if($('#password').val() === $('#check_password').val()){
						$('#check_pw').html('<font size="2" color="green">비밀번호맞음</font>');
					}else{
						$('#check_pw').html('<font size="2" color="red">비밀번호틀림</font>');
					}
				}else{
					$('#check_pw').html('<font size="2" color="red">비밀번호틀림</font>');
				}
			});
		},
		detail : function(){
			$('#pub_header').empty().load(app.context()+'/member/logined/header');
			$('#pub_article').html(DETAIL_FORM);
				$.getJSON(app.context()+'/member/detail',function(data){
						    $('#member_detail #img').attr('src',app.img()+'/default/'+data.profileImg);
							$('#member_detail #id').text(data.id);
							$('#member_detail #name').text(data.name);
							$('#member_detail #gender').text(data.gender);
							$('#member_detail #u_email').text(data.email);
							$('#member_detail #u_major').text('컴퓨터공학과');
							$('#member_detail #u_subject').text('JAVA');
							$('#member_detail #u_phone').text(data.phone);
							$('#member_detail #birth').text(data.birth);
							$('#member_detail #regdate').text(data.regDate);							
							$('#go_update').click(function(){	
								$('#member_detail #u_pw').html('<input type="text" id="pw" value="'+data.pw+'"/>');
								$('#member_detail #u_email').html('<input type="text" id="email" value="'+data.email+'"/>');
								$('#member_detail #u_major').html('<input type="text" id="major" value="컴퓨터공학과"/>');
								$('#member_detail #u_subject').html('<input type="text" id="subject" value="JAVA"/>');
								$('#member_detail #u_phone').html('<input type="text" id="phone" value="'+data.phone+'"/>');
								$('#bt_box').html('<input id="confirm" type="submit" value="확인" /><input id="cancel" type="submit" value="취소" />');
								$('#confirm').click(function(){		
									var join_info = {
										'id' : $('#member_detail #id').html(),
										'pw' : $('#member_detail #pw').val(),
										'email' : $('#member_detail #email').val(),
										'phone' : $('#member_detail #phone').val()
									};
									$.ajax({
										url : app.context()+'/member/update',
										type : 'post',
										contentType : 'application/json',
										data : JSON.stringify(join_info),
										dataType : 'json',										
										success : function(data){
											if (data.flag==='TRUE') {
												member.detail();
											} else {
												alert('서버는 다녀왔는데 실패함 !!');
											}
										},
										error : function(x,s,m){
											alert('정보 수정시 발생한 에러 : '+m)
										}
									});
								});
							});
							$('#unregist').click(function(){
								$('#pub_article').html(UNREGIST_FORM);
								$('#unregist_bt').click(function(){
									$.ajax({
										url : app.context()+'/member/delete',
										type : 'post',
										data : {'pw':$('#ch_pw').val()},
										dataType : 'json',
										success : function(data){
											alert('확인 패스워드 : '+$('#ch_pw').val());
											if(data.flag==='TRUE'){
												alert('pw 일치');
												//$('#pub_header').empty().load(app.context()+'/member/logined/header');
												//location.href = app.context()+'/';
												member.pub_login_form();
											}else{
												alert('pw 불일치');
												//$('#pub_article').html(UNREGIST_FORM);
												member.pub_login_form();
											}
										},
										error : function(x,s,m){
											alert('회원탈퇴 시 발생한 에러: '+m);
										}
										
									});
								});
							});
				});
		}
	};	
})();
/*
============ STUDENT_JS ==========
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-8-1
@UPDATE DATE : 2016-9-20
@DESC : 학생
==================================
*/
var STUDENT_MAIN = '<section id="user_content_service" class="box section-padded">'
	+'<div><div class="row text-center title"><h2>Services</h2>'
	+'<h4 class="light muted">Achieve the best results with our wide variety of training options!</h4></div>'
	+'<div class="row services">'
	+'<div class="col-md-4"><div id="kaup" class="service">'
	+'<div class="icon-holder"><img src="'+app.img()+'/icons/kaup.png" alt="" class="icon"></div>'
	+'<h4 class="heading">KAUP INDEX</h4>'
	+'<p class="description">A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p></div></div>'
	+'<div class="col-md-4"><div id="rock_sissor_paper" class="service">'
	+'<div class="icon-holder"><img src="'+app.img()+'/icons/rock_sis.jpg" alt="" class="icon"></div>'
	+'<h4 class="heading">ROCK SISSOR PAPER</h4>'
	+'<p class="description">A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p></div></div>'
	+'<div class="col-md-4"><div id="lotto" class="service">'
	+'<div class="icon-holder"><img src="'+app.img()+'/icons/lotto.jpg" alt="" class="icon"></div>'
	+'<h4 class="heading">LOTTO DRAWING</h4>'
	+'<p class="description">A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p></div></div></div></div>'
	+'<div class="cut cut-bottom"></div></section>'
	+'<section id="user_content_subject" class="section gray-bg"><div class="container">'
	+'<div class="row title text-center"><h2 class="margin-top">MAJOR SUBJECT</h2>'
	+'<h4 class="light muted">TOP 3</h4></div>'
	+'<div class="row"><div class="col-md-4"><div id="major_subject_1"  class="team text-center">'
	+'<div class="cover" style="background:url('+app.img()+'/default/sana1.jpg")"; background-size:cover;">'
	+'<div class="overlay text-center"><h3 class="white">Java</h3><h5 class="light light-white">Server Program Language</h5></div></div>'
	+'<img src="'+app.img()+'/team/java.jpg" alt="Team Image" class="avatar">'
	+'<div class="title"><h4>Java</h4><h5 class="muted regular">Server Program Language</h5></div>'
	+'<input type="hidden" name="major_subject_1" value="java">'
	+'<input id="aaaa" type="button" data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" value="과목 정보 보기"/></div></div>'
	+'<div class="col-md-4"><div id="major_subject_2"  class="team text-center">'
	+'<div class="cover" style="background:url('+app.img()+'/default/park1.jpg"); background-size:cover;">'
	+'<div class="overlay text-center"><h3 class="white">Javascript</h3><h5 class="light light-white">UI Program Language</h5></div></div>'
	+'<img src="'+app.img()+'/team/javascript.jpg" alt="Team Image" class="avatar">'
	+'<div class="title"><h4>Javascript</h4>'
	+'<h5 class="muted regular">UI Program Language</h5></div>'
	+'<input type="hidden" name="major_subject_2">'
	+'<input type="button" data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" value="과목 정보 보기"/></div></div>'
	+'<div class="col-md-4"><div id="major_subject_3" class="team text-center">'
	+'<div class="cover" style="background:url('+app.img()+'/default/han1.jpg"); background-size:cover;">'
	+'<div class="overlay text-center"><h3 class="white">SQL</h3>'
	+'<h5 class="light light-white">Database Management Language</h5></div></div>'
	+'<img src="'+app.img()+'/team/sql.jpg" alt="Team Image" class="avatar"><div class="title">'
	+'<h4>SQL</h4>'
	+'<h5 class="muted regular">Database Management Language</h5></div>'
	+'<input type="hidden" name="major_subject_3">'
	+'<input type="button" data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" value="과목 정보 보기"/>'
	+'</div></div></div></div></section>';
var STUDENT_LIST_TH = '<div class="box2" style="padding-top:0;width:90%">'
+'<ul class="list-group">'
+'<li class="list-group-item">총학생수: ${totCount}</li>'
+'</ul>'
+'<div class="panelpanel-primary">'
+'<div class="panel-heading">학생리스트</div>'
+'<table id="member_list_table">'
+'<tr>'
+'<th>ID</th>'
+'<th>이름</th>'
+'<th>등록일</th>'
+'<th>생년월일</th>'
+'<th>이메일</th>'
+'<th>전화번호</th>'
+'<th>성적</th>'
+'</tr>'
+'<tbody>';
var STUDENT_LIST_ROW =
/*'<c:forEachitems="${list}"var="member">'*/
 '<tr>'
+'<td>${member.id}</td>'
+'<td><aclass="name">${member.name}</a></td>'
+'<td>${member.regDate}</td>'
+'<td>${member.birth}</td>'
+'<td>${member.email}</td>'
+'<td>${member.phone}</td>'
+'<td><aclass="regist">등록</a>/<aclass="update">수정</a></td>'
+'</tr>';
/*+'</c:forEach>'*/
var STUDENT_LIST_END = 
 '</tbody>'
+'</table>';
var aaa = 
 '<navaria-label="Pagenavigation">'
+'<ulclass="pagination">'
+'<c:iftest="${startPg-pgSizegt0}">'
+'<li>'
+'<ahref="${context}/member/list/${startPg-pgSize}"aria-label="Previous">'
+'<spanaria-hidden="true">&laquo;</span>'
+'</a>'
+'</li>'
+'</c:if>'
+'<c:forEach begin="${startPg}"end="${lastPg}"step="1"varStatus="i">'
+'<c:choose>'
+'<c:whentest="${i.index==pgNum}">'
+'<fontcolor="red">${i.index}</font>'
+'</c:when>'
+'<c:otherwise>'
+'<ahref="${context}/member/list/${i.index}">${i.index}</a>'
+'</c:otherwise>'
+'</c:choose>'
+'</c:forEach>'
+'<c:iftest="${startPg+pgSizeletotPg}">'
+'<li>'
+'<ahref="${context}/member/list/${startPg-pgSize}"aria-label="Next">'
+'<span aria-hidden="true">&raquo;</span>'
+'</a>'
+'</li>'
+'</c:if>'
+'</ul>'
+'</nav>'
+'<div align="center">'
+'<form action="${context}/member/search"method="post">'
+'<select name="keyField" id="">'
+'<option value="name"selected>이름</option>'
+'<option value="mem_id">ID</option>'
+'</select>'
+'<input type="text"name="keyword">'
+'<input type="submit"name="검색">'
+'</form>'
+'</div>'
+'</div>'
+'</div>';
var user = (function(){
	var init = function(){onCreate();};
	
	var setContentView = function(){
		$('#member_content_img_home').attr('src',app.img()+'/home.png');
		$('#user_header #logout').addClass('cursor');
	};
	var onCreate = function(){
		setContentView();
		$('#bt_bom').click(function(){controller.move('','bom');});
		$('#bt_dom').click(function(){controller.move('','dom');});
		$('#bt_kaup').click(function(){controller.move('','kaup');});
		$('#bt_account').click(function(){controller.move('','account');});
		$('#a_regist').click(function(){controller.move('account','regist');});
		$('#a_withdraw').click(function(){controller.move('account','withdraw');});
		$('#a_deposit').click(function(){controller.move('account','deposit');});
		$('#a_list').click(function(){controller.move('account','list');});
		$('#a_update').click(function(){controller.move('account','update');});
		$('#a_count').click(function(){controller.move('account','count');});
		$('#a_search').click(function(){controller.move('account','search');});
		$('#a_delete').click(function(){controller.move('account','delete');});
		$('#go_user_home').click(function(){controller.move('member','content');});
		$('#user_header').css('height','50px');
		$('#user_header #a_mypage').click(function(){controller.move('member','content');});
		$('#user_header #a_detail').click(function(){controller.move('member','detail');});
		$('#user_header #a_update').click(function(){controller.move('member','update');});
		$('#user_header #a_delete').click(function(){controller.move('member','delete');});
		$('.navbar-header').css('height','50px');
		$('#user_header #logout').click(function() {controller.home();});
		$("#user_header #account li:eq(0) a").click(function(){controller.move('account','detail');});
		$("#user_header #account li:eq(1) a").click(function(){controller.move('account','open');});
		$("#user_header #account li:eq(2) a").click(function(){controller.move('account','transaction');});
		$("#user_header #account li:eq(3) a").click(function(){controller.move('account','delete');});
		$("#user_header #grade li:eq(0) a").click(function(){controller.move('grade','detail');});
		$("#user_header #grade li:eq(1) a").click(function(){controller.move('grade','find');});
	};
	return {
		init : init,
		student_list : function(pgNum){
			$('#admin_header').empty().load(app.context()+'/admin/header');
			$('#admin_nav').empty().load(app.context()+'/admin/nav');
			$('#admin_article').empty();//html(STUDENT_LIST_TH);
			$.getJSON(app.context()+'/member/list/'+pgNum,function(data){
				var frame = '';
				var startPg = data.startPg;
				var lastPg = data.lastPg;
				var pgSize = data.pgSize;
				var totPg = data.totPg;
				var groupSize = data.groupSize;
				console.log('스타트페이지 : '+startPg);
				console.log('라스트페이지 : '+lastPg);
				console.log('페이지사이즈 : '+pgSize);
				console.log('총페이지 : '+totPg);
				console.log('그룹사이즈 : '+groupSize);
				var student_list = '<div class="box2" style="padding-top:0;width:90%">';
					student_list +='<ul class="list-group"><li class="list-group-item">총학생수: '+data.totCount+'</li>';
					student_list += '</ul>'
					+'<div class="panelpanel-primary">'
					+'<div class="panel-heading">학생리스트</div>'
					+'<table id="member_list_table">'
					+'<tr>'
					+'<th>ID</th>'
					+'<th>이름</th>'
					+'<th>등록일</th>'
					+'<th>생년월일</th>'
					+'<th>이메일</th>'
					+'<th>전화번호</th>'
					+'<th>성적</th>'
					+'</tr>'
					+'<tbody>';
				if (data.count==0) {
					student_list +='<tr><td colspan=7>등록된 학생이 없습니다.</td></tr>';
				} else {
					$.each(data.list, function(i,member){
						student_list +=
							 '<tr>'
							+'<td>'+member.id+'</td>'
							+'<td><a class="name">'+member.name+'</a></td>'
							+'<td>'+member.regDate+'</td>'
							+'<td>'+member.birth+'</td>'
							+'<td>'+member.email+'</td>'
							+'<td>'+member.phone+'</td>'
							+'<td><a class="regist">등록</a> / <a class="update">수정</a></td>'
							+'</tr>';
					});
				}
				student_list += '</tbody></table>';
				var pagination='<nav aria-label="Page navigation" style="margin:0 auto;"><ul class="pagination">';
				if((startPg-lastPg) > 0){
					pagination += 
						+'<li>'
						+'<a href="'+app.context()+'/member/list/'+(startPg-lastPg)+'" aria-label="Previous">'
						+'<span aria-hidden="true">&laquo;</span>'
						+'</a>'
						+'</li>';
				}
				for(var i=startPg; i<=lastPg; i++){
					if(i==pgNum){
						pagination +='<font color="red">'+i+'</font>';
					}else{
						pagination += '<a href="'+app.context()+'/member/list/'+i+'">'+i+'</a>';
					}
				}
				if(startPg + pgSize <= totPg){
					pagination += 
						'<li>'
						+'<a href="'+app.context()+'/member/list/'+(startPg-pgSize)+'}" aria-label="Next">'
						+ '<span aria-hidden="true">&laquo;</span>'
						+'</a>'
						+'</li>';
				}
				pagination += '</ul></nav>'
				var search_form =
					'<div align="center">'
					+'<form action="'+app.context()+'/member/search" method="post">'
					+'<select name="keyField" id="keyField">'
					+'<option value="name" selected>이름</option>'
					+'<option value="mem_id">ID</option>'
					+'</select>'
					+'<input type="text" name="keyword" id="keyword">'
					+'<input id="find_submit" type="submit" name="검 색">'
					+'</form>'
					+'</div>'
					+'</div>'
					+'</div>';				
				frame += student_list;
				frame += pagination;
				frame += search_form;
				$('#admin_article').html(frame);
				$('#find_submit').click(function(){
					if($('#keyword').val().length>0){
						user.find_student($('#keyword').val());
					}else{
						alert('검색어를 입력해 주세요');
						$('#keyword').focus();
						return false
					}
				});
			});
		},
		find_student : function(keyword){
			alert('검색어 : '+keyword);
		}
	};
})();
/*
============ ADMIN_JS ==========
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-8-1
@UPDATE DATE : 2016-9-20
@DESC : 관리자
==================================
*/
var admin = (function() {
	var _pass;
    var	getPass = function(){return this._pass;};
    var setPass = function(pass){this._pass=pass;};
    var init = function(){onCreate();};
    var setContentView = function(){
    	$('#admin_content #img_1').attr('src',app.img()+'/member_mgmt.PNG');
    	$('#admin_content #img_2').attr('src',app.img()+'/grade_mgmt.PNG');
    	$('#admin_content #img_3').attr('src',app.img()+'/account_mgmt.PNG');
    	$('#admin_content h3').addClass('text_center');
    	$('#admin_content #img_1').attr('src',app.img()+'/default/member_mgmt.PNG');
    	$('#admin_content #img_2').attr('src',app.img()+'/default/grade_mgmt.PNG');
    	$('#admin_content #img_3').attr('src',app.img()+'/default/account_mgmt.PNG');
    	$('#admin_header').css('height','50px');
    	$('.navbar-header').css('height','50px');
    	$('#admin_header #exit').addClass('cursor');
    	$('#admin_nav').css('height','50px');
    };
    var onCreate = function(){
    	setContentView();
    	$('#admin_nav #member_mgmt #list').click(function(){user.student_list(1);});
    	$('#admin_nav #member_mgmt #find_by').click(function(){controller.move('member','find');});
    	$('#admin_nav #member_mgmt #count').click(function(){controller.move('member','count');});
    	$('#admin_nav #account_mgmt #list').click(function(){controller.move('account','list');});
    	$('#admin_nav #account_mgmt #open').click(function(){controller.move('account','open');});
    	$('#admin_nav #account_mgmt #delete').click(function(){controller.move('account','delete');});
    	$('#admin_nav #account_mgmt #find').click(function(){controller.move('account','find');});
    	$('#admin_nav #account_mgmt #count').click(function(){controller.move('account','count');});
    	$('#admin_header #exit').click(function() {controller.home();});
    	$('#go_admin_home').click(function() {controller.move('admin','main');});
    };
    return {
    	getPass : getPass,
    	setPass : setPass,
    	init : init,
    	check : function(){
    		controller.move('admin','main');
    	},
    	check2 : function() {
    		setPass(1);
			var isAdmin = confirm('관리자입니까?');
			if (!isAdmin) {
				alert('관리자만 접근 가능합니다.');
			} else {
				var password = prompt('관리자 비번을 입력바랍니다');
				if(password == getPass()){
					controller.move('admin','main');
				}else{
					alert('관리자 비번이 틀립니다.');
				}
			}
		}
    };
})();
/*
=========== SUBJECT_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-9-8
@UPDATE DATE : 2016-9-9
@DESC : 과목
=============================
*/
var subject = (function(){})();
/*
=========== EXAM_JS =====
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-9-8
@UPDATE DATE : 2016-9-9
@DESC : 시험
============================
*/
var exam = (function(){})();
/*
======== GRADE_JS ======
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-9-8
@UPDATE DATE : 2016-9-9
@DESC : 성적
============================
*/
var grade = (function(){
	var init = function(){onCreate();};
	var setContentView = function(){
		$('#member_content_img_home').attr('src',app.img()+'/home.png');
		$('#grade_content').addClass('box');
		$('#img_home').css('width','30px');
		$('#grade_content > article').css('width','300px').css('text-align','left').css('margin','0 auto');
		$('#title').css('font-size','40px');
		$('#grade_regist').addClass('box').css('padding-top','0');
		$('#grade_regist #bt_send').addClass('btn').addClass(' btn-primary');
		$('#grade_regist #bt_cancel').addClass('btn').addClass(' btn-danger');
		$('#grade_regist_form').addClass('form-horizontal');
		$('#grade_regist_form > div').addClass('form-group').addClass('form-group-lg');
		$('#grade_regist_form > div > label').addClass('col-sm-2').addClass('control-label');
		$('#grade_regist_form > div > div').addClass('col-sm-10');
		$('#grade_regist_form > div > div > input').addClass('form-control');
		$('#grade_regist #rd_major > label:gt(1)').addClass('radio-inline');
		$('#grade_update').addClass('box').css('padding-top','0');
		$('#grade_update #bt_send').addClass('btn').addClass(' btn-primary');
		$('#grade_update #bt_cancel').addClass('btn').addClass(' btn-danger');
		$('#grade_update_form').addClass('form-horizontal');
		$('#grade_update_form > div').addClass('form-group').addClass('form-group-lg');
		$('#grade_update_form > div > label').addClass('col-sm-2').addClass('control-label');
		$('#grade_update_form > div > div').addClass('col-sm-10');
		$('#grade_update_form > div > div > input').addClass('form-control');
		$('#grade_update #rd_major > label:gt(1)').addClass('radio-inline');
	};
	var onCreate = function(){
		setContentView();
		$('#g_regist').click(function(){controller.move('grade','regist');});
		$('#g_update').click(function(){controller.move('grade','update');});
		$('#g_delete').click(function(){controller.move('grade','delete');});
		$('#g_list').click(function(){controller.move('grade','list');});
		$('#g_count').click(function(){controller.move('grade','count');});
		$('#g_find').click(function(){controller.move('grade','find');});
		$('#a_regist').click(function() {location.href = "${context}/grade/regist.do";});
		$('#a_update').click(function() {location.href ="${context}/grade/update.do";});
		$('#a_delete').click(function() {location.href = "${context}/grade/delete.do";});
		$('#a_list').click(function() {location.href = "${context}/grade/list.do";});
		$('#a_count').click(function() {location.href = "${context}/grade/count.do";});
		$('#a_find').click(function() {location.href = "${context}/grade/search.do";});
		
	};
	return {
		init : init,
	};
})();
/*
========== QNA_JS ========
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-9-8
@UPDATE DATE : 2016-9-9
@DESC : QNA
=============================
*/
var qna = (function(){})();
/*
========= NOTICE_JS ======
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-9-8
@UPDATE DATE : 2016-9-9
@DESC : 공지사항
=============================
*/
var notice = (function(){})();