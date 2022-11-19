package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Balance;
import com.example.demo.model.Deposit;
import com.example.demo.model.Transfer;
import com.example.demo.model.Withdraw;
import com.example.demo.repository.Balance_Repo;
import com.example.demo.repository.Deposit_Repo;
import com.example.demo.repository.Transfer_Repo;
import com.example.demo.repository.Withdraw_Repo;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
@RestController
public class Controller {
private Withdraw withdraw=new Withdraw();
private Balance balance=new Balance();
private Deposit deposit=new Deposit();
private Transfer transfer=new Transfer();
@Autowired
private Deposit_Repo deposit_repo;
@Autowired
private Balance_Repo balance_repo;
@Autowired
private Withdraw_Repo withdraw_repo;
@Autowired
private Transfer_Repo transfer_repo;
//Create a new user
@PostMapping("/adduser")
public Mono<Balance> adduser(@RequestBody Balance b){
return balance_repo.save(b);
}

//View Balance
@GetMapping("/viewbalance/{custId}")
public Mono<Balance> viewbalance(@PathVariable int custId){
return balance_repo.findById(custId);
}

//Deposit Amount
@GetMapping("/deposit/{accNo}/{amount}/{ifscCode}/{custid}")
public Mono<Deposit> depositAmt(@PathVariable String accNo,
@PathVariable int amount,@PathVariable String ifscCode,@PathVariable int custid){	
balance_repo.findById(custid)
.doOnNext(ab->{
ab.setBalance(ab.getBalance()+amount);
})
.flatMap(balance_repo::save).block();

return deposit_repo.save(new Deposit(accNo,amount));

}
//Transfer Amount
@GetMapping("/transfer/{accNo1}/{accNo2}/{ifscCode}/{amount}/{custid1}/{custid2}")
public Mono<Transfer> transferamt(@PathVariable String
accNo1,@PathVariable String accNo2,@PathVariable String ifscCode,@PathVariable int amount,@PathVariable int custid1,@PathVariable int custid2){
balance_repo.findById(custid1)
.doOnNext(ab->{
ab.setBalance(ab.getBalance()-amount);
System.out.println(ab);
})
.flatMap(balance_repo::save)
.block();

balance_repo.findById(custid2)
.doOnNext(ab->{
ab.setBalance(ab.getBalance()+amount);
})
.flatMap(balance_repo::save)
.block();
return transfer_repo.save(new Transfer(accNo1,accNo2,amount));
}
//Withdraw Amount
@GetMapping("/withdraw/{accNo}/{amount}/{ifscCode}/{custid}")
public Mono<Withdraw> withdrawamt(@PathVariable String
accNo,@PathVariable int amount,@PathVariable String ifscCode,@PathVariable int custid){
balance_repo.findById(custid)
.doOnNext(ab->{
ab.setBalance(ab.getBalance()-amount);
})
.flatMap(balance_repo::save)
.block();
return withdraw_repo.save(new Withdraw(accNo,amount));
}

@GetMapping("/transactions")
public Flux<Transfer> getAllTransactions(){
	
	return transfer_repo.findAll();
	
}
}
