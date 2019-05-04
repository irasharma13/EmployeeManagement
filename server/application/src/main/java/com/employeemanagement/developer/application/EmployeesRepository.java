//package com.greencrunch.developer.application.repo;
package com.employeemanagement.developer.application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
 
import org.springframework.data.repository.CrudRepository;
 
import com.employeemanagement.developer.application.Employees;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface EmployeesRepository extends JpaRepository<Employees, Integer> {

	List<Employees> findByEmpNo(int empNo);
	List<Employees> findByLastName(String lastName);
}