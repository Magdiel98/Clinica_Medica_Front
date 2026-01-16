document.addEventListener("DOMContentLoaded", function(){
    let botaolista = document.getElementById("botaolista");
    let listaburguer = document.getElementById("listaburguer");

    botaolista.addEventListener("click", function(){
        if(listaburguer.style.display === "none"){
            listaburguer.style.display = "block";
        }
        else{
            listaburguer.style.display = "none";
        }
        
    })

    window.addEventListener("resize", function(){
        if(window.innerWidth > 760){
            listaburguer.style.display = "none";
        }
    })

});
