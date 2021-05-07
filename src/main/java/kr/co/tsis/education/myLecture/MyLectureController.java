package kr.co.tsis.education.myLecture;

import kr.co.tsis.education.myLecture.dto.MyLecture;
import kr.co.tsis.education.userCommon.dto.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@Controller
@RequestMapping("/myLecture")
public class MyLectureController {

    @Autowired
    private MyLectureService mLectureService;

    public MyLectureController(){

    }

    @GetMapping("/myLectureInfo")
    public String myLectureView(HttpServletRequest request, Model model){
        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기

        //나의 강좌(필수강좌)
        ArrayList<MyLecture> myPageRequiredLecturesList = mLectureService.myPageRequiredLecturesList(loginUser);
        //관심강좌
        ArrayList<MyLecture> myWishLecturesList = mLectureService.myWishLecturesList(loginUser);

        model.addAttribute("employee",loginUser);
        model.addAttribute("requiredLectureList",myPageRequiredLecturesList);
        model.addAttribute("wishLectureList",myWishLecturesList);
        return "user/DisplayMyLectures";
    }
}
