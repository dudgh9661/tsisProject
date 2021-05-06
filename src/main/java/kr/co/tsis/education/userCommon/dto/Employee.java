package kr.co.tsis.education.userCommon.dto;

public class Employee {

    private String empId;
    private String empName;
    private String empPosition;
    private int empYears;
    private String empTeam;
    private int surveyYn;
    private int authority;

    public Employee(){

    }

    public Employee(String empId, String empName, String empPosition, int empYears, String empTeam, int surveyYn, int authority) {
        this.empId = empId;
        this.empName = empName;
        this.empPosition = empPosition;
        this.empYears = empYears;
        this.empTeam = empTeam;
        this.surveyYn = surveyYn;
        this.authority = authority;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmpPosition() {
        return empPosition;
    }

    public void setEmpPosition(String empPosition) {
        this.empPosition = empPosition;
    }

    public int getEmpYears() {
        return empYears;
    }

    public void setEmpYears(int empYears) {
        this.empYears = empYears;
    }

    public String getEmpTeam() {
        return empTeam;
    }

    public void setEmpTeam(String empTeam) {
        this.empTeam = empTeam;
    }

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

    @Override
    public String toString() {
        return "Employee{" +
                "empId='" + empId + '\'' +
                ", empName='" + empName + '\'' +
                ", empPosition='" + empPosition + '\'' +
                ", empYears=" + empYears +
                ", empTeam='" + empTeam + '\'' +
                ", surveyYn=" + surveyYn +
                ", authority=" + authority +
                '}';
    }
}
