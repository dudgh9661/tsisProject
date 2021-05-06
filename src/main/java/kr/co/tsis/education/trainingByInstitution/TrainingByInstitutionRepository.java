package kr.co.tsis.education.trainingByInstitution;

import kr.co.tsis.education.trainingByInstitution.dto.TrainingInstitutionLectureAll;
import kr.co.tsis.education.trainingByInstitution.dto.TrainingPageHandlingInfo;
import kr.co.tsis.education.userCommon.dto.Academy;
import kr.co.tsis.education.userCommon.dto.AcademySubject;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Array;
import java.util.ArrayList;

@Repository
public class TrainingByInstitutionRepository {

    @Autowired
    private SqlSessionTemplate sqlSession;

    public TrainingByInstitutionRepository(){

    }

    //기관 종류 리스트
    public ArrayList<Academy> academyList(){
        return (ArrayList)sqlSession.selectList("TraningByInstitutionMapper.academyList");
    }

    //주제리스트
    public ArrayList<AcademySubject> academySubjectList(int academyId){
        return (ArrayList)sqlSession.selectList("TraningByInstitutionMapper.academySubjectList", academyId);
    }

    //검색결과 리스트
    public ArrayList<TrainingInstitutionLectureAll> lectureList(TrainingPageHandlingInfo handlingInfo){
        return (ArrayList)sqlSession.selectList("TraningByInstitutionMapper.lectureList", handlingInfo);
    }
}
