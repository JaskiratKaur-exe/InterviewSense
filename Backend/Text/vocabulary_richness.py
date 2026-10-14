import os
import re


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
# Calculate vocabulary measures
# -----------------------------
total_words = len(words)

unique_words = set(words)
unique_word_count = len(unique_words)

if total_words > 0:
    ttr = unique_word_count / total_words
else:
    ttr = 0


# -----------------------------
# Display results
# -----------------------------
print("\n========== VOCABULARY RICHNESS ==========")

print(f"Total words:              {total_words}")
print(f"Unique words:             {unique_word_count}")
print(f"Type-Token Ratio (TTR):   {ttr:.3f}")

print("\nUnique vocabulary:")

for word in sorted(unique_words):
    print(f"  {word}")

print("==========================================\n")