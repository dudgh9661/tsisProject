package kr.co.tsis.education.required.DTOS;

import java.util.List;

public class requiredListForm {
    private String empPosition;
    private int empYears;
    private List<Integer> lectureId;

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

    public List<Integer> getLectureId() {
        return lectureId;
    }

    public void setLectureId(List<Integer> lectureId) {
        this.lectureId = lectureId;
    }
}
