const Router = require('express').Router();
const Eventos = require('./modeloEventos.js')

// Obtener todos los eventos de un usuario
Router.get('/cargar_eventos', function(req, res) {
    //sesionUser = req.session.sesion_id
  //  console.log(sesionUser)
    Eventos.find({id_usuario:'5b5ce35d27cc5219305607a8'}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

// Agregar a un Evento a un usuario
Router.get('/nuevo_evento', function(req, res) {
    let evento = new Eventos({
        id_usuario:'5b5ce35d27cc5219305607a8', //req.session.id_usuario,
        title: req.query.title,
        start: req.query.start,
        end: req.query.end
    })
    evento.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Registro guardado")
    })
})

// Eliminar evento por su id
Router.post('/eliminar_evento', function(req, res) {
    let eventoID = req.query._id
    console.log(eventoID)
    Eventos.findById(eventoID, (err, evento) => {
          if (err) {
            return res.status(500).send({message: 'Error al eliminar evento'})
          }else{
            evento.remove(err => {
              if (err) {
                return res.status(500).send({message: 'Error al eliminar evento'})
              }else{
                res.send('Evento eliminado correctamente')
              }
            })
          }
        })
})

//Funcion para actualizar evento
Router.post('/actualizar_evento', function(req, res) {
  let eventoID = req.query._id,
      start = req.body.start,
      end = req.body.end
          Eventos.update({_id: eventoID}, {
            start: start,
            end: end
          }, (err) => {
            if (err) {
              return res.status(500).send({message: 'No se pudo actualizar el evento. (status:500)'})
            }else{
              res.send('Evento actualizado correctamente')
            }
          })
})

//Funcion para recurso no existente
// Router.all('/', function(req, res) {
//   return res.send({message: 'Error al mostrar el recurso solicitado.'}).end()
// })

module.exports = Router
