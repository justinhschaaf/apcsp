/*
 * 
 * The MIT License (MIT)
 * Copyright © 2018 Justin Schaaf
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the “Software”),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS 
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *
 */

// General Variables
var questionId = 0;
var timedTrial = false;
var graded = false;
var answered = false;
var total = 0;
var correct = 0;
var splashes = [];

// Question Lists
var questions = [];
var questionsProgramming = [];
var questionsMath = [];

setup();

// Setup for new games
function setup() {
  // General Variables
  questionId = 0;
  timedTrial = false;
  graded = false;
  answered = false;
  total = 0;
  correct = 0;
  splashes = [];
  initializeSplashes();
  
  // Question Lists
  questions = [];
  questionsProgramming = [];
  questionsMath = [];
  initializeQuestions();
  
  // Finishing touches
  setText("title", splashes[randomNumber(0, splashes.length - 1)]);
  setScreen("home");
}

// Gets the question
function getNewQuestion() {
  questionId = randomNumber(0, questions.length - 1);
  var question = questions[questionId];
  return question;
}

function getCorrectAnswer(question) {
  var answers = question.answers;
  var correctAnswers = [];
  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i];
    if (answer.correct === true) appendItem(correctAnswers, answer.name);
  }
  return correctAnswers;
}

// Quiz Function
function quiz() {
  
  setScreen("quiz");
  
  var question = getNewQuestion();
  var usedPlaces = [];
  answered = false;
  if (graded) total++;
  
  setText("question", question.question);
  hideElement("answer1");
  hideElement("answer2");
  hideElement("answer3");
  hideElement("answer4");
  
  for (var i = 0; i < question.answers.length; i++) {
    
    var place = randomNumber(0, question.answers.length - 1);
    
    while (place == usedPlaces[0] || place == usedPlaces[1] || place == usedPlaces[2] || place == usedPlaces[3]) {
      place = randomNumber(0, question.answers.length - 1);
    }
    
    appendItem(usedPlaces, place);
    
    var answerPlace = "answer" + (place + 1);
    
    showElement(answerPlace);
    setText(answerPlace, question.answers[i].name);
    
  }
  
  if (timedTrial === true) {
    showElement("timer");
    showElement("timerIco");

    timer();
  } else {
    hideElement("timer");
    hideElement("timerIco");
  }
  
}

// Answer Function
function answer(choice) {
  
  var question = questions[questionId];
  var answers = getCorrectAnswer(question);
  answered = true;
  
  for (var i = 0; i < answers.length; i++) {
    if (choice == answers[i]) {
      if (graded) {
        correct++;
        showElement("correctResults");
      } else hideElement("correctResults");
      // Correct answer sound by Freesound user "Aiwha". Find it at https://freesound.org/people/Aiwha/sounds/196106/
      playSound("assets/correct.mp3", false);
      setScreen("correct");
      return;
    }
  }
  
  if (graded) showElement("incorrectResults");
  else hideElement("incorrectResults");
  // Incorrect answer sound by Freesound user "guitarguy1985". Find it at https://freesound.org/people/guitarguy1985/sounds/54047/
  playSound("assets/incorrect.mp3", false);
  setScreen("incorrect");
  
}

// Select the question type
function selectQuestions() {
  
  var questionSelect = getText("questionSelect");
  
  if (questionSelect == "Programming") {
    questions = questionsProgramming;
  } else if (questionSelect == "Math (In Progress)") {
    questions = questionsMath;
  } else {
    questions = questionsProgramming;
  }
  
}

function timer() {
  
  var duration = 15;
  setText("timer", duration);
  
  timedLoop(1000, function() {
    
    if (duration >= 0 && answered === false) {
      duration -= 1;
      setText("timer", duration);
    } else {
      if (answered === false) answer("");
      stopTimedLoop();
    }
    
  });
  
}

// New Question Buttons

onEvent("start", "click", function() { 
  selectQuestions();
  quiz(); 
});

onEvent("startTimed", "click", function() { 
  timedTrial = true;
  selectQuestions();
  quiz(); 
});

onEvent("startGraded", "click", function() { 
  graded = true;
  selectQuestions();
  quiz(); 
});

