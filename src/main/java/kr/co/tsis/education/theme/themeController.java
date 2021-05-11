package kr.co.tsis.education.theme;

import kr.co.tsis.education.admin.DTOS.lectureDTO;
import kr.co.tsis.education.theme.DTOS.lecturePageDTO;
import kr.co.tsis.education.theme.DTOS.themeDTO;
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
public class themeController {
    @Autowired
    private themeService service;
    private static final Logger LOGGER = LoggerFactory.getLogger(themeController.class);

    @GetMapping("/category_theme")
    public String main(Model model, HttpServletRequest request){
        System.out.println("1" + request);
        try {
            HttpSession session = request.getSession();
            System.out.println("2" + request);
            Employee loginUser = (Employee) session.getAttribute("loginUser");
            System.out.println("3" + request);
            if(loginUser.getAuthority()==0) {
                System.out.println("4" + request);
                return "redirect:/";
            }
            else {
                System.out.println("5" + request);
                model.addAttribute("subjectList", service.getThemeList());
                model.addAttribute("empName",loginUser.getEmpName());
                return "/manager/categoryTheme";
            }
        } catch (Exception e) {
            System.out.println("e" + e.toString());
            return "redirect:/";
        }
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
    public int delTheme(@RequestBody themeDTO dto) {
        return service.delTheme(dto.getThemeLectureId());
    }

    @GetMapping("/theme/getTheme")
    public String getTheme(@RequestParam("themeLectureId") Integer id, Model model,HttpServletRequest request){
        try {
            HttpSession session = request.getSession();
            Employee loginUser = (Employee) session.getAttribute("loginUser");
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                if(id == 0) {
                    return "/manager/addSubject";
                }
                model.addAttribute("theme",service.getTheme(id));
                model.addAttribute("empName",loginUser.getEmpName());
                return "/manager/addSubject";
            }
        } catch (Exception e) {
            return "redirect:/";
        }
    }

    @ResponseBody
    @PostMapping("/theme/modifyTheme")
    public int modifyTheme(@RequestBody themeDTO dto){
        System.out.println(dto);
        return service.modifyTheme(dto);
    }

    @ResponseBody
    @PostMapping("/theme/addTheme")
    public int addTheme(@RequestBody themeDTO dto){
        return service.addTheme(dto.getTheme());
    }

    @ResponseBody
    @PostMapping("/theme/setTheme")
    public int setTheme(@RequestParam("lectureId")int lectureId, @RequestParam("themeLectureId")int themeid){
        return service.setTheme(lectureId,themeid);

    }

}
