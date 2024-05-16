import CartWidget from "./CartWidget";
import React from "react"
import {Link} from "react-router-dom"

function NavBar(){
    return (
        <nav>
            <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
	<div className="container flex justify-between h-16 mx-auto">
		<a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
		<img src="./logot.jpg" alt="" className="h-10"/>
		<h1 className="">MUNAH GIFTSTORE</h1>
		</a>
		<ul className="items-stretch hidden space-x-3 md:flex">
			<li className="flex">
				<Link to="/" className="flex items-center px-4 -mb-1">Inicio</Link>
			</li>
			<li className="flex">
				<Link to="/Productos" className="flex items-center px-4 -mb-1">Productos</Link>
			</li>
			<li className="flex">
				<Link to="/category/velas" className="flex items-center px-4 -mb-1">Velas</Link>
			</li>
			<li className="flex">
				<Link to="/category/difusores" className="flex items-center px-4 -mb-1">Difusores</Link>
			</li>
			<li className="flex">
				<Link to="/category/:id" className="flex items-center px-4 -mb-1">ID</Link>
			</li>
			<li className="flex">
				<Link to="/GiftCard" className="flex items-center px-4 -mb-1">GiftCard</Link>
			</li>
			<li className="flex">
				<Link to="/Contacto" className="flex items-center px-4 -mb-1">Contacto</Link>
			</li>
		</ul>
        <CartWidget/>
	</div>
</header>
        </nav>
    );
}

export default NavBar