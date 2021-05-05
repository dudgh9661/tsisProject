package kr.co.tsis.education.academyModify;

import kr.co.tsis.education.academy.DTOS.academyDTO;
import kr.co.tsis.education.admin.adminController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/academyModify")
public class AcademyModifyController {
    @Autowired
    private academtModifyService service;

    private static final Logger LOGGER = LoggerFactory.getLogger(AcademyModifyController.class);
    @ResponseBody
    @GetMapping("/main")
    public String main(){
        return "academyModify/main";
    }
    @ResponseBody
    @GetMapping("/getAcademy")
    public academyDTO getAcademy(@RequestParam("academyId")String id){
        return service.getAcademy(id);
    }
    @ResponseBody
    @PostMapping("setAcademy")
    public int setAcademy(@RequestBody academyDTO dto){
        return service.setAcademy(dto);

    }
    @ResponseBody
    @PostMapping("addAcademy")
    public int addAcademy(@RequestBody academyDTO dto){
        return service.addAcademy(dto);
    }
}
