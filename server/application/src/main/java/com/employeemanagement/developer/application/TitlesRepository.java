//package com.greencrunch.developer.application.repo;
package com.employeemanagement.developer.application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
 
import org.springframework.data.repository.CrudRepository;
 
import com.employeemanagement.developer.application.Titles;
// import com.employeemanagement.developer.application.EmployeeId;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface TitlesRepository extends CrudRepository<Titles, Integer> {

	List<Titles> findByTitle(String title);
	@Query("SELECT DISTINCT title FROM Titles")
	List<String> findDistinctTitle();

}