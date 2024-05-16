function Contacto(){

	

    return(
        <section className="p-6 dark:text-gray-800">
	<form noValidate="" className="container w-full max-w-xl p-8 mx-auto space-y-6 rounded-md shadow bg-emerald-50">
		<h2 className="w-full text-3xl font-bold leading-tight">Contacto</h2>
		<div>
			<label htmlFor="name" className="block mb-1 ml-1">Nombre</label>
			<input id="name" type="text" placeholder="Ingresa tu nombre" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100" />
		</div>
		<div>
			<label htmlFor="email" className="block mb-1 ml-1">E-mail</label>
			<input id="email" type="email" placeholder="Ingresa un e-mail" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100" />
		</div>
		<div>
			<label htmlFor="message" className="block mb-1 ml-1">Mensaje</label>
			<textarea id="message" type="text" placeholder="Ingresa un mensaje" className="block w-full p-2 rounded autoexpand focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100"></textarea>
		</div>
		<div>
			<button type="submit" className="w-full px-4 py-2 font-bold rounded shadow focus:outline-none focus:ring hover:ring focus:ring-opacity-50 bg-emerald-100 focus:dark:ring-violet-600 hover:dark:ring-violet-600 dark:text-gray-50">Enviar</button>
		</div>
	</form>
</section>
    )
}

export default Contacto