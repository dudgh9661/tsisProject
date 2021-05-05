package kr.co.tsis.education.academy;


import kr.co.tsis.education.academy.DTOS.academyDTO;
import kr.co.tsis.education.academy.DTOS.academyPageDTO;
import kr.co.tsis.education.admin.adminController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/academy")
public class academyController {
    @Autowired
    private academyService service;

    private static final Logger LOGGER = LoggerFactory.getLogger(academyController.class);

    @GetMapping("/main")
    public String main(){
        LOGGER.debug("void");
        return "academy/main";
    }
    @ResponseBody
    @GetMapping("getList")
    public academyPageDTO getList(@RequestParam("curpage")int curpage){
        LOGGER.debug("curpage",curpage);
        return service.getList(curpage);

    }
    @ResponseBody
    @PostMapping("delList")
    public int delList(@RequestParam("academyIdList") List<String> ids){
        LOGGER.debug("academy_id_list",ids);
        return service.delList(ids);
    }
}
