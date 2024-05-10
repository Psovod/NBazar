// import { SwiperOptions } from "swiper/types";
export const SwiperConfig: any = {
  injectStyles: [
    `.swiper-pagination--custom {
        border-radius: 10px;
        width: 5%;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1100;
        display: block;
        opacity: 0;
        transition: opacity .15s ease-in-out;
        color: #172b4d;
        background-color: #fff;
        border-color: #fff;
      }
      
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 0;
        position: absolute;
        top: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border: 0;
        border-radius: 50%;
        background-color: hsla(0deg, 0%, 100%, 0.5);
        transform: translateY(-50%);
        font-size: 12px;
        transition: all 0.15s ease-in-out;
        text-decoration: none;
        cursor: pointer;
        --swiper-navigation-size: 22px;
        --swiper-theme-color: #000;
        transition: opacity 0.15s ease-in-out;
      }
      
      .swiper-button-disabled {
        opacity: 0;
      }
      
      .swiper:not(:hover) .swiper-button-disabled {
        opacity: 0;
      }
      
      .swiper:hover .swiper-button-prev,
      .swiper:hover .swiper-button-next,
      .swiper:hover .swiper-pagination--custom {
        opacity: 1;
      }
      
      .swiper:hover .swiper-button-disabled {
        opacity: 0;
      }
      
      .swiper-pagination-bullet {
        background-color: #000000;
        opacity: 0.9;
      
      }
      
      .swiper-pagination-bullet-active {
        background-color: #0184ff;
      }
      
      .swiper-button-next svg,
      .swiper-button-prev svg {
        width: 22px;
        height: 22px;
        fill: var(--swiper-theme-color);
      }
        `,
  ],

  navigation: true,
  pagination: {
    type: 'fraction',
    renderFraction: function (currentClass: any, totalClass: any) {
      return (
        '<div class="swiper-pagination--custom"> <span class=' +
        currentClass +
        '></span>' +
        ' / ' +
        '<span class=' +
        totalClass +
        '></span></div>'
      );
    },
  },
  grabCursor: true,
  zoom: {
    maxRatio: 5,
    toggle: true,
  },
  lazyPreloadPrevNext: 2,
  lazyPreloaderClass: 'swiper-lazy-preloader',
};
