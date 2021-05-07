package kr.co.tsis.education.category.DTOS;

public class categoryForm {
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;
    private int lectureId;
    private String newDepth;
    private String adddepth;

    public String getAdddepth() {
        return adddepth;
    }

    public void setAdddepth(String adddepth) {
        this.adddepth = adddepth;
    }

    public String getNewDepth() {
        return newDepth;
    }

    public void setNewDepth(String newDepth) {
        this.newDepth = newDepth;
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

    public int getLectureId() {
        return lectureId;
    }

    public void setLectureId(int lectureId) {
        this.lectureId = lectureId;
    }
}
