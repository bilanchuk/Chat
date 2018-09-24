$(document).ready(function() {
	var socket = io.connect('https://mychatsemen.herokuapp.com/');
	socket.emit('joinclient',"is connect");
	socket.on('joinserver',function(data){
		var mas = data.mas;
		var msg = data.msg;
		var user = data.user;
		msg+=" "+user;
		$(".users").empty();
		for(var i=0;i<mas.length;i++){
			$("<p>").text(mas[i]).appendTo(".users");
		}
		var date = new Date();
		date = date.toLocaleTimeString();
		$("<p>").text(date+" "+msg).appendTo(".chat");
	})
	$(".send").click(function(){
		var text = $(".msg").val();
		if(!text){
			return;
		}
		$(".msg").val('');
		socket.emit('sendmsg',text);
	})
	socket.on('msgserver',function(data){
		var date = new Date();
		date = date.toLocaleTimeString();
		$("<p>").text(date+" "+data.user+" : "+data.msg).appendTo(".chat");
	})
    function getUser(){
    	$.get('/getuser',function(data){
    		$("#log").css("color","red").text(data.userobj.username);
    	});
    }
    getUser();
    $(".logout").click(function(){
    	socket.emit('logout',"loged out");
    	$.get('/logout',function(data){
    		console.log(data);
    		document.location.reload();
    	});
    });
    socket.on('logedout',function(data){
    	var date = new Date();
		date = date.toLocaleTimeString();
    	$("<p>").text(date+" "+data.msg).appendTo(".chat");
    	$(".users").empty();
    	var mas = data.mas;
		for(var i=0;i<mas.length;i++){
			$("<p>").text(mas[i]).appendTo(".users");
		}
    });
    $(window).on("unload", function(e) {
    socket.emit('logout',"loged out");
    	$.get('/logout',function(data){
    		console.log(data);
    		document.location.reload();
    	});
    	socket.on('logedout',function(data){
    	var date = new Date();
		date = date.toLocaleTimeString();
    	$("<p>").text(date+" "+data.msg).appendTo(".chat");
    	$(".users").empty();
    	var mas = data.mas;
		for(var i=0;i<mas.length;i++){
			$("<p>").text(mas[i]).appendTo(".users");
		}
    })
});
    

   

    /*$(window).unload(function(){
    	
    });*/
});
