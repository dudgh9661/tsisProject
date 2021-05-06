package kr.co.tsis.education.guide;

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
        LOGGER.debug("void");
        return "guide/main";
    }
    @ResponseBody
    @GetMapping("/getGuide")
    public guideDTO getGuide(){
        LOGGER.debug("void");
        return service.getGuide();
    }
    @ResponseBody
    @PostMapping("setGuide")
    public int setGuide(@RequestBody guideDTO request){
        LOGGER.debug("request",request);
        return service.setGuide(request);
    }
}
