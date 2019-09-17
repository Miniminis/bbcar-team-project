$(document).ready(function(){

    //navbar load 
    $("#navbar").load("../framePassenger/navbar.html");
    
    //현재 세션에서 p_idx, nickname 값 구해서 input 에 넣어주기 
    var p_idx = 1;
    var nickname='익명의 탑승자';
	$('#p_idx').val(p_idx);
	$('#nickname').val(nickname);
	
	/* 후기 등록 
	 * 1. 사용자 세션 값에서 p_idx, 닉네임 가져오기 --> input 에 넣어주기 
	 * 2. form 제출 --> DB에 insert 
	 *  rv_idx int(7) AI PK 
		payidx int(7) 
		p_idx int(10) 
		d_idx int(10) 
		pr_content varchar(255) 
		pr_star int(10) 
		dr_content varchar(255) 
		dr_star int(10)
	 * 3. 완료되면 띄워줄 alert + 페이지 이동   
	 * */
	
	//결제 완료 페이지에서 넘겨준 r_idx 이용해서 서버단에서 payidx, p_idx, d_idx 구하기 
	//--> 세션의 p_idx 와 결제 테이블의 p_idx 가 일치하는지 체크 필요 
	var params = document.location.href.split('?'); 
	console.log('리뷰 등록 01  r_idx 01 : '+params[1]);
	
	var paramArray = params[1].split('=');
	console.log('리뷰 등록 02 r_idx 02 '+paramArray[0]+' / '+paramArray[1]);
	
	$('#r_idx').val(paramArray[1]);
	
})

//후기 form 제출 + DB 저장 + 성공시 redirect page 지정 
function reviewSubmit(){
	
	//session 에서 p_idx 값 가져오기 : 현재는 임의의 값 1 
	$.ajax({
		url : 'http://localhost:8080/par/review/passenger',
		type: 'post',
		contentType:'application/json;charset=UTF-8',
		data : JSON.stringify({
			r_idx : $('#r_idx').val(),
			p_idx : $('#p_idx').val(),
			pr_content : $('#comment').val(),
			pr_star : $('#starRate').val()
		}),
		success : function(data) {
			//alert(data);
			//alert('탑승자님의 소중한 리뷰가 등록되었습니다!');
			if(data>0) {
				alert(data+'개의 소중한 리뷰가 등록되었습니다!');
				window.location.href='http://localhost:8080/parclient/passengerMain.html';
			}
		}, 
		error : function(e) {
			console.log('리뷰 입력 실패 '+e);
		}
	})
	
}