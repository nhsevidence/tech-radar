$( document ).ready(function() {
    $('.control--checkbox input').on("change", function () {
        var status = $(this).data('status');
        var techs = $(".tech." + status); 
        $.each(techs, function( index, value ) {
            $(value).toggleClass("show");
        });
    });

    $(".tech").on("click", function () {
        var url = $(this).data("desc");
         $.ajax({
            type: "GET",
            url: "/technology/" + url,
            success: function (data) {
                $('.desc-container').html(data);
            }
        });
    });

     $(window).on("scroll", function() {
        //this will calculate header's full height, with borders, margins, paddings
       var scrollVal = $(this).scrollTop();     
        if ( scrollVal > 140 ) {
            $('#desc').addClass("fixed");
        } else {
            $('#desc').removeClass("fixed");
        }
    });
});