package kr.co.tsis.education.userCommon.dto;

public class Guide {

    private int guideId;
    private String contents;

    public Guide(){

    }

    public Guide(int guideId, String contents) {
        this.guideId = guideId;
        this.contents = contents;
    }

    public int getGuideId() {
        return guideId;
    }

    public void setGuideId(int guideId) {
        this.guideId = guideId;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    @Override
    public String toString() {
        return "Guide{" +
                "guideId=" + guideId +
                ", contents='" + contents + '\'' +
                '}';
    }
}
