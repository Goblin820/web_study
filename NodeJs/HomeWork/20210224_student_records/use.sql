CREATE DATABASE student_records; 

USE student_records;

CREATE TABLE student_info(
    id INT NOT NULL AUTO_INCREMENT UNIQUE KEY,
    name VARCHAR(20) NOT NULL PRIMARY KEY,
    age INT(20) UNSIGNED NOT NULL DEFAULT 13 ,
    sex VARCHAR(5) NOT NULL,
    height INT(5) UNSIGNED DEFAULT 176 ,
    address VARCHAR(50) DEFAULT '한국'
);

-- 데이터베이스 필드(컬럼) 옵션 변경
ALTER TABLE student_info CHANGE name name VARCHAR(20) NOT NULL PRIMARY KEY;

