import React, { useEffect, useState } from 'react'
import { Row, Button } from 'antd'

import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../commons/MainImage'
import GridCards from '../commons/GridCards'
import MovieInfo from './Sections/MovieInfo'
import Favorite from './Sections/Favorite'

function MovieDetail(props) {
    
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)


    useEffect(() => {
    
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })
        
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })

    }, [movieId])


    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }



    return (
        <div>
            {Movie &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview} />
            }

            <div style={{width:'85%', margin:'1rem auto'}}>

                {Movie &&
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Favorite userFrom={localStorage.getItem('userId')} movieInfo={Movie} movieId={movieId} />
                    </div>
                }

                {Movie &&
                    <MovieInfo movie={Movie} />
                }

                <br />
                
                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <Button onClick={toggleActorView}>출연진</Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    type='actor'
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.character}
                                    actorName={cast.name} />
                            </React.Fragment>
                        ))}
                    </Row>
                }

            </div>
        </div>
    )
}

export default MovieDetail
