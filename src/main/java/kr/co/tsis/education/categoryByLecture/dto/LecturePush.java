package kr.co.tsis.education.categoryByLecture.dto;

import java.util.ArrayList;

public class LecturePush {

    private ArrayList<CategoryByLectureAll> lectureList;
    private int totalPageNationNum;
    private int lectureNum;

    public LecturePush(ArrayList<CategoryByLectureAll> lectureList, int totalPageNationNum, int lectureNum) {
        this.lectureList = lectureList;
        this.totalPageNationNum = totalPageNationNum;
        this.lectureNum = lectureNum;
    }

    public ArrayList<CategoryByLectureAll> getLectureList() {
        return lectureList;
    }

    public void setLectureList(ArrayList<CategoryByLectureAll> lectureList) {
        this.lectureList = lectureList;
    }

    public int getTotalPageNationNum() {
        return totalPageNationNum;
    }

    public void setTotalPageNationNum(int totalPageNationNum) {
        this.totalPageNationNum = totalPageNationNum;
    }

    public int getLectureNum() {
        return lectureNum;
    }

    public void setLectureNum(int lectureNum) {
        this.lectureNum = lectureNum;
    }
}
