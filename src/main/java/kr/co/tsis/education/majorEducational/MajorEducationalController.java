package kr.co.tsis.education.majorEducational;

import kr.co.tsis.education.userCommon.dto.Academy;
import kr.co.tsis.education.userCommon.dto.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Controller
@RequestMapping("/majorEducational")
public class MajorEducationalController {

    @Autowired
    private MajorEducationalService meService;

    public MajorEducationalController(){

    }

    // 교육기관 리스트
    @GetMapping("/academyInfo")
    public String academyListView(Model model, HttpServletRequest request){
        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        if(loginUser != null){
            ArrayList<Academy> academyList = meService.academyListSelect();
            model.addAttribute("academyList",academyList);
            return "user/SelectEduPage";
        }
        else{
            return "redirect:/";
        }

    }
}
