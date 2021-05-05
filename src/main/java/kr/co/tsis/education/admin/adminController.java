package kr.co.tsis.education.admin;
import kr.co.tsis.education.admin.DTOS.lectureDTO;
import kr.co.tsis.education.controller.TestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class adminController {
    @Autowired
    private adminService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @GetMapping("/main")
    public String main(){
        LOGGER.debug("void");
        return "admin/main";
    }
    @GetMapping("/getAdmin")
    public List<lectureDTO> getAdmin(){
        LOGGER.debug("void");
        return service.getAdmin();
    }
    @GetMapping("/getUser") //getUser/?searchvalue=1
    public List<lectureDTO> getUser(HttpServletRequest request){
        LOGGER.debug("request",request);
        String s = request.getParameter("searchvalue");
        return service.getUser(s);
    }
    @PostMapping("/setAdmin")
    public int setAdmin(@RequestParam("emp_id") String empId){
        LOGGER.debug("empId",empId);
        return service.setAdmin(empId);
    }
    @PostMapping("/delAdmin")
    public int delAdmin(@RequestParam("emp_id") String empId){
        LOGGER.debug("empId",empId);
        return service.delAdmin(empId);
    }

}
