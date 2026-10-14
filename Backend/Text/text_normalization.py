import re
from pathlib import Path

# File locations
BASE_DIR = Path(__file__).resolve().parent.parent
TRANSCRIPT_FILE = BASE_DIR / "Speech" / "transcript.txt"
NORMALIZED_FILE = BASE_DIR / "Speech" / "normalized_transcript.txt"


# Common ASR errors for technical terms
ASR_CORRECTIONS = {
    ("n", "p"): "nlp",
    ("a", "p", "i"): "api",
    ("m", "l"): "ml",
    ("a", "i"): "ai"
}


def normalize_text(text):
    # Convert everything to lowercase
    text = text.lower()

    # Keep words and contractions such as "i'm"
    words = re.findall(r"[a-z]+(?:'[a-z]+)?", text)

    normalized_words = []
    i = 0
    replacements = 0

    while i < len(words):
        matched = False

        # Check technical terms
        for pattern, replacement in ASR_CORRECTIONS.items():
            length = len(pattern)

            if tuple(words[i:i + length]) == pattern:
                normalized_words.append(replacement)
                i += length
                replacements += 1
                matched = True
                break

        if not matched:
            normalized_words.append(words[i])
            i += 1

    return " ".join(normalized_words), replacements


# Read transcript
if not TRANSCRIPT_FILE.exists():
    print("Transcript file not found.")
    exit()

with open(TRANSCRIPT_FILE, "r", encoding="utf-8") as file:
    transcript = file.read().strip()


# Normalize
normalized_text, replacements = normalize_text(transcript)


# Save normalized transcript
with open(NORMALIZED_FILE, "w", encoding="utf-8") as file:
    file.write(normalized_text)


print("\n========== TEXT NORMALIZATION ==========")
print("\nOriginal transcript:")
print(transcript)

print("\nNormalized transcript:")
print(normalized_text)

print(f"\nTechnical term replacements: {replacements}")
print(f"Saved to: {NORMALIZED_FILE}")
print("========================================")