const { authAdminToken } = require("./rendom");
const express = require("express");

const { sequelize, Kategorija,  Opcija, IzabranaOpcija, Termin, SastavTermina} = require("../models");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
     //console.log("OVDE")
     try{
          const termini = await Opcija.findAll();
          return res.json(termini);       
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 route.get("/:id", async (req, res) => {
    try{
          console.log("termin ciji je id =" + req.params.id);
          const termin = await Opcija.findByPk(req.params.id);
          return res.json(termin);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", authAdminToken, async (req, res) => {
    try{
         console.log("unos novog termina čiji su podaci u req.body");
         const novi = await Opcija.create(req.body);
         return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", authAdminToken, async (req, res) => {
    try{
         console.log("izmena podataka termina čiji je id ="+req.params.id+" a podaci su u req.body");
          const jelo = await Opcija.findByPk(req.params.id);
          console.log(jelo);
          jelo.naziv = req.body.naziv;
          jelo.osnovna_cena = req.body.osnovna_cena;
          jelo.save();
          console.log(jelo);
          return res.json(jelo);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", authAdminToken, async (req, res) => {
    try{
          console.log(req.params.id);  //id obrisanog
          const jelo = await Opcija.findByPk(req.params.id);
	     jelo.destroy();
	     return res.json( jelo.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 module.exports = route; 