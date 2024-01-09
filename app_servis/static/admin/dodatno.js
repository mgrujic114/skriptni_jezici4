window.addEventListener("load", function(){
  const cookies = document.cookie.split('=');
  const token = cookies[cookies.length - 1];

  fetch('http://localhost:9000/kategorija/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    let promise = response.json();
        
    promise.then(data=>{
      console.log(data);
      for (let i=0; i<data.length; i++){
        let opcija = document.createElement("option");
        opcija.value = data[i].id;
        opcija.innerHTML = data[i].naziv;
        document.getElementById("kategorija").appendChild(opcija);
      }
    });
    }).catch(error => {
      console.error('Error:', error);
    });

  fetch('http://localhost:9000/opcija/',  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    let promise = response.json();
      
    promise.then(data=>{
    console.log(data);
      for (let i=0; i<data.length; i++){
        let opcija = document.createElement("option");
        opcija.value = data[i].id;
        opcija.innerHTML = data[i].naziv;

        document.getElementById("spisak-opcija").appendChild(opcija);
      }
    });
    }).catch(error => {
        console.error('Error:', error);
    });

    this.document.getElementById("dodaj-opciju").addEventListener("click", function(){
      var id = document.getElementById("spisak-opcija").value;
      console.log(id);
      if(!id){
          alert("Izaberi opciju!");
          return;
      }
      dodajOpciju(id);
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

