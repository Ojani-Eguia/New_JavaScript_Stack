// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
var words = {"-": subStack, "*": multStack, "/": divideStack, "swap": swapStack, "over": overStack,
 "nip": nip, "=": stackEqual, ">": stackGreater, "<": stackLess, "+": addStack};
/**
Part 7 Debugger comment
In this screenshot, the process funcion is being called, as a result of the User
typing '.s' into the terminal. The itmes labeled in the scope reflect the item
being processed (input : ".s"), the funcion being called (Closure: Process) and
the line currently marked by breakpount (line 155 in this file, at the time (not now)).
One useful thing in the debugger was the small window in the top left corner of
the debug screen, allowing you to see the files and folders in a graphical, organized
way.

Part 8 Design Comment
What new perspective did you gain by redoing the lab in JavaScript?
More than anything, The thing I got was experience in learning to code in JavaScript,
since I have not dont that before. With this porject came the experience of coding
with expecting an odd-funcioning program rathar tahn a crashed program, since JavaScript
is forbidded from giving any sort of error message. Having to find bug without help
in this way emphasizes the importace of testing code gradually as it is added, instead of
all at once.

Can you point to one instance where the lack of types in JavaScript was damaging to your productivity?
The lack of types were indeed problrmatic at times (especially during allowing multiple items per
line in process), but I found it to be no more damaging that the same lack of types in Racket.
In this aspect, Coding felt very similar in the cautious attitude when adding new content.

Did JavaScript's lack of types surprise you? Or hurt you in any way? Or was it easier than C++ because you didn't have to annotate the program with types? Either answer is fine here, as long as you provide some thoughtful reflection.
It was not surprising nor difficult to deal with, since it was similar to Racket
in this regard. However, while it was less time consuming to write types, it did
force variables to take on more descriptive names (such as in Racket). Overall,
I think it may have taken more time due to taking extra precautions in making
sure types are correct, since it is not done for you.

Describe a few features of programming your previous lab that you used here. For example, describe how you observed any of the following in JS:
In this lab, I have certainly used objects (or at least, pointers to objects, since
this is JavaScript) to handle things like strings of input, turning them to a list,
and storing the funcitons in a dictionary type object.
While I did not use javascript maps, the replacement, forEach, performs the same job,
since it takes a funciton and applies it to each item in a list.

 */
function emptyStack(stack) {
    while (stack.length > 0){
	    stack.pop();
    }
};


function addStack(stack) {
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first+second);
};
function subStack(stack) {
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first-second);
};
function multStack(stack) {
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first*second);
};
function divideStack(stack) {
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first/second);
};
function swapStack(stack) {
  var first = stack.pop();
  var second = stack.pop();
  stack.push(first);
  stack.push(second);
};
function overStack(stack) {
  var first = stack.pop();
  var second = stack.pop();
  stack.push(second);
  stack.push(first);
  stack.push(second);
};
//swap drop// swap pop
function nip(stack) {
  swapStack(stack);
  stack.pop();
};
function stackEqual(stack) {
  var first = stack.pop();
  var second = stack.pop();
  if(first === second){
    stack.push(-1);
  }
  else{
    stack.push(0);
  }
};
function stackGreater(stack) {
  var first = stack.pop();
  var second = stack.pop();
  if(second > first){
    stack.push(-1);
  }
  else{
    stack.push(0);
  }
};
function stackLess(stack) {
  var first = stack.pop();
  var second = stack.pop();
  if(second < first){
    stack.push(-1);
  }
  else{
    stack.push(0);
  }
};

/**
 * Print a string out to the terminal, and update its scroll to the
 * bottom of the screen. You should call this so the screen is
 * properly scrolled.
 * @param {Terminal} terminal - The `terminal` object to write to
 * @param {string}   msg      - The message to print to the terminal
 */
function print(terminal, msg) {
    terminal.print(msg);
    $("#terminal").scrollTop($('#terminal')[0].scrollHeight + 40);
}

/**
 * Sync up the HTML with the stack in memory
 * @param {Array[Number]} The stack to render
 */
function renderStack(stack) {
    $("#thestack").empty();
    stack.slice().reverse().forEach(function(element) {
        $("#thestack").append("<tr><td>" + element + "</td></tr>");
    });
};

/**
 * Process a user input, update the stack accordingly, write a
 * response out to some terminal.
 * @param {Array[Number]} stack - The stack to work on
 * @param {string} input - The string the user typed
 * @param {Terminal} terminal - The terminal object
 */

 //helper function, handles new user defeneition.
// function defineUserFunction(tokenList){
//   var isLegal = (tokenList.length > 3) and (!(tokenList[1] in words));
//   var index = 2;
//   //this loop does not account for recursive defentions or if else stuff
//   while ((index < (tokenList.length - 1)) and isLegal){
//     if ((!(isNaN(Number(tokenList[index])))) and (!(tokenList[index] in words))) {
//          isLegal = false;
//        }
//        else {
//          print(terminal,"Still Legal");
//        }
//        index = index + 1;
//   };
//
//   if(isLegal){
//     print(terminal,"Definition is legal");
//   }
//   else{
//     print(terminal,"Definition is not legal");
//   }
// };

function process(stack, inputLine, terminal) {
    // The user typed a line
    var inputList = inputLine.trim().split(/ +/);
    if(inputList[0] === ":"){
      print(terminal,"Defining new user define function");
      var functionName = inputList[1];
      var functionDef = inputList.slice(2, inputList.length - 1);
      //was helped in syntax for line below by Ju-Han Tarn
      words[functionName] = function(){functionDef.forEach(function(element){process(stack, element, terminal);
      });
    };
    }
    else{
    inputList.forEach(function(input){
      if (!(isNaN(Number(input)))) {
          print(terminal,"pushing " + Number(input));
          stack.push(Number(input));
      } else if (input === ".s") {
          print(terminal, " <" + stack.length + "> " + stack.slice().join(" "));
        } else if (input in words) {
            words[input] (stack);
      } else {
          print(terminal, ":-( Unrecognized input");
      }
      renderStack(stack);
    });
  }
};


function runRepl(terminal, stack) {
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        process(stack, line, terminal);
        runRepl(terminal, stack);
    });
};

// Whenever the page is finished loading, call this function.
// See: https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {
    var terminal = new Terminal();
    terminal.setHeight("400px");
    terminal.blinkingCursor(true);

    // Find the "terminal" object and change it to add the HTML that
    // represents the terminal to the end of it.
    $("#terminal").append(terminal.html);
	var resetButton = $("#reset");
	resetButton.click(function(){emptyStack(stack)});
    var stack = [];

    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");

    runRepl(terminal, stack);
});
