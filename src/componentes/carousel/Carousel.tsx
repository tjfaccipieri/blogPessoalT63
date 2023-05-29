import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function Carousel() {

  // site oficial https://maxmarinich.github.io/react-alice-carousel/#basic

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

  const items = [
    <div>
      <img src="https://github.com/tjfaccipieri.png" role="presentation" />
      <p>Github do Thiago</p>
    </div>,
    <img src="https://github.com/julianalopesco.png" role="presentation" />,
    <img src="https://github.com/alinesoglia.png" role="presentation" />,
    <img src="https://github.com/alinesoglia.png" role="presentation" />,
    <img src="https://github.com/alinesoglia.png" role="presentation" />,
  ];

  return (
    <AliceCarousel mouseTracking items={items} autoPlay infinite responsive={responsive} />
  )
}

export default Carousel