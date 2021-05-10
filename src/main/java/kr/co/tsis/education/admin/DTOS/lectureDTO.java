package kr.co.tsis.education.admin.DTOS;

//import jdk.nashorn.internal.objects.annotations.Getter;
//import jdk.nashorn.internal.objects.annotations.Setter;


public class lectureDTO {
    private String empName;
    private String empTeam;
    private String empPosition;
    private String empId;
    private int empYears;
    private  int surveyYn;
    private  int authority;

    public int getSurveyYn() {
        return surveyYn;
    }

    public void setSurveyYn(int surveyYn) {
        this.surveyYn = surveyYn;
    }

    public int getAuthority() {
        return authority;
    }

    public void setAuthority(int authority) {
        this.authority = authority;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmpTeam() {
        return empTeam;
    }

    public void setEmpTeam(String empTeam) {
        this.empTeam = empTeam;
    }

    public String getEmpPosition() {
        return empPosition;
    }

    public void setEmpPosition(String empPosition) {
        this.empPosition = empPosition;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public int getEmpYears() {
        return empYears;
    }

    public void setEmpYears(int empYears) {
        this.empYears = empYears;
    }
}
