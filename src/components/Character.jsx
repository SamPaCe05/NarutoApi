/* eslint-disable react/prop-types */
import { useState } from "react"
import { Heart } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button"


import { db } from '../firebase/firebaseConfig'
import { collection, addDoc, doc, deleteDoc, getDocs } from "firebase/firestore"
import { toast } from "react-toastify"

export default function Character({ id, name, image, debut, birthdate, kekkeiGenkai, jutsu }) {
    const [fav, setFav] = useState('outline')
    const [img, setImg] = useState(image[0])
    function handleOnClickImg(item) {
        setImg(item);
    }

    const personaje = {
        characterId: id,
        image: image[0],
        name: name
    };

    async function addChar(character) {
        await addDoc(collection(db, 'favoritos'), character);
    }

    async function removeChar(favId) {
        try {
            await deleteDoc(doc(db, "favoritos", favId));
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchFavorites() {
        try {
            const consult = await getDocs(collection(db, "favoritos"));
            const favorites = consult.docs.map(doc => ({
                id: doc.id,
                characterId: doc.data().characterId
            }));
            return favorites;
        } catch (e) {
            console.error(e);
        }
    }

    async function toggleFavorite(item) {
        const favorites = await fetchFavorites();
        const existingFavorite = favorites.find(fav => fav.characterId === item.characterId);

        if (existingFavorite) {
            setFav('outline');
            toast.error('Eliminado de favoritos', { autoClose: 1500 })
            await removeChar(existingFavorite.id);
        } else {
            setFav('destructive');
            toast.success('Añadido a Favoritos', { autoClose: 1500 })
            await addChar(item);
        }
    }

    return (
        <article className="border flex gap-3 p-5 bg-slate-300 rounded-lg">

            <ul className="flex  gap-3 flex-col">
                {
                    image.map((item, index) => (
                        <button onClick={() => handleOnClickImg(item)} key={index}>
                            <img src={item} className="w-14 border hover:w-16 hover:h-16 transition-all duration-200 border-black h-14 rounded-md cursor-pointer" alt="button" />
                        </button>
                    ))
                }
            </ul>
            <div className="flex p-3 transition-all duration-700" to={`/details/${id}`}>
                <header className="flex flex-col space-y-3">
                    <h1 className="text-xl text-center font-black ">{name}</h1>
                    <img src={img} className="w-48 h-48 object-cover rounded-lg" alt="personaje" />
                </header>
                <div className=" ml-4 flex gap-2 flex-col justify-center">
                    <p><strong>Birthdate: </strong>{birthdate}</p>
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
                    {/* <p className=""><strong>Rank:</strong> {Rank}</p> */}

                </div>
            </div>

            <ScrollArea className="h-72 w-48 rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-lg font-bold leading-none">Jutsu</h4>
                    {jutsu.map((jinchūriki) => (

                        <div key={jinchūriki} className="text-sm">
                            {jinchūriki}
                            <Separator className="my-2" />
                        </div>

                    ))}
                </div>
            </ScrollArea>

            <Button onClick={() => toggleFavorite(personaje)} variant={fav}><Heart></Heart></Button>
        </article>
    )
}
