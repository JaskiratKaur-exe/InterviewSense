import os
import re

import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords, wordnet
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag


# ==================================================
# FILE PATH
# ==================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TRANSCRIPT_FILE = os.path.join(
    BASE_DIR,
    "Speech",
    "transcript.txt"
)


# ==================================================
# READ TRANSCRIPT
# ==================================================

with open(
    TRANSCRIPT_FILE,
    "r",
    encoding="utf-8"
) as file:

    text = file.read()


print("\n========================================")
print("          ORIGINAL TRANSCRIPT")
print("========================================")

print(text)


# ==================================================
# SENTENCE TOKENIZATION
# ==================================================

sentences = sent_tokenize(text)

print("\n========================================")
print("        SENTENCE TOKENIZATION")
print("========================================")

for i, sentence in enumerate(sentences, start=1):
    print(f"{i}. {sentence}")


# ==================================================
# WORD TOKENIZATION
# ==================================================

words = word_tokenize(text)

print("\n========================================")
print("          WORD TOKENIZATION")
print("========================================")

print(words)


# ==================================================
# CLEANING
# ==================================================

clean_words = []

for word in words:

    # Convert to lowercase
    word = word.lower()

    # Keep alphabetic words only
    if re.fullmatch(r"[a-z]+", word):
        clean_words.append(word)


# ==================================================
# STOP WORD REMOVAL
# ==================================================

stop_words = set(stopwords.words("english"))

filtered_words = [
    word
    for word in clean_words
    if word not in stop_words
]


# ==================================================
# POS → WORDNET POS
# ==================================================

def get_wordnet_pos(tag):

    if tag.startswith("J"):
        return wordnet.ADJ

    elif tag.startswith("V"):
        return wordnet.VERB

    elif tag.startswith("N"):
        return wordnet.NOUN

    elif tag.startswith("R"):
        return wordnet.ADV

    return wordnet.NOUN


# ==================================================
# LEMMATIZATION
# ==================================================

lemmatizer = WordNetLemmatizer()

tagged_words = pos_tag(filtered_words)

lemmatized_words = []

for word, tag in tagged_words:

    wordnet_pos = get_wordnet_pos(tag)

    lemma = lemmatizer.lemmatize(
        word,
        wordnet_pos
    )

    lemmatized_words.append(lemma)


# ==================================================
# DISPLAY RESULTS
# ==================================================

print("\n========================================")
print("        AFTER STOP-WORD REMOVAL")
print("========================================")

print(filtered_words)


print("\n========================================")
print("           POS TAGGING")
print("========================================")

print(tagged_words)


print("\n========================================")
print("           LEMMATIZATION")
print("========================================")

print(lemmatized_words)


print("\n========================================")
print("          NLP PREPROCESSING DONE")
print("========================================")