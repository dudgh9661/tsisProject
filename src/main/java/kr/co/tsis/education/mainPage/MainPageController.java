package kr.co.tsis.education.mainPage;

import kr.co.tsis.education.mainPage.dto.MainPageLecture;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.userCommon.dto.Guide;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@Controller
@RequestMapping("/mainPage")
public class MainPageController {

    @Autowired
    private MainPageService mpService;

    //메인페이지
    @GetMapping("/mainInfo")
    public String mainPageView(HttpServletRequest request, Model model){
        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        //System.out.println(loginUser.getEmpId());
        if(loginUser != null){
            // 공지사항
            Guide guideList = mpService.selectGuide();

            // 필수강좌정보
            //String empId = loginUser.getEmpId();
            ArrayList<MainPageLecture> myRequiredLectureList = mpService.myRequiredLectureList(loginUser);
            model.addAttribute("requiredLectureList",myRequiredLectureList);
            model.addAttribute("guide",guideList);
            model.addAttribute("employee",loginUser);
            return "user/MainPage";
        }
        else{
            return "redirect:/";
        }


    }

}
