var searchIsOpen = false;
var loginIsOpen = false;
var cartIsOpen = false;
var isScrolled = false;
var isOpen = false;

function changeIcon(menu){
  var objIcon = $("#icon-"+menu);
  var iconScroll = (isScrolled) ? '2' : '1';
  var iconImg = "";

  if(!isScrolled){
    objIcon.attr('src', 'img/icones/'+menu+'1.png');
  }else{
    objIcon.attr('src', 'img/icones/'+menu+'2.png');
  }     

  $("#icon-search").attr('src', 'img/icones/search'+iconScroll+'.png');
  $("#icon-login").attr('src', 'img/icones/login'+iconScroll+'.png');
  $("#icon-cart").attr('src', 'img/icones/cart'+iconScroll+'.png');

  if(menu=='search'){
    isOpen = searchIsOpen;
    $('#popup_login').css("display", "none");
    $('#popup_cart').css("display", "none");    
  }else if(menu=='login'){
    isOpen = loginIsOpen;
    $('#search_bar').css("display", "none");
    $('#popup_cart').css("display", "none");      
  }else{
    isOpen = cartIsOpen;
    $('#search_bar').css("display", "none");
    $('#popup_login').css("display", "none");      
  }

  if(isOpen) {
    iconImg = (!isScrolled) ? 'close1.png': 'close2.png';
    objIcon.attr('src', 'img/icones/'+iconImg);
  }else{
    iconImg = (!isScrolled) ? menu+'1.png': menu+'2.png';
    objIcon.attr('src', 'img/icones/'+iconImg);
  }      
}  

function showDropdown(item_id) {
  var drop = $("#dropdown_"+item_id).position();
  var el = $("#dropdown_item"+item_id);
  el.css({left: parseInt(drop.left)});
  if (!window.matchMedia('screen and (max-width: 730px)').matches) {    
    el.toggle();
  }
  $( ".dropdown-content" ).each(function( index ) {
      if(el.attr('id')!=$(this).attr('id')){
        $(this).css("display", "none");
      }
  });  
}

// FECHA DROPDOWN SE CLICAR FORA
window.onclick = function(ev) {
    if( ev.target.nodeName !== 'A' ){  
      $( ".dropdown-content" ).each(function( index ) {
         $(this).css("display", "none");
      });
    }
}

$(document).on('click','.navbar-collapse.in',function(e) {
  if( $(e.target).is('a') ) {
      $(this).collapse('hide');
  }
});

//DOCUMENT SCROLL
$(document).scroll(function () {
  var $nav = $('.fixed-top');
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  $('#search_bar').css("margin-top", $(this).scrollTop()+80);
  $('#popup_login').css("display", "none");
  $('#popup_cart').css("display", "none");

  if($(this).scrollTop() > $nav.height() === false){
    $("#logo").attr("src", "img/logo.png"); 
    $("#icon-search").attr("src", "img/icones/search1.png"); 
    $("#icon-login").attr("src", "img/icones/login1.png"); 
    $("#icon-cart").attr("src", "img/icones/cart1.png");
    isScrolled = false;
  }else{
    $("#logo").attr("src", "img/logo2.png");      
    $("#icon-search").attr("src", "img/icones/search2.png"); 
    $("#icon-login").attr("src", "img/icones/login2.png"); 
    $("#icon-cart").attr("src", "img/icones/cart2.png");
    isScrolled = true;
  }

}); 

