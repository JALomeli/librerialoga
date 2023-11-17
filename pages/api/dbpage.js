import mysql from 'mysql2';

export default function handler(req, res) {
    const{method, body} = req;
        //configurar la base de datos
        const connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: "root",
            password: "password",
            database: "bibliotecacurso"
        });
    switch(method){
        case "GET":
//realiza una consulta a la base de datos
connection.query('SELECT * FROM alumnos', function (err, results, fields) {
    if (err) {
        console.log(err);
        res.status(500).json({error: err});
    } else{
        console.log(results);
        res.status(200).json(results);
    }

}
);
//cerrar concexion
connection.end();
break;

case "POST":
    console.log(body);
    connection.query('INSERT INTO alumnos (Nombre, apellidos, correo, matricula, edad) VALUES (?,?,?,?,?)',
    [body.Nombre, body.apellidos,body.correo,body.matricula,body.edad], 
    function (err, results, fields) {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
        } else{
            console.log(results);
            res.status(200).json(results);
        }
    
    });
    connection.end();
    break;
}
}
    
    