onEvent("correctNew", "click", function() { 
  quiz(); 
});

onEvent("incorrectNew", "click", function() { 
  quiz(); 
});

// Answer Buttons

onEvent("answer1", "click", function() {
  answer(getText("answer1"));
});

onEvent("answer2", "click", function() {
  answer(getText("answer2"));
});

onEvent("answer3", "click", function() {
  answer(getText("answer3"));
});

onEvent("answer4", "click", function() {
  answer(getText("answer4"));
});

// Back Buttons

onEvent("quizBack", "click", function() {
  setScreen("home");
  setup();
});

onEvent("correctBack", "click", function() {
  setScreen("home");
  setup();
});

onEvent("incorrectBack", "click", function() {
  setScreen("home");
  setup();
});

onEvent("summaryReturn", "click", function() {
  setScreen("home");
  setup();
});

// Result Buttons

onEvent("correctResults", "click", function() {
  setScreen("summary");
  setText("summaryQuestions", "You got " + correct + "/" + total + " questions correct, or...");
  setText("summaryGrade", (correct / total) * 100 + "%");
});

onEvent("incorrectResults", "click", function() {
  setScreen("summary");
  setText("summaryQuestions", "You got " + correct + "/" + total + " questions correct, or...");
  setText("summaryGrade", (correct / total) * 100 + "%");
});

// Leaderboard Button
onEvent("summaryLeaderboard", "click", function() {
  setScreen("addLeaderboard");
});

onEvent("addAccept", "click", function() {
  createRecord("leaderboard", {
    user: getUserId(),
    correct: correct,
    total: total
  });
  getRanking();
});

onEvent("addDeny", "click", function() {
  getRanking();
});

function getRanking() {
  readRecords("leaderboard", {total:total}, function(records) {
    var place = 1;
    var greater = {
      correct: 0
    };
    var less = {
      correct: 0
    };
    for (var i =0; i < records.length; i++) {
      var current = records[i];
      if (current.correct > correct) {
        place++; // There is another person ahead.
        if (current.correct < greater.correct || greater.correct === 0) {
         greater = current;
        }
      }
      if (current.correct < correct) {
        if (current.correct > less.correct || less.correct === 0) {
         less = current;
        }
      }
    }
    setText("place", place);
    drawChart("leaderboardTable", "bar", [
    	{ label: less.user, value: less.correct },
    	{ label: "You", value: correct },
    	{ label: greater.user, value: greater.correct }
    ]);
    setText("beat", "Try and beat", greater.correct, "to improve your ranking.");
  });
  
}

setup();

function initializeSplashes() {
  splashes = [
    "Let's learn something new.",
    "A fact a day keeps the doctor away.",
    "Learning is healthy and fun!",
    "Unbiased opinions incoming!",
    "Created by the amazing, one and only, Justin Schaaf!",
    "Supporting Open-Source",
    "Try something new today.",
    "Go D.A.!",
    "Spectacular!",
    "Who needs sports when you have a computer?",
    "(Insert Nokia tune here)",
    "Absolute Nothingness",
    "Imaginary Numbers",
    "R.I.P. iPhone SE",
    "Hello Notch.",
    "/\\_________/\\",
    "‽, the coolest-named character.",
    "♠ ♣ ♥ ♦",
    "▲ Illuminati Confirmed.",
    "The ☼, the ○, and the *",
    "(╯°□°）╯︵ ┻━┻",
    "25% code, 75% questions",
    "Leaderboard coming soon!",
    "explorer.exe",
    "Warning: Bad or unnecessary escaping."
  ];
}

/*

These arrays contain all the questions implemented into the game.
The format for each question is [Question, Answer, Dummy, Dummy, Dummy],
all of which must be strings.

*/

