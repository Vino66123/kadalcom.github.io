$(function () {
    if (isMobile) {
        // banner
        new Swiper("#banner .swiper-container", { direction: "horizontal", loop: 1, paginationClickable: 1, effect: "left", pagination: ".swiper-pagination", autoplay: false, autoplayDisableOnInteraction: 0 })

        // 分类
        new Swiper("#type-swiper-1, #type-swiper-2, #type-swiper-3, #type-swiper-4, #type-swiper-5,#type-swiper-6", { loop: 0, slidesPerView: 'auto', slidesOffsetAfter: 20 })

        new Swiper("#type-swiper-lady", { slidesPerView: "auto", freeMode: 1 })
        // last update
        new Swiper("#swiper-updated-novel", { slidesPerView: "auto", slidesOffsetAfter: 20, touchMoveStopPropagation: !1 })
    } else {
        new Swiper("#banner .swiper-container", { direction: "horizontal", loop: 1, paginationClickable: 1, effect: "fade", pagination: ".swiper-pagination", prevButton: ".swiper-button-prev", nextButton: ".swiper-button-next", autoplay: 3000, autoplayDisableOnInteraction: 0 })
    }

})