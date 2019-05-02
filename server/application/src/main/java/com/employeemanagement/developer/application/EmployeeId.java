import java.io.Serializable;
import lombok.*;
import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor
@ToString 
public class EmployeeId implements Serializable {
    private int deptNo;
    private int empNo;

    public EmployeeId(int deptNo, int empNo) {
        this.deptNo = deptNo;
        this.empNo = empNo;
    }

    @Override
    public int hashCode() {
        final int prime =31;
        int result = 1;
        result = prime * result + deptNo;
        result = prime * result + empNo;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) {
            return true;
        }
        if(obj == null) {
            return false;
        }
        if(getClass() != obj.getClass()) {
            return false;
        }
        EmployeeId other = (EmployeeId) obj;
        if(deptNo != other.deptNo) {
            return false;
        }
        if(empNo != other.empNo) {
            return false;
        }
        return true;
    }
}
