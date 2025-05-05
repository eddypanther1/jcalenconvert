// Define era data
const eras = [
  { name: "Reiwa", start: 2019, kanji: "令和" },
  { name: "Heisei", start: 1989, kanji: "平成" },
  { name: "Showa", start: 1926, kanji: "昭和" },
  { name: "Taisho", start: 1912, kanji: "大正" },
  { name: "Meiji", start: 1868, kanji: "明治" }
];

// Normalize year input (convert double-byte to single-byte and validate format)
function normalizeYearInput(year, format = "yyyy") {
  const normalizedYear = year.replace(/[０-９]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
  const regex = format === "yyyy" ? /^\d{4}$/ : /^\d{2}$/;
  if (!regex.test(normalizedYear)) {
    throw new Error(format === "yyyy" ? "Year must be in the format YYYY." : "Year must be in the format YY.");
  }
  return parseInt(normalizedYear, 10);
}

// Convert Gregorian to Japanese era year
function gregorianToJapanese(year) {
  for (const era of eras) {
    if (year >= era.start) {
      const eraYear = year - era.start + 1;
      return `${era.kanji} ${eraYear} (${era.name} ${eraYear})`;
    }
  }
  return "Era not found";
}

// Convert Japanese era to Gregorian year
function japaneseToGregorian(eraName, eraYear) {
  const era = eras.find(e => e.kanji === eraName);
  if (era) {
    return era.start + parseInt(eraYear) - 1;
  }
  return "Invalid era";
}

// Event handling for user input
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("convert").addEventListener("click", function () {
    try {
      const inputYear = normalizeYearInput(document.getElementById("gregorian").value);
      const result = gregorianToJapanese(inputYear);
      document.getElementById("japaneseOutput").value = result;
      document.getElementById("errorMessage").innerText = ""; // Clear error message
    } catch (error) {
      document.getElementById("errorMessage").innerText = error.message;
    }
  });

  document.getElementById("convertBack").addEventListener("click", function () {
    try {
      const eraName = document.getElementById("eraName").value;
      const eraYear = normalizeYearInput(document.getElementById("eraYear").value, "yy");
      const result = japaneseToGregorian(eraName, eraYear);
      document.getElementById("gregorianOutput").value = result;
      document.getElementById("errorMessage").innerText = ""; // Clear error message
    } catch (error) {
      document.getElementById("errorMessage").innerText = error.message;
    }
  });
});