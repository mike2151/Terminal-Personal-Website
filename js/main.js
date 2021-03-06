//initial populate
generateHTML("education", "Education");
generateHTML("experience", "Experience");
generateHTML("personal_projects", "Personal Projects");
generateHTML("publications", "Publications");
generateHTML("distinctions", "Speaking Engagements/Distinctions");
generateHTML("skills", "Programming Languages");

$(function() {
  $('#nav_to_content').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});

function generateHTML(keyword, title) {
    var jsonURL = "https://raw.githubusercontent.com/mike2151/Terminal-Personal-Website/master/public/content.json";
    $.getJSON(jsonURL, function(json) {
        $( "#content" ).append("<center><h1 class='content-title'>" + title + "</h1></center>");
         var state_counter = 0;
         for(var entry in json[keyword]) {
             if (state_counter % 2 == 0) {
                 var listItems = "";
                 for (var item in json[keyword][entry].description)
                 {
                     listItems = listItems + '<li>' + json[keyword][entry].description[item] + '</li>';
                 }
                 var templateString = '<div class="entry_even"><div class="col-md-6"><img class="img-desc" src="' + json[keyword][entry].img + '"></div><div class="col-md-6"><div class="description"><h1 class="header-description">' + json[keyword][entry].title + '</h1><h3 class="sub-description">' + json[keyword][entry].miniDescription + '</h3><div class="divider"></div><p class="item-description"><ul>' + listItems + '</ul></p></div></div></div>';
                 
                 
                 $.tmpl(templateString , {}).appendTo( "#content" );
             }
             else {
                 var listItems = "";
                 for (var item in json[keyword][entry].description)
                 {
                     listItems = listItems + '<li>' + json[keyword][entry].description[item] + '</li>';
                 }
                 var templateString = '<div class="entry_even"><div class="col-md-6"><div class="description"><h1 class="header-description">' + json[keyword][entry].title + '</h1><h3 class="sub-description">' + json[keyword][entry].miniDescription + '</h3><div class="divider"></div><p class="item-description"><ul>' + listItems + '</ul></p></div></div><div class="col-md-6"><img class="img-desc" src="' + json[keyword][entry].img + '"></div></div>';
                 
                 
                 $.tmpl(templateString , {}).appendTo( "#content" );
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
        height: 200,
        prompt: '> '});
});

function containsSubstrings(substrings, str) {
    if (substrings.some(function(v) { return str.toString().toLowerCase().indexOf(v) >= 0; })) {
        return true;
    }
    return false;
}

function handleCommand(command) {
    if (command == "help")
    {
      var response = `For the parameters for a specific command, type options <command name>
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
    else if (command == "options contact")
    {
        return "no additional parameters"
    }
    else if (command == "options clear")
    {
        return "no additional parameters"
    }
    
    else if (command == "options download")
    {
        return "download resume - downloads my resume"
    }
    
    else if (command == "options reset")
    {
        return "no additional parameters"
    }
    
    else if (command == "options search")
    {
        return "search <query> - searches the content for words contained in query"
    }
    else if (command == "options show")
    {
      var response = `Different sections that can be shown:
      "show all" - all the content (default)
      "show education" 
      "show publications" 
      "show awards" 
      "show programming" - all programming expierence
      "show activities" 
      "show skills" 
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
        var win = window.open('public/resume.pdf', '_blank');
        if (win) {
            win.focus();
            return "downloading resume..."
        } else {
            return ('Please allow popups for this website');
        }
        
    }
    else if (command == "reset")
    {
        generateHTML("all", "All Content");  
        $('#nav_to_content').click();
    }
    
    //now get first word
    var firstWord = command.split(" ")[0];
    if (firstWord == "search") {
        
        var removeSearch = command.substr(command.indexOf(" ") + 1).toLowerCase().replace('"', '');
        var query = removeSearch.replace('"', '').split(" ");
        
        $.getJSON("https://raw.githubusercontent.com/mike2151/Terminal-Personal-Website/master/public/content.json", function(json) {
        $("#content").empty();
        $( "#content" ).append("<center><h1 class='content-title'>Search For: " + query + "</h1></center>");
         var state_counter = 0;
         for(var entry in json["all"]) {
             if (containsSubstrings(query, json["all"][entry].title) || containsSubstrings(query, json["all"][entry].miniDescription) || containsSubstrings(query, json["all"][entry].description)) {
             if (state_counter % 2 == 0) {
                 var listItems = "";
                 for (var item in json["all"][entry].description)
                 {
                     listItems = listItems + '<li>' + json["all"][entry].description[item] + '</li>';
                 }
                 var templateString = '<div class="entry_even"><div class="col-md-6"><img class="img-desc" src="' + json["all"][entry].img + '"></div><div class="col-md-6"><div class="description"><h1 class="header-description">' + json["all"][entry].title + '</h1><h3 class="sub-description">' + json["all"][entry].miniDescription + '</h3><div class="divider"></div><p class="item-description"><ul>' + listItems + '</ul></p></div></div></div>';
                 
                 
                 $.tmpl(templateString , {}).appendTo( "#content" );
             }
             
             else {
                 var listItems = "";
                 for (var item in json["all"][entry].description)
                 {
                     listItems = listItems + '<li>' + json["all"][entry].description[item] + '</li>';
                 }
                 var templateString = '<div class="entry_even"><div class="col-md-6"><div class="description"><h1 class="header-description">' + json["all"][entry].title + '</h1><h3 class="sub-description">' + json["all"][entry].miniDescription + '</h3><div class="divider"></div><p class="item-description"><ul>' + listItems + '</ul></p></div></div><div class="col-md-6"><img class="img-desc" src="' + json["all"][entry].img + '"></div></div>';
                 
                 
                 $.tmpl(templateString , {}).appendTo( "#content" );
             }
             state_counter = state_counter + 1;
        }
         }
      });
     return "displaying results for " + removeSearch;         
    }
    if (firstWord == "show") {
       generateHTML(command.split(" ")[1], command.split(" ")[1].toUpperCase());    
       return "showing " + command.split(" ")[1];    
    }
    
    return "invalid entry";
    
}


