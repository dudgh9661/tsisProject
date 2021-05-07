package kr.co.tsis.education.subjectByLecture;

import kr.co.tsis.education.subjectByLecture.dto.PushEmplInfo;
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

    //강좌갯수
    public int selectLectureNum(int themeLectureId){
        return sblRepository.selectLectureNum(themeLectureId);
    }

    //검색결과 리스트(비동기처리)
    public ArrayList<SubjectByLectureAll> lectureList(PushEmplInfo emplInfo){
        return sblRepository.lectureList(emplInfo);
    }

    // 관심강좌 등록
    public int wishListPush(PushEmplInfo emplInfo){
        return sblRepository.wishListPush(emplInfo);
    }

    // 관심강좌 취소
    public int wishListPop(PushEmplInfo emplInfo){
        return sblRepository.wishListPop(emplInfo);
    }
}
