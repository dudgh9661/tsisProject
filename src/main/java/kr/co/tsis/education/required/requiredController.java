package kr.co.tsis.education.required;

import kr.co.tsis.education.required.DTOS.requiredForm;
import kr.co.tsis.education.required.DTOS.requiredLectureDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping("/required")
public class requiredController {
    @Autowired
    private requiredService service;

    private static final Logger LOGGER = LoggerFactory.getLogger(requiredController.class);

    @GetMapping("/main")
    public String main(){
        LOGGER.debug("void");
        return "required/main";
    }

    @ResponseBody
    @GetMapping("/getList")
    public List<requiredLectureDTO> getList(@RequestParam("empPosition")String pos, @RequestParam("empYears")int years){
        LOGGER.debug("empPosition",pos);
        LOGGER.debug("empYears",years);
        requiredForm form = new requiredForm();
        form.setEmpPosition(pos);
        form.setEmpYears(years);
        return service.getList(form);
    }
    @ResponseBody
    @GetMapping("/getDepth1")
    public List<String> getDepth1(){
        LOGGER.debug("void");
        return service.getDepth1();
    }
    @ResponseBody
    @GetMapping("/getDepth2")
    public List<String> getDepth2(@RequestParam("depth1Field")String depth1){
        LOGGER.debug("depth1",depth1);
        return service.getDepth2(depth1);
    }
    @ResponseBody
    @GetMapping("/getDepth3")
    public List<String> getDepth3(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2){
        LOGGER.debug("depth1",depth1);
        LOGGER.debug("depth2",depth2);
        return service.getDepth3(depth1,depth2);
    }
    @ResponseBody
    @GetMapping("/getDpList")
    public List<requiredLectureDTO> getDpList(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2,@RequestParam("depth3Course")String depth3 ){
        LOGGER.debug("depth1",depth1);
        LOGGER.debug("depth2",depth2);
        LOGGER.debug("depth3",depth3);
        return service.getDpList(depth1,depth2,depth3);
    }
    @ResponseBody
    @GetMapping("/getTitleList")
    public List<requiredLectureDTO> getTitleList(@RequestParam("lectureTitle")String title){
        LOGGER.debug("lectureTitle",title);
        return service.getTitleList(title);
    }
    @ResponseBody
    @PostMapping("/addList")
    public int addList(@RequestBody requiredForm form){
        LOGGER.debug("input",form);
        return service.addList(form);
    }

    @ResponseBody
    @PostMapping("/delList")
    public int delList(@RequestParam("requiredLectureId")int id){
        LOGGER.debug("required_lecture_id",id);
        return service.delList(id);

    }



}
