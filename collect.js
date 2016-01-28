#!/usr/bin/env node

var fs = require("fs");
var _ = require("underscore");
var Twitter = require("twitter");
var twitterCredentials = require("./twitter-credentials.js");
var client = new Twitter(twitterCredentials);
var filterTermsFilename = "filter-terms.txt";

function track(filterTerms) {
  var filterTermsString = filterTerms.join(",");
  client.stream("statuses/filter", {
    track: filterTermsString
  }, function(stream) {
    stream.on("data", function(tweet) {
      if (tweet.user) {
        console.log(JSON.stringify(tweet));
      }
    });
    stream.on("error", function(error) {
      throw error;
    });
  });
}

function readFilterTerms(filterTermsFilename) {
  var filterTerms = fs.readFileSync(filterTermsFilename).toString().split("\n");
  filterTerms = filterTerms.filter(function(filterTerm) {
    return filterTerm.length > 0;
  });
  return _.uniq(filterTerms);
}

function collectTweets() {
  var filterTerms = readFilterTerms(filterTermsFilename);
  if (filterTerms.length > 0) {
    track(filterTerms);
  } else {
    console.log(filterTermsFilename + " must contain at least one keyword");
  }
}

collectTweets();
