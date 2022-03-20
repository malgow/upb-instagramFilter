/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// Spark AR Studio extension for VS Code - https://fb.me/spark-vscode-plugin
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Patches = require('Patches');
const Time = require('Time');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');

var politeWords = ["u r amazing", "wow", "u rock", "dont give up!","i believe in u", "u got this","ily <3","im so proud of u", "u r needed", "u r so talented!","u deserve the world","im grateful ur alive","u bring me happiness","u matter", "u r wonderful","keep it up!","ur doing amazing", "ur doing so well","mwuah","lookin good!","look after yourself","u make me blush","u give me butterflies","u deserve a break :)","ur doing great!","everything will work out","itll be fine","u r so strong!", "u r enough","u look cute", "u look nice today","u cute","nice outfit","i like ur vibes","ur a genius","u r special to me","u r incredible","u make my days exciting","ur my comfort person","ur so hot","i wish u the best","hope the day treats u well!"];
var unpoliteWords = ["u suck", "u smell like poo", "ew", "u smell", "u stink", "no one likes u","i forgot u exist","i hate u","what is that","turn off the camera pls","u disappoint me","u drain me","i dislike being around u","u make me miserable","suffering is living as u","what happened to u?","u r so sad","so thankful im not u","u have no purpose","u make me mad","u messed up? again?","im so tired of u","tired of pretending i like u","u r an utter failure","u bore me","i dont like u very much","frick u","is that it?","atleast im not u","u dont deserve love","ur kinda ugly","u r a waste of space","u bring me pain","agony is knowing u","AHHHH","WHAT IS THAT","r u one of the fnaf robots","u belong in a horror movie","what are u wearing??","this aint it","*vomits at the sight of u","what dog breed r u","ur forehead is huge","ur voice irritates me","u drive me insane"];
var hasTapped = new Boolean(false);

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

(async function () {  // Enables async/await in JS [part 1]
  const timeInMilliseconds = 100;
  const allQuotes = politeWords.concat(unpoliteWords);

  const [text, description] = await Promise.all([
    Scene.root.findFirst("botText"),
    Scene.root.findFirst("description")
  ]);

  if(hasTapped == false) text.text = "tap to start...";

  function requestQuote() {
    hasTapped = true;
    Diagnostics.log(allQuotes[Math.floor(Math.random() * allQuotes.length)]);
    text.text = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  }

  function rollQuotes() {
    const intervalTimer = Time.setInterval(requestQuote, timeInMilliseconds);
    const timeoutTimer = Time.setTimeout(stopIntervalTimer, timeInMilliseconds * 20);
    function stopIntervalTimer() {
      Time.clearInterval(intervalTimer);
    }
  }

  TouchGestures.onTap().subscribeWithSnapshot({
  }, function (gesture, snapshot) {

    //requestQuote();
    if(hasTapped == false) rollQuotes();
    description.outputVisibility.forPreviewOutput = false;
  });



})(); // Enables async/await in JS [part 2]
