package com.example.forumbackend.dto;

import com.example.forumbackend.model.Comment;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class ForumUserResponseDTO {
    private Long fUserId;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private Date dateOfBirth;
    private String bio;
    private List<ForumUser> friends;
    private Set<Topic> likedTopics;
    private Set<ForumUser> receivedRequests;
    private Set<ForumUser> sentRequests;


    public ForumUserResponseDTO(Long fUserId, String firstName, String lastName, String emailAddress, Date dateOfBirth, List<ForumUser> friends) {
        this.fUserId = fUserId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.dateOfBirth = dateOfBirth;
        this.friends = friends;
    }

    public Set<ForumUser> getSentRequests() {
        return sentRequests;
    }

    public void setSentRequests(Set<ForumUser> sentRequests) {
        this.sentRequests = sentRequests;
    }

    public Set<ForumUser> getReceivedRequests() {
        return receivedRequests;
    }

    public void setReceivedRequests(Set<ForumUser> receivedRequests) {
        this.receivedRequests = receivedRequests;
    }

    public Set<Topic> getLikedTopics() {
        return likedTopics;
    }

    public void setLikedTopics(Set<Topic> likedTopics) {
        this.likedTopics = likedTopics;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Long getfUserId() {
        return fUserId;
    }

    public void setfUserId(Long fUserId) {
        this.fUserId = fUserId;
    }

    public List<ForumUser> getFriends() {
        return friends;
    }

    public void setFriends(List<ForumUser> friends) {
        this.friends = friends;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
