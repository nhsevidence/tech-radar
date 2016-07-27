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
                 var scrollVal = $(window).scrollTop();
                CheckScrollState(scrollVal);
            }
        });
    });

     $(window).on("scroll", function() {
        //this will calculate header's full height, with borders, margins, paddings
       var scrollVal = $(this).scrollTop();     
        CheckScrollState(scrollVal);
    });

    function CheckScrollState(scrollVal) {
        var desc = $("#desc");
        var descPos = desc.offset();
        var height =  desc.innerHeight();
        var pointOfHit = descPos.top + height;
        var footerPos = $("footer").offset();
        if(height > $("#tech-row").innerHeight())
        {
             desc.removeClass("fixed").removeClass("abs");
             desc.css("top","");
        } else if(pointOfHit > footerPos.top)
        {
            if(desc.hasClass("fixed"))
            {
                desc.removeClass("fixed").addClass("abs");
                desc.css("top",descPos.top);  
            } else if(scrollVal < descPos.top)
            {
                desc.removeClass("abs").addClass("fixed");
               desc.css("top","");  
            }            
        } else if ( scrollVal > 140 ) {
            desc.removeClass("abs").addClass("fixed");
             desc.css("top","");
        } else {
            desc.removeClass("fixed").removeClass("abs");
             desc.css("top","");
        }
    }
});