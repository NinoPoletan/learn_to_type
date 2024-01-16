from flask import Flask, request, jsonify
from fuzzy_system import run_whole_control_system_json
from flask_cors import CORS
import os
import requests
from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import find_dotenv, load_dotenv

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

app = Flask(__name__)
client = OpenAI(
    api_key=os.environ['OPENAI_API_KEY'],
)

CORS(app)

def get_letters_to_improve(letter_difficulty):
    letters_to_improve = ""
    for letter, difficulty in letter_difficulty.items():
        if difficulty == "improve":
            letters_to_improve += letter + ", "
    return letters_to_improve


@app.route('/fuzzy_gtp', methods=['POST'])
def fuzzy_gtp():
    try:
        #print(request)
        input_data = request.get_json()

        output_word_diff, output_letter_dict = run_whole_control_system_json(input_data)
        theme = input_data['theme']
        print(output_word_diff, output_letter_dict)

        letters_to_improve = get_letters_to_improve(output_letter_dict)

        question = "Generate a sentence where you use more of letters " + letters_to_improve + " on theme " + theme + "."
        print("Question to OpenAI:", question)

        response = client.chat.completions.create(
            model="gpt-3.5-turbo", messages=[{"role": "user", "content": question}],
        )

        answer = response.choices[0].message.content
        print("Answer from GTP: ",answer)

        return jsonify({'answer': answer})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)


#export OPENAI_API_KEY='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'
#set OPENAI_API_KEY=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