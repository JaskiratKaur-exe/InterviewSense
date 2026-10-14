import re
import nltk
from nltk.stem import WordNetLemmatizer

# --------------------------------------------------
# QUESTION + EXPECTED KEYWORDS
# --------------------------------------------------

QUESTION = "What is machine learning?"

EXPECTED_KEYWORDS = {
    "machine",
    "learning",
    "data",
    "algorithm",
    "model",
    "prediction",
    "training"
}

# --------------------------------------------------
# READ NORMALIZED TRANSCRIPT
# --------------------------------------------------

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
TRANSCRIPT_FILE = BASE_DIR / "Speech" / "normalized_transcript.txt"

with open(TRANSCRIPT_FILE, "r", encoding="utf-8") as file:
    transcript = file.read().lower()

# --------------------------------------------------
# TOKENIZATION
# --------------------------------------------------

words = re.findall(r"[a-z]+(?:'[a-z]+)?", transcript)

# --------------------------------------------------
# LEMMATIZATION
# --------------------------------------------------

lemmatizer = WordNetLemmatizer()

lemmatized_words = [
    lemmatizer.lemmatize(word)
    for word in words
]

lemmatized_keywords = {
    lemmatizer.lemmatize(keyword)
    for keyword in EXPECTED_KEYWORDS
}

# --------------------------------------------------
# KEYWORD MATCHING
# --------------------------------------------------

word_set = set(lemmatized_words)

matched_keywords = sorted(
    keyword
    for keyword in EXPECTED_KEYWORDS
    if lemmatizer.lemmatize(keyword) in word_set
)

missing_keywords = sorted(
    keyword
    for keyword in EXPECTED_KEYWORDS
    if lemmatizer.lemmatize(keyword) not in word_set
)

if EXPECTED_KEYWORDS:
    coverage = (
        len(matched_keywords) /
        len(EXPECTED_KEYWORDS)
    ) * 100
else:
    coverage = 0

# --------------------------------------------------
# DISPLAY
# --------------------------------------------------

print("\n========== KEYWORD RELEVANCE ==========")

print(f"Expected keywords: {len(EXPECTED_KEYWORDS)}")
print(f"Matched keywords: {len(matched_keywords)}")
print(f"Keyword coverage: {coverage:.2f}%")

print("\nMatched:")
for keyword in matched_keywords:
    print(f"  {keyword}")

print("\nMissing:")
for keyword in missing_keywords:
    print(f"  {keyword}")

print("========================================")