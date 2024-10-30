import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
export default function Navbar() {
    return (
        <nav className="bg-gray-800 flex p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={'/'} className="text-white text-2xl font-bold">
                    <img src={logo} alt="Naruto Logo" className="h-10" />
                </Link>

                <h1 className='text-white text-3xl font-black'>Naruto API</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link to={'/'} className="text-gray-300 hover:text-white">Inicio</Link>
                    </li>
                    <li>
                        <Link to={'/all'} className="text-gray-300 hover:text-white">Personajes</Link>
                    </li>

                    <li>
                        <Link to={'/about'} className="text-gray-300 hover:text-white">Acerca de</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
