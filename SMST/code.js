/*
 * 
 * The MIT License (MIT)
 * Copyright © 2019 Justin Schaaf
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
 * █▀▀█ █▀▀█ █▀▀█ █▀▀█ █  █ █▀▀ 
 * █▄▄█ █▄▄▀ █▄▄▀ █▄▄█ █▄▄█ ▀▀█ 
 * █  █ ▀ ▀▀ ▀ ▀▀ ▀  ▀ ▄▄▄█ ▀▀▀ 
 *
 */

// The chars valid for a uuid
var uuidChars = [
  "A", 
  "a", 
  "B", 
  "b", 
  "C", 
  "c", 
  "D", 
  "d", 
  "E", 
  "e", 
  "F", 
  "f", 
  "G", 
  "g", 
  "H", 
  "h", 
  "I", 
  "i", 
  "J", 
  "j", 
  "K", 
  "k", 
  "L", 
  "l", 
  "M", 
  "m", 
  "N", 
  "n", 
  "O", 
  "o", 
  "P", 
  "p", 
  "Q", 
  "q", 
  "R", 
  "r", 
  "S", 
  "s", 
  "T", 
  "t", 
  "U", 
  "u", 
  "V", 
  "v", 
  "W", 
  "w", 
  "X", 
  "x", 
  "Y", 
  "y", 
  "Z", 
  "z", 
  "0", 
  "1", 
  "2", 
  "3", 
  "4", 
  "5", 
  "6", 
  "7", 
  "8", 
  "9"
];

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

/*
 *
 * █   █ █▀▀█ █▀▀█ █▀▀ 
 *  █ █  █▄▄█ █▄▄▀ ▀▀█ 
 *  ▀▄▀  ▀  ▀ ▀ ▀▀ ▀▀▀ 
 *
 */

// General
var lastPage = ""; // Where was the user last?

// Auth
var uuid = "";

// Posts
var currentPost = {};
var currentPostAuthor = {};
var currentPostIndex = 0;
var postViewMode = "NEW"; // Other valid type would be "SAVES", "LIKES", and "FRIENDS"
var postList = []; // Not used for "NEW"

// Settings
var toConfirm = ""; // Either DELETE_DATA or DELETE_USER

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
  var uuidLocal = generateUuid();
  var password = generatePassword();
  var exists = userExists(username);
  
  setTimeout(function() {
    console.log(exists);
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
    if (exists) {
      showElement("signup_label_error");
      setText("signup_label_error", "A user with that name already exists!");
      return;
    }
    if (username.length > 18) {
      showElement("signup_label_error");
      setText("signup_label_error", "That username is too long!");
      return;
    }
    setScreen("signup_secret");
    setText("signup_secret_label_words", password);
    var account = {
      uuid: uuidLocal,
      username: username,
      password: password
    };
    createRecord("accounts", account, function() {
      
      console.log("Account successfully created for user " + uuid);
      
      var userdata = {
        user: uuidLocal,
        saves: [],
        likes: [],
        friends: []
      };
      
      createRecord("userdata", userdata, function() {
        console.log("Userdata successfully created for user " + uuid);
      });
      
    });
    uuid = uuidLocal;
  }, 50);
  
}

// Log the user into the program
function login() {
  
  var username = getText("login_input_username");
  var password = getText("login_input_password");
  var exists = userExists(username);
  
  setTimeout(function() {
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
    /*if (!exists) {
      showElement("login_label_error");
      setText("login_label_error", "There is no user with that name!");
      return;
    }*/
    if (username.length > 18) {
      showElement("signup_label_error");
      setText("signup_label_error", "That username is too long!");
      return;
    }
    readRecords("accounts", { username: username, password: password }, function(records) {
      if (records.length >= 1) {
        var record = records[0];
        if (record.username === username && record.password === password) {
          uuid = record.uuid;
          console.log("Login successful for", username);
          pushToHome();
          return;
        } else {
          showElement("login_label_error");
          setText("login_label_error", "Wrong username or password. Please try again.");
          return;
        }
      } else {
        showElement("login_label_error");
        setText("login_label_error", "Wrong username or password. Please try again.");
        return;
      }
    });
  }, 25);
  
}

