package kr.co.tsis.education.academy.DTOS;

public class academyDTO {
    private String academyId;
    private String academyName;
    private String academyLogoUrl;
    private int count;
    private String academyLoc;
    private String academyUrl;
    private  String academyDetails;

    public String getAcademyDetails() {
        return academyDetails;
    }

    public void setAcademyDetails(String academyDetails) {
        this.academyDetails = academyDetails;
    }

    public String getAcademyUrl() {
        return academyUrl;
    }

    public void setAcademyUrl(String academyUrl) {
        this.academyUrl = academyUrl;
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

    public String getAcademyLogoUrl() {
        return academyLogoUrl;
    }

    public void setAcademyLogoUrl(String academyLogoUrl) {
        this.academyLogoUrl = academyLogoUrl;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getAcademyLoc() {
        return academyLoc;
    }

    public void setAcademyLoc(String academyLoc) {
        this.academyLoc = academyLoc;
    }
}
