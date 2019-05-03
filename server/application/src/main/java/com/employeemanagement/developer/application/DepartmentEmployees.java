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
// import com.employeemanagement.developer.application.EmployeeId;

// @Embeddable class EmployeeId {empNo, deptNo}
@Entity
@IdClass(EmployeeId.class)
@Getter @Setter
@NoArgsConstructor
@ToString /// @EqualsAndHashCode <--- THIS THING CAN CAUSE THE INFINITE LOOP
public class DepartmentEmployees { // implements Serializable {
    // @EmbeddedId EmployeeId employeeId;
    @Id
    @Column(name="dept_no")
    private int deptNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @PrimaryKeyJoinColumn(name = "departments_dept_no")
    private @NonNull Departments departments;

    @Id
    @Column(name="emp_no")
    private int empNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonManagedReference
    @PrimaryKeyJoinColumn(name = "employees_emp_no")
    private @NonNull Employees employees;

    private Date from_date;
    private Date to_date;

    public DepartmentEmployees(int empNo, Date from_date, Date to_date) {

        this.empNo = empNo;
        this.deptNo = deptNo;
        this.from_date = from_date;
        this.to_date = to_date;
    }
}