package com.javabackend.javabackend.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;


import com.javabackend.javabackend.models.Users;

public interface MongoUserRepository extends MongoRepository<Users, String>{
    
  
}
