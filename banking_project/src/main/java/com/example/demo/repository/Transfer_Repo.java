package com.example.demo.repository;


import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Transfer;
@Repository
public interface Transfer_Repo extends ReactiveMongoRepository<Transfer,
Integer> {
}