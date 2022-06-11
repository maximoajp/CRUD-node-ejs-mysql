var express = require('express');
var router = express.Router();
const conexion = require("./db");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'CRUD MYSQL' });
// });

//leer
router.get('/',(req, res)=> {
  conexion.query('SELECT *  FROM actividades',(error,results)=>{
    if (!error) {
        res.render('index',{ 
     
                title:'hola', 
                results:results 
        });

    } else {
      throw error;
    }
  })
});

//agregar
router.post('/',(req, res)=> {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion
    conexion.query('INSERT INTO actividades SET ?',{nombre:nombre, descripcion:descripcion},(error,results)=>{
      if (!error) {
            console.log(`informacion enviada: ${nombre}, ${descripcion}`)
            res.redirect('/')
      } else {
        throw error;
      }
  })
});


//Leer editar
router.get('/edit/:id',(req, res)=> {
     const id = req.params.id;
     conexion.query('SELECT * FROM actividades WHERE id=?',[id],(error,results)=>{
      if (!error) {
            res.render('edit',{ 
              title:'hola', 
              results:results[0] 
            });
            console.log(`se lee edit: ${id}`)
      } else {
        throw error;
      }
  })
});

//update
router.post('/:id',(req, res)=> {

  const id = req.body.id;
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion

  conexion.query('UPDATE actividades SET ? WHERE id = ?',[{nombre:nombre,descripcion:descripcion}, id],(error,results)=>{
    if (!error) {
          console.log(`se acualiza: ${id}, ${descripcion}`)
          res.redirect('/')
    } else {
      throw error;
    }
})
});

//eliminar
router.get('/delete/:id',(req, res)=> {

      const id = req.params.id;
      conexion.query('DELETE FROM actividades WHERE id = ?',[id],(error,results)=>{

        if (!error) {
              console.log(`eliminamos: ${id}`)
              res.redirect('/')
        } else {
          throw error;
        }
    })
});

module.exports = router;
