package kr.co.tsis.education.lectureMng.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ToModifyPageResponseDto {
    private String lectureTitle;
    private String depth1Field;
    private String depth2Skill;
    private String depth3Course;
    private String academyName;
    private String academyUrl;
    private String theme;
    private List<empDto> empDtoList;
    private int onlineYn;
    private String eduLevelId;
    private int lectureBestYn;
    private String academyId;

    @Builder
    public ToModifyPageResponseDto(List<empDto> empDtoList,
                                   ToModifyPageDataResponseDto toModifyPageDataResponseDto) {
        this.lectureTitle = toModifyPageDataResponseDto.getLectureTitle();
        this.depth1Field = toModifyPageDataResponseDto.getDepth1Field();
        this.depth2Skill = toModifyPageDataResponseDto.getDepth2Skill();
        this.depth3Course = toModifyPageDataResponseDto.getDepth3Course();
        this.academyName = toModifyPageDataResponseDto.getAcademyName();
        this.academyUrl = toModifyPageDataResponseDto.getAcademyUrl();
        this.theme = toModifyPageDataResponseDto.getTheme();
        this.empDtoList = empDtoList;
        this.onlineYn = toModifyPageDataResponseDto.getOnlineYn();
        this.eduLevelId = toModifyPageDataResponseDto.getEduLevelId();
        this.lectureBestYn = toModifyPageDataResponseDto.getLectureBestYn();
        this.academyId = toModifyPageDataResponseDto.getAcademyId();
    }
}
