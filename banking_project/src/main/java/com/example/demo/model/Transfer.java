package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "transfer")
public class Transfer {
public String getAccNo1() {
		return accNo1;
	}
	public void setAccNo1(String accNo1) {
		this.accNo1 = accNo1;
	}
	public String getAccNo2() {
		return accNo2;
	}
	public void setAccNo2(String accNo2) {
		this.accNo2 = accNo2;
	}
	public float getAmount() {
		return amount;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
private String accNo1;
private String accNo2;
private float amount;
}