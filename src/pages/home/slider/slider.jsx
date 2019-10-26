import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import { getSwiper } from '../../../api/home'
import { baseURL } from '../../../utils/http/config'
import { Link } from 'react-router-dom'
class slider extends Component {
    state = {
        data: [],
        imgHeight: 176,
    }
    async componentDidMount() {
        let swiper = await getSwiper();
        this.setState({
            data: swiper.data.body
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length !== 0 && <Carousel
                        autoplay={true}
                        infinite
                    >
                        {this.state.data.map(val => (
                            <Link
                                to="#"
                                key={val.id}
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={baseURL + val.imgSrc}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </Link>
                        ))}
                    </Carousel>
                }

            </div>

        );
    }
}
export default slider;