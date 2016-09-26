package com.hanbit.web.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.hanbit.web.domains.MemberDTO;

public class SessionInterceptor extends HandlerInterceptorAdapter{
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// Session id check
		HttpSession session = request.getSession();
		MemberDTO member = (MemberDTO) session.getAttribute("user");
		// Login false
		if(member.getId()==null){
			logger.info("Interceptor : Session INFO IS NONE");
			// main page로 이동
			response.sendRedirect("redirect:/");
			return false;
		}// login true
		else{
			logger.info("Interceptor : Session INFO IS FULL");
			return super.preHandle(request, response, handler);
		}
	}
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		super.postHandle(request, response, handler, modelAndView);
	}
}
