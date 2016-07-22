$( document ).ready(function() {
    $('.control--checkbox input').on("change", function () {
        var status = $(this).data('status');
        var techs = $(".tech." + status);
        
        $.each(techs, function( index, value ) {
            $(value).toggleClass("show");
        });
    });
});