$(document).ready(function(){
    $("#navbar").load("framePassenger/navbar.html");
});

//카카오 결제 요청 
function kakaoPayProcess() {
	
	//운행 중 화면으로부터 넘어올 때 r_idx 받아오기
	var r_idx = 9;
	
	console.log('kakaopay 요청 01  '+r_idx);
	
	$.ajax({
		url : "http://localhost:8080/par/payment/kakao/r_idx/"+r_idx,
        type: 'POST',
		dataType : "text",
		success : function(data) {
			console.log('kakao 결제 성공  - 성공페이지로 이동'+data);
			window.location.href = data; //성공할 경우 클라이언트 성공 페이지로 이동 
			//ajax 로 요청했는데 controller 단에서 redirect 할 경우, cors origin 에러가 발생하게 된다. 
			//요청하는 위치가 달라지기 때문 : client  vs  server 
			//따라서 client 단으로 다시 돌아와서 원하는 페이지로 redirect 하도록 처리함 
		},
		error : function(data) {
			console.log('kakao 결제 실패 - 실패 페이지 이동 ');
			window.location.href = "http://localhost:8080/parclient/kakao/fail.html?r_idx="+r_idx;
		}
		
	})
}

//토스 결제요청
function tossPayProcess() {
	
	//운행 중 화면으로부터 넘어올 때 r_idx 받아오기
	var r_idx = 9;
	console.log('toss pay 요청 01  '+r_idx);
	
	$.ajax({
		url : 'http://localhost:8090/parboot/payment/toss/r_idx/'+r_idx,
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			console.log('toss pay success' + data);
			console.log('toss pay success  ' + data.checkoutPage);
			
			//결제 요청 성공 페이지로 이동됨
			location.replace(data.checkoutPage);
			
			//window.location.href='\''+data.checkoutPage+'\''; 
			//console.log('\'' + data.checkoutPage + '\'');
			//href를 쓰니까 context path 가 붙는 상황 발생 
			//따라서 replace 로 고쳐서 url 아예 바꿔줌 
		},
		error : function(e) {
			console.log('error 발생 ' + e);
			window.location.href = "http://localhost:8080/parclient/kakao/fail.html?r_idx="+r_idx;
		}
	})
}
