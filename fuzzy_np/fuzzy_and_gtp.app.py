from flask import Flask, request, jsonify
from fuzzy_system import run_whole_control_system_json
from flask_cors import CORS
import os
import requests
from openai import OpenAI
import random
import string


def get_letters_to_improve(letter_difficulty):
    letters_to_improve = ""
    for letter, difficulty in letter_difficulty.items():
        if difficulty == "improve":
            letters_to_improve += letter + ", "
    return letters_to_improve


def already_lower(word):
    return word.islower()

def already_upper(word):
    return word[0].isupper()

def has_special_char(word, special_chars):
    return any(char in special_chars for char in word)


def modify_text(text, difficulty):
    global status
    if difficulty == "easier":
        status[1] = max(0, status[1] - 0.1)
        status[2] = max(0, status[2] - 0.1)
        status[0] = max(0,1- status[1] - status[2])

    elif difficulty == "harder":
        status[1] = min(1, status[1] + 0.1)
        status[2] = min(1, status[2] + 0.1)
        status[0] = max(0,1 - status[1] - status[2])


    words = text.split()
    num_words = len(words)

    lower_count_goal = int(num_words * status[0])
    upper_count_goal = int(num_words * status[1])
    special_count_goal = int(num_words * status[2])

    special_chars = ['!', '?', ',', ';']

    lower_indices_count, upper_indices_count, special_indices_count = 0, 0, 0

    for i,word in enumerate(words):
        if has_special_char(word, special_chars):
            special_indices_count += 1
        elif already_upper(word):
            upper_indices_count += 1
        elif already_lower(word):
            lower_indices_count += 1

    add_lower = max(0,lower_count_goal - lower_indices_count)
    add_upper = max(0,upper_count_goal - upper_indices_count)
    add_special = max(0,special_count_goal - special_indices_count)

    lower_indices = random.sample(range(num_words), add_lower)
    upper_indices = random.sample(range(num_words), add_upper)
    special_indices = random.sample(range(num_words), add_special)

    for i, word in enumerate(words):
        if i in lower_indices:
            words[i] = word.lower()
        elif i in upper_indices:
            words[i] = word.capitalize()
        if i in special_indices:
            words[i] = word + random.choice(special_chars)

    return ' '.join(words)

app = Flask(__name__)
os.environ['OPENAI_API_KEY'] = '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'
client = OpenAI(
    api_key=os.environ['OPENAI_API_KEY'],
)
status = [0.7, 0.2, 0.1]
CORS(app)

@app.route('/fuzzy_gtp', methods=['POST'])
def fuzzy_gtp():
    try:
        print(request)
        input_data = request.get_json()

        output_word_diff, output_letter_dict = run_whole_control_system_json(input_data)
        theme = input_data['theme']
        print(output_word_diff, output_letter_dict)

        letters_to_improve = get_letters_to_improve(output_letter_dict)

        question = "Generate a sentence where you use more of letters " + letters_to_improve + " on theme " + theme + ", the sentence should be 100 words long."
        print("Question to OpenAI:", question)

        response = client.chat.completions.create(
            model="gpt-3.5-turbo", messages=[{"role": "user", "content": question}],
        )

        answer = response.choices[0].message.content
        print("status:", status)
        modified_answer = modify_text(answer, output_word_diff)
        print("Answer from GTP: ",answer)
        print("status:", status)
        print("Modified_answer: ", modified_answer)

        return jsonify({'answer': modified_answer})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)


#export OPENAI_API_KEY='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'
#set OPENAI_API_KEY=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