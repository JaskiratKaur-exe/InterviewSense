import os
import re
from collections import Counter


# -----------------------------
# File path
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRANSCRIPT_FILE = os.path.join(BASE_DIR, "Speech", "transcript.txt")


# -----------------------------
# Filler words
# -----------------------------
FILLER_WORDS = {
    "um",
    "umm",
    "uh",
    "uhh",
    "hmm",
    "hm",
    "er",
    "err",
    "basically",
    "actually",
    "literally",
    "like"
}


# -----------------------------
# Read transcript
# -----------------------------
with open(TRANSCRIPT_FILE, "r", encoding="utf-8") as file:
    transcript = file.read().lower()


# -----------------------------
# Tokenize words
# -----------------------------
words = re.findall(r"\b[a-z]+\b", transcript)


# -----------------------------
# Detect fillers
# -----------------------------
filler_counts = Counter(
    word for word in words
    if word in FILLER_WORDS
)


total_fillers = sum(filler_counts.values())
total_words = len(words)


# -----------------------------
# Calculate filler rate
# -----------------------------
if total_words > 0:
    filler_rate = (total_fillers / total_words) * 100
else:
    filler_rate = 0


# -----------------------------
# Display results
# -----------------------------
print("\n========== FILLER WORD ANALYSIS ==========")

print(f"Total words:       {total_words}")
print(f"Total fillers:     {total_fillers}")
print(f"Filler rate:       {filler_rate:.2f}%")

print("\nFiller word counts:")

if filler_counts:
    for filler, count in filler_counts.most_common():
        print(f"  {filler}: {count}")
else:
    print("  No obvious filler words detected.")

print("==========================================\n")