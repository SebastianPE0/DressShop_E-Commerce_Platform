package com.alex.login.web.login_springboot.Service;

import com.alex.login.web.login_springboot.Dto.LoginDTO;
import com.alex.login.web.login_springboot.Response.LoginResponse;

public interface ILoginService {
    
    LoginResponse  loginEmployee(LoginDTO loginDTO);
}
