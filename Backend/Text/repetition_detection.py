import os
import re
from collections import Counter


# -----------------------------
# File path
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRANSCRIPT_FILE = os.path.join(BASE_DIR, "Speech", "transcript.txt")


# -----------------------------
# Read transcript
# -----------------------------
with open(TRANSCRIPT_FILE, "r", encoding="utf-8") as file:
    transcript = file.read().lower()


# -----------------------------
# Tokenize words
# Keep contractions together
# -----------------------------
words = re.findall(r"[a-z]+(?:'[a-z]+)?", transcript)


# -----------------------------
# Detect consecutive repetitions
# -----------------------------
repetition_counts = Counter()

i = 0

while i < len(words) - 1:

    if words[i] == words[i + 1]:

        repeated_word = words[i]
        count = 2

        # Count additional consecutive occurrences
        j = i + 2

        while j < len(words) and words[j] == repeated_word:
            count += 1
            j += 1

        repetition_counts[repeated_word] = count

        i = j

    else:
        i += 1


# -----------------------------
# Calculate metrics
# -----------------------------
total_repeated_words = sum(
    count for count in repetition_counts.values()
)

repetition_events = len(repetition_counts)

if len(words) > 0:
    repetition_rate = (
        total_repeated_words / len(words)
    ) * 100
else:
    repetition_rate = 0


# -----------------------------
# Display results
# -----------------------------
print("\n========== REPETITION ANALYSIS ==========")

print(f"Total words:              {len(words)}")
print(f"Repeated words:           {total_repeated_words}")
print(f"Repetition events:        {repetition_events}")
print(f"Repetition rate:          {repetition_rate:.2f}%")

print("\nRepeated words:")

if repetition_counts:

    for word, count in repetition_counts.items():
        print(f"  {word}: {count} occurrences")

else:
    print("  No consecutive repetitions detected.")

print("==========================================\n")