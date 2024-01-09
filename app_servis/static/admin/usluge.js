window.addEventListener("load", function(){
  const cookies = document.cookie.split('=');
  const token = cookies[cookies.length - 1];

    fetch('http://localhost:9000/usluga/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
  }).then(response => {
      let promise = response.json();
      
      promise.then(data=>{
        console.log(data);
        for (let i=0; i<data.length; i++){
          let tr = document.createElement("tr");
          let kategorija = document.createElement("td");
          kategorija.innerHTML = data[i].kategorija.naziv;
          tr.appendChild(kategorija);

          let opcija = document.createElement("td");
          var c = 0;
          for (let j = 0; j < data[i].opcije.length; j++) {
              let opcijaElement = document.createElement("p");
              opcijaElement.innerHTML = data[i].opcije[j].usluge.naziv;
              opcija.appendChild(opcijaElement);
          }
          tr.appendChild(opcija);

          let opis = document.createElement("td");
          opis.innerHTML = data[i].opis;
          tr.appendChild(opis);

          let cena = document.createElement("td");
          cena.innerHTML = data[i].cena;  
          tr.appendChild(cena);

          let akcija = document.createElement("td");

          let btnPromenaCene = document.createElement("button");
          btnPromenaCene.className = "btn btn-primary mb-1";
          btnPromenaCene.innerHTML = "Promena cene";
          btnPromenaCene.addEventListener("click", function(){
            console.log("promena cene");
            var c = prompt("Unesi novu cenu:");
            var id = this.closest("tr").dataset.id;
            fetch(`http://localhost:9000/promeni-cenu/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
              body: JSON.stringify({ cena: c })	
            })
            .then( response=>response.json() )
            .then( data=>{
              document.querySelectorAll(` #spisak > tr[data-id='${data.id}'] > td:nth-child(2) `).innerHTML = data.cena;  
              location.reload();
              })
            .catch( err=>{
              alert("Desila se greska");
              console.log(err);		
              });
            }
          );
          akcija.appendChild(btnPromenaCene);

          let btnIzmeni = document.createElement("a");
          btnIzmeni.className = "btn btn-primary";
          btnIzmeni.innerHTML = "Izmeni";
          btnIzmeni.href = `usluga.html?id=${data[i].id}`;
          akcija.appendChild(btnIzmeni);

          tr.appendChild(akcija);

          tr.dataset.id = data[i].id;

          document.getElementById("spisak").appendChild(tr);
        }
        }
      );
      }
    ).catch(error => {
        console.error('Error:', error);
        }
      );
    }
  );
 