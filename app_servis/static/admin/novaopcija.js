window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById("forma").addEventListener("submit", function(event){
        console.log("Radi");
        event.preventDefault();	//sprecimo default ponasanje
        var validno = validacija();	//uradimo validaciju
        if(!validno){ return; }		//ako nije validno - kraj
    
        var novoJelo = {};		//napravimo novi objekat jela
        novoJelo.naziv = document.getElementById("naziv").value; 
        novoJelo.osnovna_cena = document.getElementById("cena").value; 
        
    
        fetch(`http://localhost:9000/opcija/`, {
            method:"POST",
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify(novoJelo)
        })
        .then(succ=>succ.json())
        .then(data=>{
        window.location.href=`/opcije.html`;
        })
        .catch(err => console.log(err));	
    });    


});

function validacija(){
    var validno  = true;

    if(document.getElementById("naziv").value.length < 3 ){
        validno=false;
        document.getElementById("naziv").classList.remove("success")
        document.getElementById("naziv").classList.add("error");
    }
    else {
        document.getElementById("naziv").classList.remove("error")
        document.getElementById("naziv").classList.add("success");
    }

    return validno;
}