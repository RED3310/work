$(function () {
    $('[data-toggle="popover"]').popover({
        trigger: 'focus'
    });
})

$(function () {
    $('.l-focus').on('click', function () {
        if ($(this).attr('aria-expanded') == 'false') {
            $(this).find('.arrow-up').addClass('active-up');
            $(this).find('.arrow-down').addClass('active-down');
        } else {
            $(this).find('.arrow-up').removeClass('active-up');
            $(this).find('.arrow-down').removeClass('active-down');
        }
    });
});