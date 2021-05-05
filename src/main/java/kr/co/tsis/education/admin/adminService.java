package kr.co.tsis.education.admin;

import kr.co.tsis.education.admin.DTOS.lectureDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class adminService {
    @Autowired
    private adminRepository dao;

    public List<lectureDTO> getAdmin(){
        return dao.getAdmin();
    }
    public List<lectureDTO> getUser(String s){
        return dao.getUser(s);
    }
    public int setAdmin(String empId){
        return dao.setAdmin(empId);
    }
    public int delAdmin(String empId){
        return dao.delAdmin(empId);
    }
}
