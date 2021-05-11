package kr.co.tsis.education.academy;


import kr.co.tsis.education.academy.DTOS.academyDTO;
import kr.co.tsis.education.academy.DTOS.academyPageDTO;
import kr.co.tsis.education.admin.DTOS.lectureDTO;
import kr.co.tsis.education.admin.adminController;
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
<<<<<<< HEAD

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Controller
public class academyController {
    @Autowired
    private academyService service;

    private static final Logger LOGGER = LoggerFactory.getLogger(academyController.class);

    @GetMapping("/academy")
    public String main(HttpServletRequest request,Model model){
        try {
            HttpSession session = request.getSession();
            Employee loginUser = (Employee) session.getAttribute("loginUser");
            model.addAttribute("empName",loginUser.getEmpName());
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                return "manager/academy";
            }
        } catch (Exception e) {
            return "redirect:/";
        }
    }

    /*영국 수정*/
    @GetMapping("/academy/getList")
    public String getList(@RequestParam("curpage")int curpage, Model model, HttpServletRequest request){
        try {
            HttpSession session = request.getSession();
            Employee loginUser = (Employee) session.getAttribute("loginUser");
            model.addAttribute("empName",loginUser.getEmpName());
            if(loginUser.getAuthority()==0) {
                return "redirect:/";
            }
            else {
                LOGGER.debug("curpage",curpage);
                academyPageDTO result = service.getList(curpage);
                model.addAttribute("curPage",curpage);
                model.addAttribute("totalPage",result.getTotalpage());
                model.addAttribute("totalCount",result.getTotalCount());
                model.addAttribute("organi",result.getOrgani());
                System.out.println(result.getOrgani());
                return "manager/academy";
            }
        } catch (Exception e) {
            return "redirect:/";
        }

    }

    /*영국 추가*/
    @ResponseBody
    @GetMapping("/academy/getListAjax")
    public academyPageDTO getListAjax(@RequestParam("curpage")int curpage){
        LOGGER.debug("curpage",curpage);
        return service.getList(curpage);
    }

    @ResponseBody
    @PostMapping("/academy/delList")
    public int delList(@RequestParam("academyIdList") List<String> ids){
        LOGGER.debug("academy_id_list",ids);
        return service.delList(ids);
    }
}
