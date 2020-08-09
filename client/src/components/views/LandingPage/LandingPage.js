import React, { useEffect, useState } from 'react'
import { Row } from 'antd'

import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../commons/MainImage'
import GridCards from '../commons/GridCards'

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    const fetchMovies = (pageNum) => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`

        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setMovies([...Movies, ...response.results])
                if(pageNum === 1) setMainMovieImage(response.results[0])
                setCurrentPage(response.page)
            })    
    }

    useEffect(() => {
        fetchMovies(1)
    })

    const loadMoreItems = () => {
        fetchMovies(CurrentPage + 1)
    }



    return (
        <div style={{width: '100%', margin:'0'}}>

            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview} />
            }
        
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>인기 영화</h2>
                <hr />

                {/* movie grid card */}

                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                type='movie'
                                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title} />
                        </React.Fragment>
                    ))}
                    
                </Row>

            </div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
