import axios from 'axios'
import { useEffect, useState } from 'react'
import {Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import Popup3 from '@/components/Popup3'

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
    const [open, setOpen] = useState(false)
    const [empleados, setEmpleados] = useState({})

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
    console.log(matricula, nombres, apellidos, horarioTrabajo, cargo);
    if(matricula === '' || nombres === '' || apellidos === '' || horarioTrabajo === '' || cargo === '' || salario===""){
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
      <Toaster />
      <header className="bg-yellow-500 text-black text-4xl text-center py-4">
        Libreria
      </header>

      <Popup3 open={open} setOpen={setOpen} empleados={empleados} getData={getData}/>

      <div className="flex justify-center items-center h-60 bg-yellow-100 flex-col">
  {/* formulario */}
  <h1 className="flex flex-col text-black mt-2 p-3 font-bold">Porfavor inserta los datos que deseas guardar   </h1>
  <div className="flex justify-center items-center h-70 bg-yellow-100 flex-col border border-black">
    <input type="text" placeholder="matricula" onChange={(e) => setMatricula(e.target.value)}/>
    <input type="text" placeholder="nombres" onChange={(e) => setNombres(e.target.value)}/>
    <input type="text" placeholder="apellidos" onChange={(e) => setApellidos(e.target.value)}/>
    <input type="text" placeholder="nombre" onChange={(e) => setHorarioTrabajo(e.target.value)}/>
    <input type="text" placeholder="cargo" onChange={(e) => setCargo(e.target.value)}/>
    <input type="text" placeholder="salario" onChange={(e) => setSalario(e.target.value)}/>
  </div>

  {/* boton de carga */}
  {loading ? (
    <button className="bg-red-500 text-black py-2 px-4 mt-4 mt-1 rounded-md border border-black" disabled> Detener </button>
  ) : (
    <button className="bg-green-500 text-black py-2 px-4 mt-4 mt-1 rounded-md border border-black hover:bg-green-700 transition duration-300" onClick={sendData}>Iniciar</button>
  )}
</div>
      <main className="h-screen w-screen bg-white p-4">
        {data.map((empleados, i) => (
          <div className="flex items-center  justify-center items-center border-b-2 py-1 h-10  bg-white" key={i}>
            <div className="text-black font-bold mr-4 ml-4">cargo: {empleados.cargo}</div>
            <div className="text-black  mr-4 ml-4">matricula: {empleados.matricula}</div>
            <div className="text-sm text-black mr-4 ml-4">nombres: {empleados.nombres}</div>
            {/* boton para eliminar */}
            <button className="bg-red-500 text-white font-bold px-2 py-1 hover:bg-red-800 transition duration-300" onClick={() => eliminarData(empleados.PKid)}>
              Eliminar
            </button>
            <button className="bg-blue-500 text-white font-bold px-2 py-1 hover:bg-blue-800 transition duration-300" onClick={() => 
            (
              setEmpleados(empleados),
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