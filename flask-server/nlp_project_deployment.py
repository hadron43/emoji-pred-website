# -*- coding: utf-8 -*-
"""NLP Project Deployment

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1prUsClMk9fA5qbXCHpEwcZUpw-AtwedE

"""
### Imports"""

# from transformers import pipeline
from gensim.models import KeyedVectors
import re
import string
import csv
import numpy as np

import tensorflow as tf
import tensorflow_hub as hub

# Tensorflow GPU check
# tf.test.is_gpu_available(
#     cuda_only=False, min_cuda_compute_capability=None
# )

"""### Parameters"""

embed_path = 'twitter_27B_200d.kv'
embed_dim = 200
emb_model = KeyedVectors.load(embed_path)

min_len = 2
max_len = 15
max_pad_len = 10
num_classes = 20

# Saved model path
model_eng_path = 'emoji_pred_use-4.h5'
model_hindi_path = 'emoji_pred_hindi.h5'
model_telegu_path = 'emoji_pred_telegu.h5'
model_bengali_path = 'emoji_pred_bengali.h5'

# Universal Sentence Encoder
module_url = "use/"
univ_model = hub.load(module_url)
# univ_model = hub.load('models/use-4')

"""### Cleaning Text"""

def strip_links(text):
    link_regex    = re.compile('((https?):((//)|(\\\\))+([\w\d:#@%/;$()~_?\+-=\\\.&](#!)?)*)', re.DOTALL)
    links         = re.findall(link_regex, text)
    for link in links:
        text = text.replace(link[0], ' ')
    return text

def strip_all_entities(text):
    entity_prefixes = ['@']
    for separator in  string.punctuation:
        if separator not in entity_prefixes :
            text = text.replace(separator,' ')
    words = []
    for word in text.split():
        word = word.strip()
        if word:
            if word[0] not in entity_prefixes:
                word = word.lower()
                word = strip_non_alpha(word)
                words.append(word)
    return ' '.join(words)

emoji_pattern = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U00002500-\U00002BEF"  # chinese char
        u"\U00002702-\U000027B0"
        u"\U00002702-\U000027B0"
        u"\U000024C2-\U0001F251"
        u"\U0001f926-\U0001f937"
        u"\U00010000-\U0010ffff"
        u"\u2640-\u2642"
        u"\u2600-\u2B55"
        u"\u200d"
        u"\u23cf"
        u"\u23e9"
        u"\u231a"
        u"\ufe0f"  # dingbats
        u"\u3030"
                           "]+", flags=re.UNICODE)

def strip_emoji(text):
    return emoji_pattern.sub(r'', text)

def strip_num(text):
    pattern = r'[0-9]'
    return re.sub(pattern, '', text)

def strip_non_alpha(text):
    pattern = r"[^a-zA-Z]"
    return re.sub(pattern, '', text)

punc = string.punctuation
# print(f'Punctuation marks: \n{punc}')

def preprocess(sent):
    sent_clean = ''

    # Removing punctuation marks
    for i in sent:
        if i not in punc:
            sent_clean += i

    # Stripping white spaces
    sent_clean = sent_clean.strip()

    # Converting to lower case
    sent_clean = sent_clean.lower()

    word_list = sent_clean.split()
    word_list = [strip_non_alpha(token) for token in word_list]
    sent_clean = " ".join(word_list)

    return sent_clean


def strip_non_alpha(text):
    pattern = r"[^a-zA-Z]"
    return re.sub(pattern, '', text)



"""### Generate Embedding Matrix"""

# To be called on cleaned text input

def add_embeddings(data):

    emb_data = []
    for word in data:
        if word not in emb_model.key_to_index:
            pass
        else:
            word_emb = emb_model[word]
            emb_data.append(word_emb)

    # check if padding / clipping required
    pad = False
    clip = False
    if len(emb_data) < max_pad_len:
        pad = True
    elif len(emb_data) > max_pad_len:
        clip = True
    else:
        pad = clip = False

    # padding
    if pad:
        deficiency = max_pad_len - len(emb_data)
        for pad in range(deficiency):
            emb_data.append(np.zeros(embed_dim))

    # clipping
    elif clip:
        # Taking last few tokens
        surplus = len(emb_data) - max_pad_len
        emb_data = emb_data[(-max_pad_len):]

    emb_data = np.array(emb_data, dtype=float)
    # print(emb_data.shape, emb_data.shape==(max_pad_len, embed_dim))

    return emb_data

"""### Getting Predictions from Saved Model

"""

eng_model = tf.keras.models.load_model(model_eng_path)
# hindi_model = tf.keras.models.load_model(model_hindi_path)
# telegu_model = tf.keras.models.load_model(model_telegu_path)

def load_mapping(file_path):
  fin = open(file_path, 'r')
  fin.readline()
  reader = csv.reader(fin)
  d = {}

  for line in reader:
    d[int(line[2])] = line[1]

  fin.close()

  return d

eng_emoji_map = load_mapping('map_eng.csv')

def end_to_end(text, model, emoji_map):
    ret_obj = {
        'emoji': [],
        'confidence': []
    }

    clean_text = strip_links(text)
    clean_text = strip_emoji(text)
    clean_text = preprocess(text)
    clean_text = strip_all_entities(text)
    # split into list of words
    data = clean_text.split()

    process_further = False
    # Do not process further if < 2 tokens entered
    # ............................................
    if (len(data)>2):
        process_further = True
    X_tok = add_embeddings(data).flatten()
    X_tok = X_tok.reshape(1, X_tok.shape[0])

    X_sent = np.array(univ_model([clean_text]))

    X = np.concatenate((X_tok, X_sent), axis=1)
    if (X.shape != (1, 2512)):
        return ret_obj

    # assuming each test input is just 1 sentence for which emoji is to be predicted
    y_pred = model.predict(X)

    d = {}
    for i in range(0, len(y_pred[0])):
        d[i] = y_pred[0][i]

    d = sorted(d.items(), key = lambda kv:(kv[1], kv[0]), reverse=True)
    d = d[:3]

    print(d)

    for item in d:
        ret_obj['emoji'].append(emoji_map[item[0]])
        ret_obj['confidence'].append(str(item[1]))

    return ret_obj

def end_to_end_eng(text):
    return end_to_end(text, eng_model, eng_emoji_map)


# pipe_hindi = pipeline(task='text2text-generation', model='Helsinki-NLP/opus-mt-hi-en')
# pipe_telegu = pipeline(task='text2text-generation', model='Helsinki-NLP/opus-mt-te-en')
# pipe_bengali = pipeline(task='text2text-generation', model='Helsinki-NLP/opus-mt-bn-en')

# def end_to_end_telegu(text):
#     temp = pipe_telegu(text, forced_bos_token_id=pipe_telegu.tokenizer.get_lang_id(lang='en'))
#     return end_to_end(temp[0]['generated_text'], )

if __name__ == '__main__':
    while(True):
        text = input('Enter a tweet: ')
        print(end_to_end(text, eng_model, eng_emoji_map))