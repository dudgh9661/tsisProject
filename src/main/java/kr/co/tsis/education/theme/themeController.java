package kr.co.tsis.education.theme;

import kr.co.tsis.education.theme.DTOS.lectureDTO;
import kr.co.tsis.education.theme.DTOS.lecturePageDTO;
import kr.co.tsis.education.theme.DTOS.themeDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class themeController {
    @Autowired
    private themeService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(themeController.class);

    @GetMapping("/category_theme")
    public String main(){
        return "/manager/category_theme";
    }
    @ResponseBody
    @GetMapping("/theme/getThemeList")
    public List<themeDTO> getThemeList(){
        LOGGER.debug("void");
        return service.getThemeList();
    }

    @ResponseBody
    @GetMapping("/theme/getLectureList")
    public lecturePageDTO getLectureList(@RequestParam("themeLectureId")int id, @RequestParam("curpage")int curpage){
        return service.getLectureList(id,curpage);

    }

    @ResponseBody
    @PostMapping("/theme/delTheme")
    public int delTheme(@RequestParam("themeLectureId")int id){
        return service.delTheme(id);
    }

    @GetMapping("/theme/getTheme")
    public String getTheme(@RequestParam("themeLectureId")int id, Model model){
        model.addAttribute("theme",service.getTheme(id));
        return "/admin/themeModify";
    }

    @ResponseBody
    @PostMapping("/theme/modifyTheme")
    public int modifyTheme(@RequestBody themeDTO dto){
        return service.modifyTheme(dto);

    }

    @ResponseBody
    @PostMapping("/theme/addTheme")
    public int addTheme(@RequestParam("theme")String theme){
        return service.addTheme(theme);
    }

    @ResponseBody
    @PostMapping("/theme/setTheme")
    public int setTheme(@RequestParam("lectureId")int lectureId, @RequestParam("themeLectureId")int themeid){
        return service.setTheme(lectureId,themeid);

    }

}
