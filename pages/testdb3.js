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
    const [matricula, setMatricula] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [horarioTrabajo, setHorarioTrabajo] = useState('');
    const [cargo, setCargo] = useState('');
    const [salario, setSalario] = useState('');

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
    const res = await axios.get('/api/dbpage3');
    const data = await res.data;
    setData(data);
} 

const sendData = async () => {
    setLoading(true);
    console.log('sendData');
    console.log(matricula, nombres, apellidos, horarioTrabajo, cargo, salario);
    if(matricula === '' || nombres === '' || apellidos === '' || horarioTrabajo === '' || cargo === '' || salario === ''){
        toast.error('Llena todos los campos');
        setLoading(false);
        return;
    }

    try{

        const resultado = await axios.post('api/dbpage3', {
            matricula: matricula,
            nombres: nombres,
            apellidos: apellidos,
            horarioTrabajo: horarioTrabajo,
            cargo: cargo,
            salario: salario
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
    const resultado = await axios.delete(`api/dbpage3?id=${id}`);
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
            <input type='text' placeholder='Matricula' onChange={(e)=>setMatricula(e.target.value)}/>
            <input type='text' placeholder='Nombres' onChange={(e)=>setNombres(e.target.value)}/>
            <input type='text' placeholder='Apellidos' onChange={(e)=>setApellidos(e.target.value)}/>
            <input type='text' placeholder='Horario de Trabajo' onChange={(e)=>setHorarioTrabajo(e.target.value)}/>
            <input type='text' placeholder='Cargo' onChange={(e)=>setCargo(e.target.value)}/>
            <input type='text' placeholder='Salario' onChange={(e)=>setSalario(e.target.value)}/>
        </div>
        <main className = 'h-screen w-screen bg-black'>
       {/*<h1 className = 'text-4xl text-center'>{data[0].Nombre}</h1>*/}
       {data.map((empleados,i)=>(
        <div className= 'flex' key={i}>
            <h1 className= 'text-white'>{empleados.matricula}</h1>
            <h1 className= 'text-white'>{empleados.nombres}</h1>
            <h1 className= 'text-white'>{empleados.apellidos}</h1>
            <h2 className= 'text-xs text-white'>{empleados.horarioTrabajo}</h2>
            <h2 className= 'text-xs text-white'>{empleados.cargo}</h2>
            {/* boton para eliminar */}
            <button className='bg-red-500' onClick={()=>eliminarData(empleados.PKid)}>Eliminar</button>
            </div>
       ))}
        </main>
        
        </>
    )
}