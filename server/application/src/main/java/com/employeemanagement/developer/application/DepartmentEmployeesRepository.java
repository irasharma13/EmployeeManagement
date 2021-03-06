//package com.greencrunch.developer.application.repo;
package com.employeemanagement.developer.application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
 
import org.springframework.data.repository.CrudRepository;
 
import com.employeemanagement.developer.application.DepartmentEmployees;
import com.employeemanagement.developer.application.EmployeeId;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface DepartmentEmployeesRepository extends CrudRepository<DepartmentEmployees, EmployeeId> {

	List<DepartmentEmployees> findByEmployeeIdDeptNo(String deptNo);
}