$(document).ready(function(){
    $(".register").click(function(){
        var name = $("#exampleInputEmail1").val();
        var pas = $("#exampleInputPassword1").val();
        if(!name||!pas){
            alert("Введіть значення");
            return;
        }
        var obj = {
            username:name,
            password:pas
        }
        $.post('/adduser',obj,function(data){
				console.log(data);
                document.location.reload();
			});
    })
});