import axios from 'axios'
import { useEffect, useState } from 'react'

//peticion a la api
export async function getServerSideProps(){
    const res = await axios.get('http://localhost:3000/api/dbpage2');
    const data = await res.data;
    return{
        props:{
            data
        }
    }
}
 

export default function Testdb({data}) {
    console.log(data) 
    return (
        <>
        <main className = 'h-screen w-screen bg-black'>
       {/*<h1 className = 'text-4xl text-center'>{data[0].Nombre}</h1>*/}
       {data.map((comentarios)=>(
        <div className= 'flex' key={comentarios.comentario}>
            <h1 className= 'text-white'>{comentarios.comentario}</h1>
            <h1 className= 'text-white'>{comentarios.libro}</h1>
            <h2 className= 'text-xs text-white'>{comentarios.calificacion}</h2>
            </div>
       ))}
        </main>
        </>
    )
}