package kr.co.tsis.education.trainingByInstitution;

import kr.co.tsis.education.trainingByInstitution.dto.TrainingInstitutionLectureAll;
import kr.co.tsis.education.trainingByInstitution.dto.TrainingPageHandlingInfo;
import kr.co.tsis.education.userCommon.dto.Academy;
import kr.co.tsis.education.userCommon.dto.AcademySubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@Controller
@RequestMapping("/trainingByInstitution")
public class TrainingByInstitutionController {

    @Autowired
    private TrainingByInstitutionService tbiService;

    public TrainingByInstitutionController(){

    }

    //기관별 교육 검색
    @GetMapping("/trainingByInstitution")
    public String trainingInstitutionView(Model model){
        //기관 종류 리스트
        ArrayList<Academy> academyList = tbiService.academyList();
        model.addAttribute("academyList", academyList);
        return "";
    }

    //주제리스트
    @ResponseBody
    @GetMapping("/topicList")
    public ArrayList<AcademySubject> topicList(HttpServletRequest request){
        int academyId = Integer.parseInt(request.getParameter("academyId"));
        ArrayList<AcademySubject> academySubjectList = tbiService.academySubjectList(academyId);
        return academySubjectList;
    }

    //검색결과 리스트
    @ResponseBody
    @GetMapping("/trainingSearchResult")
    public ArrayList<TrainingInstitutionLectureAll> trainingSearchResult(HttpServletRequest request){
        int academyId = Integer.parseInt(request.getParameter("academyId"));
        int academySubjectId = Integer.parseInt(request.getParameter("academySubjectId"));
        TrainingPageHandlingInfo handlingInfo = new TrainingPageHandlingInfo();
        handlingInfo.setAcademyId(academyId);
        handlingInfo.setAcademySubjectId(academySubjectId);
        ArrayList<TrainingInstitutionLectureAll> lectureList = tbiService.lectureList(handlingInfo);
        return lectureList;
    }
}
