package kr.co.tsis.education.lectureMng.domain.lecture;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Lecture {
    private int lectureId;
    private String lectureTitle;
    private String lectureUrl;
    private int validYn;
    private int onlineYn;
    private int lectureBestYn;
    private int categoryId;
    private String academyId;
    private String eduLevelId;
    private int themeLectureId;
    private int requiredLectureId;
    private int academySubjectId;
}
