import React, { useEffect, useState } from 'react'
import { Button, Popover } from 'antd'
import Axios from 'axios'

import './FavoritePage.css'
import { IMAGE_BASE_URL } from '../../Config'


function FavoritePage() {

    const [Favorites, setFavorites] = useState([])


    useEffect(() => {
        fetchFavorite()
    }, [])


    const fetchFavorite = () => {
        Axios.post('/api/favorite/getFavorites', { userFrom: localStorage.getItem('userId') })
        .then(response => {
            if(response.data.success){
                setFavorites(response.data.favorites)
            }else{
                alert('즐겨찾기 정보를 가져오는 데 실패했습니다.')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId: movieId,
            userFrom: userFrom
        }

        Axios.post('/api/favorite/removeFavorite', variables)
            .then(response => {
                if(response.data.success){
                    fetchFavorite()
                }else{
                    alert("삭제에 실패했습니다.")
                }
            })
    }


    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} alt=''/>
                    : 'no image'
                }
            </div>
        )

        return (
            <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRuntime} 분</td>
            <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>삭제</Button></td>
        </tr>
        )    
    })


    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h2>나의 즐겨찾기</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>상영시간</th>
                        <th>즐겨찾기 해제</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
            
        </div>
    )
}

export default FavoritePage


