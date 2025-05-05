// Define era data
const eras = [
  { name: "Reiwa", start: 2019, kanji: "令和" },
  { name: "Heisei", start: 1989, kanji: "平成" },
  { name: "Showa", start: 1926, kanji: "昭和" },
  { name: "Taisho", start: 1912, kanji: "大正" },
  { name: "Meiji", start: 1868, kanji: "明治" }
];

// Convert Gregorian to Japanese era year
function gregorianToJapanese(year) {
  for (const era of eras) {
      if (year >= era.start) {
          return `${era.kanji} ${year - era.start + 1}`;
      }
  }
  return "Era not found";
}

// Convert Japanese era to Gregorian year
function japaneseToGregorian(eraName, eraYear) {
  const era = eras.find(e => e.name === eraName || e.kanji === eraName);
  if (era) {
      return era.start + parseInt(eraYear) - 1;
  }
  return "Invalid era";
}

// Normalize year input (convert double-byte to single-byte and validate format)
function normalizeYearInput(year) {
  const normalizedYear = year.replace(/[０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
  if (!/^\d{4}$/.test(normalizedYear)) {
    throw new Error("Year must be in the format YYYY.");
  }
  return parseInt(normalizedYear, 10);
}

// Event handling for user input
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("convert").addEventListener("click", function () {
    try {
      const inputYear = normalizeYearInput(document.getElementById("gregorian").value);
      document.getElementById("japanese").innerText = gregorianToJapanese(inputYear);
    } catch (error) {
      document.getElementById("japanese").innerText = error.message;
    }
  });

  document.getElementById("convertBack").addEventListener("click", function () {
    try {
      const eraName = document.getElementById("eraName").value;
      const eraYear = normalizeYearInput(document.getElementById("eraYear").value);
      document.getElementById("gregorianBack").innerText = japaneseToGregorian(eraName, eraYear);
    } catch (error) {
      document.getElementById("gregorianBack").innerText = error.message;
    }
  });
});