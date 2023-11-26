package com.example.forumbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

import java.util.*;

@Entity
public class ForumUser implements UserDetails {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String emailAddress;
    private String password;
    @Column(length = 2500)
    private String bio;
    private Date dateOfBirth;
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private List<ForumUser> friends;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Comment> comments;
    @OneToMany(fetch = FetchType.EAGER)
    private List<Topic> topics;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "forum_user_liked_topics",
        joinColumns = @JoinColumn(name = "forum_user_id"),
            inverseJoinColumns = @JoinColumn(name= "topic_id")
    )
    @JsonIgnore
    private Set<Topic> likedTopics;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "forum_user_liked_comments", joinColumns = @JoinColumn(name = "forum_user_id"), inverseJoinColumns = @JoinColumn(name = "comment_id"))
    @JsonIgnore
    private Set<Comment> likedComments;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "friend_requests",
            joinColumns = @JoinColumn(name = "sender_id"),
            inverseJoinColumns = @JoinColumn(name = "receiver_id")
    )
    @JsonIgnore
    private Set<ForumUser> sentFriendRequest = new HashSet<>();
    @ManyToMany(mappedBy = "sentFriendRequest", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<ForumUser> receivedFriendRequest = new HashSet<>();

    public ForumUser(Long id, String firstName, String lastName, String emailAddress, String password, Date dateOfBirth, List<ForumUser> friends, List<Comment> comments, List<Topic> topics) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.friends = friends;
        this.comments = comments;
        this.topics = topics;
    }

    public ForumUser() {

    }

    public void removeLikedComment(Comment comment){
        likedComments.remove(comment);
    }

    public void addLikedComment(Comment comment){
        likedComments.add(comment);
    }

    public Set<Comment> getLikedComments() {
        return likedComments;
    }

    public void setLikedComments(Set<Comment> likedComments) {
        this.likedComments = likedComments;
    }

    public void removeSentFriendRequest(ForumUser forumUser){
        sentFriendRequest.remove(forumUser);
    }

    public void removeReceivedFriendRequest(ForumUser forumUser){
        receivedFriendRequest.remove(forumUser);
    }

    public void addFriend(ForumUser forumUser){
        friends.add(forumUser);
    }

    public void addSendFriendRequest(ForumUser forumUser){
        sentFriendRequest.add(forumUser);
    }

    public void addReceiveFriendRequest(ForumUser forumUser){
        receivedFriendRequest.add(forumUser);
    }

    public Set<ForumUser> getSentFriendRequest() {
        return sentFriendRequest;
    }

    public void setSentFriendRequest(Set<ForumUser> sentFriendRequest) {
        this.sentFriendRequest = sentFriendRequest;
    }

    public Set<ForumUser> getReceivedFriendRequest() {
        return receivedFriendRequest;
    }

    public void setReceivedFriendRequest(Set<ForumUser> receivedFriendRequest) {
        this.receivedFriendRequest = receivedFriendRequest;
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

    public List<Comment> getComments() {
        return comments;
    }


    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new Authority("ROLE_NORMALUSER"));
        return roles;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return emailAddress;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public List<ForumUser> getFriends() {
        return friends;
    }

    public void setFriends(List<ForumUser> friends) {
        this.friends = friends;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
