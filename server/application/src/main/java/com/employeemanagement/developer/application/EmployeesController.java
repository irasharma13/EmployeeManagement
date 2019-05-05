//package com.greencrunch.developer.application.controller;
package com.employeemanagement.developer.application;

import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Optional;

import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.boot.SpringApplication;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
 
import com.employeemanagement.developer.application.Employees;
import com.employeemanagement.developer.application.EmployeesRepository;


@RestController
class EmployeesController {

	@Autowired
    private EmployeesRepository repository;

	public static void main(String[] args) {
        SpringApplication.run(EmployeesController.class, args);
    }

    public EmployeesController(EmployeesRepository repository) {
        this.repository = repository;
		
    }
	
    @GetMapping("employees/all/{index}")
    public List<Employees> getAllEmployees(@PathVariable("index") Integer index) {

		System.out.println("Get all Employees");
		
		List<Employees> employees = new ArrayList<>();
		Pageable limit = PageRequest.of(index,50);
		repository.findAll(limit).forEach(employees::add);
		
		return employees;
    }

	@PostMapping("employees/add")
	public Employees insertEmployee(@RequestBody Employees employee) {

		System.out.println("Prints the new employee: " + employee);
		return repository.save(new Employees(employee.getEmpNo(), employee.getBirth_date(), employee.getFirst_name(), employee.getLastName(), employee.getHire_date(), employee.getGender()));

	}

	@PutMapping("employees/update/{id}")
	public ResponseEntity<Employees> updateEmployee(@PathVariable("id") Integer id, @RequestBody Employees employee) {
		System.out.println("Finding employee with id: " + id);
		// Employees _employee = repository.findByEmployeesEmpNo(id);

		List<Employees> employees = repository.findByEmpNo(id);
		Employees _employee = employees.get(0);
		if(_employee != null) {
			// Employees _employee = employeeOp.get();
			System.out.println("Found employee: " + _employee);
			_employee.setBirth_date(employee.getBirth_date());
			_employee.setFirst_name(employee.getFirst_name());
			_employee.setLastName(employee.getLastName());
			_employee.setHire_date(employee.getHire_date());
			_employee.setGender(employee.getGender());

			System.out.println("Updating Employee to: "+_employee);
            return new ResponseEntity<>(repository.save(_employee), HttpStatus.OK);
		}


        System.out.println("Failed to find transaction with id: "+ id);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("employees/search/employee/{emp_name}")
	public ResponseEntity<List<Employees>> searchEmployee (@PathVariable("emp_name") String emp_name){
		System.out.println("Finding employee with last name: " + emp_name);
		List<Employees> employees = repository.findByLastName(emp_name);
		 
		if(employees.size() == 0){
			System.out.println("Failed to find transaction with last name: "+ emp_name);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		else{
			return new ResponseEntity<>(employees, HttpStatus.OK);
		}
	}

	// @GetMapping("transaction/bankacct/{email}")
    // public Integer getBankAcct(@PathVariable String email) {
	// 	int acctnum = 0;
	// 	System.out.println("Finding user with email: " + email);
    //     Optional<User> userOp = userRepo.findById(email);
	// 	List<Transaction> transactions = new ArrayList<>();

	// 	if(userOp.isPresent()) {
	// 		User user = userOp.get();
	// 		System.out.println("Found user: "+user);
	// 		HashSet<Bank> banks = new HashSet<>(user.getBank());

	// 		System.out.println("User's banks include: "+banks);
	// 		acctnum = banks.iterator().next().getAcctnum();
	// 		System.out.println("The account number is: "+acctnum);
	// 	}
	// 	return acctnum;
    // }

	// @PostMapping(value = "/transaction/add")
    // public Transaction postTransaction(@RequestBody Transaction transaction) {
	// 	Optional<Bank> bankOp = bankRepo.findById(transaction.getBank().getAcctnum());
	// 	if(bankOp.isPresent()) {
	// 		Bank bank = bankOp.get();
	// 		System.out.println("Found bank: "+bank);
	// 		System.out.println("Posting transaction: "+transaction);
	// 		Transaction _transaction;
	// 		_transaction = repository.save(new Transaction(transaction.getType(), transaction.getAmount(), transaction.getCategory(),transaction.getItem(),transaction.getDate_time(),bank));
	// 		return _transaction;
	// 	}
    
    //     return transaction;
    // }

    // @PutMapping("/transaction/update/{id}")
    // public ResponseEntity<Transaction> updateTransaction(@PathVariable("id") Integer id, @RequestBody Transaction transaction ){
    //     System.out.println("Finding transaction with id: " + id);
    //     Optional<Transaction> transactionOp = repository.findById(id);

	// 	if(transactionOp.isPresent()) {
	// 		Transaction _transaction = transactionOp.get();
	// 		System.out.println("Found transaction: "+_transaction);
	// 		_transaction.setType(transaction.getType());
	// 		_transaction.setAmount(transaction.getAmount());
	// 		_transaction.setCategory(transaction.getCategory());
	// 		_transaction.setItem(transaction.getItem());
	// 		_transaction.setDate_time(transaction.getDate_time());
	// 		System.out.println("Updating transaction to: "+_transaction);
    //         return new ResponseEntity<>(repository.save(_transaction), HttpStatus.OK);
    //     } 
    //     System.out.println("Failed to find transaction with id: "+ id);
    //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }
}