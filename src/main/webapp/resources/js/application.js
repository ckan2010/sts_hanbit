/*
======== META_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-08-01
@UPDATE DATE : 2016-09-20
@DESC : 메타데이터
*/
var app = (function(){
	var init = function(context) {		
		onCreate();
		session.init(context);
		member.init();
		user.init();
		grade.init();
		admin.init();
		nav.init();
	};
	var context = function() {
		return session.getContextPath();
	};
	var js = function(){
		return session.getJavascriptPath();
	};
	var css = function(){
		return session.getCssPath();
	};
	var img = function(){
		return session.getImagePath();
	};
	var fonts = function(){
		return session.getFontsPath();
	};
	var setContentView = function(){
		$('#footer').addClass('bottom').addClass('footer');
		$('#global_content').addClass('box');
		$('#global_content a').addClass('cursor');
		$('#global_content_a_regist').text('SIGN UP').click(function(){member.pub_sign_up();});
		$('#global_content_a_login').text('LOG IN').click(function(){member.pub_login_form();});
		$('#global_content_a_admin').text('ADMIN MODE').click(function(){admin.checkAdmin();});
	};
	var onCreate = function(){
		setContentView();
		$('#title').click(function(){controller.home();});
		$('#a_member').click(function(){controller.move('member','main');});
		$('#a_grade').click(function(){controller.move('grade','main');});
		$('#a_account').click(function(){controller.move('account','main');});
		$('#a_school').click(function(){controller.move('global','school_info');});
		$('#go_public_home').click(function(){controller.home()});
		$('#a_school').click(function(){controller.move('public','school_info')});
		$('#contact').click(function(){controller.move('public','contact')});
		$('#free_board').click(function(){controller.move('public','free_board')});
	};
	return {
		init : init,
		context : context,
		onCreate : onCreate,
		setContentView : setContentView,
		img : img,
		css : css,
		js : js,
		fonts : fonts
	}
})();
var session = (function(){
	var init = function(context){
		sessionStorage.setItem('context',context);
		sessionStorage.setItem('js',context+'/resources/js');
		sessionStorage.setItem('css',context+'/resources/css');
		sessionStorage.setItem('img',context+'/resources/img');
		sessionStorage.setItem('fonts',context+'/resources/fonts');
	};
	var getContextPath = function(){return sessionStorage.getItem('context');};
	var getJavascriptPath = function(){return sessionStorage.getItem('css');};
	var getCssPath = function(){return sessionStorage.getItem('js');};
	var getImagePath = function(){return sessionStorage.getItem('img');};
	var getFontsPath = function(){return sessionStorage.getItem('fonts');};
	return {
		init : init,
		getContextPath : getContextPath,
		getJavascriptPath : getJavascriptPath,
		getCssPath : getCssPath,
		getImagePath : getImagePath,
		getFontsPath : getFontsPath
	};
	
})();
var controller = (function(){
	var _page,_directory,_key;
	var setDirectory = function(directory){this._directory=directory;};
	var setPage = function(page){this._page=page;};
	var getDirectory = function(){return this._directory;};
	var getPage = function(){return this._page;};
	var setKey = function(key){this._key=key;};
	var getKey = function(){return this._key;};
	return{
		setDirectory : setDirectory,
		setPage : setPage,
		getDirectory : getDirectory,
		getPage : getPage,
		setKey : setKey,
		getKey : getKey,
		move : function(directory,page){
			setDirectory(directory);
			setPage(page);
			
			location.href=app.context()+'/'+getDirectory()+'/'+getPage();
		},
		moveWithKey : function(directory,page,key){
			setDirectory(directory);
			setPage(page);
			setKey(key);
			location.href=app.context()+'/'+getDirectory()+'/'+getPage()+'?key='+getKey();
		},
		home : function(){
			location.href=app.context()+'/';
		}
	};
})();
var util = (function(){
	return{
		isNumber : function(value){
			return typeof value === 'number' && isFinite(value);
		}
	};
})();
var nav = (function(){
	var init = function(){onCreate();};
	var setContentView = function(){
		$('#nav ul').addClass('list_style_none').addClass('over_hidden').addClass('bg_color_black').css('margin','0').css('padding','0');
		$('#nav li').addClass('float_left').addClass('display_inline').css('border-right','1px').css('solid','#bbb');
		$('#nav li:last-child').css('border-right','none');
		$('#nav li a').addClass('color_white').addClass('text_align_center').css('display','block').css('padding','3px 2px').css('text-decoration','none');
		
		$('#nav li a:hover:not(.active)').addClass('bg_color_green');
		$('#nav .active').addClass('bg_color_black');
		$('#header_brand').css('font-size','15px').addClass('cursor');
		$('#header_brand').attr('src',app.img()+'/default/gof.JPG').css('width','70px').css('height','40px');
		$('#header_brand_a_home').attr('alt','home').click(function(){controller.home();});
	};
	var onCreate = function(){setContentView()};
	return{
		init : init,
		setContentView : setContentView,
		onCreate : onCreate
	};
})();
/*
================ MAJOR_JS ==============
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
var major = (function(){})();
/*
========== PROF_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 교수
=====================================
*/
var member = (function(){
	var _name,_gender;
	var _age;
	var setName = function(name){this._name=name;};
	var getName = function(){return this._name;};
	var setAge = function(age){this._age=age;};
	var getAge = function(){return this._age;};
	var setGender = function(gender){this._gender=gender;};
	var getGender = function(){return this._gender;};
	var init = function(){onCreate();};
	var setContentView = function(){
		$('#member_content_img_home').attr('src',app.img()+'/default/home.jpg').css('width','30px');
		$('#member_content_a_home').attr('alt','home').click(function(){controller.home();});
		$('#member_content').addClass('box').css('font-size','20px');
		$('#member_content > article').css('width','300px')
		   .addClass('center').addClass('text_left');
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
		$('#member_content_ol > li:nth(7) > a').text('FIND');
		$('#member_content_ol > li:nth(8) > a').text('COUNT');
		$('#member_regist').addClass('box');			
		$('#member_regist_form').addClass('form-horizontal');
		$('#member_regist_form > div').addClass('form-group').addClass('form-group-lg');
		$('#member_regist_form > div > label').addClass('col-sm-2').addClass('control-label');
		$('#member_regist_form > div > div').addClass('col-sm-10');
		$('#member_regist_form > div > div > input').addClass('form-control');
		$('#member_regist #bt_join').addClass('btn').addClass('btn-primary');
		$('#member_regist #bt_cancel').addClass('btn').addClass('btn-danger');
		$('#member_regist #rd_major > label:gt(1)').addClass('radio-inline');
		$('#member_regist #ck_subject').addClass('checkbox');
		$('#member_regist #ck_subject > label').addClass('checkbox-inline');
		$('#member_find_form').attr('action',app.context()+'/member/search');
		$('#member_find_form input[type="hidden"]').attr('name','context').attr('value',app.context());
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
		$('#list').click(function(){controller.move('member','list');});
		$('#find_by').click(function(){controller.move('member','find_by');});
		$('#count').click(function(){controller.move('member','count');});
		$('#member_find_form input[type="submit"]').click(function(){$('#member_find_form').submit()});
		$('#member_login_form input[type="submit"]').click(function(){
			$('#member_login_form').submit();
		});
	};
	return {
		setName : setName,
		getName : getName,
		setAge : setAge,
		getAge : getAge,
		setGender : setGender,
		getGender : getGender,
		init : init,
		spec : function(){			
			},
		pub_login_form : function(){
			var view = '	<div class="box">'
				+'<form id="member_login_form" class="form-signin">'
				+'<h2 class="form-signin-heading">Please sign in</h2>'
				+'<label for="inputEmail" class="sr-only">Email address</label>'
				+'<input type="text" id="id" name="id" class="form-control" placeholder="USER ID" required autofocus>'
				+'<label for="inputPassword" class="sr-only">Password</label>'
				+' <input type="password" id="pw" name="pw" class="form-control" placeholder="Password" required>'
				+'<input type="hidden" name="context">'
				+'<div class="checkbox">'
				+'<label>'
				+'<input type="checkbox" name="remember_me" value="remember-me"> Remember me </label>'
				+'</div> <input id="login_btn" class="btn btn-lg btn-primary btn-block" type="submit" value="Sign in"/>'
				+'</form> </div>';
			$('#pub_article').html(view);
			$('#login_btn').click(function(e){
				e.preventDefault();
				$.ajax({
					url : app.context()+'/member/login',
					type: 'POST',
				    data: {'id':$('#id').val(),'pw':$('#pw').val()},
					dataType: 'json',
					success : function(data){
						if (data.id === 'NONE') {
							alert('ID 나 비번이 일치하지 않습니다.');
						} else {
							alert('환영합니다 '+data.name+' 님');
							var view = '<section id="user_content_service" class="box section-padded"><div>'
								+'<div class="row text-center title"><h2>Services</h2><h4 class="light muted">Achieve the best results with our wide variety of training options!</h4></div>'
								+'<div class="row services"><div class="col-md-4"><div id="kaup" class="service"><div class="icon-holder">'
								+'<img src="'+app.img()+'/icons/kaup.png" alt="" class="icon"></div><h4 class="heading">KAUP INDEX</h4>'
								+'<p class="description">A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p>'
								+'</div></div><div class="col-md-4"><div id="rock_sissor_paper" class="service"><div class="icon-holder">'
								+'<img src="'+app.img()+'/icons/rock_sis.jpg" alt="" class="icon"></div><h4 class="heading">ROCK SISSOR PAPER</h4>'
								+'<p class="description">A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p>'
								+'</div></div><div class="col-md-4"><div id="lotto_drawing" class="service"><div class="icon-holder">'
								+'<img src="'+app.img()+'/icons/lotto.jpg" alt="" class="icon">'
								+'</div><h4 class="heading">LOTTO DRAWING</h4><p class="description">A elementum ligula lacus ac quam ultrices a scelerisque praesent vel suspendisse scelerisque a aenean hac montes.</p>'
								+'</div></div></div></div><div class="cut cut-bottom"></div></section>'
								+'<section id="user_content_subject" class="section gray-bg"><div class="container"><div class="row title text-center">'
								+'<h2 class="margin-top">MAJOR SUBJECT</h2><h4 class="light muted">TOP 3</h4></div>'
								+'<div class="row"><div class="col-md-4"><div id="major_subject_1" class="team text-center">'
								+'<div class="cover" style="background:url('+app.img()+'/default/sana1.jpg"); background-size:cover;">'
								+'<div class="overlay text-center"><h3 class="white">JAVA</h3><h5 class="light light-white">Server Program Language</h5>'
								+'</div></div><img src="'+app.img()+'/team/java.jpg" alt="Team Image" class="avatar">'
								+'<div class="title"><h4>Java</h4><h5 class="muted regular">Server Program Language</h5></div>'
								+'<input type="hidden" name="major_subject_1" value="java"/>'
								+'<input type="button" data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" value="과목 정보 보기"/>'
								+'</div></div><div class="col-md-4"><div id="major_subject_2" class="team text-center">'
								+'<div class="cover" style="background:url('+app.img()+'/default/park1.jpg"); background-size:cover;">'
								+'<div class="overlay text-center"><h3 class="white">Javascript</h3>'
								+'<h5 class="light light-white">UI Program Language</h5></div></div>'
								+'<img src="'+app.img()+'/team/javascript.jpg" alt="Team Image" class="avatar">'
								+'<div class="title"><h4>Javascript</h4>'
								+'<h5 class="muted regular">UI Program Language</h5></div>'
								+'<input type="hidden" name="major_subject_2" value="javascript"/>'
								+'<input type="button" data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" value="과목 정보 보기"/>'
								+'</div></div><div class="col-md-4"><div id="major_subject_3" class="team text-center">'
								+'<div class="cover" style="background:url('+app.img()+'/default/han1.jpg"); background-size:cover;">'
								+'<div class="overlay text-center"><h3 class="white">SQL</h3>'
								+'<h5 class="light light-white">Database Management Language</h5></div></div>'
								+'<img src="'+app.img()+'/team/sql.jpg" alt="Team Image" class="avatar"><div class="title">'
								+'<h4>SQL</h4><h5 class="muted regular">Database Management Language</h5></div>'
								+'<input type="hidden" name="major_subject_3" value="sql"/>'
								+'<input type="button" data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" value="과목 정보 보기"/></div>'
								+'</div></div></div></section>';
							$('#pub_header').empty().load(app.context()+'/member/logined/header');
							$('#pub_article').html(view);
							/*
							$('#logout').on('click',function(){
								$.ajax(function(){
									url : '',
									dataType : 'POST',
									data : {},
								});
								
							});*/
						}
					},
					error : function(xhr,status,msg){
						alert('로그인 실패 이유 : '+msg);
					}
				});
			});
		},
		pub_sign_up : function(){
			var view = '<section id="member_regist"> <h2>회원가입</h2> <form id="member_regist_form">'
				+'<div><label for="exampleInputEmail1">이름</label> <div><input type="text" id="username" placeholder="NAME"></div> </div>'
				+'<div><label for="exampleInputEmail1">ID</label> <div><input type="text" id="id" placeholder="Id"></div> </div>'
				+'<div><label for="exampleInputPassword1">비밀번호</label>	<div><input type="password" id="password" placeholder="PASSWORD"></div></div>'
				+'<div><label for="exampleInputEmail1">SSN</label><div><input type="text" id="ssn" placeholder="예)800101-1"></div></div>'
				+'<div><label for="exampleInputEmail1">이메일</label><div><input type="email" id="email" placeholder="EMAIL"></div></div>'
				+'<div><label for="exampleInputEmail1">전화번호</label><div><input type="text" id="phone" placeholder="PHONE"></div></div>'
				+'<div id="rd_major"><label for="exampleInputEmail1">전공</label><br/>'
				+'<div><label><input type="radio" name="major" value="computer">컴공학부</label>'
				+'<label><input type="radio" name="major" value="mgmt">경영학부</label>'
				+'<label><input type="radio" name="major" value="math">수학부</label>'
				+'<label><input type="radio" name="major" value="eng">영문학부</label></div></div>'
				+'<div><label for="exampleInputEmail1">수강과목</label><br/><div> '
				+'<div id="ck_subject" class="checkbox">'
				+'<label><input type="checkbox" name="subject" value="java"> Java </label>'
				+'<label><input type="checkbox" name="subject" value="sql"> SQL </label>'
				+'<label><input type="checkbox" name="subject" value="cpp"> C++</label>'
				+'<label><input type="checkbox" name="subject" value="python"> 파이썬</label>'
				+'<label><input type="checkbox" name="subject" value="delphi"> 델파이</label>'
				+'<label><input type="checkbox" name="subject" value="html"> HTML</label></div></div></div>'
				+'<input type="hidden" name="action" value="regist" />'
				+'<input id="bt_join" type="submit" value="회원가입"/>'
				+'<input id="bt_cancel" type="reset" value="취소" /></form></section>	';
			$('#pub_article').html(view);
			member.init();
		}
	};
})();
/*
========== STUDENT_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
var user = (function(){
	var init = function(){
		onCreate();
	};
	var setContentView = function(){		
		$('#user_header').css('height','50px');
		$('.navbar-header').css('height','50px');
	};
	var onCreate = function(){
		setContentView();
		$('#bt_bom').click(function(){controller.move('','bom');});
		$('#bt_dom').click(function(){controller.move('','dom');});
		$('#bt_kaup').click(function(){controller.move('','kaup');});
		$('#bt_account').click(function(){controller.move('','account');});
		$('#c_deposit').click(function(){controller.move('account','deposit');});
		$('#c_withdraw').click(function(){controller.move('account','withdraw');});
		$('#c_update').click(function(){controller.move('account','update');});
		$('#account_delete_form').click(function(){controller.move('account','delete');});
		$('#c_list').click(function(){controller.move('account','list');});
		$('#c_find').click(function(){controller.move('account','find');});
		$('#c_count').click(function(){controller.move('account','count');});
		$('#c_regist').click(function(){controller.move('account','regist');});
		$('#user_content_service #kaup').addClass('cursor').click(function(){controller.move('member','kaup');});
		$('#user_content_service #rock_sissor_paper').addClass('cursor').click(function(){controller.move('member','rock_sissor_paper');});
		$('#user_content_service #lotto_drawing').addClass('cursor').click(function(){controller.move('member','lotto');});
		var key = $('#user_content_subject #major_subject_1 input[type="hidden"]').val();
		$('#user_content_subject #major_subject_1').click(function(){controller.moveWithKey('subject','detail',key);});
		$('#user_content_subject #major_subject_2').click(function(){controller.moveWithKey('member','lotto');});
		$('#user_content_subject #major_subject_3').click(function(){controller.moveWithKey('member','lotto');});
		$('#go_user_home').click(function(){controller.move('member','content');});
		$('#user_header #logout').addClass('cursor').click(function() {controller.home();});
		$('#user_header #a_mypage').click(function() {controller.move('member','content');});
		$('#user_header #a_detail').click(function() {controller.move('member','detail');});
		$('#user_header #a_update').click(function() {controller.move('member','update');});
		$('#user_header #a_delete').click(function() {controller.move('member','delete');});
		$("#user_header #grade li:eq(0) a").click(function(){controller.move('grade','detail');});
		$("#user_header #grade li:eq(1) a").click(function(){controller.move('grade','find');});
	};
	var context = sessionStorage.getItem("context");	
	return{
		init : init
	};
})();
/*
========== GRADE_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
var grade = (function(){
	var init = function(){onCreate();};
	var setContentView = function(){
		$('#grade_content_img_home').attr('src',app.img()+'/default/home.jpg').css('width','30px');
		$('#grade_content_a_home').attr('alt','home').click(function(){controller.home();});
		$('#grade_content').addClass('box').css('font-size','20px');
		$('#grade_content > article').css('width','300px')
		   .addClass('center').addClass('text_left');
		$('#grade_content a').css('font-size','15px').addClass('cursor');
		$('#grade_content > h1').text('GRADE MGMT');
		$('#grade_content_ol > li > a').addClass('remove_underline');
		$('#grade_content_ol > li:first > a').text('SIGN UP');
		$('#grade_content_ol > li:nth(1) > a').text('UPDATE');
		$('#grade_content_ol > li:nth(2) > a').text('DELETE');
		$('#grade_content_ol > li:nth(3) > a').text('LIST');
		$('#grade_content_ol > li:nth(4) > a').text('COUNT');
		$('#grade_content_ol > li:nth(5) > a').text('FIND');
	};
	var onCreate = function(){
		setContentView();
		$('#g_regist').click(function(){controller.move('grade','regist');});
		$('#g_update').click(function(){controller.move('grade','update');});
		$('#g_list').click(function(){controller.move('grade','list');});
		$('#g_find').click(function(){controller.move('grade','find');});
		$('#grade_regist').addClass('box').css('padding-top','0');			
		$('#grade_regist_form').addClass('form-horizontal');
		$('#grade_regist_form > div').addClass('form-group').addClass('form-group-lg');
		$('#grade_regist_form > div > label').addClass('col-sm-2').addClass('control-label');
		$('#grade_regist_form > div > div').addClass('col-sm-10');
		$('#grade_regist_form > div > div > input').addClass('form-control');
		$('#grade_regist #bt_send').addClass('btn').addClass('btn-primary');
		$('#grade_regist #bt_cancel').addClass('btn').addClass('btn-danger');
		$('#grade_update').addClass('box').css('padding-top','0');			
		$('#grade_update_form').addClass('form-horizontal');
		$('#grade_update_form > div').addClass('form-group').addClass('form-group-lg');
		$('#grade_update_form > div > label').addClass('col-sm-2').addClass('control-label');
		$('#grade_update_form > div > div').addClass('col-sm-10');
		$('#grade_update_form > div > div > input').addClass('form-control');
		$('#grade_update #bt_update').addClass('btn').addClass('btn-primary');
		$('#grade_update #bt_cancel').addClass('btn').addClass('btn-danger');
	};
	return {
		init : init
	};
})();
/*
========== BOARD_NOTICE_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
var notice = (function(){})();
/*
========== BOARD_QNA_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
var ana = (function(){})();
/*
========== SUBJECT_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
var subject = (function(){})();
/*
========== EXAM_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
var exam = (function(){})();
/*
========== ADMIN_JS =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
var admin = (function(){
	var _pass;
	var getPass = function(){return this._pass;};
	var setPass = function(pass){this._pass = pass;};
	var init = function(){onCreate();};
	var setContentView = function(){
		$('#admin_content').addClass('box').css('font-size','20px');
		$('#admin_content > article').css('width','300px')
		   .addClass('center').addClass('text_left');
		$('#admin_content a').css('font-size','15px').addClass('cursor');
		$('#admin_content > h1').text('관리자 메인화면');
		$('#admin_content_ol > li > a').addClass('remove_underline');
		$('#admin_content_ol > li:first > a').text('SIGN UP');
		$('#admin_content_ol > li:nth(1) > a').text('DETAIL');
		$('#admin_content_ol > li:nth(2) > a').text('UPDATE');
		$('#admin_content_ol > li:nth(3) > a').text('DELETE');
		$('#admin_content_ol > li:nth(4) > a').text('LIST');
		$('#admin_content_ol > li:nth(5) > a').text('FIND');
		$('#admin_content_ol > li:nth(6) > a').text('COUNT');
		$('#admin_content > h3').addClass('text_align_center');
	};
	var onCreate = function(){
		setContentView();
		$('#admin_nav #member_mgmt #list').click(function(){controller.move('member','list');});
		$('#admin_nav #member_mgmt #find_by').click(function(){controller.move('member','find_by');});
		$('#admin_nav #member_mgmt #count').click(function(){controller.move('member','count');});
		$('#admin_nav #account_mgmt #c_list').click(function(){controller.move('account','list');});
		$('#admin_nav #account_mgmt #c_regist').click(function(){controller.move('account','regist');});
		$('#admin_nav #account_mgmt #c_delete').click(function(){controller.move('account','delete');});
		$('#admin_nav #account_mgmt #c_find').click(function(){controller.move('account','find');});
		$('#admin_nav #account_mgmt #c_count').click(function(){controller.move('account','count');});
		$('#admin_content_img_home').attr('src',app.img()+'/default/home.jpg').css('width','30px');
		$('#admin_content_a_home').attr('alt','home').click(function(){controller.home();});
		$('#member_management').attr('src',app.img()+'/default/member_management.jpg').css('width','350px').css('height','420px');
		$('#grade_management').attr('src',app.img()+'/default/grade_management.jpg').css('width','350px').css('height','420px');
		$('#account_management').attr('src',app.img()+'/default/account_management.jpg').css('width','350px').css('height','420px');
		$('#go_admin_home').click(function() {controller.move('admin','main');});
		$('#admin_header').css('height','50px').css('color','white');
		$('.navbar-header').css('height','50px');
		$('#admin_header #exit').addClass('cursor');
		$('#admin_header #exit').click(function() {controller.home();});
		$('#admin_nav').css('height','50px');
		$('#g_regist').click(function(){alert('등록하시려면 회원리스트로 이동해 주세요');controller.move('member','list');})
		$('#g_update').click(function(){alert('수정하시려면 회원리스트로 이동해 주세요');controller.move('member','list');})
		$('#c_list').click(function(){controller.move('account','list');});
		$('#c_find').click(function(){controller.move('account','find');});
		$('#c_count').click(function(){controller.move('account','count');});
		$('#member_list_table .name').click(function(){controller.moveWithKey('member','a_detail','park');});
		$('#member_list_table .regist').click(function(){controller.moveWithKey('grade','a_regist','park');});
		$('#member_list_table .update').click(function(){controller.moveWithKey('grade','a_update','park');});
	};
	return{
		getPass : getPass,
		setPass : setPass,
		init : init,
		setContentView : setContentView,
		onCreate : onCreate,
		checkAdmin : function(){
			setPass(1);
			var isAdmin = confirm('관리자입니까?');
			if (!isAdmin) {
				alert('관리자만 접근 가능합니다.');
			} else {
				var password = prompt('관리자 비번을 입력바랍니다.');
				if(password == getPass()){
					controller.move('admin','main');
				} else {
					alert('관리자 비번이 틀립니다.');
				}
			}
			
		}
	};
})();