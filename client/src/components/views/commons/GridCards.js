import React from 'react'
import { Col } from 'antd'

function GridCards(props) {

    if(props.type === 'movie'){
        return (
            // lg, md, xs: 창이 라지, 미들, 스몰 사이즈일 때 한 칼럼의 크기.(총 너비가 24임)
            <Col lg={6} md={8} xs={12}>
                <div style={{position:'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width:'100%', height:'100%'}} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        )
    
    }else{
        return (
            // lg, md, xs: 창이 라지, 미들, 스몰 사이즈일 때 한 칼럼의 크기.(총 너비가 24임)
            <Col lg={6} md={8} xs={12}>
                <div style={{position:'relative'}}>
                    <img style={{width:'100%', height:'100%'}} src={props.image} alt={props.actorName} />
                </div>
            </Col>
        )
    }
}

export default GridCards
