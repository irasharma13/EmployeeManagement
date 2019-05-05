//package com.greencrunch.developer.application.controller;
package com.employeemanagement.developer.application;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
 
import com.employeemanagement.developer.application.Employees;
// import com.employeemanagement.developer.application.Departments;
import com.employeemanagement.developer.application.Titles;
import com.employeemanagement.developer.application.TitlesRepository;
// import com.employeemanagement.developer.application.DepartmentManagersRepository;
import com.employeemanagement.developer.application.EmployeesRepository;


@RestController
class TitlesController {

	@Autowired
    private TitlesRepository repository;
    private DepartmentsRepository depRepository;
	private EmployeesRepository empRepository;
	public List<Titles> titles = new ArrayList<>();

	public static void main(String[] args) {
        SpringApplication.run(TitlesController.class, args);
    }

    public TitlesController(TitlesRepository repository, DepartmentsRepository depRepository, EmployeesRepository empRepository) {
        this.repository = repository;
        this.depRepository = depRepository;
		this.empRepository = empRepository;
    }

	@GetMapping("titles/all")
    public List<String> getAllTitles() {

		System.out.println("Get all the titles");
		
		List<String> titles = repository.findDistinctTitle();
		// Pageable limit = PageRequest.of(index,50);
		System.out.println("Here"); 
		System.out.println(titles.get(0));
		return titles;
    }

	@GetMapping("titles/search/employee/{title}")
	public ResponseEntity<List<Titles>> searchEmployeeTitle (@PathVariable("title") String title){
		System.out.println("Finding employees with title: " + title);

		this.titles= repository.findByTitle(title);
		if(titles.size() == 0){
			System.out.println("Failed to find employee with title: "+ title);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(titles, HttpStatus.OK);
	}

	@GetMapping("titles/employee/{index}")
	public ResponseEntity<List<Employees>> searchEmployeeTitle (@PathVariable("index") Integer index){

		List<Employees> employees = new ArrayList<>();

		for(int i=index; i<index+25 && i<titles.size(); i++){
			int empNo = this.titles.get(i).getEmpNo();
			Optional<Employees> employee = empRepository.findById(empNo);
			if (employee.isPresent()){
				employees.add(employee.get());
			}
		}

		if(employees.size() == 0){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}
}