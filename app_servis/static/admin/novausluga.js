window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();	
        var validno = validacija();	
        if(!validno){ return; }		
    
        var novoJelo = {};		
        novoJelo.naziv = document.getElementById("naziv").value; 
        novoJelo.cena = document.getElementById("cena").value; 
        novoJelo.opis = document.getElementById("opis").value; 
        novoJelo.kategorija_id = document.getElementById("kategorija").value; 
        
    
        fetch(`http://localhost:9000/usluga/`, {
            method:"POST",
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`},
            body: JSON.stringify(novoJelo)
        })
        .then(succ=>succ.json())
        .then(data=>{
        window.location.href=`/usluge.html`;
        console.log("dodavanje usluge uspesno");
        })
        .catch(err => console.log(err));	

        var novaVeza = {};	
        novaVeza.opcija_id = document.getElementById("spisak-opcija").value;

        /*
        fetch(`http://localhost:9000/izabranaopcija/`, {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoJelo)
        })
        .then(succ=>succ.json())
        .then(data=>{
        console.log("povezivanje opcije uspesno");
        })
        .catch(err => console.log(err));*/
        var opcijeDiv = document.getElementById("opcije");
        var sveVrednosti = [];
    
        opcijeDiv.childNodes.forEach(function(childNode) {
          if (childNode.nodeType === 1) {
            var vrednost = childNode.innerText;
            sveVrednosti.push(vrednost);
          }
        });
    
        console.log("Sve vrednosti iz <div> sa ID opcije nakon submitovanja forme:", sveVrednosti);
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