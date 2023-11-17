import mysql from 'mysql2';

export default function handler(req, res) {
    const{method, body} = req;
    switch(method){
        case "GET":
            
    //configurar la base de datos
    const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "password",
    database: "bibliotecacurso"
});
//realiza una consulta a la base de datos
connection.query('SELECT * FROM comentarios', function (err, results, fields) {
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
}
}