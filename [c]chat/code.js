
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

/*
 *
 * TODO:
 *
 * + Recieving Messages
 * + Refresh Inbox
 * + Settings Page (should include deleting all read messages)
 *
 */

var user = "";
var menuShown = false;
var currentMessage = {};

/*
 *
 * █▀▀█ █  █ ▀▀█▀▀ █  █ 
 * █▄▄█ █  █   █   █▀▀█ 
 * █  █  ▀▀▀   ▀   ▀  ▀ 
 *
 */

// Signup a user for a new account
function signup() {
  var username = getText("signup_input_username");
  if (username === "" || username === undefined) {
    showElement("signup_label_error");
    setText("signup_label_error", "Please enter a valid username!");
    return;
  }
  if (username.includes(" ") || username.includes("\\") || username.includes("/") || username.includes(":") || username.includes("*") || username.includes("?") || username.includes("\"") || username.includes("<") || username.includes(">") || username.includes("|")) {
    showElement("signup_label_error");
    setText("signup_label_error", "A username can't contain any of the following characters: \\ / : * ? \" < > |");
    return;
  }
  if (userExists(username)) {
    showElement("signup_label_error");
    setText("signup_label_error", "A user with that name already exists!");
    return;
  }
  var password = generatePassword();
  setScreen("signup_secret");
  setText("signup_secret_words", password);
  var account = {
    username: username,
    password: password
  };
  createRecord("accounts", account, function() {
    console.log("Account successfully created for user", username);
  });
  user = username;
}

// Log the user into the program
function login() {
  var username = getText("login_input_username");
  if (username === "" || username === undefined) {
    showElement("login_label_error");
    setText("login_label_error", "Please enter a valid username!");
    return;
  }
  if (username.includes(" ") || username.includes("\\") || username.includes("/") || username.includes(":") || username.includes("*") || username.includes("?") || username.includes("\"") || username.includes("<") || username.includes(">") || username.includes("|")) {
    showElement("login_label_error");
    setText("login_label_error", "A username can't contain any of the following characters: \\ / : * ? \" < > |");
    return;
  }
  if (!userExists(username)) {
    showElement("login_label_error");
    setText("login_label_error", "There is no user with that name!");
    return;
  }
  var password = getText("login_input_password");
  readRecords("accounts", { username: username, password: password }, function(records) {
    if (records.username === username && records.password === password) {
      user = username;
      console.log("Login successful for", username);
      pushToHome();
      return;
    } else {
      showElement("login_label_error");
      setText("login_label_error", "Wrong username or password. Please try again.");
      return;
    }
  });
}

// Tasks to be executed to sign the user out
function logout() {
  pushToSignup();
  user = "";
  menuShown = false;
  currentMessage = {};
}

// Generate a random password
function generatePassword() {
  var secret = "";
  for (var i = 0; i < 5; i++) {
    secret += words[randomNumber(0, words.length - 1)];
    if (i === 4) {
      secret += " ";
    }
  }
  readRecords("accounts", { password: secret }, function(records) {
    if (records > 0) return generatePassword();
    else return secret;
  });
  
}

// Check if a user exists
function userExists(user) {
  readRecords("accounts", { username: user }, function(records) {
    if (records.length > 0) {
      return true;
    } else {
      return false;
    }
  });
}

/*
 *
 * █▀▄▀█ █▀▀ █▀▀▄ █  █ 
 * █ █ █ █▀▀ █  █ █  █ 
 * █   █ ▀▀▀ ▀  ▀  ▀▀▀ 
 *
 */

// Show and hide the menu
function showMenu() {
  
  if (!menuShown) { // If the menu is hidden
  
    menuShown = true;
    
    setPosition("home_menu_settings", -40, 50, 40, 40);
    setPosition("home_menu_signout", -40, 90, 40, 40);
    showElement("home_menu_settings");
    showElement("home_menu_signout");
    
    timedLoop(25, function() {
      setPosition("home_menu_settings", (getXPosition("home_menu_settings") + 1), 50, 40, 40);
      setPosition("home_menu_signout", (getXPosition("home_menu_signout") + 1), 90, 40, 40);
      if (getXPosition("home_menu_signout") >= 0) {
        stopTimedLoop();
      }
    });
    
  } else { // Hide the menu
  
    menuShown = false;
    
    timedLoop(25, function() {
      setPosition("home_menu_settings", (getXPosition("home_menu_settings") - 1), 50, 40, 40);
      setPosition("home_menu_signout", (getXPosition("home_menu_signout") - 1), 90, 40, 40);
      if (getXPosition("home_menu_signout") <= -40) {
        stopTimedLoop();
      }
    });
    
  }
  
}

