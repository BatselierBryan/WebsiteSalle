(function($, window, document, undefined) {

   // Define variables
  var $window = $(window),
      $document = $(document),
      lng = 'nl';

  $document.ready(function() {
    lng = document.documentElement.lang || lng;

    // =======================================================
    // ==================== ACCOMMODATIES ====================
    // =======================================================
    // Andere accommodaties op het park tonen

    if ($document.find('.item-shortlist').length){
      $this = $document.find('.item-shortlist');
      var currentParkId = $this.data('parkid');
      var currentAccoId = $this.data('accoid');

      localization = {
        bekijken: 'Bekijken'
      };

      startTime = new Date();
      $.ajax({
        dataType: 'json',
        url: '/l/'+ lng +'/catalog/feed/accommodaties?limit=150',
        success: function(data) {

          endTime = new Date();
          var timeDiff = endTime - startTime; //in ms

          $.each(data, function(i, item){
            if (!item || !item.id) {
              return true;
            }

            var template = $("#template-list-item").html();
            var urlTitle = item.title.replace('.', '');
                urlTitle = urlTitle.replace('+', '');
                urlTitle = urlTitle.replace(/ /g, '-');
                // urlTitle = urlTitle.replace(/--/g, '-');

            // Only show Item if It is on the same park, and is a different accommodation
            if(item.parkid == currentParkId && currentAccoId != item.online_boeken_code && item.active == 1){

              template = template.replace(/{{ title }}/g   , item.title);
              template = template.replace(/{{ foto }}/g    , item.foto_url);
              template = template.replace(/{{ accoid }}/g  , item.id);
              template = template.replace(/{{ urlTitle }}/g  , urlTitle);
              template = template.replace(/'/g  , '');                        // Hack, SocialCMS addes quotes to multilanguage tekst

              $document.find('.item-shortlist').prepend(template);
              $('.item-shortlist__title').show();
            }

          });

        }

      });


    }


  });

}(window.jQuery, window, document));
