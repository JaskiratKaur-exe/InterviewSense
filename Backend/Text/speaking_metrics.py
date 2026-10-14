import json
import os
from statistics import mean


# -----------------------------
# File path
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORDS_FILE = os.path.join(BASE_DIR, "Speech", "word_data.json")


# -----------------------------
# Thresholds
# -----------------------------
LONG_PAUSE = 2.0   # seconds


# -----------------------------
# Load word data
# -----------------------------
with open(WORDS_FILE, "r", encoding="utf-8") as file:
    word_data = json.load(file)


if not word_data:
    print("No word data found.")
    exit()


# -----------------------------
# Basic word information
# -----------------------------
word_count = len(word_data)

first_word_start = word_data[0]["start"]
last_word_end = word_data[-1]["end"]

total_elapsed_time = last_word_end - first_word_start


# -----------------------------
# Speaking duration
# -----------------------------
speech_duration = 0

for word in word_data:
    speech_duration += word["end"] - word["start"]


# -----------------------------
# Pause calculations
# -----------------------------
pauses = []

for i in range(len(word_data) - 1):

    current_word = word_data[i]
    next_word = word_data[i + 1]

    pause = next_word["start"] - current_word["end"]

    if pause > 0:
        pauses.append(pause)


total_pause_duration = sum(pauses)

pause_count = len(pauses)

average_pause = (
    total_pause_duration / pause_count
    if pause_count > 0
    else 0
)

long_pause_count = sum(
    1 for pause in pauses
    if pause >= LONG_PAUSE
)


# -----------------------------
# Actual speaking time
# -----------------------------
actual_speaking_time = (
    total_elapsed_time - total_pause_duration
)

if actual_speaking_time <= 0:
    actual_speaking_time = speech_duration


# -----------------------------
# Speaking rates
# -----------------------------

# Words per minute while actually speaking
speech_rate = (
    word_count / actual_speaking_time * 60
)

# Words per minute including pauses
overall_rate = (
    word_count / total_elapsed_time * 60
)


# -----------------------------
# ASR confidence
# -----------------------------
confidences = [
    word["confidence"]
    for word in word_data
    if "confidence" in word
]

average_confidence = (
    mean(confidences)
    if confidences
    else 0
)


# -----------------------------
# Display results
# -----------------------------
print("\n========== SPEAKING METRICS ==========")

print(f"Total words:              {word_count}")

print(
    f"Recognized response time: "
    f"{total_elapsed_time:.2f} seconds"
)

print(
    f"Actual speaking time:     "
    f"{actual_speaking_time:.2f} seconds"
)

print(
    f"Total pause time:         "
    f"{total_pause_duration:.2f} seconds"
)

print(
    f"Number of pauses:         "
    f"{pause_count}"
)

print(
    f"Average pause:            "
    f"{average_pause:.2f} seconds"
)

print(
    f"Long pauses (>= 2 sec):   "
    f"{long_pause_count}"
)

print(
    f"Speech rate:              "
    f"{speech_rate:.2f} words/min"
)

print(
    f"Overall response rate:    "
    f"{overall_rate:.2f} words/min"
)

print(
    f"Average ASR confidence:   "
    f"{average_confidence:.2f}"
)

print("=======================================\n")