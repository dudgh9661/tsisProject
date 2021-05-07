package kr.co.tsis.education.admin;
import kr.co.tsis.education.admin.DTOS.lectureDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class adminController {
    @Autowired
    private adminService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(adminController.class);

    @GetMapping("/admin")
    public String main(){
        LOGGER.debug("void");
        return "manager/admin";
    }
    @ResponseBody
    @GetMapping("/admin/getAdmin")
    public List<lectureDTO> getAdmin(){
        LOGGER.debug("void");
        return service.getAdmin();
    }
    @ResponseBody
    @GetMapping("/admin/getUser") //getUser/?searchvalue=1
    public List<lectureDTO> getUser(@RequestParam("searchvalue")String s){
        LOGGER.debug("request",s);
        return service.getUser(s);
    }
    @ResponseBody
    @PostMapping("/admin/setAdmin")
    public int setAdmin(@RequestParam("empId") List<String> empId){
        LOGGER.debug("empId",empId);
        int result=0;
        for(String item : empId){
            result = service.setAdmin(item);
        }
        return result;
    }
    @ResponseBody
    @PostMapping("/admin/delAdmin")
    public int delAdmin(@RequestParam("empId") List<String> empId){
        LOGGER.debug("empId",empId);
        int result=0;
        for(String item : empId){
            result = service.delAdmin(item);
        }
        return result;
    }

}
