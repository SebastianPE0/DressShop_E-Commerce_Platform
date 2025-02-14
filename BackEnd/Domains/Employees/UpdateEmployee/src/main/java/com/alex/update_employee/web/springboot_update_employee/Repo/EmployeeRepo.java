package com.alex.update_employee.web.springboot_update_employee.Repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import com.alex.update_employee.web.springboot_update_employee.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

@EnableJpaRepositories
@Repository
public interface EmployeeRepo extends JpaRepository<Employee, String>{
     Optional<Employee> findOneByEmailAndPassword(String email, String password);
    Employee findByEmail(String email);
    //Employee findById(String id);
}
