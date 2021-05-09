package kr.co.tsis.education.subjectByLecture.dto;

public class PushEmplInfo {

    private String empId;
    private int themeLectureId;
    //private int pageNum;
    private String columnName;
    //전체 페이지 버튼 수(전체 리스트 갯수 / 20)
    private int totalPageNationNum;
    //가장 먼저 출력되는 리스트 번호(pageNum * totalListNum)
    private int firstNum;

    private int totalListNum;

    private int lectureId;

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public int getThemeLectureId() {
        return themeLectureId;
    }

    public void setThemeLectureId(int themeLectureId) {
        this.themeLectureId = themeLectureId;
    }

   /* public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }*/

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public int getTotalPageNationNum() {
        return totalPageNationNum;
    }

    public void setTotalPageNationNum(int totalPageNationNum) {
        this.totalPageNationNum = totalPageNationNum;
    }

    public int getFirstNum() {
        return firstNum;
    }

    public void setFirstNum(int firstNum) {
        this.firstNum = firstNum;
    }

    public int getTotalListNum() {
        return totalListNum;
    }

    public void setTotalListNum(int totalListNum) {
        this.totalListNum = totalListNum;
    }

    public int getLectureId() {
        return lectureId;
    }

    public void setLectureId(int lectureId) {
        this.lectureId = lectureId;
    }

    @Override
    public String toString() {
        return "PushEmplInfo{" +
                "empId='" + empId + '\'' +
                ", themeLectureId=" + themeLectureId +
                ", columnName='" + columnName + '\'' +
                ", totalPageNationNum=" + totalPageNationNum +
                ", firstNum=" + firstNum +
                ", totalListNum=" + totalListNum +
                ", lectureId=" + lectureId +
                '}';
    }
}
