package kr.co.tsis.education.mainPage.dto;

public class MainPageLecture {

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

    private String academyName;
    private String academyLoc;
    private String academyUrl;
    private String academyDetails;
    private String academyLogoUrl;

    public MainPageLecture(){

    }

    public MainPageLecture(int lectureId, String lectureTitle, String lectureUrl, int validYn, int onlineYn, int lectureBestYn, int categoryId, String academyId, String eduLevelId, int themeLectureId, int requiredLectureId, int academySubjectId, String academyName, String academyLoc, String academyUrl, String academyDetails, String academyLogoUrl) {
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
        this.academyName = academyName;
        this.academyLoc = academyLoc;
        this.academyUrl = academyUrl;
        this.academyDetails = academyDetails;
        this.academyLogoUrl = academyLogoUrl;
    }

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

    public String getAcademyUrl() {
        return academyUrl;
    }

    public void setAcademyUrl(String academyUrl) {
        this.academyUrl = academyUrl;
    }

    public String getAcademyDetails() {
        return academyDetails;
    }

    public void setAcademyDetails(String academyDetails) {
        this.academyDetails = academyDetails;
    }

    public String getAcademyLogoUrl() {
        return academyLogoUrl;
    }

    public void setAcademyLogoUrl(String academyLogoUrl) {
        this.academyLogoUrl = academyLogoUrl;
    }

    @Override
    public String toString() {
        return "BestLecture{" +
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
                ", academyName='" + academyName + '\'' +
                ", academyLoc='" + academyLoc + '\'' +
                ", academyUrl='" + academyUrl + '\'' +
                ", academyDetails='" + academyDetails + '\'' +
                ", academyLogoUrl='" + academyLogoUrl + '\'' +
                '}';
    }
}
