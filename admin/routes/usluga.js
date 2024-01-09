const express = require("express");
const { authAdminToken } = require("./rendom");

const { sequelize, Kategorija, Usluga, Opcija, IzabranaOpcija} = require("../models");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
    try{
          const usluge = await Usluga.findAll({ include: [
               { model: Kategorija, as: "kategorija" },
               { model: IzabranaOpcija, as: "opcije", include: { model: Opcija, as: "usluge"}}
           ] });
          return res.json(usluge);     
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 route.get("/:id", async (req, res) => {
    try{
           
          return res.json(usluga);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", authAdminToken, async (req, res) => {
    try{
          const novi = await Usluga.create(req.body);
          return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", authAdminToken, async (req, res) => {
     try{
          const jelo = await Usluga.findByPk(req.params.id);
          jelo.naziv = req.body.naziv;
          jelo.opis = req.body.opis;
          jelo.cena = req.body.cena;
          jelo.kategorija_id = req.body.kategorija_id;
          console.log(req.body);
          jelo.save();
          return res.json(jelo);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", authAdminToken, async (req, res) => {
    try{
     const jelo = await Usluga.findByPk(req.params.id);
	jelo.destroy();
	return res.json( jelo.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 module.exports = route; //DODAJ