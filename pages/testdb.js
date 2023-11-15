import axios from 'axios'
import { useEffect, useState } from 'react'

//peticion a la api
export async function getServerSideProps(){
    const res = await axios.get('http://localhost:3000/api/dbpage');
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
       {data.map((alumno)=>(
        <div className= 'flex' key={alumno.id}>
            <h1 className= 'text-white'>{alumno.Nombre}</h1>
            <h2 className= 'text-xs'>{alumno.apellidos}</h2>
            </div>
       ))}
        </main>
        </>
    )
}