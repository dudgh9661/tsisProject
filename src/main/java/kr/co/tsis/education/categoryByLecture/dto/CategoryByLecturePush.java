package kr.co.tsis.education.categoryByLecture.dto;

public class CategoryByLecturePush {

    private int categoryId; // 카테고리 아이디
    private String dataPush; // 십진수
    private String columnName; // 컬럼명
    private int totalListNum; // 출력 리스트 갯수
    private int firstNum; //가장 먼저 출력되는 리스트
    private String empId;

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getDataPush() {
        return dataPush;
    }

    public void setDataPush(String dataPush) {
        this.dataPush = dataPush;
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

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }
}
