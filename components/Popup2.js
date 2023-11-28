import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import axios from "axios";

export default function Popup2({ open, setOpen, comentarios, getData }) {
  const [comentario, setComentario] = useState(comentarios.comentario);
  const [libro, setLibro] = useState(comentarios.libro);
  const [calificacion, setCalificacion] = useState(comentarios.calificacion);
  const [nombreUsuario, setNombreUsuario] = useState(comentarios.nombreUsuario);
  const [etiqueta, setEtiqueta] = useState(comentarios.etiqueta);
  console.log("comentarios", comentarios);

  useEffect(() => {
    setComentario(comentarios.comentario);
    setLibro(comentarios.libro);
    setCalificacion(comentarios.calificacion);
    setNombreUsuario(comentarios.nombreUsuario);
    setEtiqueta(comentarios.etiqueta);
  }, [comentarios]);


const cancelButtonRef = useRef(null);

const sendData = async () => {
  setLoading(true);
  console.log("sendData");
  console.log(comentario, libro, calificacion, nombreUsuario, etiqueta);
  if (
    comentario === "" ||
    libro === "" ||
    calificacion === "" ||
    nombreUsuario === "" ||
    etiqueta === ""
  ) {
    toast.error("Llena todos los campos");
    return;
  }
  try {
    const resultado = await axios.put("/api/dbpage2", {
      comentario: comentario,
      libro: libro,
      calificacion: calificacion,
      nombreUsuario: nombreUsuario,
      etiqueta: etiqueta,
      id: comentarios.PKid,
    });
    toast.success("comentarios editado");
    getData();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edita al comentarios
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex flex-col bg-white text-black">
                          <input
                            type="text"
                            value={comentario}
                            placeholder="comentario"
                            onChange={(e) => setComentario(e.target.value)}
                          />
                          <input
                            type="text"
                            value={libro}
                            placeholder="libro"
                            onChange={(e) => setLibro(e.target.value)}
                          />
                          <input
                            type="text"
                            value={calificacion}
                            placeholder="calificacion"
                            onChange={(e) => setCalificacion(e.target.value)}
                          />
                          <input
                            type="text"
                            value={nombreUsuario}
                            placeholder="nombre de Usuario"
                            onChange={(e) => setNombreUsuario(e.target.value)}
                          />
                          <input
                            type="text"
                            value={etiqueta}
                            placeholder="etiqueta"
                            onChange={(e) => setEtiqueta(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => sendData()}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

