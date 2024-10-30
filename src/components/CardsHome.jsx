/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
export default function CardsHome({ id, name, image, debut, classification, birthdate, kekkeiGenkai, jinchūriki, uniqueTraits }) {

    return (
        <article className="border bg-slate-300 rounded-lg" key={id * -1}>
            <Link className="flex p-3 hover:p-5 transition-all duration-700" to={`/details/${id}`}>
                <header className="flex flex-col space-y-3">
                    <h1 className="text-xl text-center font-black ">{name}</h1>
                    <img src={image} className="w-48 h-48 object-cover rounded-lg" alt="personaje" />
                </header>
                <p className="ml-2">  {birthdate}</p>
                <div className=" flex flex-col justify-center">
                    <p>
                        <strong>Kekkei Genkai:</strong>
                        {
                            kekkeiGenkai ? (
                                <span>No kekkei Genkai</span>
                            ) : (
                                kekkeiGenkai
                            )}
                    </p>
                    <p><strong>First Appearance:</strong> {debut.anime}</p>
                    <p className=""><strong>Classification:</strong> {classification}</p>

                </div>
            </Link>



        </article>
    )
}
