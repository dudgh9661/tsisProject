package kr.co.tsis.education.subjectByLecture;

import kr.co.tsis.education.subjectByLecture.dto.SubjectByLectureAll;
import kr.co.tsis.education.userCommon.dto.ThemeLecture;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class SubjectByLectureRepository {

    @Autowired
    private SqlSessionTemplate sqlSession;

    public SubjectByLectureRepository(){

    }

    // 추천IT트랜드 목록
    public ArrayList<ThemeLecture> themeLecturesList(){
        return (ArrayList)sqlSession.selectList("SubjectByLectureMapper.themeLecturesList");
    }

    //검색결과 리스트(비동기처리)
    public ArrayList<SubjectByLectureAll> lectureList(int themeLectureId){
        return (ArrayList)sqlSession.selectList("SubjectByLectureMapper.lectureList");
    }

    // 관심강좌 등록
    public int wishListPush(int lectureId){
        return sqlSession.insert("SubjectByLectureMapper.wishListPush", lectureId);
    }

    // 관심강좌 취소
    public int wishListPop(int lectureId){
        return sqlSession.delete("SubjectByLectureMapper.wishListPop",lectureId);
    }
}
