/*******************************************************************************
 * Sitepark.Common.Geometry
 *
 * object, containing PORTABLE functions for querying window
 * and document geometry
 *
 * getWindowX/Y(): return the position of the window on the screen
 * getViewportWidth/Height(): return the size of the browser viewport area
 * getDocumentWidth/Height(): return the size of the document.
 * getHorizontalScroll(): return the position of the horizontal scrollbar
 * getVerticalScroll(): return the position of the vertical scrollbar
 *
 * Note that there is no portable way to query the overall size of the
 * browser window, so there are no getWindowWidth/Height() functions.
 *
 * IMPORTANT: This object must be defined in the <body> of a document
 *            instead of the <head> of the document.
 ******************************************************************************/
if (typeof Sitepark == 'undefined') {
	Sitepark = {};
}
if (typeof Sitepark.Common == 'undefined') {
	Sitepark.Common = {};
}

Sitepark.Common.Geometry = {};

if (window.screenLeft) { // IE and others
  Sitepark.Common.Geometry.getWindowX = function() { return window.screenLeft; };
  Sitepark.Common.Geometry.getWindowY = function() { return window.screenTop; };
} else if (window.screenX) { // Firefox and others
  Sitepark.Common.Geometry.getWindowX = function() { return window.screenX; };
  Sitepark.Common.Geometry.getWindowY = function() { return window.screenY; };
}

if (window.innerWidth) { // All browsers but IE
  Sitepark.Common.Geometry.getViewportWidth = function() { return window.innerWidth; };
  Sitepark.Common.Geometry.getViewportHeight = function() { return window.innerHeight; };
  Sitepark.Common.Geometry.getHorizontalScroll = function() { return window.pageXOffset; };
  Sitepark.Common.Geometry.getVerticalScroll = function() { return window.pageYOffset; };
} else if (document.documentElement && document.documentElement.clientWidth) { // These functions are for IE6 when there is a DOCTYPE
  Sitepark.Common.Geometry.getViewportWidth = function() { return document.documentElement.clientWidth; };
  Sitepark.Common.Geometry.getViewportHeight = function() { return document.documentElement.clientHeight; };
  Sitepark.Common.Geometry.getHorizontalScroll = function() { return document.documentElement.scrollLeft; };
  Sitepark.Common.Geometry.getVerticalScroll = function() { return document.documentElement.scrollTop; };
} else if (document.body.clientWidth) { // These are for IE4, IE5, and IE6 without a DOCTYPE
  Sitepark.Common.Geometry.getViewportWidth = function() { return document.body.clientWidth; };
  Sitepark.Common.Geometry.getViewportHeight = function() { return document.body.clientHeight; };
  Sitepark.Common.Geometry.getHorizontalScroll = function() { return document.body.scrollLeft; };
  Sitepark.Common.Geometry.getVerticalScroll = function() { return document.body.scrollTop; };
}

// These functions return the size of the document. They are not window
// related, but they are useful to have here anyway.
if (document.documentElement && document.documentElement.scrollWidth) {
  Sitepark.Common.Geometry.getDocumentWidth = function() { return document.documentElement.scrollWidth; };
  Sitepark.Common.Geometry.getDocumentHeight = function() { return document.documentElement.scrollHeight; };
} else if (document.body.scrollWidth) {
  Sitepark.Common.Geometry.getDocumentWidth = function() { return document.body.scrollWidth; };
  Sitepark.Common.Geometry.getDocumentHeight = function() { return document.body.scrollHeight; };
}
      
var iframeWidth  = 795;
var iframeHeight = 644;

