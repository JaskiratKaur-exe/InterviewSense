import os
import queue
import json
import sounddevice as sd
from vosk import Model, KaldiRecognizer


# ==================================================
# MODEL PATHS
# ==================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODELS = {
    "1": {
        "name": "US English (Small)",
        "path": os.path.join(BASE_DIR, "vosk-model-small-en-us-0.15")
    },

    "2": {
        "name": "Indian English (Small)",
        "path": os.path.join(BASE_DIR, "vosk-model-small-en-in-0.4")
    },

    "3": {
        "name": "Indian English (Large)",
        "path": os.path.join(BASE_DIR, "vosk-model-en-in-0.5")
    }
}


# ==================================================
# OUTPUT FILES
# ==================================================

TRANSCRIPT_FILE = os.path.join(
    BASE_DIR,
    "transcript.txt"
)

WORDS_FILE = os.path.join(
    BASE_DIR,
    "word_data.json"
)


# ==================================================
# SELECT MODEL
# ==================================================

print("\n========================================")
print("       VOSK SPEECH-TO-TEXT")
print("========================================")

print("\nAvailable models:\n")

for number, model_info in MODELS.items():
    print(f"{number}. {model_info['name']}")

choice = input("\nSelect a model (1/2/3): ").strip()

if choice not in MODELS:
    print("\n❌ Invalid choice.")
    exit()

selected_model = MODELS[choice]

print(f"\nSelected model: {selected_model['name']}")


# ==================================================
# LOAD MODEL
# ==================================================

print("Loading Vosk model...")

try:
    model = Model(selected_model["path"])
    print("✅ Vosk model loaded successfully!")

except Exception as e:
    print("\n❌ Could not load the model.")
    print("Error:", e)
    exit()


# ==================================================
# AUDIO SETUP
# ==================================================

audio_queue = queue.Queue()

transcript = []

# Stores word timing + confidence
word_data = []


def audio_callback(indata, frames, time, status):

    if status:
        print(status)

    audio_queue.put(bytes(indata))


device_info = sd.query_devices(kind="input")

sample_rate = int(device_info["default_samplerate"])

print(f"\n🎤 Microphone: {device_info['name']}")
print(f"🎵 Sample rate: {sample_rate} Hz")


# ==================================================
# SPEECH RECOGNIZER
# ==================================================

recognizer = KaldiRecognizer(
    model,
    sample_rate
)

# IMPORTANT:
# Ask Vosk to return individual words,
# their timestamps and confidence.
recognizer.SetWords(True)


# ==================================================
# START RECORDING
# ==================================================

print("\n========================================")
print("              RECORDING")
print("========================================")

print("\n🎙️ Start speaking...")
print("Press Ctrl+C when you want to stop.\n")


try:

    with sd.RawInputStream(
        samplerate=sample_rate,
        blocksize=8000,
        dtype="int16",
        channels=1,
        callback=audio_callback
    ):

        while True:

            data = audio_queue.get()

            if recognizer.AcceptWaveform(data):

                result = json.loads(
                    recognizer.Result()
                )

                # ----------------------------------
                # TEXT
                # ----------------------------------

                text = result.get(
                    "text",
                    ""
                ).strip()

                if text:

                    print("You said:", text)

                    transcript.append(text)

                # ----------------------------------
                # WORD DATA
                # ----------------------------------

                words = result.get(
                    "result",
                    []
                )

                for word in words:

                    word_data.append({
                        "word": word["word"],
                        "start": word["start"],
                        "end": word["end"],
                        "confidence": word["conf"]
                    })


except KeyboardInterrupt:

    print("\n\n🛑 Recording stopped.")


# ==================================================
# FINAL RESULT
# ==================================================

final_result = json.loads(
    recognizer.FinalResult()
)


# ----------------------------------
# FINAL TEXT
# ----------------------------------

final_text = final_result.get(
    "text",
    ""
).strip()

if final_text:

    print("You said:", final_text)

    transcript.append(final_text)


# ----------------------------------
# FINAL WORD DATA
# ----------------------------------

final_words = final_result.get(
    "result",
    []
)

for word in final_words:

    word_data.append({
        "word": word["word"],
        "start": word["start"],
        "end": word["end"],
        "confidence": word["conf"]
    })


# ==================================================
# COMBINE TRANSCRIPT
# ==================================================

full_transcript = " ".join(
    transcript
)


# ==================================================
# SAVE TRANSCRIPT
# ==================================================

with open(
    TRANSCRIPT_FILE,
    "w",
    encoding="utf-8"
) as file:

    file.write(full_transcript)


# ==================================================
# SAVE WORD DATA
# ==================================================

with open(
    WORDS_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        word_data,
        file,
        indent=4
    )


# ==================================================
# DISPLAY FINAL RESULT
# ==================================================

print("\n========================================")
print("           FINAL TRANSCRIPT")
print("========================================")

print(full_transcript)


print("\n========================================")
print("             FILES SAVED")
print("========================================")

print(f"📄 Transcript: {TRANSCRIPT_FILE}")
print(f"📊 Word data:  {WORDS_FILE}")

print(f"\nTotal recognized words: {len(word_data)}")