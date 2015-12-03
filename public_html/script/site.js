/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
| Scripting für www.wuppertal.de
| fasc | 2009-01-22
| 
| Inhaltsverzeichnis:
| - ==navigation:         Navigationsboxen klappbar machen
| - ==search:             Suchbox klappbar machen
| - ==overlabel:          Label auf Eingabefeldern
| - ==external_link:      Externe Links
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

$(document).ready(function() {                              
  
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ==navigation */
  
  $('a.minimize').click(function() {
    var box = '#' + this.parentNode.parentNode.parentNode.id;
    
    $(box + ' .box-whead').attr('class', 'box-whead-hidden');
    $(box + ' .box-whead-closed-hidden').attr('class', 'box-whead-closed');
    
    return false;
  });
  
  $('a.maximize').click(function() {
    var box = '#' + this.parentNode.parentNode.parentNode.id;
    
    $(box + ' .box-whead-closed').attr('class', 'box-whead-closed-hidden');
    $(box + ' .box-whead-hidden').attr('class', 'box-whead');
    
    return false;
  });


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ==infoboxes */

  $('.box-whead').collapsableBox();


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ==search */
    
  $('.detail-search a.minimize').click(function() {
      $('.detail-search').hide();
      $('.detail-search-closed-hidden').show();
  });
  
  $('.detail-search-closed-hidden a.maximize').click(function() {
    $('.detail-search-closed-hidden').hide();
    $('.detail-search').show();
  });
 
 
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ==overlabel */
      
  /* fuer jedes label mit klasse overlabel */
  $('label.overlabel').each(function() {
    
    /* label merken */
    var label = this;
    
    /* overlabel entfernen und overlabel-apply einsetzen */
    $(label).removeClass('overlabel');
    $(label).addClass('overlabel-apply');
    
    /* wenn ein standartwert vorhanden ist, das label herausverschieben */
    if($('input[id=\''+$(label).attr('for')+'\']').attr('value') != '') {
      $(label). css('text-indent', '-10000px');
    }
    
    /* beim focus das label herausverschieben */
    $('input[id=\''+$(label).attr('for')+'\']').focus(function() {
      $(label).css('text-indent', '-10000px');
    });
    
    /* beim blur das label wieder reinschieben, wenn kein wert da ist */
    $('input[id=\''+$(label).attr('for')+'\']').blur(function() {
      if($(this).attr('value') == '') {
        $(label).css('text-indent', '0');
      }
    });
  });
});