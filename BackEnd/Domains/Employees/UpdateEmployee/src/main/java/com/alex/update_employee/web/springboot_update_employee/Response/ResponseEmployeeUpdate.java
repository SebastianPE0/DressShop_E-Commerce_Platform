package com.alex.update_employee.web.springboot_update_employee.Response;

public class ResponseEmployeeUpdate {
    String message;
    Boolean status;

    public ResponseEmployeeUpdate(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }   

    public ResponseEmployeeUpdate(){


    }

    public String getMessage() {
        return message;
    }
     
    public void setMessage(String message){
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status){
        this.status = status;
    }

    @Override 
    public String toString(){
        return "LoginResponse{" +
                "message='" + message + '\'' +
                ", status=" + status +
                '}';
    }

   
}
