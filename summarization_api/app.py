from flask import Flask, request
from flask_cors import CORS, cross_origin
from newspaper import Article
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "chrome-extension://pblafdobefpkjepoadmgpknohleibfha"}})

def summarize(text, per):
    nlp = spacy.load('en_core_web_sm')
    doc= nlp(text)
    tokens=[token.text for token in doc]
    word_frequencies={}
    for word in doc:
        if word.text.lower() not in list(STOP_WORDS):
            if word.text.lower() not in punctuation:
                if word.text not in word_frequencies.keys():
                    word_frequencies[word.text] = 1
                else:
                    word_frequencies[word.text] += 1
    max_frequency=max(word_frequencies.values())
    for word in word_frequencies.keys():
        word_frequencies[word]=word_frequencies[word]/max_frequency
    sentence_tokens= [sent for sent in doc.sents]
    sentence_scores = {}
    for sent in sentence_tokens:
        for word in sent:
            if word.text.lower() in word_frequencies.keys():
                if sent not in sentence_scores.keys():                            
                    sentence_scores[sent]=word_frequencies[word.text.lower()]
                else:
                    sentence_scores[sent]+=word_frequencies[word.text.lower()]
    select_length=int(len(sentence_tokens)*per)
    summary=nlargest(select_length, sentence_scores,key=sentence_scores.get)
    final_summary=[word.text for word in summary]
    summary=''.join(final_summary)
    return summary

@app.route("/api/summarize", methods=["POST"])
@cross_origin()
def api():
    data = request.get_json()
    url = data["url"].strip()
    user_agent = request.headers.get('User-Agent')
    article = Article(url)
    article.download()
    article.parse()
    return {
        "success": True,
        "article": article.text,
        "summary": summarize(article.text, 0.1)
    }

@app.route("/")
@cross_origin()
def home():
    return "Hello World!"

if __name__ == "__main__":
    app.run()