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

function randomExclusiveSelection(arr, count) {
  let results = [];
  let remaining = [...arr];
  for (let i = 0; i < count; i++) {
    let index = randIntRange(0, remaining.length - 1);
    results.push(remaining[index]);
    remaining.splice(index, 1);
  }

  return results;
}

function dateToString(date) {
  return `${date.getFullYear()}-${prefixPadString(
    String(date.getMonth() + 1),
    "0",
    2
  )}-${prefixPadString(String(date.getDate()), "0", 2)}`;
}

function generateFakeDate() {
  // Source: https://stackoverflow.com/a/9035732
  var earliestDate = new Date(2020, 0, 1);
  return new Date(
    earliestDate.getTime() + Math.random() * (new Date().getTime() - earliestDate.getTime())
  );
}

function generateFakeDateString() {
  return dateToString(generateFakeDate());
}

function dateStringInDays(str) {
  let parts = str.split("-").map((e) => Number(e));
  let date = new Date(parts[0], parts[1], parts[2]);

  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
  // Source: https://stackoverflow.com/a/2627493
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
    result.id = i;
    result.type = pickRandomInArray(contentTypes);

    result.language = randomExclusiveSelection(language, randIntRange(1, 4));

    result.publishDate = generateFakeDateString(); // when the content was added to the DB
    result.tags = randomExclusiveSelection(tags, randIntRange(2, 4)); // tags for filtering

    result.name = randomExclusiveSelection(nameWords, randIntRange(2, 4)).join(" ");
    result.summary = 'crazy "hot of the press" info right here!'; // brief info about the content

    result.url = "/"; // link to content externally, for now just the homepage...
    result.imgSrc = "https://placehold.co/300x150/DEEFEC/154752/svg"; // cover image

    // holds unique data depending on content type
    result.typeData = {};
    switch (result.type) {
      case "app":
        const appPlatforms = ["android", "ios", "web"];
        const appPricingModels = ["free", "one_time_fee", "subscription"];

        result.typeData.platform = randomExclusiveSelection(appPlatforms, randIntRange(1, 3));
        result.typeData.pricingModel = pickRandomInArray(appPricingModels);
        result.typeData.price =
          result.typeData.pricingModel != "free" ? randIntRange(1, 4) + 0.99 : 0.0;
        break;

      case "article":
        const articlePublisherType = ["personal", "media", "non_profit", "government"];

        result.typeData.publisherType = pickRandomInArray(articlePublisherType);
        result.typeData.readingTimeInMinutes = randIntRange(2, 25);
        break;

      case "event":
        // TODO(noah): find what sort of location info we need to provide to be able to include a Google Maps/Open Street Maps link/embed
        // TODO(noah): also need info to allow for user-defined distance filtering (eg. <50km within selected location)
        const eventLocations = [
          { countryCode: "gb", city: "London", address: "", lat: -1, lon: -1 },
        ];
        const eventFormat = ["online_only", "hybrid", "in_person"];
        const eventTypes = ["volunteering", "educational", "networking"];

        let startDate = generateFakeDate();
        let endDate = new Date(startDate);
        let durationInDays = randIntRange(1, 7);
        endDate.setDate(endDate.getDate() + durationInDays - 1);

        result.typeData.startDate = dateToString(startDate);
        result.typeData.endDate = dateToString(endDate);
        result.typeData.durationInDays = durationInDays;
        result.typeData.format = pickRandomInArray(eventFormat);
        result.typeData.type = pickRandomInArray(eventTypes);
        result.typeData.price = randIntRange(0, 2) == 0 ? randIntRange(5, 100) : 0;
        result.typeData.participantLimit =
          result.typeData.eventType != "online-only" ? randIntRange(10, 3000) : -1;
        result.typeData.location =
          result.typeData.eventType != "online-only" ? pickRandomInArray(eventLocations) : null;
        break;

      case "video":
        const videoPlatforms = [
          "youtube",
          "netflix",
          "amazon prime",
          "apple tv",
          "tiktok",
          "instagram",
        ];
        const videoTypes = ["documentary", "informational", "guide"];
        const videoPricingModels = ["free", "purchase", "rental", "subscription"];

        result.typeData.platform = randomExclusiveSelection(videoPlatforms, randIntRange(1, 3));
        result.typeData.type = randomExclusiveSelection(videoTypes, randIntRange(1, 2));
        result.typeData.pricingModel = pickRandomInArray(videoPricingModels);
        result.typeData.episodeCount = randIntRange(1, 25);
        result.typeData.episodeWatchTime = randIntRange(1, 150);
        break;
    }

    results.push(result);
  }

  // Preview content (since not all info is presented via UI)
  // console.log(results);
  return results;
}

let fakeContent = generateFakeContent(randIntRange(120, 240));

fs.writeFileSync("./fake_content.json", JSON.stringify(fakeContent), "utf-8");
