(function($) { 
  $.fn.extend({
    collapsableBox: function() {
      
      var close = function(el) {
        var box = '#' + el.parentNode.id;
        
        $(box + ' .box-whead').attr('class', 'box-whead-hidden');
        $(box + ' .box-whead-closed-hidden').attr('class', 'box-whead-closed');
      }
      
      var open = function(el) {
        var box = '#' + el.parentNode.id;
        
        $(box + ' .box-whead-closed').attr('class', 'box-whead-closed-hidden');
        $(box + ' .box-whead-hidden').attr('class', 'box-whead');
      }
      
      $('a.button').css('display', 'block');
      $('.box-whead h2 a.button').css('display', 'block');
      $('.box-whead-closed-hidden h2 a.button').css('display', 'block');
      
      return this.each(function() {
        var el = this;
        
        $(this).find('a.minimize').click(function() {
          close(el);
          return false;
        });
        
        $(this.parentNode).find('a.maximize').click(function() {
          open(el);
          return false;
        });
        
        if($(this).hasClass('closed')) {
          close(this);
        }
      });
    } 
  }); 
})(jQuery);