/*
 *
 * █▀▄▀█ █▀▀ █▀▀ █▀▀ █▀▀█ █▀▀▀ █▀▀ █▀▀ 
 * █ █ █ █▀▀ ▀▀█ ▀▀█ █▄▄█ █ ▀█ █▀▀ ▀▀█ 
 * █   █ ▀▀▀ ▀▀▀ ▀▀▀ ▀  ▀ ▀▀▀▀ ▀▀▀ ▀▀▀ 
 *
 */

function getMessages() {
  readRecords("messages", { to: user, read: false }, function(records) {
    for (var i =0; i < records.length; i++) {
      textLabel('id', records[i].id + ': ' + records[i].name);
    }
  });
  
}

function createMessage() {
  // Get the message data
  var to = getText("create_tbox_address");
  var content = getText("create_tbox_message");
  
  // Check if a user with that name exists
  if (!userExists(to)) {
    setText("create_label_error", "A user with that name does not exist!");
    showElement("create_label_error");
    return;
  }
  
  // Keep the message length down to save a little data on the computer
  if (content.length > 128) {
    setText("create_label_error", "Sorry, a message cannot exceed 128 characters!");
    showElement("create_label_error");
    return;
  }
  
  // Convert the message into a JS object
  var msg = {
    from: user,
    to: to,
    message: content,
    read: false
  };
  
  // Put the message into the records
  createRecord("messages", msg, function(record) {
    console.log("Message sent!");
  });
  
  // Return to the home screen
  pushToHome();
  
}

function readMessage() {
  
  // Update the message as read
  updateRecord("messages", { id:currentMessage.id, read:true }, function(record, success) {
    if (success) console.log("Message successfully marked as read!");
    else console.log("Message was unable to be marked as read!")
  });
  
  
  // Send the user to the message screen
  setText("message_label_author", currentMessage.from);
  setText("message_tbox_message", currentMessage.message);
  setScreen("message");
  
}

function reply() {
  
  setText("create_tbox_address", currentMessage.from);
  pushToCreate();
  currentMessage = {};
  
}

/*
 *
 * █▄  █ █▀▀█ ▀█ █▀ 
 * █ █ █ █▄▄█  █▄█  
 * █  ▀█ ▀  ▀   ▀   
 *
 */

function pushToSignup() {
  hideElement("signup_label_error");
  setScreen("signup");
}

function pushToLogin() {
  var username = getText("signup_input_username");
  hideElement("login_label_error");
  setScreen("login");
  setText("login_input_username", username);
}

function pushToHome() {
  setScreen("home");
  // TODO : Automatically fetch and refresh messages upon going home
}

function pushToCreate() {
  hideElement("create_label_error");
  setScreen("create");
}

/*
 *
 * █▀▀▀ ▀█ █▀ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀ 
 * █▀▀▀  █▄█  █▀▀ █  █   █   ▀▀█ 
 * █▄▄▄   ▀   ▀▀▀ ▀  ▀   ▀   ▀▀▀ 
 *
 */

// Signup/Login
onEvent("signup_button_login",  "click", function() { pushToLogin(); });
onEvent("signup_button_signup", "click", function() { signup(); });
onEvent("login_button_signup",  "click", function() { pushToSignup(); });
onEvent("login_button_login",   "click", function() { login(); });

// Home Screen - Taskbar
onEvent("home_taskbar_refresh", "click", function() { /* TODO : Refresh Inbox */});
onEvent("home_taskbar_create",  "click", function() { pushToCreate(); });

// Home Screen - Menu
onEvent("home_menu",            "click", function() { showMenu(); });
onEvent("home_menu_settings",   "click", function() { /* TODO : Settings Menu */ });
onEvent("home_menu_signout",    "click", function() { logout(); });

