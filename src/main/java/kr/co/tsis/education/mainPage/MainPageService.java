package kr.co.tsis.education.mainPage;

import kr.co.tsis.education.mainPage.dto.MainPageLecture;
import kr.co.tsis.education.userCommon.dto.Employee;
import kr.co.tsis.education.userCommon.dto.Guide;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MainPageService {

    @Autowired
    private  MainPageRepository mpRepository;

    public MainPageService(){

    }

    //공지사항
    public Guide selectGuide(){
        return mpRepository.selectGuide();
    }

    //필수 강좌
    public ArrayList<MainPageLecture> myRequiredLectureList(Employee loginUser){
        return mpRepository.myRequiredLectureList(loginUser);
    }

    //추천강좌
    public ArrayList<MainPageLecture> bestLectureList(){
        return mpRepository.bestLectureList();
    }
}
