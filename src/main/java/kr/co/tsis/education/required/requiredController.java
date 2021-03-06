package kr.co.tsis.education.required;

import kr.co.tsis.education.admin.DTOS.lectureDTO;
import kr.co.tsis.education.required.DTOS.requiredForm;
import kr.co.tsis.education.required.DTOS.requiredLectureDTO;
import kr.co.tsis.education.required.DTOS.requiredListForm;
import kr.co.tsis.education.userCommon.dto.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Controller
public class requiredController {
    @Autowired
    private requiredService service;

    private static final Logger LOGGER = LoggerFactory.getLogger(requiredController.class);

    @GetMapping("/required")
    public String main(HttpServletRequest request, Model model){
        try {
            HttpSession session = request.getSession();
            Employee loginUser = (Employee) session.getAttribute("loginUser");
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                model.addAttribute("empName",loginUser.getEmpName());
                return "manager/required";
            }
        } catch (Exception e) {
            return "redirect:/";
        }
    }

    @ResponseBody
    @GetMapping("/required/getList")
    public List<requiredLectureDTO> getList(@RequestParam("empPosition")String pos, @RequestParam("empYears")int years){
        LOGGER.debug("empPosition",pos);
        LOGGER.debug("empYears",years);
        requiredForm form = new requiredForm();
        form.setEmpPosition(pos);
        form.setEmpYears(years);
        return service.getList(form);
    }
    @ResponseBody
    @GetMapping("/required/getDepth1")
    public List<String> getDepth1(){
        LOGGER.debug("void");
        return service.getDepth1();
    }
    @ResponseBody
    @GetMapping("/required/getDepth2")
    public List<String> getDepth2(@RequestParam("depth1Field")String depth1){
        LOGGER.debug("depth1",depth1);
        return service.getDepth2(depth1);
    }
    @ResponseBody
    @GetMapping("/required/getDepth3")
    public List<String> getDepth3(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2){
        LOGGER.debug("depth1",depth1);
        LOGGER.debug("depth2",depth2);
        return service.getDepth3(depth1,depth2);
    }
    @ResponseBody
    @GetMapping("/required/getDpList")
    public List<requiredLectureDTO> getDpList(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2,@RequestParam("depth3Course")String depth3 ){
        LOGGER.debug("depth1",depth1);
        LOGGER.debug("depth2",depth2);
        LOGGER.debug("depth3",depth3);
        return service.getDpList(depth1,depth2,depth3);
    }
    @ResponseBody
    @GetMapping("/required/getTitleList")
    public List<requiredLectureDTO> getTitleList(@RequestParam("lectureTitle")String title){
        LOGGER.debug("lectureTitle",title);
        return service.getTitleList(title);
    }
    @ResponseBody
    @PostMapping("/required/addList")
    public int addList(@RequestBody requiredListForm form){
        System.out.println(form.getEmpPosition());
        LOGGER.debug("input",form);
        int result = 0;
        String position = form.getEmpPosition();
        int year = form.getEmpYears();
        requiredForm temp = new requiredForm();
        for(int id : form.getLectureId()){
            temp.setEmpYears(year);
            temp.setEmpPosition(position);
            temp.setLectureId(id);
            result = service.addList(temp);
        }
        return result;
    }

    @ResponseBody
    @PostMapping("/required/delList")
    public int delList(@RequestBody List<Integer> ids){
        LOGGER.debug("required_lecture_id",ids);
        //System.out.println("&&&&&&&&&&&&");
        int result = 0;

        for(int id : ids){
            System.out.println("id : " + id);
            result = service.delList(id);
            System.out.println(service.delList(id));
        }

        return result;

    }



}
