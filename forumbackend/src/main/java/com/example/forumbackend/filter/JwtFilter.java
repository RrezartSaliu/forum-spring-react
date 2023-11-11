package com.example.forumbackend.filter;


import com.example.forumbackend.service.ForumUserService;
import com.example.forumbackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static org.springframework.util.StringUtils.hasText;


@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private ForumUserService forumUserService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //Get authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!hasText(header) || (hasText(header) && !header.startsWith("Bearer "))){
            filterChain.doFilter(request,response);
            return;
        }
        final String token = header.split(" ")[1].trim();
        //Get user identity and set it on the spring security context
        UserDetails userDetails = forumUserService.findByEmail(jwtUtil.getUserNameFromToken(token));

        //Get jwt token and validate
        if(!jwtUtil.validateToken(token, userDetails)){
            filterChain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails == null?List.of(): userDetails.getAuthorities()
        );
        authenticationToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request, response);
    }

}
