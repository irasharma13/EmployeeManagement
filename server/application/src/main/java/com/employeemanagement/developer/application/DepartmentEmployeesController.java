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
import com.employeemanagement.developer.application.Departments;
import com.employeemanagement.developer.application.DepartmentEmployees;
import com.employeemanagement.developer.application.DepartmentsRepository;
import com.employeemanagement.developer.application.DepartmentEmployeesRepository;
import com.employeemanagement.developer.application.EmployeesRepository;


@RestController
class DepartmentEmployeesController {

	@Autowired
    private DepartmentEmployeesRepository repository;
    private DepartmentsRepository depRepository;
	private EmployeesRepository empRepository;

	public static void main(String[] args) {
        SpringApplication.run(DepartmentEmployeesController.class, args);
    }

    public DepartmentEmployeesController(DepartmentEmployeesRepository repository, DepartmentsRepository depRepository, EmployeesRepository empRepository) {
        this.repository = repository;
        this.depRepository = depRepository;
		this.empRepository = empRepository;
    }

	@GetMapping("emps/all")
    public List<Departments> getAllDepartments() {

		System.out.println("Get all Departments");

		List<Departments> departments = new ArrayList<>();
		depRepository.findAll().forEach(departments::add);
		
		return departments;
    }

	@GetMapping("emps/search/employee/{dept_name}")
	public ResponseEntity<List<Employees>> searchDepartment (@PathVariable("dept_name") String dept_name){
		System.out.println("Finding departments with department name: " + dept_name);

		List<Departments> departments = depRepository.findByDeptName(dept_name);
		if(departments.size() == 0){
			System.out.println("Failed to find department with department name: "+ dept_name);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		System.out.println(departments.get(0));
		String deptNo = departments.get(0).getDeptNo();
		List<DepartmentEmployees> departmentEmployee = repository.findByEmployeeIdDeptNo(deptNo);

		List<Employees> deptEmployee = new ArrayList<>();

		for(int i=0; i<departmentEmployee.size(); i++){
			int empNo = departmentEmployee.get(i).getEmployeeId().getEmpNo();
			Optional<Employees> employee = empRepository.findById(empNo);
			if (employee.isPresent()){
				deptEmployee.add(employee.get());
			}
		}

		return new ResponseEntity<>(deptEmployee, HttpStatus.OK);
	}
}