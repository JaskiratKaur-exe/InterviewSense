from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# -----------------------------
# Interview question
# -----------------------------
question = "What is machine learning?"


# -----------------------------
# Candidate answer
# -----------------------------
answer = (
    "Machine learning is a method where computers "
    "learn patterns from data using algorithms. "
    "The model is trained on data and can make predictions."
)


# -----------------------------
# Convert text into TF-IDF vectors
# -----------------------------
vectorizer = TfidfVectorizer()

tfidf_matrix = vectorizer.fit_transform(
    [question, answer]
)


# -----------------------------
# Calculate cosine similarity
# -----------------------------
similarity = cosine_similarity(
    tfidf_matrix[0:1],
    tfidf_matrix[1:2]
)[0][0]


# -----------------------------
# Display result
# -----------------------------
print("\n========== TF-IDF RELEVANCE ==========")

print(f"Question:")
print(f"  {question}")

print(f"\nCandidate answer:")
print(f"  {answer}")

print(
    f"\nCosine similarity: "
    f"{similarity:.3f}"
)

print(
    f"Similarity percentage: "
    f"{similarity * 100:.2f}%"
)

print("======================================\n")