// Tasks to be executed to sign the user out
function logout() {
  pushToSignup();
  uuid = "";
  currentPost = 0;
}

// Generate a random UUID
function generateUuid() {
  var tempUuid = "0";
  while (!uuidExists(tempUuid)) {
    tempUuid = "";
    for (var i = 0; i < 64; i++) {
      tempUuid += uuidChars[randomNumber(0, uuidChars.length - 1)];
    }
    if (!uuidExists(tempUuid)) break;
  }
  return tempUuid;
}

// Generate a random password
function generatePassword() {
  var secret = "";
  for (var i = 0; i < 5; i++) {
    secret += words[randomNumber(0, words.length - 1)];
    if (i != 4) {
      secret += " ";
    }
  }
  /*readRecords("accounts", { password: secret }, function(records) {
    if (records > 0) return generatePassword();
    else return secret;
  });*/
  return secret;
  
}

// Check if a user exists by username
function userExists(username) {
  readRecords("accounts", { username: username }, function(records) {
    if (records.length > 0) {
      return true;
    } else {
      return false;
    }
  });
}

// Check if a uuid is already taken
function uuidExists(tempUuid) {
  readRecords("accounts", { uuid: tempUuid }, function(records) {
    if (records.length > 0) {
      return true;
    } else {
      return false;
    }
  });
}

/*
 *
 * █▀▀█ █▀▀█ █▀▀ ▀▀█▀▀ █▀▀ 
 * █▄▄█ █  █ ▀▀█   █   ▀▀█ 
 * █    ▀▀▀▀ ▀▀▀   ▀   ▀▀▀ 
 *
 */

// Create a post and add it to the database
function createPost() {
  var title = getText("post_create_title");
  var content = getText("post_create_content");
  var post = {
    postid: generateUuid(),
    author: uuid,
    title: title,
    content: content,
    likes: 0,
    saves: 0
  };
  createRecord("posts", post, function() {
    console.log("Post created!");
    pushToHome();
  });
}

// Start the post scroll
function postScroll(mode) {
  
  postViewMode = mode;
  
  if (postViewMode == "NEW") {
    
    readRecords("posts", {}, function(records) {
      
      if (records.length == 0) return;
      currentPostIndex = records.length;
      getPost(currentPostIndex);
      setScreen("post");
      
    });
    
  } else if (postViewMode == "LIKES" || postViewMode == "SAVES") {
    
    readRecords("userdata", { uuid: uuid }, function(records) {
      
      var userdata = records[0];
      
      if (postViewMode == "LIKES") postList = userdata.likes;
      else postList = userdata.saves;
      
      if (postList.length == 0) return;
      
      currentPostIndex = 0;
      getPostUuid(postList[currentPostIndex]);
      setScreen("post");
      
    });
    
  }
  
}

function nextPost() {
  
  if (postViewMode == "NEW") {
      
    currentPostIndex--;
    
    if (currentPostIndex >= 1) {
      
      getPost(currentPostIndex);
      setScreen("post");
      
    } else pushToHome();
    
  } else if (postViewMode == "LIKES" || postViewMode == "SAVES") {
      
    currentPostIndex++;
    
    if (currentPostIndex < postList.length) {
      
      getPostUuid(postList[currentPostIndex]);
      setScreen("post");
      
    } else pushToHome();
    
  }
  
}

// Get a post with the given post uuid (Use for "SAVES" mode)
function getPostUuid(uuid) {
  
  readRecords("posts", { postid: uuid }, function(records) {
    getPost(records[0].id);
  });
  
}

// Get a post with the given index
function getPost(index) {
  
  readRecords("posts", { id: index }, function(postRecords) {
    
    var post = postRecords[0];
    readRecords("accounts", { uuid: post.author }, function(authorRecords) {
      var author = authorRecords[0];
      currentPost = post;
      currentPostAuthor = author;
      readPost();
    });
    
  });
  
}

