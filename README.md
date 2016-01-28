# twitter-collection-js

The Twitter collection tool is a Node.js utility for collecting tweets filtered from the [Twitter streaming API](https://dev.twitter.com/streaming/overview).

## Requirements

After cloning the `twitter-collection-js` repository, run `npm install` to download the Node.js modules on which the Twitter collection tool depends.

## Twitter Credentials

To allow the Twitter collection tool to make an authenticated connection to the Twitter Streaming API, you need to supply your own Twitter application credentials. Twitter application credentials are a pair of consumer key and secret and a pair of access token key and secret, which you can set up using your Twitter account on the [Twitter applications page](http://apps.twitter.com) using [these instructions](https://dev.twitter.com/oauth/overview/application-owner-access-tokens "Learn how to generate application credentials at TWitter").

When you have created the credentials for your Twitter application, copy and paste the corresponding values into the `twitter-credentials.js` file:

```javascript
/*
 * You need to supply your own values for the following keys.
 * Get yours at http://apps.twitter.com
 */
module.exports = {
  consumer_key: 'YOUR CONSUMER KEY',
  consumer_secret: 'YOUR CONSUMER SECRET',
  access_token_key: 'YOUR ACCESS TOKEN KEY',
  access_token_secret: 'YOUR ACCESS TOKEN SECRET'
};
```

## Filtering Tweets

The tweets from the streaming API are filtered using the keywords and phrases in the `filter-terms.txt` file. Each keyword or phrase should be written on a new line, e.g.:

```
storm
weather
raining cats and dogs
```

These keywords and phrases are composed into a comma-separated string that is passed to the Twitter streaming API:

```
storm,weather,raining cats and dogs
```

This string has the following semantics:

```
storm OR weather OR (raining AND cats AND dogs)
```

as described in the documentation for the [track streaming endpoint](https://dev.twitter.com/streaming/overview/request-parameters#track) of the Twitter API.

## Collecting Tweets

To start collecting tweets, run `collect.js`:

```
./collect.js
```

which will output tweets on the command line. To store the tweets in a file, redirect the output of `collect.js` into a file:

```
./collect.js > collection.json
```

## Monitoring Collections

The `monitor-collection.sh` script provides a simple collection monitoring tool:

```
while true; do
  wc -l collection.json
  sleep 10s
done
```

Every 10 seconds the script outputs the current size of the collection. The size of the collection is the number of tweets, which is found by calculating the number of lines (`wc -l`) in the collection file:

```
wc -l collection.json
```

You should change `collection.json` to the name of the file into which the tweets you are collecting are being stored.

To change the frequency with which the monitor outputs the size of the collection, change the `10s` to the appropriate value for the <a href="https://en.wikipedia.org/wiki/Sleep_(Unix)">`sleep`</a> command.
