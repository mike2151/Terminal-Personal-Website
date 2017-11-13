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