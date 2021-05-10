package kr.co.tsis.education.trainingByInstitution;

import kr.co.tsis.education.trainingByInstitution.dto.TrainingInstitutionLectureAll;
import kr.co.tsis.education.trainingByInstitution.dto.TrainingPageHandlingInfo;
import kr.co.tsis.education.userCommon.dto.Academy;
import kr.co.tsis.education.userCommon.dto.AcademySubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class TrainingByInstitutionService {

    @Autowired
    private TrainingByInstitutionRepository tbiRepository;

    public TrainingByInstitutionService(){

    }

    //기관 종류 리스트
    public ArrayList<Academy> academyList(){
        return tbiRepository.academyList();
    }

    //주제리스트
    public ArrayList<AcademySubject> academySubjectList(String academyId){
        return tbiRepository.academySubjectList(academyId);
    }

    //검색 강좌 갯수
    public int selectLectureNum(TrainingInstitutionLectureAll selectInfo){
        return tbiRepository.selectLectureNum(selectInfo);
    }

    //검색결과 리스트
    public ArrayList<TrainingInstitutionLectureAll> lectureList(TrainingPageHandlingInfo handlingInfo){
        return tbiRepository.lectureList(handlingInfo);
    }

    // 관심강좌 등록
    public int wishListPush(TrainingInstitutionLectureAll empInfo){
        return tbiRepository.wishListPush(empInfo);
    }

    // 관심강좌 취소
    public int wishListPop(TrainingInstitutionLectureAll empInfo){
        return tbiRepository.wishListPop(empInfo);
    }
}
