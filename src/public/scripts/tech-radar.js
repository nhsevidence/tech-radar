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
        LoadDescription(url);
    });

     $(window).on("scroll", function() {
        //this will calculate header's full height, with borders, margins, paddings
       var scrollVal = $(this).scrollTop();     
        CheckScrollState(scrollVal);
    });

    function CheckScrollState(scrollVal) {
        var desc = $("#desc");
        var descPos = desc.offset();
            
        if(NoResults(desc))
        {
             MakeStatic(desc);
        } else if(DescHitsFooter(desc))
        {
            if(desc.hasClass("fixed"))
            {
                MakeAbsolute(desc); 
            } else if(scrollVal < descPos.top)
            {
               MakeFixed(desc);
            }            
        } else if (ShouldStartFloating(scrollVal)) {
           MakeFixed(desc);
        } else {
           MakeStatic(desc);
        }
    }

    function NoResults(desc)
    {
        var descHeight =  desc.innerHeight();
        var techHeight = $("#tech-row").innerHeight();
        return descHeight > techHeight;
    }

    function DescHitsFooter(desc)
    {
        var height =  desc.innerHeight();
        var pointOfHit = desc.offset().top + height;
        var footerPos = $("footer").offset();
        return pointOfHit > footerPos.top;
    }

    function ShouldStartFloating(scrollVal)
    {
        return scrollVal > 140;
    }

    function MakeStatic(desc)
    {
        desc.removeClass("fixed").removeClass("abs");
        desc.css("top","");
    }

    function MakeFixed(desc)
    {
        desc.removeClass("abs").addClass("fixed");
        desc.css("top","");  
    }

    function MakeAbsolute(desc)
    {
         var descPos = desc.offset();
         desc.removeClass("fixed").addClass("abs");
         desc.css("top",descPos.top);  
    }

    function CreatePageState(desc) {
         history.pushState(desc, "", "?desc=" + desc);
    }

    function LoadDescription(url) {
         $.ajax({
            type: "GET",
            url: "/technology/" + url,
            success: function (data) {
                $('.desc-container').html(data);
                CreatePageState(url);
                 var scrollVal = $(window).scrollTop();
                CheckScrollState(scrollVal);            
            }
        });
    }

    function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

});