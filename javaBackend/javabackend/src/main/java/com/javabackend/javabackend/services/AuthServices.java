package com.javabackend.javabackend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.javabackend.javabackend.models.Users;
import com.javabackend.javabackend.repositories.MongoUserRepository;
@Service
public class AuthServices {
    
    private MongoUserRepository userRepo;

    @Autowired
    MongoTemplate mongoTemplate ;

    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    
    AuthServices(MongoUserRepository userRepo){
        this.userRepo = userRepo;
    }

    public List<Users> getAllUsers(){
        return userRepo.findAll();
    }
    public Users getUserById (String id){
        return userRepo.findById(id).orElseThrow();
    }

    public void registerUser(Users user) {
       
      
        String password = bcrypt.encode(user.getPassword());
       user.setPassword(password);
        userRepo.save(user);
    }

    public Users checkUserAvailable(String st){
       
        Query query = new Query();
        query.addCriteria(Criteria.where("username").is(st));
        Users us = mongoTemplate.findOne(query, Users.class);
        

        if(us == null){
            return null;
        }

        return us;
    }

    public void deleteAll() {
        userRepo.deleteAll();
    }
    public void deleteById( String Id){
        userRepo.deleteById(Id);
    }
}
