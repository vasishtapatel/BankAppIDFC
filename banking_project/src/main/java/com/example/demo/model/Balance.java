package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
@Data
@Document(collection="balance")
public class Balance {
@Id
private int custid;
private String accNo;
private String custName;
private String city;
private int balance;
private String ifscCode;
}
