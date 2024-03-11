const fs = require("fs");

// This used to be client-side, now this is generated once as a JSON file before
// running the server so the data is deterministic (instead of changing per page load).

// Inclusive range
function randIntRange(min, max) {
  let diff = max - min + 1;
  return min + Math.floor(Math.random() * diff);
}

function prefixPadString(str, char, targetLength) {
  for (let i = str.length; i < targetLength; i++) {
    str = char + str;
  }

  return str;
}

// Selects a given amount of elements randomly from the array (exclusive, no repeats)
function randomExclusiveSelection(arr, count) {
  if (arr.length < count) {
    throw new Error("Count exceeds array size, repeats will occur...");
  }

  let results = [];
  let remaining = [...arr];
  for (let i = 0; i < count; i++) {
    let index = randIntRange(0, remaining.length - 1);
    results.push(remaining[index]);
    remaining.splice(index, 1);
  }

  return results;
}

// Format a date to a string (YYYY-MM-DD) with zero padding to remain consistent
function dateToString(date) {
  return `${date.getFullYear()}-${prefixPadString(String(date.getMonth() + 1), "0", 2)}-${prefixPadString(String(date.getDate()), "0", 2)}`;
}

// Randomly generates a date between the fixed "earliest date" and today
function generateFakeDate() {
  // Source: https://stackoverflow.com/a/9035732
  var earliestDate = new Date(2020, 0, 1);
  return new Date(earliestDate.getTime() + Math.random() * (new Date().getTime() - earliestDate.getTime()));
}

function generateFakeDateString() {
  return dateToString(generateFakeDate());
}

function dateStringInDays(str) {
  let parts = str.split("-").map((e) => Number(e));
  let date = new Date(parts[0], parts[1], parts[2]);

  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
  // Source: https://stackoverflow.com/a/2627493
  // Uses unix epoch date as day 0
  return Math.round((date - new Date(1970, 0, 1)) / ONE_DAY_IN_MS);
}

function pickRandomInArray(arr) {
  return arr[randIntRange(0, arr.length - 1)];
}

function generateFakeContent(amount) {
  const contentTypes = ["app", "article", "event", "video"];

  // Fake tags that are randomly selected
  const tags = [
    "informative",
    "research",
    "documentary",
    "guide",
    "free",
    "subscription",
    "one-time",
    "online",
    "in-person",
    "recommended",
    "educational",
    "experiment",
    "lifestyle",
    "advice",
  ];
  // Used to generate fake titles by stringing some elements randomly together
  const nameWords = [
    "health",
    "energy",
    "eco",
    "friendly",
    "easy",
    "green",
    "clean",
    "wild",
    "crazy",
    "effective",
    "commute",
    "transport",
    "environment",
    "community",
    "reuse",
    "recycle",
    "wonderful",
    "quick",
    "powerful",
    "remedy",
    "impact",
  ];

  const language = ["english", "spanish", "mandarin", "french", "german", "italian"];

  let results = [];
  for (let i = 0; i < amount; i++) {
    let result = {};

    result.type = pickRandomInArray(contentTypes);

    result.languages = randomExclusiveSelection(language, randIntRange(1, 4)).join(",");

    result.title = randomExclusiveSelection(nameWords, randIntRange(2, 4)).join(" ");
    result.description = 'crazy "hot of the press" info right here!'; // brief info about the content

    // result.url = "/"; // link to content which exists externally. for now, just the homepage...
    result.image_path = "https://placehold.co/300x150/DEEFEC/154752/svg"; // cover image

    // Assign to random seed users
    result.user_id = randIntRange(1, 5);
    result.approved = randIntRange(0, 1) == 1;

    // Add additional meta-data based on content type
    switch (result.type) {
      case "app":
        const appPlatforms = ["android", "ios", "web"];
        const appPricingModels = ["free", "one_time_fee", "subscription"];

        result.app_platforms = randomExclusiveSelection(appPlatforms, randIntRange(1, 3)).join(",");
        result.app_pricing_model = pickRandomInArray(appPricingModels);
        result.price = result.app_pricing_model != "free" ? randIntRange(1, 4) + 0.99 : 0.0;
        break;

      case "article":
        const articlePublisherType = ["personal", "media", "non_profit", "government"];

        result.article_publisher_type = pickRandomInArray(articlePublisherType);
        result.article_reading_time = randIntRange(2, 25);
        break;

      case "event":
        const eventFormat = ["online_only", "hybrid", "in_person"];
        const eventTypes = ["volunteering", "educational", "networking"];

        let startDate = generateFakeDate();
        let endDate = new Date(startDate);
        let durationInDays = randIntRange(1, 7);
        endDate.setDate(endDate.getDate() + durationInDays - 1);

        result.event_start_date = dateToString(startDate);
        result.event_end_date = dateToString(endDate);
        result.event_duration = durationInDays;
        result.event_format = pickRandomInArray(eventFormat);
        result.event_type = pickRandomInArray(eventTypes);
        result.price = randIntRange(0, 2) == 0 ? randIntRange(5, 100) + 0.99 : 0;
        result.event_participant_limit = result.event_type != "online-only" ? randIntRange(10, 3000) : -1;
        break;

      case "video":
        const videoPlatforms = ["youtube", "netflix", "amazon_prime", "apple_tv", "tiktok", "instagram"];
        const videoTypes = ["documentary", "informational", "guide"];

        result.video_platforms = randomExclusiveSelection(videoPlatforms, randIntRange(1, 3)).join(",");
        result.video_types = randomExclusiveSelection(videoTypes, randIntRange(1, 2)).join(",");
        break;
    }
  }

  return results;
}

// Generate and save the fake content to a JSON file (so that we can all seed the database
// with the same content)
let fakeContent = generateFakeContent(randIntRange(120, 240));
fs.writeFileSync("./fake_content.json", JSON.stringify(fakeContent), "utf-8");
