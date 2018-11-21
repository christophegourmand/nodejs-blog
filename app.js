const express = require('express'); // on appelle la dépendance "express". 
// 'express" est un peu le laravelle, le symfony, de nodejs.

const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

// port écouté:
app.listen(3000);

// configuration globale

    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(favicon(path.join(__dirname, 'public', 'img/fav.png'), 0));

app
    .get('/', function (requete, reponse) {
        reponse.render('index');
    })
    .get('/contact', function (requete, reponse) {
        reponse.render('contact'); //*ajout
    })
    .post('/contact', function (requete, reponse) {
        console.log("Formulaire: recup de la saisie du champs Titre: " + requete.body.title);
        reponse.redirect('/contact');
    });

// page par défault si aucune page avant ne correspondait à la demande de l'internaute:
app.use( function(requete, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, "Lost ! (?_?) l'url que vous demandez ne correspond à aucune page!");
});