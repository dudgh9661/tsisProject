package kr.co.tsis.education.guide;

import kr.co.tsis.education.admin.DTOS.lectureDTO;
import kr.co.tsis.education.guide.DTOS.guideDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class guideController {
    @Autowired
    private guideService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(guideController.class);

    @GetMapping("/guide")
    public String main(HttpServletRequest request){
        try {
            HttpSession session = request.getSession();
            lectureDTO loginUser = (lectureDTO) session.getAttribute("loginUser");
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                return "manager/guide";
            }
        } catch (Exception e) {
            return "redirect:/";
        }
    }
    @ResponseBody
    @GetMapping("/guide/getGuide")
    public guideDTO getGuide(){
        LOGGER.debug("void");
        return service.getGuide();
    }
    @ResponseBody
    @PostMapping("/guide/setGuide")
    public int setGuide(@RequestBody guideDTO request){
        LOGGER.debug("request",request);
        return service.setGuide(request);
    }
}
