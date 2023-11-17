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
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
//1 poner boton
//2 click al boton cambie el estado a true DONE
//3 espero 10 segundos DONE
//4 cambio el estado a false

    const handleLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 10000);
    }

useEffect(() => {
    console.log('useEffect')
}, [loading])
    console.log(data) 
    return (
        
        <>
        <div className= 'flex'>
{/* boton de carga */}
{loading ? (
    <button className='bg-red-500' onClick={()=>setLoading(false)}>Detener</button>
    ):(
    <button className='bg-green-500' onClick={handleLoading}>Iniciar</button>
    )}
        </div>
        <main className = 'h-screen w-screen bg-black'>
       {/*<h1 className = 'text-4xl text-center'>{data[0].Nombre}</h1>*/}
       {data.map((alumno)=>(
        <div className= 'flex' key={alumno.id}>
            <h1 className= 'text-white'>{alumno.edad}</h1>
            <h1 className= 'text-white'>{alumno.Nombre}</h1>
            <h2 className= 'text-xs text-white'>{alumno.apellidos}</h2>
            </div>
       ))}
        </main>
        </>
    )
}