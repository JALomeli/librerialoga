import mysql from 'mysql2';

export default function handler(req, res) {
    const{method, body, query} = req;
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

case "POST":
    console.log(body);
    connection.query('INSERT INTO comentarios (nombreUsuario, libro, comentario, calificacion, etiqueta) VALUES (?,?,?,?,?)',
    [body.Nombre, body.libro,body.comentario,body.calificacion,body.etiqueta], 
    function (err, results, fields) {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
        } else{
            console.log(results);
            connection.end();
            return res.status(200).json(results);
        }
    
    });
    break;
    case "DELETE":
        console.log(query)
        connection.query(
            'DELETE FROM comentarios WHERE PKid = ?',
            [query.id],
            function (err, results, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).json({error: err});
                } else{
                    console.log(results);
                    connection.end();
                    return res.status(200).json(results);
                }
            });
            break;
}
}