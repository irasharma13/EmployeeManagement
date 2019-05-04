//package com.greencrunch.developer.application.controller;
package com.employeemanagement.developer.application;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.Optional;
import org.json.JSONObject;

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
import com.employeemanagement.developer.application.DepartmentManagers;
import com.employeemanagement.developer.application.DepartmentsRepository;
import com.employeemanagement.developer.application.DepartmentManagersRepository;
import com.employeemanagement.developer.application.EmployeesRepository;


@RestController
class DepartmentManagersController {

	@Autowired
    private DepartmentManagersRepository repository;
    private DepartmentsRepository depRepository;
	private EmployeesRepository empRepository;

	public static void main(String[] args) {
        SpringApplication.run(DepartmentManagersController.class, args);
    }

    public DepartmentManagersController(DepartmentManagersRepository repository, DepartmentsRepository depRepository, EmployeesRepository empRepository) {
        this.repository = repository;
        this.depRepository = depRepository;
		this.empRepository = empRepository;
    }

	@GetMapping("managers/all")
    public List<String> getAllManagers() {

		System.out.println("Get all Managers");

		List<DepartmentManagers> managers = new ArrayList<>();
		repository.findAll().forEach(managers::add);
		List<String> manager_details = new ArrayList<>();
		
		for(int i=0; i<managers.size(); i++){
			String details = "{";
			List<Departments> department = depRepository.findByDeptNo(managers.get(0).getEmployeeId().getDeptNo());
			details += "\"Department Name\": \"" + department.get(0).getDeptName()+"\",";

			Optional<Employees> employee = empRepository.findById(managers.get(0).getEmployeeId().getEmpNo());
			if (employee.isPresent()){
				details += "\"Employee\": {\"Employee Number\": " + employee.get().getEmpNo() + ", \"First Name\": \"" + employee.get().getFirst_name() + "\", \"Last Name\": \"" + employee.get().getLastName() + "\"}}";
				manager_details.add(details);
			}
		}
		return manager_details;
		// return managers;
    }

	@GetMapping("managers/search/employee/{dept_name}")
	public ResponseEntity<List<Employees>> searchDepartmentManagers (@PathVariable("dept_name") String dept_name){
		System.out.println("Finding departments with department name: " + dept_name);

		List<Departments> departments = depRepository.findByDeptName(dept_name);
		if(departments.size() == 0){
			System.out.println("Failed to find department with department name: "+ dept_name);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		System.out.println(departments.get(0));
		String deptNo = departments.get(0).getDeptNo();
		List<DepartmentManagers> departmentManager = repository.findByEmployeeIdDeptNo(deptNo);

		List<Employees> managerEmployee = new ArrayList<>();

		for(int i=0; i<departmentManager.size(); i++){
			int empNo = departmentManager.get(i).getEmployeeId().getEmpNo();
			Optional<Employees> employee = empRepository.findById(empNo);
			if (employee.isPresent()){
				managerEmployee.add(employee.get());
			}
		}

		return new ResponseEntity<>(managerEmployee, HttpStatus.OK);
	}
}