-- Description: This file contains the SQL statements to create the 
-- blog database and posts table.
CREATE DATABASE IF NOT EXISTS blog;

CREATE TABLE IF NOT EXISTS blog.posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
