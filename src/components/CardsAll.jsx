
export default function CardsAll({ name, image, id }) {
    return (
        <article className="border bg-slate-300 rounded-lg" key={id * -1}>
            <div className="flex p-3 " to={`/details/${id}`}>
                <div className="flex flex-col items-center justify-center space-y-3">
                    <h1 className="text-xl text-center font-black ">{name}</h1>
                    <img src={image} className="w-full h-48 object-cover rounded-lg" alt="personaje" />
                </div>
            </div>
        </article>
    )
}
