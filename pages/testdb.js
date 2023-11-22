import axios from 'axios'
import { useEffect, useState } from 'react'
import {Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'

//peticion a la api
//export async function getServerSideProps(){
//    const res = await axios.get('http://localhost:3000/api/dbpage');
//    const data = await res.data;
//    return{
//        props:{
//            data
//        }
//    }
//}
 

export default function Testdb() {
    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [matricula, setMatricula] = useState('');
    const [edad, setEdad] = useState('');

//1 poner boton
//2 click al boton cambie el estado a true DONE
//3 espero 10 segundos DONE
//4 cambio el estado a false

 //   const handleLoading = () => {
 //       setLoading(true);
 //       setTimeout(() => {
 //           setLoading(false);
 //       }, 10000);
 //   }
useEffect(() => {
    console.log('useEffect')

    getData();
}, [])
const getData = async () => {
    const res = await axios.get('/api/dbpage');
    const data = await res.data;
    setData(data);
} 

const sendData = async () => {
    setLoading(true);
    console.log('sendData');
    console.log(nombre, apellidos, correo, matricula, edad);
    if(nombre === '' || apellidos === '' || correo === '' || matricula === '' || edad === ''){
        toast.error('Llena todos los campos');
        setLoading(false);
        return;
    }

    try{

        const resultado = await axios.post('api/dbpage', {
            Nombre: nombre,
            apellidos: apellidos,
            correo: correo,
            matricula: matricula,
            edad: edad
        })
        toast.success('Datos enviados');
        console.log(resultado);
        getData();
    } catch (error) {
        console.log(error);
    }

    setLoading(false);
}
const eliminarData =async(id)=>{
    console.log('eliminarData', id);
    try{
    const resultado = await axios.delete(`api/dbpage?id=${id}`);
    console.log(resultado);
    toast.success('Datos eliminados');
    getData();
    }catch(error){
        console.log(error);
        toast.error("carnal paso algo")
    }
}
    return (
        <>
        
        <Toaster/>
        <div className= 'flex'>
            
{/* boton de carga */}
{loading ? (
    <button className='bg-red-500' disabled>Detener</button>
    ):(
    <button className='bg-green-500' onClick={sendData}>Iniciar</button>
    )}
        </div>
        {/* formulario */}
        <div className= 'flex flex-col text-black'>
            <input type='text' placeholder='Nombre' onChange={(e)=>setNombre(e.target.value)}/>
            <input type='text' placeholder='Apellidos' onChange={(e)=>setApellidos(e.target.value)}/>
            <input type='text' placeholder='Correo' onChange={(e)=>setCorreo(e.target.value)}/>
            <input type='text' placeholder='Matricula' onChange={(e)=>setMatricula(e.target.value)}/>
            <input type='text' placeholder='Edad' onChange={(e)=>setEdad(e.target.value)}/>
        </div>
        <main className = 'h-screen w-screen bg-black'>
       {/*<h1 className = 'text-4xl text-center'>{data[0].Nombre}</h1>*/}
       {data.map((alumno,i)=>(
        <div className= 'flex' key={i}>
            <h1 className= 'text-white'>{alumno.edad}</h1>
            <h1 className= 'text-white'>{alumno.Nombre}</h1>
            <h2 className= 'text-xs text-white'>{alumno.apellidos}</h2>
            {/* boton para eliminar */}
            <button className='bg-red-500' onClick={()=>eliminarData(alumno.PKid)}>Eliminar</button>
            </div>
       ))}
        </main>
        
        </>
    )
}