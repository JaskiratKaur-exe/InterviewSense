import json
import re
from pathlib import Path
from collections import Counter
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# ============================================================
# FILE LOCATIONS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

TRANSCRIPT_FILE = BASE_DIR / "Speech" / "normalized_transcript.txt"
WORDS_FILE = BASE_DIR / "Speech" / "word_data.json"
OUTPUT_FILE = BASE_DIR / "Speech" / "nlp_analysis.json"
LOW_CONFIDENCE_THRESHOLD = 0.50

# ============================================================
# INTERVIEW QUESTION
# ============================================================

# Temporary question for testing.
# Later, this will come from the interview/question database.

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


# ============================================================
# LOAD FILES
# ============================================================

if not TRANSCRIPT_FILE.exists():
    print("Normalized transcript not found.")
    exit()

if not WORDS_FILE.exists():
    print("word_data.json not found.")
    exit()


with open(TRANSCRIPT_FILE, "r", encoding="utf-8") as file:
    transcript = file.read().strip()


with open(WORDS_FILE, "r", encoding="utf-8") as file:
    word_data = json.load(file)


# ============================================================
# 1. BASIC TEXT PROCESSING
# ============================================================

words = re.findall(r"[a-z]+(?:'[a-z]+)?", transcript.lower())

total_words = len(words)
unique_words = len(set(words))

if total_words > 0:
    ttr = unique_words / total_words
else:
    ttr = 0


# ============================================================
# 2. DISFLUENCY ANALYSIS
# ============================================================

# Classic hesitation fillers
classic_fillers = {
    "um",
    "umm",
    "uh",
    "uhh",
    "hmm",
    "hm",
    "er",
    "err"
}

# Discourse markers.
# These are not necessarily bad fillers, so they are tracked
# separately.
discourse_markers = {
    "basically",
    "actually",
    "literally"
}


classic_filler_counts = {}
discourse_marker_counts = {}

for word in words:

    if word in classic_fillers:
        classic_filler_counts[word] = (
            classic_filler_counts.get(word, 0) + 1
        )

    if word in discourse_markers:
        discourse_marker_counts[word] = (
            discourse_marker_counts.get(word, 0) + 1
        )


total_classic_fillers = sum(
    classic_filler_counts.values()
)

total_discourse_markers = sum(
    discourse_marker_counts.values()
)

total_fillers = (
    total_classic_fillers +
    total_discourse_markers
)

if total_words > 0:
    classic_filler_rate = (
        total_classic_fillers / total_words
    ) * 100

    discourse_marker_rate = (
        total_discourse_markers / total_words
    ) * 100

    filler_rate = (
        total_fillers / total_words
    ) * 100

else:
    classic_filler_rate = 0
    discourse_marker_rate = 0
    filler_rate = 0
filler_counts = {}


# ============================================================
# 3. REPETITION DETECTION
# ============================================================

# ------------------------------------------------------------
# Consecutive repeated words
# ------------------------------------------------------------

repeated_words = {}
repetition_events = 0

i = 0

while i < len(words):

    j = i + 1

    while j < len(words) and words[j] == words[i]:
        j += 1

    count = j - i

    if count >= 2:
        repeated_words[words[i]] = count
        repetition_events += 1

    i = j


# ------------------------------------------------------------
# Repeated phrases
# ------------------------------------------------------------

def find_repeated_phrases(words, phrase_length):

    phrases = [
        tuple(words[i:i + phrase_length])
        for i in range(len(words) - phrase_length + 1)
    ]

    phrase_counts = Counter(phrases)

    repeated = {}

    for phrase, count in phrase_counts.items():

        if count >= 2:
            phrase_text = " ".join(phrase)
            repeated[phrase_text] = count

    return repeated


repeated_bigrams = find_repeated_phrases(words, 2)
repeated_trigrams = find_repeated_phrases(words, 3)
# ------------------------------------------------------------
# Consecutive repeated phrases
# ------------------------------------------------------------

def find_consecutive_repeated_phrases(words, phrase_length):

    repeated = {}

    i = 0

    while i <= len(words) - (phrase_length * 2):

        first_phrase = words[i:i + phrase_length]
        second_start = i + phrase_length
        second_phrase = words[
            second_start:second_start + phrase_length
        ]

        if first_phrase == second_phrase:

            phrase = " ".join(first_phrase)

            repeated[phrase] = (
                repeated.get(phrase, 0) + 1
            )

            i += phrase_length * 2

        else:
            i += 1

    return repeated


