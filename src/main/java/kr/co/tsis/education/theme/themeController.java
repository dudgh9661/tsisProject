package kr.co.tsis.education.theme;

import kr.co.tsis.education.theme.DTOS.lectureDTO;
import kr.co.tsis.education.theme.DTOS.themeDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/theme")
public class themeController {
    @Autowired
    private themeService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(themeController.class);

    @GetMapping("/main")
    public String main(){
        return "theme/main";
    }
    @ResponseBody
    @GetMapping("/getThemeList")
    public List<themeDTO> getThemeList(){
        LOGGER.debug("void");
        return service.getThemeList();
    }

    @ResponseBody
    @GetMapping("/getLectureList")
    public List<lectureDTO> getLectureList(@RequestParam("themeLectureId")int id, @RequestParam("curpage")int curpage){
        return service.getLectureList(id,curpage);

    }

    @ResponseBody
    @PostMapping("/delTheme")
    public int delTheme(@RequestParam("themeLectureId")int id){
        return service.delTheme(id);
    }

    @ResponseBody
    @GetMapping("/getTheme")
    public String getTheme(@RequestParam("themeLectureId")int id){
        return service.getTheme(id);
    }

    @ResponseBody
    @PostMapping("/modifyTheme")
    public int modifyTheme(@RequestBody themeDTO dto){
        return service.modifyTheme(dto);

    }

    @ResponseBody
    @PostMapping("/addTheme")
    public int addTheme(@RequestParam("theme")String theme){
        return service.addTheme(theme);
    }

    @ResponseBody
    @PostMapping("setTheme")
    public int setTheme(@RequestParam("lectureId")int lectureId, @RequestParam("themeLectureId")int themeid){
        return service.setTheme(lectureId,themeid);

    }

}
