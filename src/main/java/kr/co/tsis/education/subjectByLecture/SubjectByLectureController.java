package kr.co.tsis.education.subjectByLecture;

import kr.co.tsis.education.subjectByLecture.dto.LecturePush;
import kr.co.tsis.education.subjectByLecture.dto.PushEmplInfo;
import kr.co.tsis.education.subjectByLecture.dto.SubjectByLectureAll;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.userCommon.dto.ThemeLecture;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;

@Controller

public class SubjectByLectureController {

    @Autowired
    private SubjectByLectureService sblService;

    public SubjectByLectureController(){

    }

    // 추천IT트랜드 목록
    @RequestMapping(value = "/subjectByLecture/companyRecommendationTrend", method = RequestMethod.GET)
    public String companyRecommendationTrend(Model model, HttpServletRequest request){
        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        if(loginUser != null){
            ArrayList<ThemeLecture> themeLecturesList = sblService.themeLecturesList();
            model.addAttribute("themeLecturesList", themeLecturesList);
            return "user/DisplayLecturesBySubject";
        }
        else{
            return "redirect:/";
        }

    }

    //검색결과 리스트(비동기처리)
    //페이징 처리 하기
    @ResponseBody
    @RequestMapping(value = "/subjectByLecture/recommendationResultList", method = RequestMethod.GET)
    public LecturePush recommendationResultList(HttpServletRequest request){
        //test
        //int themeLectureId = 2;
        int themeLectureId = Integer.parseInt(request.getParameter("themeLectureId"));
        //강좌 갯수
        int lectureNum = sblService.selectLectureNum(themeLectureId);
        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        PushEmplInfo emplInfo = new PushEmplInfo();
        emplInfo.setEmpId(loginUser.getEmpId()); // 회원 아이디
        //test
        //emplInfo.setEmpId("28112656");
        emplInfo.setThemeLectureId(themeLectureId); // 주제 아이디
        //현재 페이지 번호
        int pageNum = Integer.parseInt(request.getParameter("pageNum")) - 1;
        System.out.println("현재 페이지 번호 : " + pageNum);
        //test
        //int pageNum = 1;
        //컬럼명
        String columnName = request.getParameter("columnName");
        //test
        //emplInfo.setColumnName("ctgr.category_id");
        emplInfo.setColumnName(columnName);
        //emplInfo.setPageNum(pageNum);
        //페이징 처리 시 한번에 20개씩 페이지 버튼은 5개
        int totalListNum = 20; // 출력되는 리스트 갯수
        //가장 먼저 출력되는 리스트 번호(pageNum * totalListNum)
        int firstNum = pageNum * totalListNum;
        System.out.println("먼저 출력 : " + firstNum);
        emplInfo.setFirstNum(firstNum); // 출력되는 첫번째 번호
        emplInfo.setTotalListNum(totalListNum);

        //전체 페이지 버튼 수(전체 리스트 갯수 / 20)
        int totalPageNationNum = 0;
        if(lectureNum % totalListNum == 0){
            totalPageNationNum = (int)(lectureNum / totalListNum);
        }
        else{
            totalPageNationNum = (int)(lectureNum / totalListNum) + 1;
        }
        System.out.println("전체 리스트 갯수 : " + lectureNum);
        System.out.println("전체 페이지 갯수 : " + totalPageNationNum);
        ArrayList<SubjectByLectureAll> lectureList = sblService.lectureList(emplInfo);
        for (int i = 0; i < lectureList.size(); i++){
            System.out.println("리스트 wishBool : "+lectureList.get(i).getWishBool());
        }

        //객체로 넘겨주기!!!
        LecturePush lecturePush = new LecturePush(lectureList, totalPageNationNum, lectureNum);
        return lecturePush;
    }

    //관심강좌 클릭(비동기처리)
    @ResponseBody
    @RequestMapping(value = "/subjectByLecture/wishListSelection", method = RequestMethod.GET)
    public int wishListSelection(HttpServletRequest request, HttpSession session){ // true, false는 어떤 변수명으로 넘겨줄건지
        int lectureId = Integer.parseInt(request.getParameter("lectureId"));
        String wishYn = request.getParameter("wishYn");
        System.out.println("lectureId : "+lectureId);
        System.out.println("wishYn : "+wishYn);
        // 사원정보
        session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        int wishPush = 0;
        PushEmplInfo emplInfo = new PushEmplInfo();
        String empId = loginUser.getEmpId();
        System.out.println("empId"+empId);
        emplInfo.setEmpId(empId);
        emplInfo.setLectureId(lectureId);
        if(wishYn.equals("true")){ // true일 경우 insert문
            wishPush = sblService.wishListPush(emplInfo);
        }
        else{// false일 경우 delete문
            wishPush = sblService.wishListPop(emplInfo);
        }
        System.out.println("wishPush결과 : "+wishPush);
        return wishPush;
    }
}
