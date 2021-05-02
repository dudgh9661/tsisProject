package kr.co.tsis.education.controller;

import io.swagger.annotations.ApiOperation;
import kr.co.tsis.education.domain.Test;
import kr.co.tsis.education.service.TestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private TestService testService;

    // 로그 찍기 위해 사용
    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    //Swagger에서 컨트롤러 메소드 기능 표시
    @ApiOperation(value="테스트 번호 조회")
    @GetMapping
    public ResponseEntity<List<Test>> getTestNo() {
        LOGGER.debug("테스트 번호 조회");
        return new ResponseEntity<>(testService.getTestNo(), HttpStatus.OK);
    }


//    ------ Rest Controller 예제 코드 -----
//    ------ DeleteMapping 얘시 -----
//    @ApiOperation(value = "예매 취소 시도")
//    @DeleteMapping("/cancel/{ticketNo")
//    public ResponseEntity<String> cancelTicketing(@PathVariable("ticketNo") int ticketNo) {
//        LOGGER.debug("예매 취소 시도");
//
//        if (ticketService.cancelTicketing(ticketNo))
//            return new ResponseEntity<>("예매 취소 완료", HttpStatus.OK);
//        return new ResponseEntity<>("예매 취소 실패", HttpStatus.INTERNAL_SERVER_ERROR);
//    }

//    ----- GetMapping, @PathVariable 예시 ----
//    @ApiOperation(value = "예매번호 따른 예매 좌석 상태 확인")
//    @GetMapping("/seatStatus/ticketNo/{ticketNo}")
//    public ResponseEntity<List<String>> getSeatStatus(@PathVariable("ticketNo") int ticketNo) {
//        LOGGER.debug("예매번호에 따른 예매 좌석 상태 확인");
//
//        return new ResponseEntity<>(ticketService.getReserveSeat(ticketNo), HttpStatus.OK);
//    }

//    ------ PostMapping, @RequestBody 예시 -----
//    @ApiOperation(value = "영화 예매하기")
//    @PostMapping("/reserve")
//    public ResponseEntity<String> reserveTicketing(@RequestBody List<Ticket> tickets) {
//        LOGGER.debug("예매 정보 입력 시도");
//
//        // 1. 가장 최근에 사용된 ticketNo 가져오기
//        int ticketNo = ticketService.getTicketNoRecent()+1;
//
//        if (ticketService.reserveTicketing(tickets,ticketNo))
//            return new ResponseEntity<>("예매 완료", HttpStatus.OK);
//        return new ResponseEntity<>("예매 실패", HttpStatus.INTERNAL_SERVER_ERROR);
//    }

//    ----- PutMapping(update 시 사용 )

}
