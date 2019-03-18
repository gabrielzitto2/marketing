

///if(sessionStorage.getItem('chave') == true){

    window.addEventListener('blur', function(){
        document.querySelector('.bg-modal').style.display = "flex";
       //sessionStorage.setItem('chave', false);
       // console.log(sessionStorage.getItem('chave'))
       
    });
    window.addEventListener('pagehide', function(){
        document.querySelector('.bg-modal').style.display = "flex";
      //  sessionStorage.setItem('chave', false);
    });


//}


document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});