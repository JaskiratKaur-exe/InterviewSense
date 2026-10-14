import os
import json


# ==================================================
# FILE PATH
# ==================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

WORDS_FILE = os.path.join(
    BASE_DIR,
    "Speech",
    "word_data.json"
)


# ==================================================
# PAUSE SETTINGS
# ==================================================

# Minimum silence required to consider a new sentence
SENTENCE_PAUSE = 1.0

# A longer silence that we will classify separately
LONG_PAUSE = 2.0


# ==================================================
# LOAD WORD DATA
# ==================================================

with open(
    WORDS_FILE,
    "r",
    encoding="utf-8"
) as file:

    words = json.load(file)


if not words:
    print("❌ No word data found.")
    exit()


# ==================================================
# DISPLAY WORD DATA
# ==================================================

print("\n========================================")
print("           WORD TIMING DATA")
print("========================================")

for word in words:
    print(
        f"{word['word']:15}"
        f" {word['start']:7.2f}s"
        f" - {word['end']:7.2f}s"
        f" | confidence: {word['confidence']:.2f}"
    )


# ==================================================
# DETECT PAUSES
# ==================================================

sentences = []
current_sentence = []

pauses = []

for i in range(len(words)):

    current_word = words[i]

    current_sentence.append(
        current_word["word"]
    )

    # There is no next word
    if i == len(words) - 1:
        break

    next_word = words[i + 1]

    # Calculate silence between words
    pause = (
        next_word["start"]
        - current_word["end"]
    )

    if pause >= SENTENCE_PAUSE:

        pauses.append({
            "after_word": current_word["word"],
            "before_word": next_word["word"],
            "duration": pause
        })

        # Finish current sentence
        sentences.append(
            " ".join(current_sentence)
        )

        current_sentence = []


# Add remaining words
if current_sentence:

    sentences.append(
        " ".join(current_sentence)
    )


# ==================================================
# DISPLAY SENTENCES
# ==================================================

print("\n========================================")
print("       DETECTED SENTENCES")
print("========================================")

for i, sentence in enumerate(
    sentences,
    start=1
):

    print(f"{i}. {sentence}")


# ==================================================
# DISPLAY PAUSES
# ==================================================

print("\n========================================")
print("          DETECTED PAUSES")
print("========================================")

for pause in pauses:

    duration = pause["duration"]

    if duration >= LONG_PAUSE:
        pause_type = "LONG PAUSE"

    else:
        pause_type = "SENTENCE PAUSE"

    print(
        f"{pause['after_word']} → "
        f"{pause['before_word']} : "
        f"{duration:.2f}s "
        f"({pause_type})"
    )


# ==================================================
# PAUSE STATISTICS
# ==================================================

total_pause_time = sum(
    pause["duration"]
    for pause in pauses
)

average_pause = (
    total_pause_time / len(pauses)
    if pauses
    else 0
)

long_pause_count = sum(
    1
    for pause in pauses
    if pause["duration"] >= LONG_PAUSE
)


# ==================================================
# DISPLAY STATISTICS
# ==================================================

print("\n========================================")
print("          PAUSE STATISTICS")
print("========================================")

print(f"Total pauses:       {len(pauses)}")
print(f"Long pauses:        {long_pause_count}")
print(f"Total pause time:   {total_pause_time:.2f} seconds")
print(f"Average pause:      {average_pause:.2f} seconds")

print("\n========================================")
print("       PAUSE ANALYSIS COMPLETE")
print("========================================")