import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"


import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Heart } from "lucide-react"
import { db } from '../firebase/firebaseConfig'
import { collection, getDocs } from "firebase/firestore"
export default function Layout() {
  const [favs, setFavs] = useState(null)

  const handleOpenDetails = (characterId) => {
    window.open(characterId, "_blank");
  };
  async function fetchFavorites() {
    try {
      const consult = await getDocs(collection(db, "favoritos"));
      const favorites = consult.docs.map(doc => ({
        id: doc.id,
        characterId: doc.data().characterId,
        img: doc.data().image,
        name: doc.data().name,
        birthdate: doc.data().birthdate
      }));

      return favorites;
    } catch (e) {
      console.error(e);

    }
  }
  useEffect(() => {
    async function load() {
      const fav = await fetchFavorites()
      setFavs(fav)


    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  return (
    <div className="space-y-3">
      <Navbar></Navbar>
      <Sheet>
        <SheetTrigger><Heart size={48} color="white"></Heart></SheetTrigger>
        <SheetContent className='bg-slate-400'>
          <ScrollArea className="h-96 w-48 bg-slate-600 rounded-md ">
            <div className="p-4">
              <h4 className="mb-4 text-lg font-medium  text-white leading-none">Favoritos</h4>
              {
                favs && favs.map((fav, index) => (

                  <div className="flex flex-col gap-3 justify-center items-center" key={index}>
                    <button onClick={() => handleOpenDetails(`/details/${fav.characterId}`)} className="flex justify-center items-center mt-1 gap-2">
                      <img src={fav.img} className="w-12 h-12 rounded-full" alt="personaje" />
                      <h5 className="text-white font-black">{fav.name}</h5>
                      <h5 className="text-white font-black">{fav.birthdate}</h5>

                    </button>
                    
                    <Separator></Separator>

                  </div>
                ))
              }
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Outlet></Outlet>
    </div>
  )
}
