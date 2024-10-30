import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Character from '../components/Character'
export default function Details() {
    const [characters, setCharacters] = useState(null)
    const url = 'https://dattebayo-api.onrender.com/characters'
    const { id } = useParams()

    async function ftc(url) {
        try {

            const response = await fetch(url + `/${id}`, {
                headers: {
                    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
                }
            })
            if (!response.ok) {
                throw new Error('Error en la petición')
            }
            const data = await response.json();
            setCharacters(data)
            toast.success("Personaje Traido", {
                position: 'bottom-right',
                autoClose: 2000,
            })

        } catch (error) {
            toast.error(error, {
                position: 'bottom-right',
                autoClose: 2000,
            })
            throw new Error(error)
        }
    }
    useEffect(() => {
        ftc(url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='flex flex-col space-y-5 w-[900px] mx-auto h-[600px] justify-center'>
            {characters && (

                <Character
                    id={characters.id}
                    name={characters.name}
                    image={characters.images}
                    debut={{
                        manga: characters.debut.manga,
                        anime: characters.debut.anime,
                        movie: characters.debut.movie
                    }}
                    classification={characters.personal.classification}
                    birthdate={characters.personal.birthdate}
                    kekkeiGenkai={characters.personal.kekkeiGenkai}
                    jutsu={characters.jutsu}
                    // Rank={characters.rank.ninjaRank["Part I"]}
                ></Character>


            )}

        </div>
    )
}
