package kr.co.tsis.education.guide;

import kr.co.tsis.education.academyModify.AcademyModifyController;
import kr.co.tsis.education.guide.DTOS.guideDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/guide")
public class guideController {
    @Autowired
    private guideService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(guideController.class);

    @GetMapping("/main")
    public String main(){
        return "guide/main";
    }
    @ResponseBody
    @GetMapping("/getGuide")
    public guideDTO getGuide(){
        return service.getGuide();
    }
    @ResponseBody
    @PostMapping("setGuide")
    public int setGuide(@RequestBody guideDTO request){
        return service.setGuide(request);
    }
}
