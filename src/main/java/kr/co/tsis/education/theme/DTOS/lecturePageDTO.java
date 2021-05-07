package kr.co.tsis.education.theme.DTOS;

import java.util.List;

public class lecturePageDTO {
    private int totalCount;
    private int totalPage;
    private List<lectureDTO> lectures;

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public List<lectureDTO> getLectures() {
        return lectures;
    }

    public void setLectures(List<lectureDTO> lectures) {
        this.lectures = lectures;
    }
}