// Set the post view values
function readPost() {
  
  setText("post_user_name", currentPostAuthor.username);
  setProperty("post_user_avatar", "image", currentPostAuthor.avatar);
  
  setText("post_label_title", currentPost.title);
  setText("post_content", currentPost.content);
  setText("post_like_amount", currentPost.likes);
  setText("post_save_amount", currentPost.saves);
  
  setProperty("post_like", "icon-color", "#dddddd");
  setProperty("post_like_amount", "text-color", "#dddddd");
  
  setProperty("post_save", "icon-color", "#dddddd");
  setProperty("post_save_amount", "text-color", "#dddddd");
  
  readRecords("userdata", { user: uuid }, function(records) {
    
    var userdata = records[0];
    
    if (contains(userdata.likes, currentPost.postid)) {
      setProperty("post_like", "icon-color", "#ffdddd");
      setProperty("post_like_amount", "text-color", "#ffdddd");
    }
    
    if (contains(userdata.saves, currentPost.postid)) {
      setProperty("post_like", "icon-color", "#ddffdd");
      setProperty("post_like_amount", "text-color", "#ddffdd");
    }
    
  });
  
}

// Toggle a like for the post
function likePost() {
  
  readRecords("userdata", { user: uuid }, function(records) {
    
    var userdata = records[0];
    
    if (contains(userdata.likes, currentPost.postid)) {
      currentPost.likes--;
      removeItem(userdata.likes, getItemIndex(userdata.likes, currentPost.postid));
    } else {
      currentPost.likes++;
      appendItem(userdata.likes, currentPost.postid);
      //userdata.likes[userdata.likes.length] = currentPost.postid;
    }
    
    updateRecord("userdata", userdata, function() {
      updateRecord("posts", currentPost, function(record) {
        readPost();
      });
    });
    
  });
  
}
// Toggle a save for the post
function savePost() {
  
  readRecords("userdata", { user: uuid }, function(records) {
    
    var userdata = records[0];
    
    if (contains(userdata.saves, currentPost.postid)) {
      currentPost.saves--;
      removeItem(userdata.saves, getItemIndex(userdata.saves, currentPost.postid));
    } else {
      currentPost.saves++;
      appendItem(userdata.saves, currentPost.postid);
    }
    
    updateRecord("userdata", userdata, function() {
      updateRecord("posts", currentPost, function(record) {
        readPost();
      });
    });
    
  });
  
}

/*
 *
 * █▀▀▀█ █▀▀ ▀▀█▀▀ ▀▀█▀▀  ▀  █▀▀▄ █▀▀▀ █▀▀ 
 * ▀▀▀▄▄ █▀▀   █     █   ▀█▀ █  █ █ ▀█ ▀▀█ 
 * █▄▄▄█ ▀▀▀   ▀     ▀   ▀▀▀ ▀  ▀ ▀▀▀▀ ▀▀▀ 
 *
 */

function askConfirm(task) {
  toConfirm = task;
  showElement("settings_button_confirm");
}

function confirm() {
  
  hideElement("settings_button_confirm");
  if (toConfirm == "DELETE_USER") deleteAccount();
  else if (toConfirm == "DELETE_DATA") deleteData();
  
}

function deleteAccount() {
  
  deleteRecord("accounts", { uuid: uuid }, function() {
    deleteRecord("posts", { author: uuid }, function() {
      deleteRecord("userdata", { user: uuid }, function() {
        // Goodbye Cruel World!
        logout();
      });
    });
  });
  
}

function deleteData() {
  
  deleteRecord("posts", { author: uuid }, function() {
    deleteRecord("userdata", { user: uuid }, function() {
      
      // Only deletes userdata and posts
      
      // Recreate userdata
      var userdata = {
        user: uuid,
        saves: [],
        likes: [],
        friends: []
      };
      
      createRecord("userdata", userdata, function() {
        console.log("Userdata successfully recreated for user " + uuid);
      });
      
    });
  });
  
}

function updateSettings() {
  readRecords("accounts", { uuid: uuid }, function(records) {
    
    var user = records[0];
    user.avatar = getText("settings_input_avatar");
    
    updateRecord("accounts", user, function() {
      console.log("Successfully updated settings!");
    });
    
  });
}

