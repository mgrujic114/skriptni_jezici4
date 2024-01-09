const express = require('express');
const path = require('path');
const BP = require('body-parser');
const Joi = require('joi');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

function authAdminToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
    console.log("aaaa");
    
    if (!token) {
      console.log('No token')
      return res.redirect(301, '/admin/login');
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      console.log(jwt.decode(token));
      console.log(jwt.decode(token).role);
      if (err || !payload || payload.role === 0) {
        return res.redirect(301, '/admin/login');
      }
      req.user = payload;
      next();
    });
  }

app.get('/admin/login', (req, res) => {
  console.log("bbbbb");
    res.sendFile('login.html', { root: './static/admin' });
});

app.get('/admin', authAdminToken, (req, res) => {
  console.log("aaaa");
    res.sendFile('11422rn.html', { root: './static/admin' });
});

app.use('/user', express.static(path.join(__dirname, 'static/user/dist')));
app.get('/user/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/user/dist/11422rn.html'));
});

app.use('/admin', express.static(path.join(__dirname, 'static', 'admin')));
app.get('/admin/*', authAdminToken, (req, res) => {
  console.log("cccc");
  res.sendFile(path.join(__dirname, 'static', 'admin', `${req.params[0]}.html`));
});

app.use(express.static(path.join(__dirname, 'static/user/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/user/dist/11422rn.html'));
});

/*app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', '11422rn.html'));
    }
);*/

app.use( BP.urlencoded({extended: false}));

app.post("/nova-usluga", (req, res) => {
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        kategorija: Joi.string().required(),
        cena: Joi.number().greater(0).required()
        }
    );

    const {error, succ} = shema.validate(req.body);
        if(error){
            res.send("Greska: " + error.details[0].message);
	        return;
        } else {
            fs.appendFile("usluga.txt", JSON.stringify(req.body) + "\n", 
                function(err, succ){
                    res.send("Poruka je poslata, očekujte odgovor uskoro");
                }
            );
        }  
    }
);


app.post("/nova-kategorija", (req, res) => {
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        koeficijent: Joi.number().greater(0).required()
        }
    );

    const {error, succ} = shema.validate(req.body);
        if(error){
            res.send("Greska: " + error.details[0].message);
	        return;
        } else {
            fs.appendFile("kategorija.txt", JSON.stringify(req.body) + "\n", 
                function(err, succ){
                    res.send("Poruka je poslata, očekujte odgovor uskoro");
                }
            );
        }  
    }
);

/*app.get("/kategorija", (req, res) => {
    const kategorije = [];
    fs.readFile('kategorija.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        } else {
            const redovi = data.split('\n');
            for(let i=0; i<redovi.length-1; i++){
                let obj = JSON.parse( redovi[i] );
                kategorije.push(obj);
            }
            res.json(kategorije);
        }
        }
    );
    }
);*/

app.post("/nova-opcija", (req, res) => {
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        cena: Joi.number().greater(0).required(),
        }
    );

    const {error, succ} = shema.validate(req.body);
        if(error){
            res.send("Greska: " + error.details[0].message);
	        return;
        } else {  
            fs.appendFile("opcija.txt", JSON.stringify(req.body) + "\n", 
            function(err, succ){
                res.send("Poruka je poslata, očekujte odgovor uskoro");
            }
        );         
        }  
    }
);      

/*app.get("/opcija", (req, res) => {
    const opcije = [];
    fs.readFile('opcija.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        } else {
            const redovi = data.split('\n');
            for(let i=0; i<redovi.length-1; i++){
                let obj = JSON.parse( redovi[i] );
                opcije.push(obj);
            }
            res.json(opcije);
        }
        }
    );
    }
);*/

app.listen(8000, ()=>{
    console.log("server startovan na portu 8000");
    }
);

