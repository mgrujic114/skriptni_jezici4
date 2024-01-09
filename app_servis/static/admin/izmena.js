window.addEventListener("load", function(){
	const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    var id = null;
    var url = new URL( window.location.href );
    id = url.searchParams.get("id");  //shvatiće da se misli na globalnu varijablu id
    //alert(id);  //proverite sta ste dohvatili
    
    fetch(`http://localhost:9000/usluga/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then( resp=>resp.json() )
    .then( data=>{
	    console.log(data); //proverite sta ste dobili
        
        document.getElementById("naziv").value = data.naziv; 
        document.getElementById("cena").value = data.cena; 
        document.getElementById("opis").value = data.opis; 
        this.document.getElementById("kategorija").value = data.kategorija_id;
        //itd za ostala polja
        for(let i=0; i<data.opcije.length; i++){
            dodajOpciju(data.opcije[i].id); //zavisno sta je u nizu, mozda vam treba .id
        }
    })
    .catch(err=>console.log(err));
    
    this.document.getElementById("dugmeObrisi").addEventListener("click", function(){
        if( confirm("Potvrdi brisanje") ){
            console.log("brisi");
            fetch(`http://localhost:9000/usluga/${id}`, { method:"DELETE" })
            .then( resp=>resp.json()).then(data=>{
                //response sadrzi samo id obrisanog
                alert("Obrisan je zapis "+data);
                window.location.href = "/usluge.html"; //predji na spisak
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
