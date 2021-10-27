//Importo las librerias que necesito
const express = require('express');
const mongoose = require('mongoose');
const TareaSchema = require("./modelos/Tarea.js");

//Creo una constante llamada app con la que puedo usar todo lo que importe del paquete express
const app = express();
const router = express.Router(); //Puerta para que usuarios externos puedan consultar mi BD
app.use(express.urlencoded({extended: true})); //Usar la codificacion de express de modo extendido
app.use(express.json()); //Me permite usar archivos en formato JSON

//Conexion a BD
mongoose.connect("mongodb+srv://prog_web:wilDER125@clusterprogweb.vyje5.mongodb.net/ActividadBD?retryWrites=true&w=majority");

//Operaciones CRUD
router.get('/', (req, res) => {
    res.send("Inicio de API");
})

router.post('/tarea', (req, res) => {
    let nuevaTarea = new TareaSchema({
        idTarea: req.body.id,
        nombreTarea: req.body.nombre,
        detalleTarea: req.body.detalle
    });

    nuevaTarea.save(function(err, datos){
        if(err){
            console.log(err);
        }
        res.send("Tarea almacenada correctamente.")
    })
});

app.use(router);
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000")
});