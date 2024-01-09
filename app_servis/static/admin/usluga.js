window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    var id = null;
    var url = new URL( window.location.href );
    id = url.searchParams.get("id"); 

    document.getElementById("forma").addEventListener("click", function(){
        var validno  = validacija();
        
        return validno;
    });

    document.getElementById("naziv").addEventListener("keypress", function(){
        this.classList.remove('success'); 
        this.classList.remove('error'); 
    });

    document.getElementById("nazad").addEventListener("click", function () {
        window.history.back();
    });


    fetch(`http://localhost:9000/usluga/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then( resp=>resp.json() )
    .then( data=>{
	    console.log(data);
        
        document.getElementById("naziv").value = data.naziv; 
        document.getElementById("cena").value = data.cena; 
        document.getElementById("opis").value = data.opis; 
        document.getElementById("kategorija").value = data.kategorija_id;
        
        for(let i=0; i<data.opcije.length; i++){
            dodajOpciju(data.opcije[i].id); 
        }
    })
    .catch(err=>console.log(err));

    document.getElementById("forma").addEventListener("submit", function(event){
        event.preventDefault();	
        var validno = validacija();
        if(!validno){ return; }	

        var novoJelo = {};
        novoJelo.naziv = document.getElementById("naziv").value; 
        novoJelo.cena = document.getElementById("cena").value;
        novoJelo.opis = document.getElementById("opis").value;
        novoJelo.kategorija_id = document.getElementById("kategorija").value;

      fetch(`http://localhost:9000/usluga/${id}`, {
        method:"PUT",
        headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` },
        body: JSON.stringify(novoJelo)
      })
      .then(succ=>succ.json())
      .then(data=>{
        window.location.href=`/usluge.html`;
      })
    .catch(err => console.log(err));	
  });
    
    this.document.getElementById("dugmeObrisi").addEventListener("click", function(){
        if( confirm("Potvrdi brisanje") ){
            console.log("brisi");
            fetch(`http://localhost:9000/usluga/${id}`, { 
                method:"DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then( resp=>resp.json()).then(data=>{
                alert("Obrisan je zapis "+data);
                window.location.href = "/usluge.html"; 
            })
            .catch( err=>console.log(err));            
        } else {
            return;
        } 
    });

});

function dodajOpciju(id){ 
    document.querySelector(`#spisak-opcija > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-opcija").selectedIndex = 0;

    var naziv = document.querySelector(`#spisak-opcija > option[value='${id}']`).innerHTML;

    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.innerHTML = naziv;
    
    var button = document.createElement("button");
    button.type="button";
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");
    button.innerHTML = "X";

    span.appendChild(button);
    document.getElementById("opcije").appendChild(span);

    button.addEventListener("click", function(){  
      var id = this.parentNode.dataset.id;
      this.parentNode.parentNode.removeChild( this.parentNode );

      document.querySelector(`#spisak-opcija > option[value='${id}']`).disabled = false;
    });
}


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

  function sacuvaj(){
    var spanovi = document.querySelectorAll("#opcije > span.badge");
        var niz = [];
        for(let i=0; i<spanovi.length; i++){
            niz.push(spanovi[i].dataset.id);
         }
        
        var jsonNiz = JSON.stringify(niz);
        var hiddenInput = document.getElementById("opcije-input");
        hiddenInput.value = jsonNiz;
    
        console.log("Vrednost skrivenog input polja: " + hiddenInput.value);
  }