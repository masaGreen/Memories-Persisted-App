package com.javabackend.javabackend.models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

public class Moments {
    @Id
    private String id;
    private String caption;
    private String description;
    private String tag;
    private String image;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
    public Moments(String id, String caption, String description, String tag, String image, LocalDateTime createdAt,
            LocalDateTime updatedAt) {
        this.id = id;
        this.caption = caption;
        this.description = description;
        this.tag = tag;
        this.image = image;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getCaption() {
        return caption;
    }
    public void setCaption(String caption) {
        this.caption = caption;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getTag() {
        return tag;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setcreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    @Override
    public String toString() {
        return "Moments [id=" + id + ", caption=" + caption + ", description=" + description + ", tag=" + tag
                + ", image=" + image + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + "]";
    }
}
