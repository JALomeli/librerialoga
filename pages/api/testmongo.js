import {MongoClient} from "mongodb";

export default async function handler(req,res){
    const {method, body,query}=req;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db=client.db();
    const alumno =db.collection('alumnos');

    switch(method){
        case "POST":
            console.log(body);
            const dataAlumno = {
                Nombre: body.nombre,
                apellidos: body.apellidos,
                correo: body.correo,
                matricula: body.matricula,
                edad: body.edad
            }
            try {
                const answer= await alumno.insertOne(dataAlumno);
                return res.status(200).json({message:"Alumno agregado"});
            } catch (error) {
                return res.status(500).json({message:"que paso carnal... reprobado"});
            }
            break;
        case "GET":
            const data = await alumno.find().toArray();
            return res.status(200).json(data);
            break;
    }
}