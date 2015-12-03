/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
| Scripting für www.wuppertal.de
| fasc | 2009-01-22
| 
| Inhaltsverzeichnis:
| - ==carousel:            Carousel starten
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  ==carousel */

$(function() {
    
  var size = 4;
  
  $('.carousel-wrapper').css('overflow', 'hidden');
  $('.carousel-wrapper div.next').css('display', 'block');
  $('.carousel-wrapper div.prev').css('display', 'block').css('opacity', 0.4).css('cursor', 'default');
  $('.carousel-wrapper').each(function() {
    if($(this).find('div.carousel ul li').length <= size) {
      $(this).find('div.next').css('opacity', 0.4).css('cursor', 'default');
    }
  });
  $('.carousel-wrapper div.carousel ul').css('width', '20000em');
  $('.carousel-wrapper div.carousel').css('overflow', 'hidden').scrollable({
    size: size,
    onSeek: function() {
      var id = $(this.getRoot()).parent();
      
      var index = this.getIndex() + 1;
      var size  = this.getSize();
      
      if(index == 1) {
        $(id).find('div.prev').animate({ opacity: 0.4 }).css('cursor', 'default');
      } else {
        $(id).find('div.prev').animate({ opacity: 1 }).css('cursor', 'pointer');
      }
      
      if((index + this.getConf().size - 1) == size) {
        $(id).find('div.next').animate({ opacity: 0.4 }).css('cursor', 'default');
      } else {
        $(id).find('div.next').animate({ opacity: 1 }).css('cursor', 'pointer');
      }
    }
  });     
});