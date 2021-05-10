package kr.co.tsis.education.categoryByLecture.dto;

public class EduInfoLevel {
    private String eduLevelId;
    private String eduLevel;
    private String eduDetails;

    private int lectureNum;

    public EduInfoLevel(){

    }

    public EduInfoLevel(String eduLevelId, String eduLevel, String eduDetails) {
        this.eduLevelId = eduLevelId;
        this.eduLevel = eduLevel;
        this.eduDetails = eduDetails;
    }

    public EduInfoLevel(String eduLevelId, String eduLevel, String eduDetails, int lectureNum) {
        this.eduLevelId = eduLevelId;
        this.eduLevel = eduLevel;
        this.eduDetails = eduDetails;
        this.lectureNum = lectureNum;
    }

    public String getEduLevelId() {
        return eduLevelId;
    }

    public void setEduLevelId(String eduLevelId) {
        this.eduLevelId = eduLevelId;
    }

    public String getEduLevel() {
        return eduLevel;
    }

    public void setEduLevel(String eduLevel) {
        this.eduLevel = eduLevel;
    }

    public String getEduDetails() {
        return eduDetails;
    }

    public void setEduDetails(String eduDetails) {
        this.eduDetails = eduDetails;
    }

    public int getLectureNum() {
        return lectureNum;
    }

    public void setLectureNum(int lectureNum) {
        this.lectureNum = lectureNum;
    }

    @Override
    public String toString() {
        return "EducationLevel{" +
                "eduLevelId='" + eduLevelId + '\'' +
                ", eduLevel='" + eduLevel + '\'' +
                ", eduDetails='" + eduDetails + '\'' +
                ", lectureNum=" + lectureNum +
                '}';
    }
}
