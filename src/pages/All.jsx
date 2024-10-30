import { useState, useEffect } from 'react'
import CardsAll from '@/components/CardsAll';
export default function All() {
    const [char, setChar] = useState([])
    const url = 'https://narutodb.xyz/api/character?page=1&limit=1430'
    async function allftc(url) {
        const response = await fetch(url)
        const data = await response.json();
        setChar(data.characters)
    }
    useEffect(() => {
        allftc(url);
    }, [])
    return (
        <div className='grid grid-cols-3  gap-4 w-[1000px] mx-auto'>

            {
                char.map(item => (
                    <CardsAll
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.images[0]}

                    />
                ))
            }

        </div>
    )
}
