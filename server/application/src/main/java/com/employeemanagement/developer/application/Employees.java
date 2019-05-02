//package com.greencrunch.developer.application.model;
package com.employeemanagement.developer.application;

import java.io.Serializable;
import lombok.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.Set;
import java.util.HashSet;
import java.util.Date;

enum Gender
{
    M, F;
}

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString /// @EqualsAndHashCode <--- THIS THING CAN CAUSE THE INFINITE LOOP
public class Employees implements Serializable {
    @Id
    @Column(name="emp_no")
    private @NonNull int empNo;

    private @NonNull Date birth_date;
  
    private @NonNull String first_name;
    
    @Column (name="last_name")
    private @NonNull String lastName;


    private @NonNull Date hire_date;

    private @NonNull String gender;

    @OneToMany(mappedBy = "employees", cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<DepartmentEmployees> d_employee = new HashSet();

    public Employees(int empNo, Date birth_date, String first_name, String lastName, Date hire_date, String gender) {

        this.empNo = empNo;
        this.birth_date = birth_date;
        this.first_name = first_name;
        this.lastName = lastName;
        this.hire_date = hire_date;
        this.gender = gender;
    }
}