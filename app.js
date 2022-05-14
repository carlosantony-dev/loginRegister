const express = require("express");
const bodyParser = require('body-parser');
const { use } = require("express/lib/application");
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'))
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './views');

var usuarios = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/cadastro.html"); 
});

app.post('/', (req,res) => {
    usuarios.push({nome: req.body.nome, senha: req.body.pass});
    res.redirect("/login");
})

app.get('/login', (req,res) => {
    res.sendFile(__dirname + "/login.html");
})

function validateUser(name,pass,tam){
    try{
        console.log(usuarios);
        console.log(usuarios[0].nome)
        if(usuarios != undefined && usuarios != null){
            console.log("entrou if");
            for(i=0;i<tam;i++){
                if(name == usuarios[i].nome && pass == usuarios[i].senha){
                    return true;
                }
            }
        }
        return false;
    } catch (err){
        console.log(err);
    }   
}

app.post('/login', (req,res) => {
    console.log("entrou");
    let name = req.body.nome;
    let pass = req.body.pass;
    console.log("nome: " + name + " pass: " + pass);
    let tam = usuarios.length;
    console.log(tam);
    if(validateUser(name,pass,tam)) {
        return res.redirect("/logado");
    }else{
        return res.status(500).render("login-err");
    }
})
    

app.get('/logado', (req,res) => {
    let users = usuarios;
    console.log(usuarios[0]);
    res.render("home", {usuario: users});
})


const port = process.env.PORT || 3000;
app.listen(port);