//DOCUMENT READY
$(document).ready(function(){

  $('.navbar-toggler').click(function () {
    var $nav = $('.fixed-top').toggleClass('scrolled');
    $("#logo").attr("src", "img/logo2.png");      
  }); 

  //COLOCANDO MAIS 25% NO VALOR DOS PRODUTOS
  $( ".valor" ).each(function( index ) {
    var porcentagem = parseFloat('25.0') ;    
    var valor = parseFloat($(this).text().replace("R$ ", "").replace(",", "."));
    var total = valor * (porcentagem/100);
    var novo_valor  = total + valor;
    $(this).text("R$ "+novo_valor.toString().replace(".", ","));
  });

  //DROPDOWN
  var dropdown = ['BIQUÍNIS', 'MAIÔS', 'BODIES', 'SAÍDAS', 'SALE'];
  $.each(dropdown, function(index, value){
    sHTML = `<li class="nav-item"><a class="nav-link hand" id="dropdown_`+index+`" onclick="showDropdown(`+index+`)">`+value+`</a></li>
                <div id="dropdown_item`+index+`" class="dropdown-content">
                <a href="#">Cortininhas</a>
                <a href="#">Corpetes</a>
                <a href="#">Tomara que Caia</a>
                <a href="#">Lacinho</a>
                <a href="#">Calcinha Larguinha</a>
                <a href="#">Levanta bumbum</a>
                <a href="#">Trending</a>
              </div>`;

    $('#dropdown').append(sHTML);
  });

  //ICONES
  $('#icon-search').click(function () {
    searchIsOpen = !searchIsOpen;
    var search_bar = $('#search_bar');
    search_bar.toggle();   
    changeIcon('search');
  }); 

  $('#icon-login').click(function () {
    loginIsOpen = !loginIsOpen;
    $("#popup_login").css({
        'position': 'absolute',
        'left': $(this).offset().left - 270,
        'top': $(this).offset().top + $(this).height() + 5
    }).toggle();
    changeIcon('login');
  });

  $('#icon-cart').click(function () {
    cartIsOpen = !cartIsOpen;
    $("#popup_cart").css({
        'position': 'absolute',
        'left': $(this).offset().left - 470,
        'top': $(this).offset().top + $(this).height() + 5
    }).toggle();
    changeIcon('cart');
  });

  //CAROUSEL - BANNER
  $('#carousel_banner').slick({
    dots: true,
    infinite: false,
    arrows: false,
    adaptativeHeight:true,
    mobileFirst:true,
  });

  var banner = ['1', '2', '3'];
  $.each(banner, function(index, value){
    var slide_text = '<div class="slide_banner"><span class="slide_banner_text">O VERÃO<br>CHEGOU COM<br>NOVIDADES';
     slide_text += '<p class="slide_banner_text_p">VER PRODUTOS</p></span>';
    slide_text += '<img src="img/banners/banner'+value+'.jpg" class="img-fluid"></div>';
    $('#carousel_banner').slick('slickAdd', slide_text);
    $('#carousel_banner').slick('slickGoTo', 'slickCurrentSlide' + 1);    
  });

  //CAROUSEL - VITRINE
  $('.carousel_vitrine').slick({
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    adaptativeHeight:true,
    nextArrow: '<span class="arrow-left"></span>',
    prevArrow: '<span class="arrow-right"></span>',    
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },    
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 879,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]     
  });  

  var vitrine = ['1', '2', '3', '4', '5', '6', '7'];
  $.each(vitrine, function(index, value){
    sHTML = `<div class="slide_vitrine" id="slide_vitrine_`+value+`">
              <img class="slide_img" id="img_vitrine_`+value+`" src="img/vitrine/vitrine`+value+`_1.jpg">
              <div class="slide_leg">Biquíni cortininha palmeira<div class="slide_val valor">R$ 129,00</div>
              <div class="comprar"><div class="btn_comprar hand" onclick="alert('comprar ID `+value+`')" id="btn_vitrine_`+value+`">COMPRAR</div>
              </div> </div></div>`;
    $('#carousel_vitrine').slick('slickAdd',sHTML);
    $('#carousel_vitrine').slick('slickGoTo', 'slickCurrentSlide' + 1);    
  }); 

  $('.slide_vitrine').mouseover(function () {
        var slide_id = ($(this).attr('id').replace('slide_vitrine_',''));
        var slide_img = ($('#img_vitrine_'+slide_id));
        slide_img.attr('src', $(slide_img).attr('src').replace('_1', '_2')); 
        $('#btn_vitrine_'+slide_id).css("display", "block");
  }).mouseout(function () {
        var slide_id = ($(this).attr('id').replace('slide_vitrine_',''));
        var slide_img = ($('#img_vitrine_'+slide_id));
        slide_img.attr('src', $(slide_img).attr('src').replace('_2', '_1')); 
        $('#btn_vitrine_'+slide_id).css("display", "none");
  });   

  /* PRODUTOS */
  $('.produto').mouseover(function () {
        $(this).attr("src", $(this).attr("src").replace('1', '2')); 
  }).mouseout(function () {
        $(this).attr("src", $(this).attr("src").replace('2', '1'));        
  });

});