function initializeQuestions() {
  
  // Programming
  insertItem(questionsProgramming, 0, {
    question: "A byte is a set of 8 ____",
    answers: [
      {
        name: "bits",
        correct: true
      },
      {
        name: "burgers",
        correct: false
      },
      {
        name: "digits",
        correct: false
      },
      {
        name: "binaries",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 1, {
    question: "In Java, how many primitive types are there?",
    answers: [
      {
        name: "8",
        correct: true
      },
      {
        name: "2",
        correct: false
      },
      {
        name: "4",
        correct: false
      },
      {
        name: "16",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 2, {
    question: "The primitive types of Java are ____",
    answers: [
      {
        name: "Char, Charset, String, Int, Float, Double, Boolean, Byte",
        correct: true
      },
      {
        name: "Bit, Byte, Boolean, Num, String, List",
        correct: false
      },
      {
        name: "Bit, Byte", 
        correct: false
      },
      {
        name: "String, Int, Boolean, Array",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 3, {
    question: "Git, the popular open-source distribution platform, was developed by ____", 
    answers: [
      {
        name: "Linus Torvalds",
        correct: true
      },
      {
        name: "Bill Gates",
        correct: false
      },
      {
        name: "Steve Jobs",
        correct: false
      },
      {
        name: "Sergey Brin",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 4, {
    question: "Linux and macOS both have something in common; they are based on ____",
    answers: [
      {
        name: "Unix",
        correct: true
      },
      {
        name: "Windows",
        correct: false
      },
      {
        name: "Basic",
        correct: false
      },
      {
        name: "DOS",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 5, {
    question: "Even though Android's frontend is written in Java, it's backend is written in ____",
    answers: [
      {
        name: "C / C++",
        correct: true
      },
      {
        name: "Java",
        correct: false
      },
      {
        name: "JavaScript",
        correct: false
      },
      {
        name: "Python",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 6, {
    question: "Most websites are written in HTML and are formatted using ____",
    answers: [
      {
        name: "CSS",
        correct: true
      },
      {
        name: "JavaScript",
        correct: false
      },
      {
        name: "PHP",
        correct: false
      },
      {
        name: "Java",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 7, {
    question: "Even though most websites are scripted using JavaScript, some online forums are scripted in ____",
    answers: [
      {
        name: "PHP",
        correct: true
      },
      {
        name: "Java",
        correct: false
      },
      {
        name: "Python",
        correct: false
      },
      {
        name: "CSS",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 8, {
    question: "Java, though it is now developed by Oracle, was originally created by ____",
    answers: [
      {
        name: "Sun Microsystems",
        correct: true
      },
      {
        name: "Next",
        correct: false
      },
      {
        name: "Yahoo",
        correct: false
      },
      {
        name: "Microsoft",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 9, {
    question: "A set of code that an application depends on is known as a(n) ____",
    answers: [
      {
        name: "API",
        correct: true
      },
      {
        name: "Dependency",
        correct: false
      },
      {
        name: "Library",
        correct: false
      },
      {
        name: "Parent",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 10, {
    question: "Along with Gradle and Ant, ____ is a popular dependency management system for Java.",
    answers: [
      {
        name: "Maven",
        correct: true
      },
      {
        name: "Node",
        correct: false
      },
      {
        name: "Angular",
        correct: false
      },
      {
        name: "Ruby",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 11, {
    question: "What does \"Mozilla\" stand for?",
    answers: [
      {
        name: "Mozaic Killer",
        correct: true
      },
      {
        name: "Mother Godzilla",
        correct: false
      },
      {
        name: "Mozaic Gorilla",
        correct: false
      },
      {
        name: "Mozilla",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 12, {
    question: "What is Cordova?",
    answers: [
      {
        name: "a program that parses JavaScript code for multiple platforms",
        correct: true
      },
      {
        name: "Microsoft's voice assistant",
        correct: false
      },
      {
        name: "A brand of toothpaste",
        correct: false
      },
      {
        name: "A fancy French resturant.",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 13, {
    question: "The Ionic Framework is used for building ____",
    answers: [
      {
        name: "Applications",
        correct: true
      },
      {
        name: "Websites",
        correct: false
      },
      {
        name: "Video Games",
        correct: false
      },
      {
        name: "Scripts",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 14, {
    question: "The Linux Kernel is written in ____.",
    answers: [
      {
        name: "C",
        correct: true
      },
      {
        name: "Python",
        correct: false
      },
      {
        name: "JavaScript",
        correct: false
      },
      {
        name: "Ruby",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 15, {
    question: "In the domain www.example.com, what is the \"www\" known as?",
    answers: [
      {
        name: "Subdomain",
        correct: true
      },
      {
        name: "Second-Level Domain",
        correct: false
      },
      {
        name: "Top-Level Domain",
        correct: false
      },
      {
        name: "Bottom-Level Domain",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 16, {
    question: "In the domain www.example.com, what is the \"example\" known as?",
    answers: [
      {
        name: "Subdomain",
        correct: false
      },
      {
        name: "Second-Level Domain",
        correct: true
      },
      {
        name: "Top-Level Domain",
        correct: false
      },
      {
        name: "Bottom-Level Domain",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 17, {
    question: "In the domain www.example.com, what is the \"com\" known as?",
    answers: [
      {
        name: "Subdomain",
        correct: false
      },
      {
        name: "Second-Level Domain",
        correct: false
      },
      {
        name: "Top-Level Domain",
        correct: true
      },
      {
        name: "Bottom-Level Domain",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 18, {
    question: "How many top-level domains are there?",
    answers: [
      {
        name: "1543",
        correct: true
      },
      {
        name: "198",
        correct: false
      },
      {
        name: "1322",
        correct: false
      },
      {
        name: "734",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 19, {
    question: "Which one of these is a lossless file format?",
    answers: [
      {
        name: ".png",
        correct: true
      },
      {
        name: ".jpeg",
        correct: false
      },
      {
        name: ".7z",
        correct: true
      },
      {
        name: ".mp3",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 20, {
    question: "Whigh one of these is a lossy file format?",
    answers: [
      {
        name: ".wmv",
        correct: false
      },
      {
        name: ".mp4",
        correct: true
      },
      {
        name: ".txt",
        correct: false
      },
      {
        name: ".png",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 21, {
    question: "When using code.org to create an app (e.g. this), what programming language is it?",
    answers: [
      {
        name: "JavaScript",
        correct: true
      },
      {
        name: "Java",
        correct: false
      },
      {
        name: "HTML",
        correct: false
      },
      {
        name: "C++",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 22, {
    question: "Machine code, the programming language CPUs understand, assigns each function to a unique ____",
    answers: [
      {
        name: "Number",
        correct: true
      },
      {
        name: "Letter",
        correct: false
      },
      {
        name: "BLOB",
        correct: false
      },
      {
        name: "Byte",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 23, {
    question: "____ allows Java programs to be compiled into Java bytecode and run on any machine with Java installed.",
    answers: [
      {
        name: "Java Virtual Machine",
        correct: true
      },
      {
        name: "Java Runtime Environment",
        correct: false
      },
      {
        name: "Java Development Kit",
        correct: false
      },
      {
        name: "OpenJDK",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 24, {
    question: "Microsoft Office file formats are based on ____.",
    answers: [
      {
        name: "XML",
        correct: true
      },
      {
        name: "HTML",
        correct: false
      },
      {
        name: "JSON",
        correct: false
      },
      {
        name: "Markdown",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 25, {
    question: "YAML is an acronym for ____.",
    answers: [
      {
        name: "YAML Ain't Markup Language",
        correct: true
      },
      {
        name: "Yet Another Markup Language",
        correct: true
      },
      {
        name: "Yams And Magenta Lemons",
        correct: false
      },
      {
        name: "Yellow Arbitrary Markup Language",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 26, {
    question: "YAML 1.2 is a superset of ____.",
    answers: [
      {
        name: "JSON",
        correct: true
      },
      {
        name: "XML",
        correct: false
      },
      {
        name: "Markdown",
        correct: false
      },
      {
        name: "SGML",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 27, {
    question: "JavaScript is a programming language created by ____.",
    answers: [
      {
        name: "Brendan Eich",
        correct: true
      },
      {
        name: "Linus Torvalds",
        correct: false
      },
      {
        name: "Larry Page",
        correct: false
      },
      {
        name: "Sergey Brin",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 28, {
    question: "\"Swift\" is a programming language developed by ____.",
    answers: [
      {
        name: "Apple",
        correct: true
      },
      {
        name: "Google",
        correct: false
      },
      {
        name: "Microsoft",
        correct: false
      },
      {
        name: "Oracle",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 29, {
    question: "\"TypeScript\" is a programming language developed by ____.",
    answers: [
      {
        name: "Apple",
        correct: false
      },
      {
        name: "Google",
        correct: false
      },
      {
        name: "Microsoft",
        correct: true
      },
      {
        name: "Oracle",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 30, {
    question: "\"Go\" is a programming language developed by ____.",
    answers: [
      {
        name: "Apple",
        correct: false
      },
      {
        name: "Google",
        correct: true
      },
      {
        name: "Microsoft",
        correct: false
      },
      {
        name: "Oracle",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 31, {
    question: "ChromeOS is built upon ____.",
    answers: [
      {
        name: "The Linux Kernel",
        correct: true
      },
      {
        name: "Bootcamp",
        correct: false
      },
      {
        name: "Ubuntu",
        correct: false
      },
      {
        name: "Windows",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 32, {
    question: "What is the name of the Linux brand character?",
    answers: [
      {
        name: "Tux",
        correct: true
      },
      {
        name: "Duke",
        correct: false
      },
      {
        name: "Freedo",
        correct: false
      },
      {
        name: "Wilber",
        correct: false
      }
    ]});
  insertItem(questionsProgramming, 33, {
    question: "What is the maximum value for a 64-bit signed integer?",
    answers: [
      {
        name: "9223372036854775807",
        correct: true
      },
      {
        name: "4447731332127956360",
        correct: false
      },
      {
        name: "2727682406546804414",
        correct: false
      },
      {
        name: "2368969881848018303",
        correct: false
      }
    ]});

  // Math
  insertItem(questionsMath, 0, {
    question: "What is the square of 16?",
    answers: [
      {
        name: "256",
        correct: true
      },
      {
        name: "32",
        correct: false
      },
      {
        name: "128",
        correct: false
      },
      {
        name: "512",
        correct: false
      }
    ]});
  insertItem(questionsMath, 1, {
    question: "Which one of these is the Pythagorean Theorem?",
    answers: [
      {
        name: "a^2 + b^2 = c^2",
        correct: true
      },
      {
        name: "x = (-b +- √(b^2 - 4ac)) / 2a",
        correct: false
      },
      {
        name: "d = √((x - x1)^2 + (y - y1)^2)",
        correct: false
      },
      {
        name: "y2 - y1 = m(x2 - x1) + b",
        correct: false
      }
    ]});
  insertItem(questionsMath, 2, {
    question: "Which one of these is the Distance Formula?",
    answers: [
      {
        name: "d = √((x - x1)^2 + (y - y1)^2)", 
        correct: true
      },
      {
        name: "x = (-b +- √(b^2 - 4ac)) / 2a",
        correct: false
      },
      {
        name: "a^2 + b^2 = c^2",
        correct: false
      },
      {
        name: "y2 - y1 = m(x2 - x1) + b",
        correct: false
      }
    ]});
  insertItem(questionsMath, 3, {
    question: "Which one of these is the Quadratic Formula?",
    answers: [
      {
        name: "x = (-b +- √(b^2 - 4ac)) / 2a",
        correct: true
      },
      {
        name: "d = √((x - x1)^2 + (y - y1)^2)",
        correct: false
      },
      {
        name: "a^2 + b^2 = c^2",
        correct: false
      },
      {
        name: "y2 - y1 = m(x2 - x1) + b",
        correct: false
      }
    ]});
  insertItem(questionsMath, 4, {
    question: "Which one of these is the slope-intercept form of a linear equation?",
    answers: [
      {
        name: "y = mx + b",
        correct: true
      },
      {
        name: "y2 - y1 = m(x2 - x1) + b",
        correct: false
      },
      {
        name: "Ax + By = C",
        correct: false
      },
      {
        name: "a^2 + b^2 = c^2",
        correct: false
      }
    ]});
  insertItem(questionsMath, 5, {
    question: "Which one of these is the standard form of a linear equation?",
    answers: [
      {
        name: "Ax + By = C",
        correct: true
      },
      {
        name: "y2 - y1 = m(x2 - x1) + b",
        correct: false
      },
      {
        name: "y = mx + b", 
        correct: false
      },
      {
        name: "a^2 + b^2 = c^2",
        correct: false
      }
    ]});
  insertItem(questionsMath, 6, {
    question: "Which one of these is the point-intercept form of a linear equation?",
    answers: [
      {
        name: "y2 - y1 = m(x2 - x1) + b",
        correct: true
      },
      {
        name: "Ax + By = C",
        correct: false
      },
      {
        name: "y = mx + b",
        correct: false
      },
      {
        name: "a^2 + b^2 = c^2",
        correct: false
      }
    ]});
  insertItem(questionsMath, 7, {
    question: "Which one of these is a quadratic equation?",
    answers: [
      {
        name: "y = 2(x - 3)^2 + 5",
        correct: true
      },
      {
        name: "y = 2x + 5",
        correct: false
      },
      {
        name: "y = 2|x - 3| + 5",
        correct: false
      },
      {
        name: "y = x^3",
        correct: false
      }
    ]});
  insertItem(questionsMath, 8, {
    question: "A dodecahedron is a ____.",
    answers: [
      {
        name: "a 12-sided die",
        correct: true
      },
      {
        name: "a 20-sided die",
        correct: false
      },
      {
        name: "a 6-sided die",
        correct: false
      },
      {
        name: "Two 6-sided dice",
        correct: false
      }
    ]});
  insertItem(questionsMath, 9, {
    question: "How many cards are in a deck of cards?",
    answers: [
      {
        name: "52",
        correct: true
      },
      {
        name: "13", 
        correct: false
      },
      {
        name: "26",
        correct: false
      },
      {
        name: "39",
        correct: false
      }
    ]});
  insertItem(questionsMath, 10, {
    question: "What are the odds in favor of drawing a jack in a standard deck of cards?",
    answers: [
      {
        name: "1:12",
        correct: true
      },
      {
        name: "1:3",
        correct: false
      },
      {
        name: "1:13",
        correct: false
      },
      {
        name: "1:4",
        correct: false
      }
    ]});
  insertItem(questionsMath, 11, {
    question: "What is the probability of drawing a face card or an ace in a standard deck of cards?",
    answers: [
      {
        name: "4/13",
        correct: true
      },
      {
        name: "1/13",
        correct: false
      },
      {
        name: "1/4",
        correct: false
      },
      {
        name: "1/52",
        correct: false
      }
    ]});
  insertItem(questionsMath, 12, {
    question: "Solve: x^2 - 225 = 0",
    answers: [
      {
        name: "x = -15 OR x = 15",
        correct: true
      },
      {
        name: "x = -5 OR x = 5",
        correct: false
      },
      {
        name: "x = -15 OR x = 5",
        correct: false
      },
      {
        name: "x = -5 OR x = 15",
        correct: false
      }
    ]});
  insertItem(questionsMath, 13, {
    question: "4x^2 + 6x + 9 is an example of (a) ____.",
    answers: [
      {
        name: "Perfect Square Trinomial",
        correct: true
      },
      {
        name: "Difference of Squares",
        correct: false
      },
      {
        name: "Squared Binomial",
        correct: false
      },
      {
        name: "Conjugate Binomials",
        correct: false
      }
    ]});
  insertItem(questionsMath, 14, {
    question: "4x^2 - 9 is an example of (a) ____.",
    answers: [
      {
        name: "Perfect Square Trinomial",
        correct: false
      },
      {
        name: "Difference of Squares",
        correct: true
      },
      {
        name: "Squared Binomial",
        correct: false
      },
      {
        name: "Conjugate Binomials",
        correct: false
      }
    ]});
  insertItem(questionsMath, 15, {
    question: "(2x + 3)^2 is an example of (a) ____.",
    answers: [
      {
        name: "Perfect Square Trinomial",
        correct: false
      },
      {
        name: "Difference of Squares",
        correct: false
      },
      {
        name: "Squared Binomial",
        correct: true
      },
      {
        name: "Conjugate Binomials",
        correct: false
      }
    ]});
  insertItem(questionsMath, 16, {
    question: "(2x + 3)(2x - 3) is an example of (a) ____.",
    answers: [
      {
        name: "Perfect Square Trinomial",
        correct: false
      },
      {
        name: "Difference of Squares",
        correct: false
      },
      {
        name: "Squared Binomial",
        correct: false
      },
      {
        name: "Conjugate Binomials",
        correct: true
      }
    ]});
  
}
