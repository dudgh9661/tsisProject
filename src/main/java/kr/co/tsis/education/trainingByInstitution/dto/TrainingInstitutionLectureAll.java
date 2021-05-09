package kr.co.tsis.education.trainingByInstitution.dto;

public class TrainingInstitutionLectureAll {

    private int lectureId;
    private String lectureTitle;
    private String lectureUrl;
    private int validYn;
    private int onlineYn;
    private int lectureBestYn;
    private int categoryId;
    private String academyId;
    private String eduLevelId;
    private int themeLectureId;
    private int requiredLectureId;
    private int academySubjectId;

    //wishlist에 대한 정보 넣기
    private int wishBool;
    private String empId;

    private int lectureNum;

    //카테고리정보
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;

    public TrainingInstitutionLectureAll(){

    }
    
    //constructor만들기

    public TrainingInstitutionLectureAll(int lectureId, String lectureTitle, String lectureUrl, int validYn, int onlineYn, int lectureBestYn, int categoryId, String academyId, String eduLevelId, int themeLectureId, int requiredLectureId, int academySubjectId, int wishBool, String empId) {
        this.lectureId = lectureId;
        this.lectureTitle = lectureTitle;
        this.lectureUrl = lectureUrl;
        this.validYn = validYn;
        this.onlineYn = onlineYn;
        this.lectureBestYn = lectureBestYn;
        this.categoryId = categoryId;
        this.academyId = academyId;
        this.eduLevelId = eduLevelId;
        this.themeLectureId = themeLectureId;
        this.requiredLectureId = requiredLectureId;
        this.academySubjectId = academySubjectId;
        this.wishBool = wishBool;
        this.empId = empId;
    }

    public TrainingInstitutionLectureAll(int lectureId, String lectureTitle, String lectureUrl, int validYn, int onlineYn, int lectureBestYn, int categoryId, String academyId, String eduLevelId, int themeLectureId, int requiredLectureId, int academySubjectId, int wishBool, String empId, int lectureNum) {
        this.lectureId = lectureId;
        this.lectureTitle = lectureTitle;
        this.lectureUrl = lectureUrl;
        this.validYn = validYn;
        this.onlineYn = onlineYn;
        this.lectureBestYn = lectureBestYn;
        this.categoryId = categoryId;
        this.academyId = academyId;
        this.eduLevelId = eduLevelId;
        this.themeLectureId = themeLectureId;
        this.requiredLectureId = requiredLectureId;
        this.academySubjectId = academySubjectId;
        this.wishBool = wishBool;
        this.empId = empId;
        this.lectureNum = lectureNum;
    }

    public TrainingInstitutionLectureAll(int lectureId, String lectureTitle, String lectureUrl, int validYn, int onlineYn, int lectureBestYn, int categoryId, String academyId, String eduLevelId, int themeLectureId, int requiredLectureId, int academySubjectId, int wishBool, String empId, int lectureNum, String depth1Field, String depth2Skill, String depth3Course) {
        this.lectureId = lectureId;
        this.lectureTitle = lectureTitle;
        this.lectureUrl = lectureUrl;
        this.validYn = validYn;
        this.onlineYn = onlineYn;
        this.lectureBestYn = lectureBestYn;
        this.categoryId = categoryId;
        this.academyId = academyId;
        this.eduLevelId = eduLevelId;
        this.themeLectureId = themeLectureId;
        this.requiredLectureId = requiredLectureId;
        this.academySubjectId = academySubjectId;
        this.wishBool = wishBool;
        this.empId = empId;
        this.lectureNum = lectureNum;
        this.depth1Field = depth1Field;
        this.depth2Skill = depth2Skill;
        this.depth3Course = depth3Course;
    }

    //getter setter생성
    public int getLectureId() {
        return lectureId;
    }

    public void setLectureId(int lectureId) {
        this.lectureId = lectureId;
    }

    public String getLectureTitle() {
        return lectureTitle;
    }

    public void setLectureTitle(String lectureTitle) {
        this.lectureTitle = lectureTitle;
    }

    public String getLectureUrl() {
        return lectureUrl;
    }

    public void setLectureUrl(String lectureUrl) {
        this.lectureUrl = lectureUrl;
    }

    public int getValidYn() {
        return validYn;
    }

    public void setValidYn(int validYn) {
        this.validYn = validYn;
    }

    public int getOnlineYn() {
        return onlineYn;
    }

    public void setOnlineYn(int onlineYn) {
        this.onlineYn = onlineYn;
    }

    public int getLectureBestYn() {
        return lectureBestYn;
    }

    public void setLectureBestYn(int lectureBestYn) {
        this.lectureBestYn = lectureBestYn;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getAcademyId() {
        return academyId;
    }

    public void setAcademyId(String academyId) {
        this.academyId = academyId;
    }

    public String getEduLevelId() {
        return eduLevelId;
    }

    public void setEduLevelId(String eduLevelId) {
        this.eduLevelId = eduLevelId;
    }

    public int getThemeLectureId() {
        return themeLectureId;
    }

    public void setThemeLectureId(int themeLectureId) {
        this.themeLectureId = themeLectureId;
    }

    public int getRequiredLectureId() {
        return requiredLectureId;
    }

    public void setRequiredLectureId(int requiredLectureId) {
        this.requiredLectureId = requiredLectureId;
    }

    public int getAcademySubjectId() {
        return academySubjectId;
    }

    public void setAcademySubjectId(int academySubjectId) {
        this.academySubjectId = academySubjectId;
    }

    public int getWishBool() {
        return wishBool;
    }

    public void setWishBool(int wishBool) {
        this.wishBool = wishBool;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public int getLectureNum() {
        return lectureNum;
    }

    public void setLectureNum(int lectureNum) {
        this.lectureNum = lectureNum;
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
        return "LectureAll{" +
                "lectureId=" + lectureId +
                ", lectureTitle='" + lectureTitle + '\'' +
                ", lectureUrl='" + lectureUrl + '\'' +
                ", validYn=" + validYn +
                ", onlineYn=" + onlineYn +
                ", lectureBestYn=" + lectureBestYn +
                ", categoryId=" + categoryId +
                ", academyId='" + academyId + '\'' +
                ", eduLevelId='" + eduLevelId + '\'' +
                ", themeLectureId=" + themeLectureId +
                ", requiredLectureId=" + requiredLectureId +
                ", academySubjectId=" + academySubjectId +
                ", wishBool=" + wishBool +
                ", empId='" + empId + '\'' +
                ", lectureNum=" + lectureNum +
                ", depth1Field='" + depth1Field + '\'' +
                ", depth2Skill='" + depth2Skill + '\'' +
                ", depth3Course='" + depth3Course + '\'' +
                '}';
    }
}
