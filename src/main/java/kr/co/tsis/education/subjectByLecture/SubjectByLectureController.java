package kr.co.tsis.education.subjectByLecture;

import kr.co.tsis.education.subjectByLecture.dto.SubjectByLectureAll;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.userCommon.dto.ThemeLecture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@Controller
@RequestMapping("/subjectByLecture")
public class SubjectByLectureController {

    @Autowired
    private SubjectByLectureService sblService;

    public SubjectByLectureController(){

    }

    // 추천IT트랜드 목록
    @GetMapping("/companyRecommendationTrend")
    public String companyRecommendationTrend(Model model){
        ArrayList<ThemeLecture> themeLecturesList = sblService.themeLecturesList();

        model.addAttribute("themeLecturesList", themeLecturesList);
        return "";
    }

    //검색결과 리스트(비동기처리)
    //페이징 처리 하기
    @ResponseBody
    @GetMapping("/recommendationResultList")
    public ArrayList<SubjectByLectureAll> recommendationResultList(int themeLectureId, HttpServletRequest request){

        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        //emp_id넘겨줘야되는지 질문!!!
        ArrayList<SubjectByLectureAll> lectureList = sblService.lectureList(themeLectureId);
        return lectureList;
    }

    //관심강좌 클릭(비동기처리)
    @ResponseBody
    @GetMapping("/wishListSelection")
    public int wishListSelection(int lectureId, String wishYn, HttpServletRequest request, HttpSession session){ // true, false는 어떤 변수명으로 넘겨줄건지
        // 사원정보
        session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        int wishPush = 0;
        if(wishYn.equals("true")){ // true일 경우 insert문
            wishPush = sblService.wishListPush(lectureId);
        }
        else{// false일 경우 delete문
            wishPush = sblService.wishListPop(lectureId);
        }
        return wishPush;
    }
}
