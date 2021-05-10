package kr.co.tsis.education.trainingByInstitution.dto;

public class TrainingPageHandlingInfo {

    private String academyId;
    private int academySubjectId;
    private String empId;
    private String columnName; // 컬럼명
    private int totalListNum;
    private int firstNum;

    public TrainingPageHandlingInfo(){

    }

    public TrainingPageHandlingInfo(String academyId, int academySubjectId, String empId, String columnName, int totalListNum, int firstNum) {
        this.academyId = academyId;
        this.academySubjectId = academySubjectId;
        this.empId = empId;
        this.columnName = columnName;
        this.totalListNum = totalListNum;
        this.firstNum = firstNum;
    }

    public String getAcademyId() {
        return academyId;
    }

    public void setAcademyId(String academyId) {
        this.academyId = academyId;
    }

    public int getAcademySubjectId() {
        return academySubjectId;
    }

    public void setAcademySubjectId(int academySubjectId) {
        this.academySubjectId = academySubjectId;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public int getTotalListNum() {
        return totalListNum;
    }

    public void setTotalListNum(int totalListNum) {
        this.totalListNum = totalListNum;
    }

    public int getFirstNum() {
        return firstNum;
    }

    public void setFirstNum(int firstNum) {
        this.firstNum = firstNum;
    }

    @Override
    public String toString() {
        return "TrainingPageHandlingInfo{" +
                "academyId='" + academyId + '\'' +
                ", academySubjectId=" + academySubjectId +
                ", empId='" + empId + '\'' +
                ", columnName='" + columnName + '\'' +
                ", totalListNum=" + totalListNum +
                ", firstNum=" + firstNum +
                '}';
    }
}