function zoomImg(imgID)
{
   lastID = "";
   prevID = "";
   nextID = "";
   
   for (var imageID in arrImgXL)
   {
       tempID = imageID.substr(2);
       if (tempID == imgID) prevID = lastID;
       if (lastID == imgID) nextID = tempID;
       lastID = tempID;
   }
   
   var imgUrl    = (arrImgXL['id'+imgID]['url']   != null) ? arrImgXL['id'+imgID]['url']    : "";
   var imgWidth  = (arrImgXL['id'+imgID]['width'] != null) ? arrImgXL['id'+imgID]['width']  : "";
   var imgHeight = (arrImgXL['id'+imgID]['height']!= null) ? arrImgXL['id'+imgID]['height'] : "";
   var imgText   = (arrImgXL['id'+imgID]['text']  != null) ? arrImgXL['id'+imgID]['text']   : "";
   var imgLegend = (arrImgXL['id'+imgID]['legend']!= null) ? arrImgXL['id'+imgID]['legend'] : "";
   var imgCopyr  = (arrImgXL['id'+imgID]['copyr'] != null) ? arrImgXL['id'+imgID]['copyr']  : "";
   
   zWndWidth  = (imgWidth)  ? parseInt(imgWidth)  + 90 : 640;
   zWndHeight = (imgHeight) ? parseInt(imgHeight) + 50 : 600;
   
   if (obj = document.getElementById('overlay'))
   {
      var prevLink = (prevID) ? "<a href=\"javascript:void(0)\" onclick=\"zoomImg('" + prevID + "')\" class=\"prev\">«</a>" : "<span class=\"prev\">«</span>";
      var nextLink = (nextID) ? "<a href=\"javascript:void(0)\" onclick=\"zoomImg('" + nextID + "')\" class=\"next\">»</a>" : "<span class=\"next\">»</span>";
      var strImage = "<div class=\"background\"></div>"
                   + "<div id=\"imgZoom\">"
                   + "<div class=\"navi\">"
                   + prevLink
                   + nextLink
                   + "<a href=\"javascript:void(0)\" onclick=\"document.getElementById('overlay').style.display='none'\" class=\"close\">x</a>"
                   + "</div>"
                   + ((imgLegend || imgCopyr) ? "<div class=\"legend\">" + imgLegend + ((imgCopyr) ? "<span class=\"copyright\">" + imgCopyr + "</span>" : "") + "</div>" : "")
                   + "<img src=\"" + imgUrl + "\" width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" alt=\"" + imgText + "\" style=\"width:" + imgWidth + "px; height:" + imgHeight + "px\" />"
                   + "</div>";
      
      obj.innerHTML = strImage;
      zWndHeight    = Math.min(zWndHeight,Sitepark.Common.Geometry.getViewportHeight());
      
      intWidth  = Math.max(Sitepark.Common.Geometry.getViewportWidth(),document.getElementsByTagName('html')[0].offsetWidth,document.getElementsByTagName('body')[0].offsetWidth);
      intHeight = Math.max(Sitepark.Common.Geometry.getViewportHeight(),document.getElementsByTagName('html')[0].offsetHeight,document.getElementsByTagName('body')[0].offsetHeight,$(document).height());
      intXPos   = Math.round(0.5*(intWidth-zWndWidth));
      intYPos   = Math.round(0.5*(Sitepark.Common.Geometry.getViewportHeight()-zWndHeight)+Sitepark.Common.Geometry.getVerticalScroll());
      
      if (obj.lastChild != null)
      {
         obj.lastChild.style.width  = zWndWidth + "px";
         obj.lastChild.style.top    = Math.max(0,intYPos) + "px";
         window.setTimeout("resizePopup()", 500);
      }
      
      obj.style.height  = intHeight + "px";
      obj.style.display = "block";
   }
}

