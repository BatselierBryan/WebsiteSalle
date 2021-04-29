(function($, window, undefined) {
    $(document).ready(function() {

        var $html = $("html"),
            $body = $html.find("body"),
            widget = $body.find(".booking-widget"),
            lng = $html.attr("lang") || 'nl',
            localization = {
                booklink: "/" + lng + "/online-boeken"
            };

             // Added to get booking-level from URL parameter, needed to modify the button tekst if reservationtype is on request
      $.urlParam = function(name){
          var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
          if (results==null) {
             return null;
          }
          return decodeURI(results[1]) || 0;
      };
      booking_arrival = $.urlParam('booking_arrival');
      allowed_to_scroll = 0;
      if(booking_arrival === null){
        allowed_to_scroll = 1;
      }


/* ----------------------------------------------------------------
   Technisch gezien kunnen er meerdere HA booking-widgets op 1 pagina voorkomen, houdt hier rekening mee
   init widgets
------------------------------------------------------------------- */
        // init widgets, with possible config options
        widget.booking({
          // ignore_history: true,
          // widget_quicksearch: {
          //   datepicker: {
          //     showButtonPanel: true
          //   }
          // }
          widget_calendar: {
            numMonthsShown: 2,
            resetElementClass: '.reset--date',
            customCalentimConfig: {
                startOnMonday: true,
                showFooter:false
            }
          },
          api: {
            url: "https://api.holidayagent.nl/v1"
          }
        });


    widget.on('booking:quicksearch:search', function() {
      var $widget = $(this),
          $levels  = $widget.find('.levels'),
          $quicksearch = $widget.find('.booking-widget-quicksearch'),
          $criteria = $quicksearch.find('.criteria input.criterium[type=checkbox]'),
          countLevels = 0,
          prefix = 'booking_',
          params = widget.getData('quicksearch', prefix);


      // ===== On detail page, check if criteria is set, to properly show from prices
        $widget.find('.booking-widget-level').each(function() {
            price = $widget.find('.availability .total-price span').first().text();
            $widget.find('.level-price').text(price);
            if(params.booking_arrival === null){
                $widget.find('.per_period').hide();                               // Hide Period text row
            } else {
                $widget.find('.per_week').hide();                                 // Hide week text row

                $widget.find('.fromprice_arrival').html(params.booking_arrival);  // Add Arrival date in text
                var departure = $widget.find('.departure span').html();           // Get departure date (params only gives Duration)
                $widget.find('.fromprice_departure').html(departure);             // Add Arrival date in text
            }
        });

  });

    widget.on('booking:calendar:periods', function(event, params){
      var $widget = $(this);
      href = localization.booklink;


      $('.booking-result, .booking-widget-calendar, .submenu__book').addClass('_has-period');

      // Update date display with different display style
      var from = params.booking_arrival.split("-");
      var to = params.booking_departure.split("-");
      var arrival = new Date(from[2], from[1] - 1, from[0]);
      var departure = new Date(to[2], to[1] - 1, to[0]);

      var monthNames = [ "jan", "feb", "maa", "apr", "mei", "jun","jul", "aug", "sep", "okt", "nov", "dec"];

          displayArrival =   arrival.getDate() + ' ' + monthNames[arrival.getMonth()] + ' <span class="acco-filter__year">' + arrival.getFullYear() + '</span>';
          displayDeparture = departure.getDate() + ' ' + monthNames[departure.getMonth()] + ' <span class="acco-filter__year">' + departure.getFullYear() + '</span>';

      // Show correct submenu options
      $('.submenu--button').removeClass('_no-params');
      $('.submenu--button').addClass('_with-params');
      // $('.submenu--button__content._with-params').show();

      // Show correct quickbook options
      $('.quick--book__select--date').hide();
      $('.quick--book__info').show();


      $('.booking-result .book-now-button').inview();
      $('.booking-result .book-now-button').on('inview:toggle', function(event, inView) {
        $('.submenu__book').toggleClass('hide');
      });





      var containerWidth = $('body').outerWidth();
      if(containerWidth <= 767) {
        if(allowed_to_scroll == 1){
          $.hm.responsy.scrollToElement($('.booking-result__wrapper'), {
            offsetTop: $(window).height() - $('.booking-result__wrapper').outerHeight(),
          });
        } else {
          allowed_to_scroll = 1;
        }
      }



      var displayPrice = $('.total-price .price').text();
      var str_length = displayPrice.length;
      if(str_length > 8){
        var position = str_length - 6;
        displayPrice = [displayPrice.slice(0, position), '.', displayPrice.slice(position)].join('');
      }

      $('[data-total-price]').html(displayPrice);
      $('[data-period-start]').html(displayArrival);
      $('[data-period-end]').html(displayDeparture);

      $('.booking-result__wrapper .book-now-button, .quick--book .book-now-button, .submenu--button').on('click', function() {
        event.preventDefault();
        // if($(this).hasClass('_with-params')){
        window.location.href = widget.parseURI(href, params);
        // }
        // window.location.href = widget.parseURI(href, params);
        // console.log(params);
        // console.log(widget.parseURI(href, params));
        return false;
      });


      $('.reset--date').on('click', function() {
        $('.booking-result, .booking-widget-calendar, .submenu__book').removeClass('_has-period');
        $.hm.responsy.scrollToElement($('#'+localization.boeknu), {   offsetTop: $('.scrollmenu').height()});
      });

      $('.book-here-alert').delay(300).fadeIn(200).delay(3000).fadeOut();

      $('.reset--date, .calentim-day').on('click', function() {
        $('.submenu--button').addClass('_no-params').removeClass('_with-params');
        $('.booking-result, .booking-widget-calendar, .submenu__book').removeClass('_has-period');
      });
    });



    });
}(jQuery, window));