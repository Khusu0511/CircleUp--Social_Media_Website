CREATE DATABASE IF NOT EXISTS circleup_db;
USE circleup_db;

-- Table for Users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    coverPic VARCHAR(255),
    profilePic VARCHAR(255),
    city VARCHAR(100),
    website VARCHAR(255)
);

-- Table for Posts
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `desc` TEXT,
    img VARCHAR(255),
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Table for Comments
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `desc` TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL,
    postId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Table for Likes
CREATE TABLE IF NOT EXISTS likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    UNIQUE(userId, postId), -- A user can only like a post once
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Table for Follower/Following Relationships
CREATE TABLE IF NOT EXISTS relationships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    followerUserId INT NOT NULL,
    followedUserId INT NOT NULL,
    UNIQUE(followerUserId, followedUserId), -- Ensures a user can't follow the same person multiple times
    FOREIGN KEY (followerUserId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followedUserId) REFERENCES users(id) ON DELETE CASCADE
);
