package kr.co.tsis.education.subjectByLecture.dto;

import java.util.ArrayList;

public class LecturePush {

    private ArrayList<SubjectByLectureAll> lectureList;
    private int totalPageNationNum;
    private int lectureNum;

    public LecturePush(){

    }

    public LecturePush(ArrayList<SubjectByLectureAll> lectureList, int totalPageNationNum, int lectureNum) {
        this.lectureList = lectureList;
        this.totalPageNationNum = totalPageNationNum;
        this.lectureNum = lectureNum;
    }

    public ArrayList<SubjectByLectureAll> getLectureList() {
        return lectureList;
    }

    public void setLectureList(ArrayList<SubjectByLectureAll> lectureList) {
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
