package com.example.demo.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Deposit;
@Repository
public interface Deposit_Repo extends ReactiveMongoRepository<Deposit,
Integer>{
}