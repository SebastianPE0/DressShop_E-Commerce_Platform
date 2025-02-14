package com.alex.autentication.web.autentication_sprintboot.Repo;

import com.alex.autentication.web.autentication_sprintboot.Entity.Employee;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


@EnableJpaRepositories
@Repository
public interface EmployeeRepo extends JpaRepository<Employee,String>
{
    Optional<Employee> findOneByEmailAndPassword(String email, String password);
    Employee findByEmail(String email);

}
