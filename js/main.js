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

function generateHTML(keyword) {
    $.getJSON("public/content.json", function(json) {
        console.log(json); 
    });
    
    $("#content").empty();
    $.tmpl( '<div class="entry_odd"> \
          <div class="col-md-6">\
              <img src="">\
          </div>\
          <div class="col-md-6">\
              <div class="description">\
                <h1 class="header-description">Header</h1>\
                <h3 class="sub-description">Tiny Project</h3>\
                <div class="divider"></div>  \
                <p class="item-description">\
                  <ul>\
                    <li>Bullet</li>\
                  </ul>  \
                </p>  \
              </div>\
          </div>\
      </div>', { "Name" : "John Doe" }).appendTo( "#content" );
}