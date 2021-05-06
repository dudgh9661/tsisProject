package kr.co.tsis.education.subjectByLecture;

import kr.co.tsis.education.subjectByLecture.dto.SubjectByLectureAll;
import kr.co.tsis.education.userCommon.dto.ThemeLecture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class SubjectByLectureService {

    @Autowired
    private SubjectByLectureRepository sblRepository;

    public SubjectByLectureService(){

    }

    // 추천IT트랜드 목록
    public ArrayList<ThemeLecture> themeLecturesList(){
        return sblRepository.themeLecturesList();
    }

    //검색결과 리스트(비동기처리)
    public ArrayList<SubjectByLectureAll> lectureList(int themeLectureId){
        return sblRepository.lectureList(themeLectureId);
    }

    // 관심강좌 등록
    public int wishListPush(int lectureId){
        return sblRepository.wishListPush(lectureId);
    }

    // 관심강좌 취소
    public int wishListPop(int lectureId){
        return sblRepository.wishListPop(lectureId);
    }
}
