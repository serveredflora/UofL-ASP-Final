// TODO(noah): this file is just for generating some fake content to prototype the content index
//             before setting up the database/server querying + storage. this will be removed
//             once we don't need the fake data...

// Inclusive range
export function randIntRange(min, max) {
  let diff = max - min + 1;
  return min + Math.floor(Math.random() * diff);
}

function prefixPad(str, char, targetLength) {
  let c = targetLength - str.length;
  for (let i = 0; i < c; i++) {
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

function generateFakeDate() {
  return (
    "20" +
    prefixPad(String(randIntRange(2, 23)), "0", 2) +
    "-" +
    prefixPad(String(randIntRange(1, 12)), "0", 2) +
    "-" +
    prefixPad(String(randIntRange(0, 28)), "0", 2)
  );
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
