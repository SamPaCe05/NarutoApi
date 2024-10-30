import PropTypes from 'prop-types'
import CardsHome from '../components/CardsHome';
export default function Home({ characters }) {
    return (
        <div className='flex flex-col space-y-5 w-[900px] mx-auto'>

            {
                characters.map(item => (
                    <CardsHome
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.images[0]}
                        debut={{
                            manga: item.debut.manga,
                            anime: item.debut.anime,
                            movie: item.debut.movie
                        }}
                        classification={item.personal.classification}
                        status={item.personal.status}
                        kekkeiGenkai={item.personal.kekkeiGenkai}
                        jinchūriki={item.personal.jinchūriki}
                        uniqueTraits={item.uniqueTraits}
                    />
                ))
            }

        </div>
    )
}
Home.propTypes = {
    characters: PropTypes.array.isRequired
};