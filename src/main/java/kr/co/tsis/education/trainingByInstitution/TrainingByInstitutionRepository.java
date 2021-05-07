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
import java.util.HashMap;

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

    //검색 강좌 갯수
    public int selectLectureNum(HashMap<String, Integer> selectInfo){
        return sqlSession.selectOne("TraningByInstitutionMapper.selectLectureNum",selectInfo);
    }

    //검색결과 리스트
    public ArrayList<TrainingInstitutionLectureAll> lectureList(TrainingPageHandlingInfo handlingInfo){
        return (ArrayList)sqlSession.selectList("TraningByInstitutionMapper.lectureList", handlingInfo);
    }

    // 관심강좌 등록
    public int wishListPush(TrainingInstitutionLectureAll empInfo){
        return sqlSession.insert("TraningByInstitutionMapper.wishListPush", empInfo);
    }

    // 관심강좌 취소
    public int wishListPop(TrainingInstitutionLectureAll empInfo){
        return sqlSession.delete("TraningByInstitutionMapper.wishListPop",empInfo);
    }
}
