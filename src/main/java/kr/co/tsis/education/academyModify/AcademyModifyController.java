package kr.co.tsis.education.academyModify;

import kr.co.tsis.education.academy.DTOS.academyDTO;
import kr.co.tsis.education.admin.DTOS.lectureDTO;
import kr.co.tsis.education.admin.adminController;
import kr.co.tsis.education.userCommon.dto.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Controller
public class AcademyModifyController {
    @Autowired
    private academtModifyService service;

    private static final Logger LOGGER = LoggerFactory.getLogger(AcademyModifyController.class);

    @GetMapping("/academyModify/getAcademy")
    public String getAcademy(@RequestParam("academyId")String id, Model model, HttpServletRequest request){
        try {
            HttpSession session = request.getSession();
            Employee loginUser = (Employee) session.getAttribute("loginUser");
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                if(id==null || id == ""){
                    return "manager/academy_mod";
                }
                else {
                    model.addAttribute("empName",loginUser.getEmpName());
                    model.addAttribute("academy", service.getAcademy(id));
                    return "manager/academy_mod";
                }
            }
        } catch (Exception e) {
            return "redirect:/";
        }
    }
    @ResponseBody
    @PostMapping(value = {"/academyModify/addAcademy","/academyModify/setAcademy"})
    public int addAcademy(@RequestBody academyDTO dto){
        if(dto.getAcademyName() == null || dto.getAcademyName() == ""){
            return -1;
        }
        if(dto.getAcademyId() == null){
            return service.addAcademy(dto);
        }
        else{
            return service.setAcademy(dto);
        }
    }
}