// Create Screen
onEvent("create_button_send",   "click", function() { createMessage(); });
onEvent("create_back",          "click", function() { pushToHome(); });

// Message Screen
onEvent("message_button_reply", "click", function() { reply(); });
onEvent("message_back",         "click", function() { pushToHome(); });

// All of the possible words for the password
// (Credit to https://www.usingenglish.com/resources/wordcheck/list-basic+english.html)
var words = [
  "able",
  "about",
  "account",
  "acid",
  "across",
  "act",
  "addition",
  "adjustment",
  "advertisement",
  "after",
  "again",
  "against",
  "agreement",
  "air",
  "all",
  "almost",
  "among",
  "amount",
  "amusement",
  "and",
  "angle",
  "angry",
  "animal",
  "answer",
  "ant",
  "any",
  "apparatus",
  "apple",
  "approval",
  "arch",
  "argument",
  "arm",
  "army",
  "art",
  "as",
  "at",
  "attack",
  "attempt",
  "attention",
  "attraction",
  "authority",
  "automatic",
  "awake",
  "baby",
  "back",
  "bad",
  "bag",
  "balance",
  "ball",
  "band",
  "base",
  "basin",
  "basket",
  "bath",
  "be",
  "beautiful",
  "because",
  "bed",
  "bee",
  "before",
  "behaviour",
  "belief",
  "bell",
  "bent",
  "berry",
  "between",
  "bird",
  "birth",
  "bit",
  "bite",
  "bitter",
  "black",
  "blade",
  "blood",
  "blow",
  "blue",
  "board",
  "boat",
  "body",
  "boiling",
  "bone",
  "book",
  "boot",
  "bottle",
  "box",
  "boy",
  "brain",
  "brake",
  "branch",
  "brass",
  "bread",
  "breath",
  "brick",
  "bridge",
  "bright",
  "broken",
  "brother",
  "brown",
  "brush",
  "bucket",
  "building",
  "bulb",
  "burn",
  "burst",
  "business",
  "but",
  "butter",
  "button",
  "by",
  "cake",
  "camera",
  "canvas",
  "card",
  "care",
  "carriage",
  "cart",
  "cat",
  "cause",
  "certain",
  "chain",
  "chalk",
  "chance",
  "change",
  "cheap",
  "cheese",
  "chemical",
  "chest",
  "chief",
  "chin",
  "circle",
  "clean",
  "clear",
  "clock",
  "cloth",
  "cloud",
  "coal",
  "coat",
  "cold",
  "collar",
  "color",
  "comb",
  "come",
  "comfort",
  "committee",
  "common",
  "company",
  "comparison",
  "competition",
  "complete",
  "complex",
  "condition",
  "connection",
  "conscious",
  "control",
  "cook",
  "copper",
  "copy",
  "cord",
  "cork",
  "cotton",
  "cough",
  "country",
  "cover",
  "cow",
  "crack",
  "credit",
  "crush",
  "cry",
  "cup",
  "current",
  "curtain",
  "curve",
  "cushion",
  "damage",
  "danger",
  "dark",
  "daughter",
  "day",
  "dead",
  "dear",
  "death",
  "debt",
  "decision",
  "deep",
  "degree",
  "delicate",
  "dependent",
  "design",
  "desire",
  "destruction",
  "detail",
  "development",
  "different",
  "digestion",
  "direction",
  "dirty",
  "discovery",
  "discussion",
  "disease",
  "disgust",
  "distance",
  "distribution",
  "division",
  "do",
  "dog",
  "door",
  "doubt",
  "down",
  "drain",
  "drawer",
  "dress",
  "drink",
  "driving",
  "drop",
  "dry",
  "dust",
  "ear",
  "early",
  "earth",
  "east",
  "edge",
  "education",
  "effect",
  "egg",
  "elastic",
  "electric",
  "end",
  "engine",
  "enough",
  "equal",
  "error",
  "even",
  "event",
  "ever",
  "every",
  "example",
  "exchange",
  "existence",
  "expansion",
  "experience",
  "expert",
  "eye",
  "face",
  "fact",
  "fall",
  "false",
  "family",
  "far",
  "farm",
  "fat",
  "father",
  "fear",
  "feather",
  "feeble",
  "feeling",
  "female",
  "fiction",
  "field",
  "fight",
  "finger",
  "fire",
  "first",
  "fish",
  "fixed",
  "flag",
  "flame",
  "flat",
  "flight",
  "floor",
  "flower",
  "fly",
  "fold",
  "food",
  "foolish",
  "foot",
  "for",
  "force",
  "fork",
  "form",
  "forward",
  "fowl",
  "frame",
  "free",
  "frequent",
  "friend",
  "from",
  "front",
  "fruit",
  "full",
  "future",
  "garden",
  "general",
  "get",
  "girl",
  "give",
  "glass",
  "glove",
  "go",
  "goat",
  "gold",
  "good",
  "government",
  "grain",
  "grass",
  "great",
  "green",
  "grey",
  "grip",
  "group",
  "growth",
  "guide",
  "gun",
  "hair",
  "hammer",
  "hand",
  "hanging",
  "happy",
  "harbour",
  "hard",
  "harmony",
  "hat",
  "hate",
  "have",
  "he",
  "head",
  "healthy",
  "hear",
  "hearing",
  "heart",
  "heat",
  "help",
  "high",
  "history",
  "hole",
  "hollow",
  "hook",
  "hope",
  "horn",
  "horse",
  "hospital",
  "hour",
  "house",
  "how",
  "humour",
  "I",
  "ice",
  "idea",
  "if",
  "ill",
  "important",
  "impulse",
  "in",
  "increase",
  "industry",
  "ink",
  "insect",
  "instrument",
  "insurance",
  "interest",
  "invention",
  "iron",
  "island",
  "jelly",
  "jewel",
  "join",
  "journey",
  "judge",
  "jump",
  "keep",
  "kettle",
  "key",
  "kick",
  "kind",
  "king",
  "knee",
  "knife",
  "knot",
  "knowledge",
  "land",
  "language",
  "last",
  "late",
  "laugh",
  "law",
  "lead",
  "leaf",
  "learning",
  "leather",
  "left",
  "leg",
  "let",
  "letter",
  "level",
  "library",
  "lift",
  "light",
  "like",
  "limit",
  "line",
  "linen",
  "lip",
  "liquid",
  "list",
  "little",
  "living",
  "lock",
  "long",
  "look",
  "loose",
  "loss",
  "loud",
  "love",
  "low",
  "machine",
  "make",
  "male",
  "man",
  "manager",
  "map",
  "mark",
  "market",
  "married",
  "mass",
  "match",
  "material",
  "may",
  "meal",
  "measure",
  "meat",
  "medical",
  "meeting",
  "memory",
  "metal",
  "middle",
  "military",
  "milk",
  "mind",
  "mine",
  "minute",
  "mist",
  "mixed",
  "money",
  "monkey",
  "month",
  "moon",
  "morning",
  "mother",
  "motion",
  "mountain",
  "mouth",
  "move",
  "much",
  "muscle",
  "music",
  "nail",
  "name",
  "narrow",
  "nation",
  "natural",
  "near",
  "necessary",
  "neck",
  "need",
  "needle",
  "nerve",
  "net",
  "new",
  "news",
  "night",
  "no",
  "noise",
  "normal",
  "north",
  "nose",
  "not",
  "note",
  "now",
  "number",
  "nut",
  "observation",
  "of",
  "off",
  "offer",
  "office",
  "oil",
  "old",
  "on",
  "only",
  "open",
  "operation",
  "opinion",
  "opposite",
  "or",
  "orange",
  "order",
  "organization",
  "ornament",
  "other",
  "out",
  "oven",
  "over",
  "owner",
  "page",
  "pain",
  "paint",
  "paper",
  "parallel",
  "parcel",
  "part",
  "past",
  "paste",
  "payment",
  "peace",
  "pen",
  "pencil",
  "person",
  "physical",
  "picture",
  "pig",
  "pin",
  "pipe",
  "place",
  "plane",
  "plant",
  "plate",
  "play",
  "please",
  "pleasure",
  "plough",
  "pocket",
  "point",
  "poison",
  "polish",
  "poor",
  "porter",
  "position",
  "possible",
  "pot",
  "potato",
  "powder",
  "power",
  "present",
  "price",
  "print",
  "private",
  "probable",
  "process",
  "produce",
  "profit",
  "property",
  "prose",
  "protest",
  "public",
  "pull",
  "pump",
  "punishment",
  "purpose",
  "push",
  "put",
  "quality",
  "question",
  "quick",
  "quiet",
  "quite",
  "rail",
  "rain",
  "range",
  "rat",
  "rate",
  "ray",
  "reaction",
  "reading",
  "ready",
  "reason",
  "receipt",
  "record",
  "red",
  "regret",
  "regular",
  "relation",
  "representative",
  "request",
  "respect",
  "responsible",
  "rest",
  "reward",
  "rhythm",
  "rice",
  "right",
  "ring",
  "river",
  "road",
  "rod",
  "roll",
  "roof",
  "room",
  "root",
  "rough",
  "round",
  "rub",
  "rule",
  "run",
  "sad",
  "safe",
  "sail",
  "salt",
  "same",
  "sand",
  "say",
  "scale",
  "school",
  "science",
  "scissors",
  "screw",
  "sea",
  "seat",
  "second",
  "secret",
  "secretary",
  "see",
  "seed",
  "seem",
  "selection",
  "self",
  "send",
  "sense",
  "separate",
  "serious",
  "servant",
  "shade",
  "shake",
  "shame",
  "sharp",
  "sheep",
  "shelf",
  "ship",
  "shirt",
  "shock",
  "shoe",
  "short",
  "shut",
  "side",
  "sign",
  "silk",
  "silver",
  "simple",
  "sister",
  "size",
  "skin",
  "skirt",
  "sky",
  "sleep",
  "slip",
  "slope",
  "slow",
  "small",
  "smash",
  "smell",
  "smile",
  "smoke",
  "smooth",
  "snake",
  "sneeze",
  "snow",
  "so",
  "soap",
  "society",
  "sock",
  "soft",
  "solid",
  "some",
  "son",
  "song",
  "sort",
  "sound",
  "soup",
  "south",
  "space",
  "spade",
  "special",
  "sponge",
  "spoon",
  "spring",
  "square",
  "stage",
  "stamp",
  "star",
  "start",
  "statement",
  "station",
  "steam",
  "steel",
  "stem",
  "step",
  "stick",
  "sticky",
  "stiff",
  "still",
  "stitch",
  "stocking",
  "stomach",
  "stone",
  "stop",
  "store",
  "story",
  "straight",
  "strange",
  "street",
  "stretch",
  "strong",
  "structure",
  "substance",
  "such",
  "sudden",
  "sugar",
  "suggestion",
  "summer",
  "sun",
  "support",
  "surprise",
  "sweet",
  "swim",
  "system",
  "table",
  "tail",
  "take",
  "talk",
  "tall",
  "taste",
  "tax",
  "teaching",
  "tendency",
  "test",
  "than",
  "that",
  "the",
  "then",
  "theory",
  "there",
  "thick",
  "thin",
  "thing",
  "this",
  "thought",
  "thread",
  "throat",
  "through",
  "thumb",
  "thunder",
  "ticket",
  "tight",
  "till",
  "time",
  "tin",
  "tired",
  "to",
  "toe",
  "together",
  "tomorrow",
  "tongue",
  "tooth",
  "top",
  "touch",
  "town",
  "trade",
  "train",
  "transport",
  "tray",
  "tree",
  "trick",
  "trouble",
  "trousers",
  "true",
  "turn",
  "twist",
  "umbrella",
  "under",
  "unit",
  "up",
  "use",
  "value",
  "verse",
  "very",
  "vessel",
  "view",
  "voice",
  "waiting",
  "walk",
  "wall",
  "warm",
  "wash",
  "waste",
  "watch",
  "water",
  "wave",
  "wax",
  "way",
  "weather",
  "week",
  "weight",
  "well",
  "west",
  "wet",
  "wheel",
  "when",
  "where",
  "while",
  "whip",
  "whistle",
  "white",
  "who",
  "why",
  "wide",
  "will",
  "wind",
  "window",
  "wine",
  "wing",
  "winter",
  "wire",
  "wise",
  "with",
  "woman",
  "wood",
  "wool",
  "word",
  "work",
  "worm",
  "wound",
  "writing",
  "wrong",
  "year",
  "yellow",
  "yes",
  "yesterday",
  "you",
  "young",  
];
