// TODO(noah): this file is just for generating some fake content to prototype the content index
//             before setting up the database/server querying + storage. this will be removed
//             once we don't need the fake data...

// Inclusive range
export function randIntRange(min, max) {
  let diff = max - min + 1;
  return min + Math.floor(Math.random() * diff);
}

function prefixPad(str, char, targetLength) {
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
  return `${date.getFullYear()}-${prefixPad(String(date.getMonth()), "0", 2)}-${prefixPad(
    String(date.getDate()),
    "0",
    2
  )}`;
}

function generateFakeDate() {
  // Source: https://stackoverflow.com/a/9035732
  var earliestDate = new Date(2020, 0, 1);
  return dateToString(
    new Date(
      earliestDate.getTime() + Math.random() * (new Date().getTime() - earliestDate.getTime())
    )
  );
}

export function dateStringInDays(str) {
  let parts = str.split("-").map((e) => Number(e));
  let date = new Date(parts[0], parts[1], parts[2]);

  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
  // Source: https://stackoverflow.com/a/2627493
  return Math.round((date - new Date(1970, 0, 1)) / ONE_DAY_IN_MS);
}

export function generateFakeDatabaseResults(amount) {
  const types = ["app", "article", "event", "video"];
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

  let results = [];
  for (let i = 0; i < amount; i++) {
    let result = {};
    result.key = i;
    result.type = types[randIntRange(0, types.length - 1)];

    result.publishDate = generateFakeDate();
    result.tags = randomExclusiveSelection(tags, randIntRange(2, 4));

    result.name = randomExclusiveSelection(nameWords, randIntRange(2, 4)).join(" ");
    result.summary = 'crazy "hot of the press" info right here!';

    result.url = "/content/";
    result.imgSrc = "https://placehold.co/150x250/DEEFEC/154752/svg";

    results.push(result);
  }

  console.log(results);
  return results;
}
