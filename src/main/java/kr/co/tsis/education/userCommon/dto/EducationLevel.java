package kr.co.tsis.education.userCommon.dto;

public class EducationLevel {

    private String eduLevelId;
    private String eduLevel;
    private String eduDetails;

    public EducationLevel(){

    }

    public EducationLevel(String eduLevelId, String eduLevel, String eduDetails) {
        this.eduLevelId = eduLevelId;
        this.eduLevel = eduLevel;
        this.eduDetails = eduDetails;
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


    @Override
    public String toString() {
        return "EducationLevel{" +
                "eduLevelId='" + eduLevelId + '\'' +
                ", eduLevel='" + eduLevel + '\'' +
                ", eduDetails='" + eduDetails + '\'' +
                '}';
    }
}
