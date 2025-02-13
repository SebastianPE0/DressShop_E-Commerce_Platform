package com.alex.read_employee.web.read_employee_web.Repo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.alex.read_employee.web.read_employee_web.Entity.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, String>  {
    Optional<Employee> findOneByEmailAndPassword(String email, String password);
    Optional<Employee> findByEmail(String email);
}
