
		//ie hack

        var browser=navigator.appName 
        var b_version=navigator.appVersion 
        var version=b_version.split(";"); 
        var trim_Version=version[1].replace(/[ ]/g,""); 

        //lightball height
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        //通过深入Document内部对body进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            winHeight = document.documentElement.clientHeight;
        }			
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
        { 
        alert("-_-|||您的浏览器版本太低啦 请使用高版本浏览器 网页菌飘走~"); 
        } 
        else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") 
        { 
            alert("-_-|||您的浏览器版本太低啦 请使用高版本浏览器 网页菌飘走~"); 
        } 
//banner
    var swiper = new Swiper('.mainV .swiper-container', { 
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        }, 
        onSlideChangeEnd: function(swiper){ 
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        } ,       
        effect : 'fade',
        fade: {
            crossFade: false,
        },            
        pagination: '.mainV .swiper-pagination',
        paginationClickable: true,
        autoplay:5000,
        speed:800,
    });
    //鼠标移出开始自动切换
    swiper.container[0].onmouseout=function(){
        swiper.startAutoplay();
    }
//pd
var swiper = new Swiper('.pd-min .swiper-container', { 
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay:5000,
        speed:800,
        pagination: '.pd-min .swiper-pagination',
        autoHeight: true, //高度随内容变化
    });


    $('.award-list li span').mouseenter(function(){
        $(this).parents('li').addClass('cur').siblings('li').removeClass('cur');
    })

    //data-pic height


    //pd-list

    $('.pd-list-ul li').mouseenter(function(){
        $(this).addClass('pd-blue').siblings('li').removeClass('pd-blue');
        var list_index = $(this).index();
        $('.pd-txt-detail').eq(list_index).addClass('blk').siblings('.pd-txt-detail').removeClass('blk');
    })

    $('.pd-list-ul li').click(function(){
        // $('.data-shade').show();
        // var list_index = $(this).index();
        // $('.datd-pic').eq(list_index).addClass('show');
        // $('.datd-pic').each(function(){
        //     var datd_width = $(this).width() / 2;
        //     var datd_height = $(this).height() /2;
        //     $(this).css({'margin-left':'-'+datd_width+'px','margin-top':'-'+datd_height+'px'})
        // })
    })
    $('.data-shade').click(function(){
        $('.data-shade').hide();
        $('.datd-pic').removeClass('show');
    })

    //height

    var h1 = $('.contact .ma').height();
    $('.blur_block').css({'height':h1+'px'})


function nav_hash() {
    var $nav = $(".nav-item a");
    $nav.on('click', function(event) {
        // event.preventDefault();
        if (this.hash !== "") {
            // event.preventDefault();
            var hash = this.hash;
            $('html,body').animate({
                scrollTop: $(hash).offset().top-120
            }, 1000, function() {
                window.location.hash = hash
            })
        }
    });
}
nav_hash();

//min-nav-slide
$('.nav_btn').click(function(){
    $('.nav-min').slideToggle();
})
$('.nav-min li').click(function(){
    $('.nav-min').slideUp();
})

$(".group3").colorbox({rel:'group3', transition:"none", width:"75%", height:"75%"});