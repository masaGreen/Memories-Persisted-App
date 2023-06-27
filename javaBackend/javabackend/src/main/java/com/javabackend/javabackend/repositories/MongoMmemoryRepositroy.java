package com.javabackend.javabackend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.javabackend.javabackend.models.Moments;

public interface MongoMmemoryRepositroy extends MongoRepository<Moments, String>  {
    
}
