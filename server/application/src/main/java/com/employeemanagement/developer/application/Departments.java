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


@Entity
@Getter @Setter
@NoArgsConstructor
@ToString /// @EqualsAndHashCode <--- THIS THING CAN CAUSE THE INFINITE LOOP
public class Departments implements Serializable {
    @Id
    @Column(name="dept_no")
    private @NonNull String deptNo;

    @Column(name="dept_name")  
    private @NonNull String deptName;

    public Departments(String deptNo, String deptName) {

        this.deptNo = deptNo;
        this.deptName = deptName;
    }

    @OneToMany(mappedBy = "departments", cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<DepartmentEmployees> department_e = new HashSet();
}