/*
 *
 * █▄  █ █▀▀█ ▀█ █▀ 
 * █ █ █ █▄▄█  █▄█  
 * █  ▀█ ▀  ▀   ▀   
 *
 */

function back() {
  if (lastPage == "") {
    pushToHome();
  } else {
    setScreen(lastPage);
  }
}

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
  setScreen("post_create");
}

function pushToSettings() {
  readRecords("mytable", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      textLabel('id', records[i].id + ': ' + records[i].name);
    }
  });
  
  setScreen("settings");
  
}

/*
 *
 * █▀▀▀ ▀█ █▀ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀ 
 * █▀▀▀  █▄█  █▀▀ █  █   █   ▀▀█ 
 * █▄▄▄   ▀   ▀▀▀ ▀  ▀   ▀   ▀▀▀ 
 *
 */

// Signup/Login
onEvent("signup_button_login",            "click", function() { pushToLogin(); });
onEvent("signup_button_signup",           "click", function() { signup(); });
onEvent("login_button_signup",            "click", function() { pushToSignup(); });
onEvent("login_button_login",             "click", function() { login(); });
onEvent("signup_secret_button_continue",  "click", function() { pushToHome(); });

// Posts
onEvent("post_create_button_create",      "click", function() { createPost(); });
onEvent("post_like",                      "click", function() { likePost(); });
onEvent("post_save",                      "click", function() { savePost(); });
onEvent("post_button_next",               "click", function() { nextPost(); });

// Home
onEvent("home_view_new",                  "click", function() { postScroll("NEW"); });
onEvent("home_view_likes",                "click", function() { postScroll("LIKES"); });
onEvent("home_view_saves",                "click", function() { postScroll("SAVES"); });
onEvent("home_view_friends",              "click", function() { postScroll("FRIENDS"); });

// Footer
onEvent("home_footer_home",               "click", function() { pushToHome(); });
onEvent("post_footer_home",               "click", function() { pushToHome(); });
onEvent("post_create_footer_home",        "click", function() { pushToHome(); });
onEvent("settings_footer_home",           "click", function() { pushToHome(); });

onEvent("home_footer_new",                "click", function() { pushToCreate(); });
onEvent("post_footer_new",                "click", function() { pushToCreate(); });
onEvent("post_create_footer_new",         "click", function() { pushToCreate(); });
onEvent("settings_footer_new",            "click", function() { pushToCreate(); });

onEvent("home_footer_settings",           "click", function() { pushToSettings(); });
onEvent("post_footer_settings",           "click", function() { pushToSettings(); });
onEvent("post_create_footer_settings",    "click", function() { pushToSettings(); });
onEvent("settings_footer_settings",       "click", function() { pushToSettings(); });

// Settings
onEvent("settings_button_confirm",        "click", function() { confirm(); });
onEvent("settings_button_signout",        "click", function() { logout(); });
onEvent("settings_button_save",           "click", function() { updateSettings(); });
onEvent("settings_button_delete_data",    "click", function() { askConfirm("DELETE_DATA"); });
onEvent("settings_button_delete_account", "click", function() { askConfirm("DELETE_USER"); });

// Back Buttons
onEvent("settings_header_back",           "click", function() { back(); });
onEvent("post_header_back",               "click", function() { back(); });
onEvent("post_create_header_back",        "click", function() { back(); });

/*
 *
 * █  █ ▀▀█▀▀  ▀  █   
 * █  █   █   ▀█▀ █   
 * ▀▄▄▀   ▀   ▀▀▀ ▀▀▀ 
 *
 */

function getItemIndex(list, item) {
  
  var index = 0;
  
  for (var i = 0; i < list.length; i++) {
    if (list[i] == item) index = i;
  }
  
  return index;
  
}

function contains(list, item) {
  
  var contained = false;
  
  for (var i = 0; i < list.length; i++) {
    if (list[i] == item) contained = true;
  }
  
  return contained;
  
}

/*
 *
 * █▀▀▀  ▀  █▀▀▄ 
 * █▀▀▀ ▀█▀ █  █ 
 * █    ▀▀▀ ▀  ▀ ▀
 *
 */