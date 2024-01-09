window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();
        var validno = validacija();	
        if(!validno){ return; }	
    
        var novoJelo = {};	
        novoJelo.naziv = document.getElementById("naziv").value; 
        novoJelo.koeficijent = document.getElementById("koeficijent").value; 
        
        fetch(`http://localhost:9000/kategorija/`, {
            method:"POST",
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify(novoJelo)
        })
        .then(succ=>succ.json())
        .then(data=>{
        window.location.href=`/kategorije.html`;
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