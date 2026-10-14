# InterviewSense AI — NLP Module

## Overview

The NLP module processes spoken interview answers using offline speech recognition and text analysis.

Current features include:

- Speech-to-text using Vosk
- Word-level timestamps and ASR confidence
- Text normalization and preprocessing
- Filler-word and discourse-marker detection
- Repetition detection
- Vocabulary richness analysis
- Pause and speaking-rate analysis
- Expected-keyword coverage
- TF-IDF text similarity
- Structured JSON output

## Requirements

- Python 3.11 or 3.12 recommended for initial setup
- A working microphone
- Internet access for the initial package and model downloads
- Windows, macOS, or Linux (commands below are for Windows PowerShell)

Python 3.14 is used in the original development environment, but compatibility with other Python versions should be verified before choosing a version for the whole team.

## Setup on Windows

### 1. Clone the repository

```powershell
git clone <YOUR_REPOSITORY_URL>
cd Capstone
```

Replace `<YOUR_REPOSITORY_URL>` with the actual Git repository URL.

### 2. Create a virtual environment

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If Python 3.12 is not installed, install a compatible Python version first or use an agreed-upon version already installed by your team.

### 3. Install Python dependencies

```powershell
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Download a Vosk speech model

Vosk models are not stored in this Git repository because they are large files.

Download the required model from the official model list:

https://alphacephei.com/vosk/models

Available model folders used during development:

- `vosk-model-small-en-us-0.15` — US English, small
- `vosk-model-small-en-in-0.4` — Indian English, small
- `vosk-model-en-in-0.5` — Indian English, large

For the current development setup, use **Indian English Large**:

`vosk-model-en-in-0.5`

Extract the downloaded archive into:

`NLP_module/Speech/`

The resulting folder structure should be:

```text
NLP_module/
└── Speech/
    ├── vosk-model-en-in-0.5/
    └── speech-to-text.py
```

The model folder must be extracted, not left as a ZIP file. The model path in `speech-to-text.py` must match the extracted folder name.

### 5. Download NLTK data

Run the following command once after installing the dependencies:

```powershell
python -c "import nltk; [nltk.download(x) for x in ['punkt', 'punkt_tab', 'stopwords', 'wordnet', 'omw-1.4', 'averaged_perceptron_tagger', 'averaged_perceptron_tagger_eng']]"
```

This downloads the NLTK resources required by the current preprocessing setup.

## Running the NLP module

Run these commands from the project root with the virtual environment activated.

### Speech-to-text

```powershell
python .\NLP_module\Speech\speech-to-text.py
```

Choose the Indian English Large model when prompted.

Speak into the microphone. The script generates a transcript and word-level data.

### NLP analysis

```powershell
python .\NLP_module\Text\nlp_analysis.py
```

The analysis reads the generated speech data and saves its structured results to `NLP_module/Speech/nlp_analysis.json`.

**Run speech-to-text before running NLP analysis** so the input files exist.

## Important notes

- Speech recognition runs locally after the model has been downloaded.
- Model folders and the virtual environment must be set up separately on each computer.
- Generated transcript and analysis files are ignored by Git to avoid committing personal recordings or machine-specific test outputs.
- Keyword coverage currently uses prototype expected keywords. Integration with the final interview-question database is pending.
- TF-IDF similarity measures textual similarity; it is not a direct measure of answer correctness.
- Speech-rate and timing calculations are still being validated.
- Recognition confidence describes ASR reliability, not the candidate's confidence or interview performance.
- The NLP module is under development, so results should be treated as experimental.

## Team setup checklist

- [ ] Clone the repository
- [ ] Create and activate the virtual environment
- [ ] Install `requirements.txt`
- [ ] Download and extract the Vosk model
- [ ] Download the required NLTK resources
- [ ] Test speech-to-text
- [ ] Test NLP analysis