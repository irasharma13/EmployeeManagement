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
public class Employees implements Serializable {
    @Id
    private @NonNull int emp_no;

    private @NonNull Date birth_date;
  
    private @NonNull String first_name;
    private @NonNull String last_name;

    private @NonNull enum gender
    {
        M, F;
    }
    private @NonNull Date hire_date;


    


}