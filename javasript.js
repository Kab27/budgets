


    /*let threshold = 160; // Ajustez selon votre besoin
    function checkDevTools() {
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            window.location.href = './404';
            window.close(); // Peut être bloqué par le navigateur
        }
    }*/

    // Vérifier au chargement initial
    //window.addEventListener('load', checkDevTools);

    // Vérifier aussi lors des redimensionnements (comme dans votre code original)
    window.addEventListener('resize', checkDevTools);
    
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });


    // Blocage du zoom via JavaScript
(function() {
    // 1. Ajout dynamique de la meta viewport restrictive
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no';
    document.head.appendChild(viewportMeta);
 
    // 3. Blocage spécifique pour iOS (gestures)
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });

    // 4. Protection contre le double-tap zoom sur iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // 5. Empêche le zoom via le clavier (Ctrl + +/-)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.keyCode === 187 || e.keyCode === 189)) {
            e.preventDefault();
        }
    });
})();


jQuery.fn.fastLiveFilter = function(list, options) {
  // Options: input, list, timeout, callback
  options = options || {};
  list = jQuery(list);
  var input = this;
  var lastFilter = '';
  var timeout = options.timeout || 0;
  var callback = options.callback || function() {}; 
  var pType = options.type || "filter";
  
  var keyTimeout;
  var lis = list.children();
  var len = lis.length;
  var oldDisplay = len > 0 ? lis[0].style.display : "block";
  callback(len); // do a one-time callback on initialization to make sure everything's in sync
  
  if(pType === "search") {
    for (var i = 0; i < len; i++) {
      lis[i].style.display = "none";
    }
  }
  
  input.change(function() {
    // var startTime = new Date().getTime();
    var filter = input.val().toLowerCase();
    
    var li, innerText;
    var numShown = 0;
    for (var i = 0; i < len; i++) {
      li = lis[i];
      innerText = !options.selector ? 
        (li.textContent || li.innerText || "") : 
        $(li).find(options.selector).text();
      
      if(pType !== "search" || filter.trim().length > 0) {
        if (innerText.toLowerCase().indexOf(filter) >= 0) {
          if (li.style.display == "none") {
            li.style.display = oldDisplay;
          }
          numShown++;
        } else {
          if (li.style.display != "none") {
            li.style.display = "none";
          }
        }
      } else {
        li.style.display = "none";
      }
    }
    callback(numShown);
    return false;
  }).keydown(function() {
    clearTimeout(keyTimeout);
    keyTimeout = setTimeout(function() {
      if( input.val() === lastFilter ) return;
      lastFilter = input.val();
      input.change();
    }, timeout);
  });
  return this; // maintain jQuery chainability
}

$('#filter_input').fastLiveFilter('#filter_list');
$('#search_input').fastLiveFilter('#search_list', {type: "search"});


$(document).ready(function(){
document.onkeypress = function (event) {
event = (event || window.event);
if (event.keyCode == 123) {
return false;
}
}
document.onmousedown = function (event) {
event = (event || window.event);
if (event.keyCode == 123) {
return false;
}
}
document.onkeydown = function (event) {
event = (event || window.event);
if (event.keyCode == 123) {
return false;
}
}

jQuery(document).ready(function($){
$(document).keydown(function(event) {
var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();

if (event.ctrlKey && (pressedKey == "c" || pressedKey == "u" || pressedKey == "s" || pressedKey == "p")) {
return false;
}
});
});
});

 function isNumberKey(evt)
 {
 var charCode = (evt.which) ? evt.which : event.keyCode
 if (charCode > 31 && (charCode < 48 || charCode > 57))
 return false;
 return true;
 }

      /*
       * Animation des éléments de budget au chargement de la page
       */
      $(document).ready(function() {
         $('.budget-item').each(function(i) {
            $(this).delay(i * 100).css({
               opacity: 0,
               transform: 'translateY(20px)'
            }).animate({
               opacity: 1,
               transform: 'translateY(0)'
            }, 300);
         });
      });