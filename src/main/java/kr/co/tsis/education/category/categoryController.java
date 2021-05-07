package kr.co.tsis.education.category;

import kr.co.tsis.education.category.DTOS.categoryDTO;
import kr.co.tsis.education.category.DTOS.categoryForm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


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

    @ResponseBody
    @GetMapping("/category/getList")
    public List<categoryDTO> getList(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2,@RequestParam("depth3Course")String depth3){
        return service.getList(depth1,depth2,depth3);
    }

    @ResponseBody
    @PostMapping("/category/delDepth1")
    public int delDepth1(@RequestParam("depth1Field")String depth1){
        return service.delDepth1(depth1);
    }

    @ResponseBody
    @PostMapping("/category/delDepth2")
    public int delDepth2(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2){
        return service.delDepth2(depth1,depth2);
    }
    @ResponseBody
    @PostMapping("/category/delDepth3")
    public int delDepth3(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2,@RequestParam("depth3Course")String depth3){
        return service.delDepth3(depth1,depth2,depth3);
    }

    @GetMapping("/category/getTitle")
    public String getTitle(@RequestBody categoryForm form,Model model){
        String title = service.getTitle(form);
        model.addAttribute("lectureId",form.getLectureId());
        model.addAttribute("lectureTitle",title);
        model.addAttribute("depth1Field",form.getDepth1Field());
        model.addAttribute("depth2Skill",form.getDepth2Skill());
        model.addAttribute("depth3Course",form.getDepth3Course());
        return "manager/lecture_category_update";

    }

    @ResponseBody
    @PostMapping("/category/setDepth")
    public int setDepth(@RequestBody categoryForm form){
        LOGGER.debug("inout",form);
        return service.setDepth(form);

    }

    @PostMapping("/category/modify")
    public String modify(@RequestBody categoryForm form, Model model){
        LOGGER.debug("input",form);
        model.addAttribute("depth1Field",form.getDepth1Field());
        model.addAttribute("depth2Skill",form.getDepth2Skill());
        model.addAttribute("depth3Course",form.getDepth3Course());
        return "admin/categori_modify";
    }
    @PostMapping("/category/add")
    public String add(@RequestBody categoryForm form, Model model){
        LOGGER.debug("input",form);
        model.addAttribute("depth1Field",form.getDepth1Field());
        model.addAttribute("depth2Skill",form.getDepth2Skill());
        return "admin/categori_add";
    }

    @ResponseBody
    @PostMapping("/category/addDepth")
    public int addDepth(@RequestBody categoryForm form){
        return service.addDepth(form);
    }
    @ResponseBody
    @PostMapping("/category/resetDepth")
    public int resetDepth(@RequestBody categoryForm form){
        return service.resetDepth(form);

    }
}
