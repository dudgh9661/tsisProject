package kr.co.tsis.education.myLecture;

import kr.co.tsis.education.myLecture.dto.MyLecture;
import kr.co.tsis.education.userCommon.dto.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyLectureService {

    @Autowired
    private MyLectureRepository mLectureRepository;

    public MyLectureService(){

    }

    //나의 강좌(필수강좌)
    public ArrayList<MyLecture> myPageRequiredLecturesList(Employee loginUser){
        return mLectureRepository.myPageRequiredLecturesList(loginUser);
    }

    //관심 강좌
    public ArrayList<MyLecture> myWishLecturesList(Employee loginUser){
        return mLectureRepository.myWishLecturesList(loginUser);
    }
}
