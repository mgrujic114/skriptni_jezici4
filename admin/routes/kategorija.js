const express = require("express");
const { authAdminToken } = require("./rendom");

const { sequelize, Kategorija} = require("../models");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (req, res) => {
     //console.log("OVDE")
     try{
          const termini = await Kategorija.findAll();
          return res.json(termini);       
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 route.get("/:id", async (req, res) => {
    try{
          console.log("kategorija ciji je id =" + req.params.id);
          const termin = await Kategorija.findByPk(req.params.id);
          return res.json(termin);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.post("/", authAdminToken, async (req, res) => {
    try{
         console.log("unos novog termina čiji su podaci u req.body");
         const novi = await Kategorija.create(req.body);
         console.log(req.body);
         
         return res.json(novi);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.put("/:id", authAdminToken, async (req, res) => {
    try{
         console.log("izmena podataka termina čiji je id ="+req.params.id+" a podaci su u req.body");
          const jelo = await Kategorija.findByPk(req.params.id);
          jelo.naziv = req.body.naziv;
          jelo.koeficijent = req.body.koeficijent;
          jelo.save();
          return res.json(jelo);
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 
 route.delete("/:id", authAdminToken, async (req, res) => {
    try{
          console.log(req.params.id);  //id obrisanog
          const jelo = await Kategorija.findByPk(req.params.id);
	     jelo.destroy();
	     return res.json( jelo.id );
    }catch(err){
         console.log(err);
         res.status(500).json({ error: "Greska", data: err });
    }
 });
 
 module.exports = route; 