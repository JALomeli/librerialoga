import axios from 'axios'
import { useEffect, useState } from 'react'
import {Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Popup from '@/components/Popup'

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
    const [open, setOpen] = useState(false)
    const [alumno, setAlumno] = useState({})

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
      <Toaster />
      <header className="bg-yellow-500 text-black text-4xl text-center py-4">
        Libreria
      </header>

      <Popup open={open} setOpen={setOpen} alumno={alumno} getData={getData}/>

      <div className="flex justify-center items-center h-60 bg-yellow-100 flex-col">
  {/* formulario */}
  <h1 className="flex flex-col text-black mt-2 p-3 font-bold">Porfavor inserta los datos que deseas guardar   </h1>
  <div className="flex justify-center items-center h-70 bg-yellow-100 flex-col border border-black">
    <input type="text" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)}/>
    <input type="text" placeholder="Apellidos" onChange={(e) => setApellidos(e.target.value)}/>
    <input type="text" placeholder="Correo" onChange={(e) => setCorreo(e.target.value)}/>
    <input type="text" placeholder="Matricula" onChange={(e) => setMatricula(e.target.value)}/>
    <input type="text" placeholder="Edad" onChange={(e) => setEdad(e.target.value)}/>
  </div>

  {/* boton de carga */}
  {loading ? (
    <button className="bg-red-500 text-black py-2 px-4 mt-4 mt-1 rounded-md border border-black" disabled> Detener </button>
  ) : (
    <button className="bg-green-500 text-black py-2 px-4 mt-4 mt-1 rounded-md border border-black hover:bg-green-700 transition duration-300" onClick={sendData}>Iniciar</button>
  )}
</div>
      <main className="h-screen bg-white p-4">
        {data.map((alumno, i) => (
          <div className="flex items-center  justify-center items-center border-b-2 py-2" key={i}>
            <div className="text-black font-bold mr-4 ml-4">Edad: {alumno.edad}</div>
            <div className="text-black  mr-4 ml-4">Nombre: {alumno.Nombre}</div>
            <div className="text-sm text-black mr-4 ml-4">Apellidos: {alumno.apellidos}</div>
            {/* boton para eliminar */}
            <button className="bg-red-500 text-white font-bold px-2 py-1 hover:bg-red-800 transition duration-300" onClick={() => eliminarData(alumno.PKid)}>
              Eliminar
            </button>
            <button className="bg-blue-500 text-white font-bold px-2 py-1 hover:bg-blue-800 transition duration-300" onClick={() => 
            (
              setAlumno(alumno),
              setOpen(true)
            )}>
              Editar
            </button>
          </div>
        ))}
      </main>
    </>
  );
}