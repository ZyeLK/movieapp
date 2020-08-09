import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

    const userFrom = props.userFrom  
    const movieTitle = props.movieInfo.title
    const movieId = props.movieId
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieTitle: movieTitle,
        movieId: movieId,
        moviePost: moviePost,
        movieRuntime: movieRuntime
    }

    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {                
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                }else{
                    alert('즐겨찾기 정보를 가져오는 데 실패했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }else{
                    alert('즐겨찾기 정보를 가져오는 데 실패했습니다.')
                }
            })
    }, [variables])


    const onClickFavorite = () => {
        if(Favorited){
            Axios.post('/api/favorite/removeFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    }else{
                        alert('즐겨찾기 정보를 가져오는 데 실패했습니다.')
                    }
                })
        }else{
            Axios.post('/api/favorite/addFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    }else{
                        alert('즐겨찾기 정보를 가져오는 데 실패했습니다.')
                    }
                })
        }
    }


    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? '즐겨찾기 해제' : '즐겨찾기'} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
