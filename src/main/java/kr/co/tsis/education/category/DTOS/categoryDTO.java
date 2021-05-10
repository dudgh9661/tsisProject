package kr.co.tsis.education.category.DTOS;

import java.util.List;

public class categoryDTO {
    private String lectureId;
    private int lectureBestYn;
    private String lectureTitle;
    private String academyName;
    private int onlineYn;
    private String academyLoc;
    private List<String> depth1FieldList;
    private List<String> depth2SkillList;
    private List<String> depth3CourseList;

    public List<String> getDepth1FieldList() {
        return depth1FieldList;
    }

    public void setDepth1FieldList(List<String> depth1FieldList) {
        this.depth1FieldList = depth1FieldList;
    }

    public List<String> getDepth2SkillList() {
        return depth2SkillList;
    }

    public void setDepth2SkillList(List<String> depth2SkillList) {
        this.depth2SkillList = depth2SkillList;
    }

    public List<String> getDepth3CourseList() {
        return depth3CourseList;
    }

    public void setDepth3CourseList(List<String> depth3CourseList) {
        this.depth3CourseList = depth3CourseList;
    }

    public String getLectureId() {
        return lectureId;
    }

    public void setLectureId(String lectureId) {
        this.lectureId = lectureId;
    }

    public int getLectureBestYn() {
        return lectureBestYn;
    }

    public void setLectureBestYn(int lectureBestYn) {
        this.lectureBestYn = lectureBestYn;
    }

    public String getLectureTitle() {
        return lectureTitle;
    }

    public void setLectureTitle(String lectureTitle) {
        this.lectureTitle = lectureTitle;
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        this.academyName = academyName;
    }

    public int getOnlineYn() {
        return onlineYn;
    }

    public void setOnlineYn(int onlineYn) {
        this.onlineYn = onlineYn;
    }

    public String getAcademyLoc() {
        return academyLoc;
    }

    public void setAcademyLoc(String academyLoc) {
        this.academyLoc = academyLoc;
    }
}
