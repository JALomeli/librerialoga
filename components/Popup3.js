import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import axios from "axios";

export default function Popup3({ open, setOpen, empleados, getData }) {
  const [matricula, setMatricula] = useState(empleados.matricula);
  const [nombres, setNombres] = useState(empleados.nombres);
  const [apellidos, setApellidos] = useState(empleados.apellidos);
  const [horarioTrabajo, setHorarioTrabajo] = useState(empleados.horarioTrabajo);
  const [cargo, setCargo] = useState(empleados.cargo);
  const [salario, setSalario] = useState(empleados.salario);
  console.log("empleados", empleados);

  useEffect(() => {
    setMatricula(empleados.matricula);
    setNombres(empleados.nombres);
    setApellidos(empleados.apellidos);
    setHorarioTrabajo(empleados.horarioTrabajo);
    setCargo(empleados.cargo);
    setSalario(empleados.salario);
  }, [empleados]);


const cancelButtonRef = useRef(null);

const sendData = async () => {
  setLoading(true);
  console.log("sendData");
  console.log(matricula, nombres, apellidos, horarioTrabajo, cargo);
  if (
    matricula === "" ||
    nombres === "" ||
    apellidos === "" ||
    horarioTrabajo === "" ||
    cargo === "" ||
    salario === ""
  ) {
    toast.error("Llena todos los campos");
    return;
  }
  try {
    const resultado = await axios.put("/api/dbpage3", {
      matricula: matricula,
      nombres: nombres,
      apellidos: apellidos,
      horarioTrabajo: horarioTrabajo,
      cargo: cargo,
      salario: salario,
      id: empleados.PKid,
    });
    toast.success("empleados editado");
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
                        Edita al empleados
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="flex flex-col bg-white text-black">
                          <input
                            type="text"
                            value={matricula}
                            placeholder="matricula"
                            onChange={(e) => setMatricula(e.target.value)}
                          />
                          <input
                            type="text"
                            value={nombres}
                            placeholder="nombres"
                            onChange={(e) => setNombres(e.target.value)}
                          />
                          <input
                            type="text"
                            value={apellidos}
                            placeholder="apellidos"
                            onChange={(e) => setApellidos(e.target.value)}
                          />
                          <input
                            type="text"
                            value={horarioTrabajo}
                            placeholder="nombre de Usuario"
                            onChange={(e) => setHorarioTrabajo(e.target.value)}
                          />
                          <input
                            type="text"
                            value={cargo}
                            placeholder="cargo"
                            onChange={(e) => setCargo(e.target.value)}
                          />
                          <input
                            type="text"
                            value={salario}
                            placeholder="salario"
                            onChange={(e) => setSalario(e.target.value)}
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

