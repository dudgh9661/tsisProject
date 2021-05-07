package kr.co.tsis.education.employee;

import kr.co.tsis.education.userCommon.dto.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public boolean check(String empId){
        return employeeRepository.checkEmployee(empId) > 0;
    }

    public int signup(Employee employee){
        return employeeRepository.signup(employee);
    }

    public Employee login(String empId){
        return employeeRepository.login(empId);
    }
}
