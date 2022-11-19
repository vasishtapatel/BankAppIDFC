package com.example.demo.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Balance;
import reactor.core.publisher.Mono;
@Repository
public interface Balance_Repo extends ReactiveMongoRepository<Balance,
Integer>{
}