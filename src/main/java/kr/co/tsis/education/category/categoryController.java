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
@RequestMapping("/category")
public class categoryController {
    @Autowired
    private categoryService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(categoryController.class);

    @GetMapping("/main")
    public String main(){
        return "category/main";
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
    @GetMapping("/getList")
    public List<categoryDTO> getList(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2,@RequestParam("depth3Course")String depth3){
        return service.getList(depth1,depth2,depth3);
    }

    @ResponseBody
    @PostMapping("/delDepth1")
    public int delDepth1(@RequestParam("depth1Field")String depth1){
        return service.delDepth1(depth1);
    }

    @ResponseBody
    @PostMapping("/delDepth2")
    public int delDepth2(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2){
        return service.delDepth2(depth1,depth2);
    }
    @ResponseBody
    @PostMapping("/delDepth3")
    public int delDepth3(@RequestParam("depth1Field")String depth1, @RequestParam("depth2Skill")String depth2,@RequestParam("depth3Course")String depth3){
        return service.delDepth3(depth1,depth2,depth3);
    }

    @ResponseBody
    @GetMapping("/getTitle")
    public categoryDTO getTitle(@RequestBody categoryForm form){
        return service.getTitle(form);
    }

    @ResponseBody
    @PostMapping("/setDepth")
    public int setDepth(@RequestBody categoryForm form){
        LOGGER.debug("inout",form);
        return service.setDepth(form);

    }

    @ResponseBody
    @GetMapping("/modify")
    public String modify(@RequestBody categoryForm form, Model model){
        LOGGER.debug("input",form);
        String result;
        if(form.getDepth2Skill() == null){
            result = form.getDepth1Field();
        }
        else if(form.getDepth3Course() == null){
            result = form.getDepth2Skill();
        }
        else{
            result = form.getDepth3Course();
        }
        model.addAttribute("depthName", result);
        return "admin/categori_modify";
    }
    @ResponseBody
    @PostMapping("/addDepth")
    public int addDepth(@RequestBody categoryForm form){
        return service.addDepth(form);
    }
    @ResponseBody
    @PostMapping("/resetDepth")
    public int resetDepth(@RequestBody categoryForm form){
        return service.resetDepth(form);

    }
}
