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
 
import com.employeemanagement.developer.application.Departments;
import com.employeemanagement.developer.application.DepartmentEmployees;
import com.employeemanagement.developer.application.DepartmentsRepository;
import com.employeemanagement.developer.application.DepartmentEmployeesRepository;


@RestController
class DepartmentEmployeesController {

	@Autowired
    private DepartmentEmployeesRepository repository;
    private DepartmentsRepository depRepository;

	public static void main(String[] args) {
        SpringApplication.run(DepartmentEmployeesController.class, args);
    }

    public DepartmentEmployeesController(DepartmentEmployeesRepository repository, DepartmentsRepository depRepository) {
        this.repository = repository;
        this.depRepository = depRepository;
		
    }

	@GetMapping("employees/search/employee/{dept_name}")
	public ResponseEntity<List<Departments>> searchDepartment (@PathVariable("dept_name") String dept_name){
		System.out.println("Finding departments with department name: " + dept_name);

		List<Departments> departments = depRepository.findByDeptName(dept_name);
		System.out.println(departments.get(0));
		// if(departments.size() == 0){
		// 	System.out.println("Failed to find department with department name: "+ dept_name);
		// 	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		// }
		// else{
         
		return new ResponseEntity<>(departments, HttpStatus.OK);
		// }

        //pending work
	}
}