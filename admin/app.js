const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');

const { sequelize, Usluga, Kategorija,  Opcija, IzabranaOpcija, Termin, SastavTermina} = require("./models");

const cors = require("cors");

const app = express();

const corsOptions = {
	origin: '*'
  };
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

const uslugaRoutes = require("./routes/usluga.js");
app.use("/usluga", uslugaRoutes);

const opcijaRoutes = require("./routes/opcija.js");
app.use("/opcija", opcijaRoutes);

const kategorijaRoutes = require("./routes/kategorija.js");
app.use("/kategorija",  kategorijaRoutes);

const terminRoutes = require("./routes/termin.js");
app.use("/termin", terminRoutes);

const izabranaOpcijaRoutes = require("./routes/izabranaopcija.js");
app.use("/izabranaopcija", izabranaOpcijaRoutes);

app.put("/promeni-cenu/:id", async (req,res)=>{
	console.log(req.body);
	try{
   	   	const jelo = await Usluga.findByPk(req.params.id);  //iz url

		if (!jelo) {
			console.log("null");
			return res.status(404).json({ error: "Usluga nije pronađena" });
		}

    	jelo.cena = req.body.cena;  //iz body
    	jelo.save();
    	return res.json(jelo);  //vrati json nove vrednosti jela i završi funkc.
	} catch(err){
    	console.log(err);
    	res.status(500).json({ error: "Greska", data: err });
	}
});


app.listen({ port:9000 }, async () => {
	console.log("Started server on localhost:9000");
	await sequelize.sync();
	console.log("DB synced");
});