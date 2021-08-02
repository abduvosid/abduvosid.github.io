$(document).ready(function(){
    $('.btn__container').on('click', 'button:not(.btn__circle_active)', function(){
      $(this)
        .addClass('.btn__circle_active').siblings().removeClass('.btn__circle_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__tab_active')
        .eq($(this).index()).addClass('catalog__tab_active');
    });
});