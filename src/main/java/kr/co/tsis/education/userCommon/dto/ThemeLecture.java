package kr.co.tsis.education.userCommon.dto;

public class ThemeLecture {

    private int themeLectureId;
    private String theme;

    public ThemeLecture(){

    }

    public ThemeLecture(int themeLectureId, String theme) {
        this.themeLectureId = themeLectureId;
        this.theme = theme;
    }

    public int getThemeLectureId() {
        return themeLectureId;
    }

    public void setThemeLectureId(int themeLectureId) {
        this.themeLectureId = themeLectureId;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    @Override
    public String toString() {
        return "ThemeLecture{" +
                "themeLectureId=" + themeLectureId +
                ", theme='" + theme + '\'' +
                '}';
    }
}
