package kr.co.tsis.education.admin;

import kr.co.tsis.education.admin.DTOS.lectureDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class adminService {
    @Autowired
    private adminRepository dao;

    public List<lectureDTO> getAdmin(){
        return dao.getAdmin();
    }
    public List<lectureDTO> getUser(String s){
        List<lectureDTO> non= new ArrayList<>();
        if(s==null){
            return non;
        }
        else if(s.charAt(0)-'0'>=0 && s.charAt(0)-'0'<=9){
            return dao.getUserById(s);
        }
        else{
            return dao.getUserByName(s);
        }
    }
    public int setAdmin(String empId){
        return dao.setAdmin(empId);
    }
    public int delAdmin(String empId){
        return dao.delAdmin(empId);
    }
}
