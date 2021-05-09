package kr.co.tsis.education.userCommon.dto;

public class RequiredLecture {

    private int requiredLectureId;
    private String empPosition;
    private int empYears;

    public RequiredLecture(){

    }

    public RequiredLecture(int requiredLectureId, String empPosition, int empYears) {
        this.requiredLectureId = requiredLectureId;
        this.empPosition = empPosition;
        this.empYears = empYears;
    }

    public int getRequiredLectureId() {
        return requiredLectureId;
    }

    public void setRequiredLectureId(int requiredLectureId) {
        this.requiredLectureId = requiredLectureId;
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

    @Override
    public String toString() {
        return "RequiredLecture{" +
                "requiredLectureId=" + requiredLectureId +
                ", empPosition='" + empPosition + '\'' +
                ", empYears=" + empYears +
                '}';
    }
}