function movieSummary(movID)
{
   lastID = "";
   prevID = "";
   nextID = "";
   
   for (var movieID in arrMovSummary)
   {
       tempID = movieID.substr(2);
       if (tempID == movID) prevID = lastID;
       if (lastID == movID) nextID = tempID;
       lastID = tempID;
   }
   
   var imgUrl     = (arrMovSummary['id'+movID]['imgUrl']   != null) ? arrMovSummary['id'+movID]['imgUrl']    : "";
   var imgWidth   = (arrMovSummary['id'+movID]['imgWidth'] != null) ? arrMovSummary['id'+movID]['imgWidth']  : "";
   var imgHeight  = (arrMovSummary['id'+movID]['imgHeight']!= null) ? arrMovSummary['id'+movID]['imgHeight'] : "";
   var movTitle   = (arrMovSummary['id'+movID]['title']    != null) ? arrMovSummary['id'+movID]['title']     : "";
   var movSummary = (arrMovSummary['id'+movID]['summary']  != null) ? arrMovSummary['id'+movID]['summary']   : "";
   var movCopyr   = (arrMovSummary['id'+movID]['copyr']    != null) ? arrMovSummary['id'+movID]['copyr']     : "";
   
   zWndWidth  = 640;
   zWndHeight = 600;
   
   if (obj = document.getElementById('overlay'))
   {
      var prevLink   = (prevID) ? "<a href=\"javascript:void(0)\" onclick=\"movieSummary('" + prevID + "')\" class=\"prev\">«</a>" : "<span class=\"prev\">«</span>";
      var nextLink   = (nextID) ? "<a href=\"javascript:void(0)\" onclick=\"movieSummary('" + nextID + "')\" class=\"next\">»</a>" : "<span class=\"next\">»</span>";
      var strSummary = "<div class=\"background\"></div>"
                     + "<div id=\"summary\">"
                     + "<div class=\"navi\">"
                     + prevLink
                     + nextLink
                     + "<a href=\"javascript:void(0)\" onclick=\"document.getElementById('overlay').style.display='none'\" class=\"close\">x</a>"
                     + "</div>"
                     + "<div class=\"content\">"
                     + "<div class=\"wrapper\">"
                     + ((imgUrl) ? "<div class=\"image image-right\"><div class=\"image-wrapper\"><img src=\"" + imgUrl + "\" width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" alt=\"" + movTitle + "\" /></div></div>" : "")
                     + ((movTitle) ? "<h2>" + movTitle + "</h2>" : "")
                     + ((movSummary) ? "<div class=\"paragraph\">" + movSummary + "</div>" : "")
                     + "</div>";
                     + "</div>";
                     + "</div>";
      
      obj.innerHTML = strSummary;
      zWndHeight    = Math.min(zWndHeight,Sitepark.Common.Geometry.getViewportHeight());
      
      intWidth  = Math.max(Sitepark.Common.Geometry.getViewportWidth(),document.getElementsByTagName('html')[0].offsetWidth,document.getElementsByTagName('body')[0].offsetWidth);
      intHeight = Math.max(Sitepark.Common.Geometry.getViewportHeight(),document.getElementsByTagName('html')[0].offsetHeight,document.getElementsByTagName('body')[0].offsetHeight,$(document).height());
      intXPos   = Math.round(0.5*(intWidth-zWndWidth));
      intYPos   = Math.round(0.5*(Sitepark.Common.Geometry.getViewportHeight()-zWndHeight)+Sitepark.Common.Geometry.getVerticalScroll());
      
      if (obj.lastChild != null)
      {
         obj.lastChild.style.width  = zWndWidth + "px";
         obj.lastChild.style.top    = Math.max(0,intYPos) + "px";
         window.setTimeout("resizePopup()", 500);
      }
      
      obj.style.height  = intHeight + "px";
      obj.style.display = "block";
   }
}

function resizePopup()
{
   if (obj = document.getElementById('overlay'))
   {
      zWndHeight = Math.min(zWndHeight,Sitepark.Common.Geometry.getViewportHeight());

      intWidth  = Math.max(Sitepark.Common.Geometry.getViewportWidth(),document.getElementsByTagName('html')[0].offsetWidth,document.getElementsByTagName('body')[0].offsetWidth);
      intHeight = Math.max(Sitepark.Common.Geometry.getViewportHeight(),document.getElementsByTagName('html')[0].offsetHeight,document.getElementsByTagName('body')[0].offsetHeight,$(document).height());
      intXPos   = Math.round(0.5*(intWidth-zWndWidth));
      intYPos   = Math.round(0.5*(Sitepark.Common.Geometry.getViewportHeight()-zWndHeight)+Sitepark.Common.Geometry.getVerticalScroll());
      
      obj.style.height  = intHeight + "px";
      
      if (obj.lastChild != null)
      {
         //obj.lastChild.style.height = zWndHeight + "px";
         //obj.lastChild.style.left   = Math.max(0,intXPos) + "px";
         obj.lastChild.style.top    = Math.max(0,intYPos) + "px";
      }
   }
}

function scrollPopup()
{
   if (obj = document.getElementById('overlay'))
   {
      intYPos = Math.round(0.5*(Sitepark.Common.Geometry.getViewportHeight()-Math.min(zWndHeight,Sitepark.Common.Geometry.getViewportHeight()))+Sitepark.Common.Geometry.getVerticalScroll());
      if(obj.lastChild != null) obj.lastChild.style.top = Math.max(0,intYPos) + "px";
   }
}

function closePopup()
{
   if (obj = document.getElementById('overlay'))
   {
      obj.style.display = "none";
      obj.innerHTML     = "";
   }
}

//window.onresize = function() { resizePopup(); }
//window.onscroll = function() { scrollPopup(); }

function changeView(which)
{
   document.getElementById(which).style.display = (document.getElementById(which).style.display=='none') ? 'block' : 'none';
}