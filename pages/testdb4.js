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
    const [titulo, setTitulo] = useState('');
    const [paginas, setPaginas] = useState('');
    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [categoria, setCategoria] = useState('');


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
    const res = await axios.get('/api/dbpage4');
    const data = await res.data;
    setData(data);
} 

const sendData = async () => {
    setLoading(true);
    console.log('sendData');
    console.log(titulo, autor, paginas, editorial, categoria);
    if(titulo === '' ||  autor === '' || paginas === '' || editorial === '' || categoria === '' ){
        toast.error('Llena todos los campos');
        setLoading(false);
        return;
    }

    try{

        const resultado = await axios.post('api/dbpage4', {
            titulo: titulo,
            autor: autor,
            paginas: paginas,
            editorial: editorial,
            categoria: categoria,
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
    const resultado = await axios.delete(`api/dbpage4?id=${id}`);
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
            <input type='text' placeholder='Titulo' onChange={(e)=>setTitulo(e.target.value)}/>
            <input type='text' placeholder='Autor' onChange={(e)=>setAutor(e.target.value)}/>
            <input type='text' placeholder='Paginas' onChange={(e)=>setPaginas(e.target.value)}/>
            <input type='text' placeholder='Editorial' onChange={(e)=>setEditorial(e.target.value)}/>
            <input type='text' placeholder='Categoria' onChange={(e)=>setCategoria(e.target.value)}/>

        </div>
        <main className = 'h-screen w-screen bg-black'>
       {/*<h1 className = 'text-4xl text-center'>{data[0].Nombre}</h1>*/}
       {data.map((libros,i)=>(
        <div className= 'flex' key={i}>
            <h1 className= 'text-white'>{libros.titulo}</h1>
            <h1 className= 'text-white'>{libros.autor}</h1>
            <h1 className= 'text-white'>{libros.paginas}</h1>
            <h1 className= 'text-white'>{libros.editorial}</h1>
            <h2 className= 'text-xs text-white'>{libros.categoria}</h2>
            {/* boton para eliminar */}
            <button className='bg-red-500' onClick={()=>eliminarData(libros.PKid)}>Eliminar</button>
            </div>
       ))}
        </main>
        
        </>
    )
}