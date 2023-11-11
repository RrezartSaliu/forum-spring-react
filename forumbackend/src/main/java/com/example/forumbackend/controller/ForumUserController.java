package com.example.forumbackend.controller;

import com.example.forumbackend.dto.AuthCredentialsRequest;
import com.example.forumbackend.dto.ForumUserResponseDTO;
import com.example.forumbackend.dto.TopicResponseDTO;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import com.example.forumbackend.service.ForumUserService;
import com.example.forumbackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/ForumUser")
public class ForumUserController {
    @Autowired
    private ForumUserService forumUserService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody AuthCredentialsRequest req){
        try{
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    req.getEmail(), req.getPassword()
                            )
                    );
            ForumUser forumUser = (ForumUser) authenticate.getPrincipal();
            forumUser.setPassword(null);
            return ResponseEntity.ok()
                    .header(
                        HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(forumUser)
                    )
                    .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "*")
                    //TODO create userview with only needed data
                    .body(forumUser);
        } catch (BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @PostMapping("/add")
    public String addNewUser(@RequestBody ForumUser forumUser){
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(forumUser.getEmailAddress());
        if(matcher.matches()) {
            if (forumUserService.findByEmail(forumUser.getEmailAddress()) == null) {
                forumUserService.addNewForumUser(forumUser);
                return "user registered";
            }
            else {
                return "user exists";
            }
        }
        else {
            return "email not valid";
        }
    }

    @GetMapping("/my-profile")
    public ResponseEntity<?> getProfilePage(@AuthenticationPrincipal ForumUser forumUser){
        ForumUserResponseDTO forumUserResponseDTO = new ForumUserResponseDTO(forumUser.getId(), forumUser.getFirstName(), forumUser.getLastName(), forumUser.getEmailAddress(), forumUser.getDateOfBirth(), forumUser.getFriends());
        forumUserResponseDTO.setLikedTopics(forumUser.getLikedTopics());
        forumUserResponseDTO.setBio(forumUser.getBio());
        forumUserResponseDTO.setReceivedRequests(forumUser.getReceivedFriendRequest());
        return ResponseEntity.ok(forumUserResponseDTO);
    }

    @GetMapping("/{forumUserId}")
    public ResponseEntity<?> getForumUserDetails(@PathVariable Long forumUserId, @AuthenticationPrincipal ForumUser currentForumUser){
        if(currentForumUser.getId().equals(forumUserId))
            return ResponseEntity.status(256).build();
        ForumUser forumUser = forumUserService.findById(forumUserId);
        ForumUserResponseDTO forumUserResponseDTO = new ForumUserResponseDTO(forumUser.getId(), forumUser.getFirstName(), forumUser.getLastName(), null, forumUser.getDateOfBirth(), forumUser.getFriends());

        return ResponseEntity.ok(forumUserResponseDTO);
    }


    @PostMapping("/edit-profile")
    public ResponseEntity<?> updateUserInfo(@AuthenticationPrincipal ForumUser forumUser, @RequestBody ForumUser forumUserReq){
        forumUserService.updateForumUser(forumUser.getId(), forumUserReq.getFirstName(), forumUserReq.getLastName(), forumUserReq.getDateOfBirth(), forumUserReq.getBio());

        return ResponseEntity.ok(null);
    }

    @PostMapping("/send-friend-request")
    public ResponseEntity<?> sendFriendRequest(@AuthenticationPrincipal ForumUser forumUser, @RequestBody ForumUser reqReceiver){
        forumUserService.sendFriendRequest(forumUser.getId(), reqReceiver.getId());

        return ResponseEntity.ok(null);
    }

    @PostMapping("/accept-friend-request")
    public ResponseEntity<?> acceptFriendRequest(@AuthenticationPrincipal ForumUser forumUser, @RequestBody ForumUser senderReq){
        forumUserService.acceptFriendRequest(forumUser.getId(), senderReq.getId());

        return ResponseEntity.ok(null);
    }
}
