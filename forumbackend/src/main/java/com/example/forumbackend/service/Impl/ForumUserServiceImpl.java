package com.example.forumbackend.service.Impl;

import com.example.forumbackend.model.Authority;
import com.example.forumbackend.model.ForumUser;
import com.example.forumbackend.model.Topic;
import com.example.forumbackend.repository.AuthorityRepository;
import com.example.forumbackend.repository.ForumUserRepository;
import com.example.forumbackend.repository.TopicRepository;
import com.example.forumbackend.service.ForumUserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ForumUserServiceImpl implements ForumUserService {
    private final ForumUserRepository forumUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthorityRepository authorityRepository;
    private final TopicRepository topicRepository;

    public ForumUserServiceImpl(ForumUserRepository forumUserRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository, TopicRepository topicRepository) {
        this.forumUserRepository = forumUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public List<ForumUser> getAllForumUsers() {
        return forumUserRepository.findAll();
    }

    @Override
    public ForumUser addNewForumUser(ForumUser forumUser) {
        forumUser.setPassword(passwordEncoder.encode(forumUser.getPassword()));
        Authority authority = new Authority("ROLE_NORMALUSER");
        forumUser.setFriends(new ArrayList<>());
        forumUser.setTopics(new ArrayList<>());
        forumUser.setComments(new ArrayList<>());
        forumUser.setLikedTopics(new HashSet<>());
        forumUser.setSentFriendRequest(new ArrayList<>());
        forumUser.setReceivedFriendRequest(new ArrayList<>());
        ForumUser fUser = forumUserRepository.save(forumUser);
        authority.setForumUser(fUser);
        authorityRepository.save(authority);
        return fUser;
    }

    @Override
    public ForumUser findById(Long id) {
        return forumUserRepository.findById(id).orElseThrow();
    }

    @Override
    public ForumUser findByEmail(String email) {
        return forumUserRepository.findByEmailAddress(email);
    }

    @Override
    public ForumUser updateForumUser (Long forumUserId, String firstName, String lastName, Date dateOfBirth, String bio){
        ForumUser forumUser = this.findById(forumUserId);
        forumUser.setFirstName(firstName);
        forumUser.setLastName(lastName);
        forumUser.setDateOfBirth(dateOfBirth);
        forumUser.setBio(bio);
        return forumUserRepository.save(forumUser);
    }

    @Override
    public void sendFriendRequest(Long senderId, Long receiverId){
        ForumUser sender= this.findById(senderId);
        ForumUser receiver = this.findById(receiverId);
        sender.addSendFriendRequest(receiver);
        receiver.addReceiveFriendRequest(sender);
        forumUserRepository.save(sender);
        forumUserRepository.save(receiver);
    }

    @Override
    public void likeTopic(Long forumUserId, Long topicId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow();
        topic.setLikes(topic.getLikes()+1);
        topicRepository.save(topic);
        ForumUser forumUser = this.findById(forumUserId);
        Set<Topic> addedTopic = forumUser.getLikedTopics();
        addedTopic.add(topic);
        forumUser.setLikedTopics(addedTopic);
        forumUserRepository.save(forumUser);
    }

    @Override
    public void unlikeTopic(Long forumUserId, Long topicId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow();
        topic.setLikes(topic.getLikes()-1);
        topicRepository.save(topic);
        ForumUser forumUser = this.findById(forumUserId);
        Set<Topic> removedTopic = forumUser.getLikedTopics();
        removedTopic.remove(topic);
        forumUser.setLikedTopics(removedTopic);
        forumUserRepository.save(forumUser);
    }

    @Override
    public void acceptFriendRequest(Long receiverId, Long senderId) {
        ForumUser receiver = findById(receiverId);
        ForumUser sender = findById(senderId);
        receiver.removeReceivedFriendRequest(sender);
        sender.removeSentFriendRequest(receiver);
        receiver.addFriend(sender);
        sender.addFriend(receiver);
        forumUserRepository.save(receiver);
        forumUserRepository.save(sender);
    }
}
