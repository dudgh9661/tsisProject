package kr.co.tsis.education.category;

import kr.co.tsis.education.admin.DTOS.lectureDTO;
import kr.co.tsis.education.category.DTOS.CategoryDelDTO;
import kr.co.tsis.education.category.DTOS.categoryDTO;
import kr.co.tsis.education.category.DTOS.categoryForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class categoryController {
    @Autowired
    private categoryService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(categoryController.class);

    @ResponseBody
    @GetMapping("/category/getDepth1")
    public List<String> getDepth1(){
        LOGGER.debug("void");
        return service.getDepth1();
    }
    @ResponseBody
    @GetMapping("/category/getDepth2")
    public List<String> getDepth2(@RequestParam("depth1Field")String depth1){
        LOGGER.debug("depth1",depth1);
        return service.getDepth2(depth1);
    }
    @ResponseBody
    @GetMapping("/category/getDepth3")
    public List<String> getDepth3(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2){
        LOGGER.debug("depth1",depth1);
        LOGGER.debug("depth2",depth2);
        return service.getDepth3(depth1,depth2);
    }

    /* 영국수정 */
    @ResponseBody
    @GetMapping("/category/getList")
    public List<categoryDTO> getList(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2,@RequestParam("depth3Course")String depth3){
        return service.getList(depth1,depth2,depth3);
    }

    /* 영국수정 */
    @ResponseBody
    @PostMapping("/category/delDepth1")
    public int delDepth1(@RequestBody() CategoryDelDTO categorydelDTO){
        return service.delDepth1(categorydelDTO.getDepth1Field());
    }

    /* 영국수정 */
    @ResponseBody
    @PostMapping("/category/delDepth2")
    public int delDepth2(@RequestBody() CategoryDelDTO categorydelDTO){
        return service.delDepth2(categorydelDTO.getDepth1Field(),
                                   categorydelDTO.getDepth2Skill());
    }
    @ResponseBody
    @PostMapping("/category/delDepth3")
    public int delDepth3(@RequestBody() CategoryDelDTO categorydelDTO){
        return service.delDepth3(categorydelDTO.getDepth1Field(),
                                categorydelDTO.getDepth2Skill(),
                                categorydelDTO.getDepth3Course());
    }

  /*  @GetMapping("/category/getTitle")
    public String getTitle(@RequestBody categoryForm form,Model model){

        System.out.println("Ssssssssssssssssssss");
        System.out.println(depth1);
        System.out.println(depth2);
        System.out.println(depth3);
        System.out.println(lectureId);

        String title = service.getTitle(form);
        model.addAttribute("lectureId",form.getLectureId());
        model.addAttribute("lectureTitle",title);
        model.addAttribute("depth1Field",form.getDepth1Field());
        model.addAttribute("depth2Skill",form.getDepth2Skill());
        model.addAttribute("depth3Course",form.getDepth3Course());
        return "manager/lecture_category_update";

    }*/

    @GetMapping("/category/getTitle")
    public String getTitle(@RequestParam("depth1Field")String depth1,
                           @RequestParam("depth2Skill")String depth2,
                           @RequestParam("depth3Course")String depth3,
                           @RequestParam("lectureId")int lectureId, Model model,
                           HttpServletRequest request){
        try {
            HttpSession session = request.getSession();
            lectureDTO loginUser = (lectureDTO) session.getAttribute("loginUser");
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                String title = service.getTitle(lectureId);
                System.out.println("controller = "+ title);
                model.addAttribute("empName",loginUser.getEmpName());
                model.addAttribute("depth1Field",depth1);
                model.addAttribute("lectureId",lectureId);
                model.addAttribute("lectureTitle",title);
                model.addAttribute("depth2Skill",depth2);
                model.addAttribute("depth3Course",depth3);
                return "manager/lecture_category_update";
            }
        } catch (Exception e) {
            return "redirect:/";
        }

    }

    @ResponseBody
    @PostMapping("/category/setDepth")
    public int setDepth(@RequestBody categoryForm form){
        LOGGER.debug("inout",form);
        return service.setDepth(form);

    }

/*    @PostMapping("/category/modify")
    public String modify(@RequestBody categoryForm form, Model model){
        LOGGER.debug("input",form);
        model.addAttribute("depth1Field",form.getDepth1Field());
        model.addAttribute("depth2Skill",form.getDepth2Skill());
        model.addAttribute("depth3Course",form.getDepth3Course());
        return "admin/categori_modify";
    }*/

    @GetMapping("/category/modify")
    public String modify(@RequestParam("depth1Field")String depth1,
                         @RequestParam("depth2Skill")String depth2,
                         @RequestParam("depth3Course")String depth3,
                         Model model,
                         HttpServletRequest request){
            try {
            HttpSession session = request.getSession();
            lectureDTO loginUser = (lectureDTO) session.getAttribute("loginUser");
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                model.addAttribute("empName",loginUser.getEmpName());
                model.addAttribute("depth1Field",depth1);
                model.addAttribute("depth2Skill",depth2);
                model.addAttribute("depth3Course",depth3);
                return "manager/category_modify";
            }
        } catch (Exception e) {
            return "redirect:/";
        }
    }

    /*@PostMapping("/category/add")
    public String add(@RequestBody categoryForm form, Model model){
        LOGGER.debug("input",form);
        model.addAttribute("depth1Field",form.getDepth1Field());
        model.addAttribute("depth2Skill",form.getDepth2Skill());
        return "admin/categori_add";
    }*/

    @GetMapping("/category/add")
    public String add(HttpServletRequest request,@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2, Model model){
        try {
            HttpSession session = request.getSession();
            lectureDTO loginUser = (lectureDTO) session.getAttribute("loginUser");
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                model.addAttribute("empName",loginUser.getEmpName());
                model.addAttribute("depth1Field",depth1);
                model.addAttribute("depth2Skill",depth2);
                return "manager/category_add";
            }
        } catch (Exception e) {
            return "redirect:/";
        }
    }


    @ResponseBody
    @PostMapping("/category/addDepth")
    public int addDepth(@RequestBody categoryForm form){
        if(form.getAdddepth()==""){
            return -1;
        }
        else return service.addDepth(form);
    }
    @ResponseBody
    @PostMapping("/category/resetDepth")
    public int resetDepth(@RequestBody categoryForm form){
        System.out.println(form.getNewDepth());
        return service.resetDepth(form);

    }
}
