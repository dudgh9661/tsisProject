package kr.co.tsis.education.theme.DTOS;

public class lectureDTO {
    private int lectureId;
    private int lectureBestYn;
    private String lectureTitle;
    private int onlineYn;
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;
    private String  academyName;
    private String academyLoc;

    public int getLectureId() {
        return lectureId;
    }

    public void setLectureId(int lectureId) {
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

    public int getOnlineYn() {
        return onlineYn;
    }

    public void setOnlineYn(int onlineYn) {
        this.onlineYn = onlineYn;
    }

    public String getDepth1Field() {
        return depth1Field;
    }

    public void setDepth1Field(String depth1Field) {
        this.depth1Field = depth1Field;
    }

    public String getDepth2Skill() {
        return depth2Skill;
    }

    public void setDepth2Skill(String depth2Skill) {
        this.depth2Skill = depth2Skill;
    }

    public String getDepth3Course() {
        return depth3Course;
    }

    public void setDepth3Course(String depth3Course) {
        this.depth3Course = depth3Course;
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        this.academyName = academyName;
    }

    public String getAcademyLoc() {
        return academyLoc;
    }

    public void setAcademyLoc(String academyLoc) {
        this.academyLoc = academyLoc;
    }
}
