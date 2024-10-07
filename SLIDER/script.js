$(document).ready(function() {
    const totalImages = 8;

    $('.slider').slick({
        slidesToShow: 3, // Показывать 3 изображения
        slidesToScroll: 3,
        dots: true,
        arrows: true, // Включаем стрелки навигации
        prevArrow: '<button class="arrow left">&#10094;</button>', // Стрелка влево
        nextArrow: '<button class="arrow right">&#10095;</button>', // Стрелка вправо
        cssEase: 'ease',
        responsive: [
            {
                breakpoint: 576, // Для мобильных устройств
                settings: {
                    slidesToShow: 1, // Показывать 1 изображение
                    slidesToScroll: 1
                    
                }
            }
        ]
    });
});
