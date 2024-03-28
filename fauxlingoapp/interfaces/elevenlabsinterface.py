from elevenlabs.client import ElevenLabs
from elevenlabs import play
import random
import json
import os

def get_api_key():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(dir_path, 'keys.json')) as f:
        keys_dict = json.load(f)
    return keys_dict["elevenlabs"]

client = ElevenLabs(
    api_key = get_api_key()
)

def get_audio_response(text, voice, model="eleven_multilingual_v1"):
    if text == None or text == "":
        return "Error: No text provided."
    if voice == None or voice == "":
        return "Error: No voice provided."
    if type(voice) == list:
        voice = random.choice(voice)
    if model == None or model == "":
        return "Error: No model provided."
    
    audio = client.generate(
        text = text,
        voice = voice,
        model = model
    )

    return audio

def play_audio(audio):
    play(audio)