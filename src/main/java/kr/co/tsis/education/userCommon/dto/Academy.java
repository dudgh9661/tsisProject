package kr.co.tsis.education.userCommon.dto;

public class Academy {

    private String academyId;
    private String academyName;
    private String academyLoc;
    private String academyUrl;
    private String academyDetails;
    private String academyLogoUrl;

    public Academy(){

    }

    public Academy(String academyId, String academyName, String academyLoc, String academyUrl, String academyDetails, String academyLogoUrl) {
        this.academyId = academyId;
        this.academyName = academyName;
        this.academyLoc = academyLoc;
        this.academyUrl = academyUrl;
        this.academyDetails = academyDetails;
        this.academyLogoUrl = academyLogoUrl;
    }

    public String getAcademyId() {
        return academyId;
    }

    public void setAcademyId(String academyId) {
        this.academyId = academyId;
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
        return "Academy{" +
                "academyId='" + academyId + '\'' +
                ", academyName='" + academyName + '\'' +
                ", academyLoc='" + academyLoc + '\'' +
                ", academyUrl='" + academyUrl + '\'' +
                ", academyDetails='" + academyDetails + '\'' +
                ", academyLogoUrl='" + academyLogoUrl + '\'' +
                '}';
    }
}
