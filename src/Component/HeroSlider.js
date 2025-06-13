// components/HeroSlider.js
import React from 'react';
import Slider from 'react-slick';
// import './HeroSlider.css'; // For custom styles (optional)

const HeroSlider = () => {
  const banners = [
    {
      id: 1,
      image: 'images/slide-01.jpg',
      bgColor: '#eff3fc',
    },
    {
      id: 2,
      image: 'images/slide-02.jpg',
      bgColor: '#f3f3f3',
    },
    {
      id: 3,
      image: 'images/slide-03.jpg',
      bgColor: '#ffffff',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id}>
            <div
              className="slider-banner"
              style={{ backgroundColor: banner.bgColor }}
            >
              <img src={banner.image} alt={`banner-${banner.id}`} className="slider-image" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
