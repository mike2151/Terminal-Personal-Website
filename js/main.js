//initial populate
generateHTML("all", "All Content");

$(function() {
  $('#nav_to_content').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});

function generateHTML(keyword, title) {
    $.getJSON("https://raw.githubusercontent.com/mike2151/Terminal-Personal-Website/master/public/content.json", function(json) {
        $("#content").empty();
        $( "#content" ).append("<center><h1 class='content-title'>" + title + "</h1></center>");
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
          </div>', {}).appendTo( "#content" );
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
          </div>', {}).appendTo( "#content" );
             }
             state_counter = state_counter + 1;
        }
    });
}

//terminal code

jQuery(function($, undefined) {
   $('#terminal').terminal(function(command) {
        this.echo(handleCommand(command.toLowerCase()));
}, { greetings: "Welcome To My Website. Type 'help' for the list of commands",
        name: 'terminal',
        height: 100,
        prompt: '> '});
});

function containsSubstrings(substrings, str) {
    if (substrings.some(function(v) { return str.indexOf(v) >= 0; })) {
        return true;
    }
    return false;
}

function handleCommand(command) {
    if (command == "help")
    {
      var response = `For the options for a specific command, type options command-name
      "contact" - opens up an interface to contact me
      "clear" - clears the terminal
      "download" - downloads a file
      "options <Command Name>" - gives more information about a function
      "reset" - restores the original view of the website
      "search" - searches the website for content
      "show" - shows a specific section
      `;    
      return response
    }
    else if (command == "contact") 
    {
        window.location.href = "mailto:miabelar@wharton.upenn.edu";
        return "Contact Email: miabelar@wharton.upenn.edu";
    }
    else if (command == "download resume")
    {
        $.fileDownload('some/file.pdf')
        .done(function () { return "download successful"; })
        .fail(function () { return "an error occured in downloading my resume" });
    }
    else if (command == "reset")
    {
        generateHTML("all", "All Content");  
        $('#nav_to_content').click();
    }
    
    //now get first word
    var firstWord = command.split(" ")[0];
    if (firstWord == "search") {
        
        var removeSearch = command.substr(command.indexOf(" ") + 1);
        var query = command.split(" ");
        
        $.getJSON("https://raw.githubusercontent.com/mike2151/Terminal-Personal-Website/master/public/content.json", function(json) {
        $("#content").empty();
        $( "#content" ).append("<center><h1 class='content-title'>Search For: " + query + "</h1></center>");
         var state_counter = 0;
         for(var entry in json["all"]) {
             if (containsSubstrings(query, json[keyword][entry].title) || containsSubstrings(query, json[keyword][entry].miniDescription) || containsSubstrings(query, json[keyword][entry].description)) {
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
          </div>', {}).appendTo( "#content" );
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
          </div>', {}).appendTo( "#content" );
             }
             state_counter = state_counter + 1;
        }
      }
    });
    }
    if (firstWord == "show") {
       generateHTML(command.split(" ")[1], command.split(" ")[1].toUpperCase());         
    }
    
    return "invalid entry";
    
    //scroll to content
}