consecutive_repeated_bigrams = (
    find_consecutive_repeated_phrases(words, 2)
)

consecutive_repeated_trigrams = (
    find_consecutive_repeated_phrases(words, 3)
)

# ------------------------------------------------------------
# Repetition rate
# ------------------------------------------------------------

if total_words > 0:
    repetition_rate = (
        repetition_events / total_words
    ) * 100
else:
    repetition_rate = 0


# ============================================================
# 4. KEYWORD RELEVANCE
# ============================================================

lemmatizer = WordNetLemmatizer()

# Lemmatize transcript words
lemmatized_words = [
    lemmatizer.lemmatize(word)
    for word in words
]

word_set = set(lemmatized_words)

# Match keywords after lemmatization
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
    keyword_coverage = (
        len(matched_keywords) / len(EXPECTED_KEYWORDS)
    ) * 100
else:
    keyword_coverage = 0


# ============================================================
# 5. TF-IDF SIMILARITY
# ============================================================

vectorizer = TfidfVectorizer()

try:
    tfidf_matrix = vectorizer.fit_transform([
        QUESTION,
        transcript
    ])

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )[0][0]

except ValueError:
    similarity = 0


similarity_percentage = similarity * 100


# ============================================================
# 6. SPEAKING METRICS
# ============================================================

if word_data:

    first_word_start = word_data[0]["start"]
    last_word_end = word_data[-1]["end"]

    low_confidence_words = []
    response_time = last_word_end - first_word_start

    total_pause_time = 0
    pause_count = 0
    hesitation_pause_count = 0
    long_pause_count = 0

    for i in range(len(word_data) - 1):

        current_end = word_data[i]["end"]
        next_start = word_data[i + 1]["start"]

        gap = next_start - current_end

        if gap > 0:
            total_pause_time += gap
            pause_count += 1

            # Hesitation pause
            if gap >= 0.5:
                hesitation_pause_count += 1

            # Long hesitation pause
            if gap >= 2.0:
                long_pause_count += 1

    actual_speaking_time = response_time - total_pause_time

    if actual_speaking_time > 0:
        speech_rate = (
            total_words / actual_speaking_time
        ) * 60
    else:
        speech_rate = 0

    if response_time > 0:
        overall_response_rate = (
            total_words / response_time
        ) * 60
    else:
        overall_response_rate = 0

    if pause_count > 0:
        average_pause = total_pause_time / pause_count
    else:
        average_pause = 0


    # --------------------------------------------------------
    # ASR confidence analysis
    # --------------------------------------------------------

    confidence_values = [
        word["confidence"]
        for word in word_data
        if "confidence" in word
    ]

    if confidence_values:

        average_asr_confidence = (
            sum(confidence_values) /
            len(confidence_values)
        )

        low_confidence_words = [
            {
                "word": word["word"],
                "confidence": round(word["confidence"], 3)
            }
            for word in word_data
            if (
                "confidence" in word
                and word["confidence"] < LOW_CONFIDENCE_THRESHOLD
            )
        ]
            # Percentage of recognized words above the
        # low-confidence threshold
        reliable_word_count = (
            len(confidence_values) -
            len(low_confidence_words)
        )

        asr_reliability_percent = (
            reliable_word_count /
            len(confidence_values)
        ) * 100

    else:

        average_asr_confidence = 0
        low_confidence_words = []
        asr_reliability_percent = 0

else:

    response_time = 0
    total_pause_time = 0
    pause_count = 0
    long_pause_count = 0
    actual_speaking_time = 0
    speech_rate = 0
    overall_response_rate = 0
    average_pause = 0
    average_asr_confidence = 0
    hesitation_pause_count = 0


# ============================================================
# 7. CREATE FINAL NLP RESULTS
# ============================================================

