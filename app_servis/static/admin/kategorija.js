window.addEventListener("load", function(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    var id = null;
    var url = new URL( window.location.href );
    id = url.searchParams.get("id");  
    
    fetch(`http://localhost:9000/kategorija/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then( resp=>resp.json() )
    .then( data=>{
	    console.log(data); 
        
        document.getElementById("naziv").value = data.naziv; 
        document.getElementById("koeficijent").value = data.koeficijent; 
        
    })
    .catch(err=>console.log(err));

    document.getElementById("forma").addEventListener("submit", function(event){
    event.preventDefault();	
    var validno = validacija();	
    if(!validno){ return; }		

    var novoJelo = {};	
    novoJelo.naziv = document.getElementById("naziv").value; 
    novoJelo.koeficijent = document.getElementById("koeficijent").value;

    fetch(`http://localhost:9000/kategorija/${id}`, {
      method:"PUT",
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
    
    this.document.getElementById("dugmeObrisi").addEventListener("click", function(){
        if( confirm("Potvrdi brisanje") ){
            console.log("brisi");
            fetch(`http://localhost:9000/kategorija/${id}`, { method:"DELETE" })
            .then( resp=>resp.json()).then(data=>{
                alert("Obrisan je zapis "+data);
                window.location.href = "/kategorije.html"; 
            })
            .catch( err=>console.log(err));
        } else {
            return;
        }
        
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