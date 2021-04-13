create database flink01 ; 
use flink01;

create table user(id int primary key auto_increment, email varchar(255), senha varchar(255) );
create table post(id int primary key auto_increment, titulo varchar(255), descricao varchar(255) , imagem varchar(255) );