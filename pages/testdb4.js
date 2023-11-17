import axios from 'axios'
import { useEffect, useState } from 'react'

//peticion a la api
export async function getServerSideProps(){
    const res = await axios.get('http://localhost:3000/api/dbpage4');
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
       {data.map((libros)=>(
        <div className= 'flex' key={libros.titulo}>
            <h1 className= 'text-white'>{libros.autor}</h1>
            <h2 className= 'text-xs'>{libros.paginas}</h2>
            </div>
       ))}
        </main>
        </>
    )
}