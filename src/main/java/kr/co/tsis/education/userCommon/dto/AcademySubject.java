package kr.co.tsis.education.userCommon.dto;

public class AcademySubject {

    private int academySubjectId;
    private String academyName;
    private String academySkill;
    private String academyId;

    public AcademySubject(){

    }

    public AcademySubject(int academySubjectId, String academyName, String academySkill, String academyId) {
        this.academySubjectId = academySubjectId;
        this.academyName = academyName;
        this.academySkill = academySkill;
        this.academyId = academyId;
    }

    public int getAcademySubjectId() {
        return academySubjectId;
    }

    public void setAcademySubjectId(int academySubjectId) {
        this.academySubjectId = academySubjectId;
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        this.academyName = academyName;
    }

    public String getAcademySkill() {
        return academySkill;
    }

    public void setAcademySkill(String academySkill) {
        this.academySkill = academySkill;
    }

    public String getAcademyId() {
        return academyId;
    }

    public void setAcademyId(String academyId) {
        this.academyId = academyId;
    }

    @Override
    public String toString() {
        return "AcademySubject{" +
                "academySubjectId=" + academySubjectId +
                ", academyName='" + academyName + '\'' +
                ", academySkill='" + academySkill + '\'' +
                ", academyId='" + academyId + '\'' +
                '}';
    }
}
