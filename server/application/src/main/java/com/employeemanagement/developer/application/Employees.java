//package com.greencrunch.developer.application.model;
package com.employeemanagement.developer.application;

import java.io.Serializable;
import lombok.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
    private @NonNull int emp_no;

    private @NonNull Date birth_date;
  
    private @NonNull String first_name;
    private @NonNull String last_name;


    private @NonNull Date hire_date;

    private @NonNull String gender;

    public Employees(int emp_no, Date birth_date, String first_name, String last_name, Date hire_date, String gender) {

        this.emp_no = emp_no;
        this.birth_date = birth_date;
        this.first_name = first_name;
        this.last_name = last_name;
        this.hire_date = hire_date;
        this.gender = gender;
    }
}