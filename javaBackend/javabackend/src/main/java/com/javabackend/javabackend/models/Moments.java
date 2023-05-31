package com.javabackend.javabackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Moments(
    @Id
    String id,
    String caption,
    String description,
    String tag,
    String image
) {
    
}
