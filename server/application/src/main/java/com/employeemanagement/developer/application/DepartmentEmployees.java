//package com.greencrunch.developer.application.model;
package com.employeemanagement.developer.application;

import java.io.Serializable;
import lombok.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;


@Entity
@Getter @Setter
@NoArgsConstructor
@ToString /// @EqualsAndHashCode <--- THIS THING CAN CAUSE THE INFINITE LOOP
public class DepartmentEmployees implements Serializable {
    @Id
    @Column(name="dept_no")
    private @NonNull int deptNo;

    @Column(name="emp_no")
    private @NonNull int empNo;

    private @NonNull Date from_date;
    private @NonNull Date to_date;


   public DepartmentEmployees(int empNo, int deptNo, Date from_date, Date to_date) {

        this.empNo = empNo;
        this.deptNo = deptNo;
        this.from_date = from_date;
        this.to_date = to_date;
    }
}