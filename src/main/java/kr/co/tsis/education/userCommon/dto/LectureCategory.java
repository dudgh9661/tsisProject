package kr.co.tsis.education.userCommon.dto;

public class LectureCategory {
    private int categoryId;
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;

    public LectureCategory(){

    }

    public LectureCategory(int categoryId, String depth1Field, String depth2Skill, String depth3Course) {
        this.categoryId = categoryId;
        this.depth1Field = depth1Field;
        this.depth2Skill = depth2Skill;
        this.depth3Course = depth3Course;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
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

    @Override
    public String toString() {
        return "LectureCategory{" +
                "categoryId=" + categoryId +
                ", depth1Field='" + depth1Field + '\'' +
                ", depth2Skill='" + depth2Skill + '\'' +
                ", depth3Course='" + depth3Course + '\'' +
                '}';
    }
}
