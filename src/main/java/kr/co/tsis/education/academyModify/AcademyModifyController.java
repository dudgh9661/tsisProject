package kr.co.tsis.education.academyModify;

import kr.co.tsis.education.academy.DTOS.academyDTO;
import kr.co.tsis.education.admin.adminController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AcademyModifyController {
    @Autowired
    private academtModifyService service;

    private static final Logger LOGGER = LoggerFactory.getLogger(AcademyModifyController.class);

    @GetMapping("/academyModify/getAcademy")
    public String getAcademy(@RequestParam("academyId")String id, Model model){
        if(id==null || id == ""){
            return "manager/academy_mod";
        }
        else {
            model.addAttribute("academy", service.getAcademy(id));
            return "manager/academy_mod";
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
