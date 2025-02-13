package com.alex.delete_employee.web.delete_employee.Repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.alex.delete_employee.web.delete_employee.Entity.Employee;


public interface EmployeeRepo extends JpaRepository<Employee, String> {
    Optional<Employee> findOneByEmailAndPassword(String email, String password);
    Employee findByEmail(String email);
    Employee findById(long id);
}
