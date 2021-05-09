package kr.co.tsis.education.academy.DTOS;

import java.util.List;

public class academyPageDTO {
    private int totalCount;
    private int totalpage;
    private List<academyDTO> organi;

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalpage() {
        return totalpage;
    }

    public void setTotalpage(int totalpage) {
        this.totalpage = totalpage;
    }

    public List<academyDTO> getOrgani() {
        return organi;
    }

    public void setOrgani(List<academyDTO> organi) {
        this.organi = organi;
    }
}
