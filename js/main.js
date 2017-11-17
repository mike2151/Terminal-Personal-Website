//initial populate
generateHTML("all");


//terminal code: http://terminal.jcubic.pl/
jQuery(function($, undefined) {
   $('#terminal').terminal(function(command) {
    if (command == 'test') {
        this.echo("you just typed 'test'");
    } else {
        this.echo('unknown command');
    }
}, { greetings: "Welcome To My Website. Type 'help' for the list of commands",
        name: 'terminal',
        height: 100,
        prompt: '> '});
        
});

$(function() {
  $('#nav_to_content').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});


function generateHTML(keyword) {
    $.getJSON("https://raw.githubusercontent.com/mike2151/Terminal-Personal-Website/master/public/content.json", function(json) {
        $("#content").empty();
         var state_counter = 0;
         for(var entry in json[keyword]) {
             if (state_counter % 2 == 0) {
                 $.tmpl( '<div class="entry_odd"> \
              <div class="col-md-6">\
                  <img class="img-desc" src="' + json[keyword][entry].img + '">\
              </div>\
              <div class="col-md-6">\
                  <div class="description">\
                    <h1 class="header-description">' + json[keyword][entry].title + '</h1>\
                    <h3 class="sub-description">'+ json[keyword][entry].miniDescription + '</h3>\
                    <div class="divider"></div>  \
                    <p class="item-description">\
                      <ul>\
                        <li>' + json[keyword][entry].description + '</li>\
                      </ul>  \
                    </p>  \
                  </div>\
              </div>\
          </div>', { "Name" : "John Doe" }).appendTo( "#content" );
             }
             else {
                 $.tmpl( '<div class="entry_even"> \
              <div class="col-md-6">\
                  <div class="description">\
                    <h1 class="header-description">' + json[keyword][entry].title + '</h1>\
                    <h3 class="sub-description">'+ json[keyword][entry].miniDescription + '</h3>\
                    <div class="divider"></div>  \
                    <p class="item-description">\
                      <ul>\
                        <li>' + json[keyword][entry].description + '</li>\
                      </ul>  \
                    </p>  \
                  </div>\
              </div>\
              <div class="col-md-6">\
                  <img class="img-desc" src="' + json[keyword][entry].img + '">\
              </div>\
          </div>', { "Name" : "John Doe" }).appendTo( "#content" );
             }
             state_counter = state_counter + 1;
             
        }
    });
}