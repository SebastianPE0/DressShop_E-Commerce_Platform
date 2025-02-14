package com.alex.update_employee.web.springboot_update_employee.Dto;

public class EmployeeDTO {
    private String employeeid;
    private String employeename;
    private String email;
    private String password;

    // Constructor con parámetros
    public EmployeeDTO(String employeeid, String employeename, String email, String password) {
        this.employeeid = employeeid;
        this.employeename = employeename;
        this.email = email;
        this.password = password;
    }

    // Constructor vacío
    public EmployeeDTO() {
    }

    // Getter y Setter para employeeid
    public String getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(String employeeid) {
        this.employeeid = employeeid;
    }

    // Getter y Setter para employeename
    public String getEmployeename() {
        return employeename;
    }

    public void setEmployeename(String employeename) {
        this.employeename = employeename;
    }

    // Getter y Setter para email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter y Setter para password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString(){
            return "EmployeeDTO{" +
                    "employeeid=" + employeeid +
                    ", employeename='" + employeename + '\'' +
                    ", email='" + email + '\'' +
                    ", password='" + password + '\'' +
                    '}';
    }
}
