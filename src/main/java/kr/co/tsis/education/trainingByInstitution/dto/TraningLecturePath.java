package kr.co.tsis.education.trainingByInstitution.dto;

import java.util.ArrayList;

public class TraningLecturePath {

    private ArrayList<TrainingInstitutionLectureAll> lectureList;
    private int totalPageNationNum;
    private int lectureNum;

    public ArrayList<TrainingInstitutionLectureAll> getLectureList() {
        return lectureList;
    }

    public void setLectureList(ArrayList<TrainingInstitutionLectureAll> lectureList) {
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