results = {
    "question": QUESTION,

    "transcript": {
        "word_count": total_words,
        "unique_word_count": unique_words,
        "type_token_ratio": round(ttr, 3)
    },

    "asr_quality": {
        "average_confidence": round(
            average_asr_confidence, 3
        ),
        "low_confidence_threshold": LOW_CONFIDENCE_THRESHOLD,
        "low_confidence_word_count": len(
            low_confidence_words
        ),
        "reliability_percent": round(
            asr_reliability_percent, 2
        ),
        "low_confidence_words": low_confidence_words
    },

    "filler_analysis": {
        "total_fillers": total_fillers,
        "filler_rate_percent": round(filler_rate, 2),
        "detected_fillers": filler_counts
    },

    "repetition_analysis": {
        "repetition_events": repetition_events,
        "repetition_rate_percent": round(
            repetition_rate, 2
        ),

        "repeated_words": repeated_words,

        "repeated_bigrams": repeated_bigrams,

        "repeated_trigrams": repeated_trigrams,

        "consecutive_repeated_bigrams": (
            consecutive_repeated_bigrams
        ),

        "consecutive_repeated_trigrams": (
            consecutive_repeated_trigrams
        )
    },

    "keyword_analysis": {
        "expected_keywords": sorted(EXPECTED_KEYWORDS),
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "coverage_percent": round(keyword_coverage, 2)
    },

    "semantic_analysis": {
        "tfidf_cosine_similarity": round(similarity, 3),
        "similarity_percent": round(similarity_percentage, 2)
    },

    "speaking_analysis": {
        "response_time_seconds": round(response_time, 2),
        "actual_speaking_time_seconds": round(
            actual_speaking_time, 2
        ),
        "total_pause_time_seconds": round(
            total_pause_time, 2
        ),
        "pause_count": pause_count,
        "average_pause_seconds": round(
            average_pause, 2
        ),
        "long_pause_count": long_pause_count,
        "speech_rate_wpm": round(
            speech_rate, 2
        ),
        "overall_response_rate_wpm": round(
            overall_response_rate, 2
        ),
        "average_asr_confidence": round(
            average_asr_confidence, 3
        )
    }
}


# ============================================================
# 8. SAVE RESULTS
# ============================================================

with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
    json.dump(results, file, indent=4)


# ============================================================
# 9. DISPLAY RESULTS
# ============================================================

print("\n========== NLP ANALYSIS ==========")

print(f"\nTotal words: {total_words}")
print(f"Unique words: {unique_words}")
print(f"TTR: {ttr:.3f}")

print(f"\nClassic fillers: {total_classic_fillers}")
print(f"Classic filler rate: {classic_filler_rate:.2f}%")

print(f"\nDiscourse markers: {total_discourse_markers}")
print(
    f"Discourse marker rate: "
    f"{discourse_marker_rate:.2f}%"
)

print(f"\nTotal lexical disfluency: {total_fillers}")
print(f"Lexical disfluency rate: {filler_rate:.2f}%")

if classic_filler_counts:
    print("Detected classic fillers:")

    for word, count in classic_filler_counts.items():
        print(f"  {word}: {count}")

if discourse_marker_counts:
    print("Detected discourse markers:")

    for word, count in discourse_marker_counts.items():
        print(f"  {word}: {count}")

print(f"\nRepetition events: {repetition_events}")
print(f"Repetition rate: {repetition_rate:.2f}%")

print(f"\nKeyword coverage: {keyword_coverage:.2f}%")
print(f"Matched keywords: {matched_keywords}")

print(f"\nTF-IDF similarity: {similarity:.3f}")
print(f"TF-IDF percentage: {similarity_percentage:.2f}%")

print(f"\nSpeech rate: {speech_rate:.2f} words/min")
print(f"Average pause: {average_pause:.2f} seconds")
print(f"Hesitation pauses (>= 0.5 sec): {hesitation_pause_count}")
print(f"Long pauses (>= 2 sec): {long_pause_count}")
print(f"Average ASR confidence: {average_asr_confidence:.3f}")
print(
    f"ASR reliability: "
    f"{asr_reliability_percent:.2f}%"
)
print(f"Low-confidence words: {len(low_confidence_words)}")

if low_confidence_words:
    print("Potentially unreliable words:")

    for item in low_confidence_words:
        print(
            f"  {item['word']} "
            f"(confidence: {item['confidence']:.3f})"
        )
print("\nResults saved to:")
print(OUTPUT_FILE)

print("==================================")