package kr.co.tsis.education.trainingByInstitution;

import kr.co.tsis.education.trainingByInstitution.dto.TrainingInstitutionLectureAll;
import kr.co.tsis.education.trainingByInstitution.dto.TrainingPageHandlingInfo;
import kr.co.tsis.education.trainingByInstitution.dto.TraningLecturePath;
import kr.co.tsis.education.userCommon.dto.Academy;
import kr.co.tsis.education.userCommon.dto.AcademySubject;
import kr.co.tsis.education.userCommon.dto.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;

@Controller
@RequestMapping("/trainingByInstitution")
public class TrainingByInstitutionController {

    @Autowired
    private TrainingByInstitutionService tbiService;

    public TrainingByInstitutionController(){

    }

    //기관별 교육 검색
    @GetMapping("/trainingByInstitutionList")
    public String trainingInstitutionView(Model model, HttpServletRequest request){
        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        if(loginUser != null){
            //기관 종류 리스트
            ArrayList<Academy> academyList = tbiService.academyList();
            model.addAttribute("academyList", academyList);
            return "user/AcademyEduPage";
        }
        else{
            return "redirect:/";
        }

    }

    //주제리스트
    @ResponseBody
    @GetMapping("/topicList")
    public ArrayList<AcademySubject> topicList(HttpServletRequest request){
        //test
        //String academyId = "1234";
        String academyId = request.getParameter("academyId");
        ArrayList<AcademySubject> academySubjectList = tbiService.academySubjectList(academyId);
        return academySubjectList;
    }

    //검색결과 리스트
    @ResponseBody
    @GetMapping("/trainingSearchResult")
    public TraningLecturePath trainingSearchResult(HttpServletRequest request){
        String academyId = request.getParameter("academyId");
        int academySubjectId = Integer.parseInt(request.getParameter("academySubjectId"));
        //총 강좌 갯수
        TrainingInstitutionLectureAll selectInfo = new TrainingInstitutionLectureAll();
        selectInfo.setAcademyId(academyId);
        selectInfo.setAcademySubjectId(academySubjectId);
        int lectureNum = tbiService.selectLectureNum(selectInfo);

        // 사원정보
        HttpSession session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        //현재 페이지 번호

        int pageNum = Integer.parseInt(request.getParameter("pageNum")) - 1;
        //컬럼명
        String columnName = request.getParameter("columnName");

        //페이징 처리 시 한번에 20개씩 페이지 버튼은 5개
        int totalListNum = 20; // 출력되는 리스트 갯수
        //가장 먼저 출력되는 리스트 번호(pageNum * totalListNum)
        int firstNum = pageNum * totalListNum;

        TrainingPageHandlingInfo handlingInfo = new TrainingPageHandlingInfo();
        handlingInfo.setAcademyId(academyId);
        handlingInfo.setAcademySubjectId(academySubjectId);
        handlingInfo.setEmpId(loginUser.getEmpId());
        handlingInfo.setColumnName(columnName);
        handlingInfo.setFirstNum(firstNum);
        handlingInfo.setTotalListNum(totalListNum);
        ArrayList<TrainingInstitutionLectureAll> lectureList = tbiService.lectureList(handlingInfo);

        //전체 페이지 버튼 수(전체 리스트 갯수 / 20)
        int totalPageNationNum = (int)(lectureNum / totalListNum);

        TraningLecturePath trainingLecturePath = new TraningLecturePath();
        trainingLecturePath.setLectureList(lectureList);
        trainingLecturePath.setLectureNum(lectureNum);
        trainingLecturePath.setTotalPageNationNum(totalPageNationNum);
        return trainingLecturePath;
    }

    //관심강좌 클릭(비동기처리)
    @ResponseBody
    @GetMapping("/wishListSelection")
    public int wishListSelection(HttpServletRequest request, HttpSession session){ // true, false는 어떤 변수명으로 넘겨줄건지
        int lectureId = Integer.parseInt(request.getParameter("lectureId"));
        String wishYn = request.getParameter("wishYn");
        // 사원정보
        session = request.getSession();
        Employee loginUser = (Employee)session.getAttribute("loginUser"); // session이용해서 로그인 정보 가져오기
        TrainingInstitutionLectureAll empInfo = new TrainingInstitutionLectureAll();
        empInfo.setEmpId(loginUser.getEmpId());
        empInfo.setLectureId(lectureId);
        int wishPush = 0;
        if(wishYn.equals("true")){ // true일 경우 insert문
            wishPush = tbiService.wishListPush(empInfo);
        }
        else{// false일 경우 delete문
            wishPush = tbiService.wishListPop(empInfo);
        }
        return wishPush;
    }

}
