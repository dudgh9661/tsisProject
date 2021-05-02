package kr.co.tsis.education.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(description = "Class는 DB Table명 / 필드는 DB 컬럼 명")
public class Test {
    @ApiModelProperty(value = "테스트 번호")
    private int testNo;

    public int getTestNo() {
        return testNo;
    }

    public void setTestNo(int testNo) {
        this.testNo = testNo;
    }

    @Override
    public String toString() {
        return "Test{" +
                "testNo=" + testNo +
                '}';
    }
}
