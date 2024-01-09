window.addEventListener("load", function(){
  const cookies = document.cookie.split('=');
  const token = cookies[cookies.length - 1];      
  var id = null;
  var url = new URL( window.location.href );
  id = url.searchParams.get("id");  
    
  fetch(`http://localhost:9000/termin/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  }).then( resp=>resp.json() )
    .then( data=>{
      console.log(data); 
        
      var formattedDate = new Date(data.vreme).toLocaleString();
      document.getElementById("vreme").innerText = formattedDate;
      
      document.getElementById("status").value = data.status; 
        
      for(let i=0; i<data.termini.length; i++){
        let usluga = document.createElement("li");
        usluga.innerHTML = data.termini[i].usluga.naziv;
        document.getElementById("sadrzaj").appendChild(usluga);
      }
        
  }).catch(err=>console.log(err));
});