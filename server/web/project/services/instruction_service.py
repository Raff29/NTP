import json
from multiprocessing import process
from music21 import converter, note, chord
from music21 import tempo, dynamics, key
import music21 as m21
from flask import current_app


def sheet_music_to_instructions(file):
    instructions = []
    stored_chord = None

    score = converter.parse(file)

    instructions.extend(extract_metadata(score))

    for part in score.parts:
        if "Piano" in str(part.getInstrument()):
            for measure in part.getElementsByClass('Measure'):
                for element in measure:
                    if isinstance(element, note.Note):
                        if stored_chord:
                            instructions.append(
                                process_note(element, stored_chord))
                            stored_chord = None
                        else:
                            instructions.append(process_note(element))
                        for articulation in element.articulations:
                            instructions.append(
                                get_articulation_instruction(articulation))
                    elif isinstance(element, chord.Chord):
                        stored_chord = element
                    elif isinstance(element, note.Rest):
                        instructions.append(process_rest(element))
                    elif isinstance(element, tempo.MetronomeMark):
                        tempo_instructions = process_tempo(element)
                        if tempo_instructions not in instructions:
                            instructions.append(tempo_instructions)
                    elif isinstance(element, dynamics.Dynamic):
                        instructions.append(process_dynamic(element))

    return json.dumps(instructions)


def extract_metadata(score):
    instructions = []

    for clef in score.getElementsByClass(m21.clef.Clef):
        clef_name = clef.name
        instructions.append(f"Change to the {clef_name} clef.")

    for key_signature in score.getElementsByClass(key.KeySignature):
        key_sharps_flats = key_signature.getSharpsAndFlats()
        key_text = "major" if key_sharps_flats >= 0 else "minor"
        instructions.append(
            f"Set the key signature to {abs(key_sharps_flats)} {key_text}.")

    return instructions


def process_note(note_element, chord=None):
    duration = note_element.duration.quarterLength
    ticks = duration_to_ticks(duration)
    pitch = note_element.pitch
    if chord:
        chord_pitches = ' and '.join(str(p) for p in chord.pitches)
        return f"Press the {pitch} key with the right hand and play the {chord_pitches} with your left hand. Hold for {ticks} ticks (feel {ticks} heartbeats)."
    else:
        return f"Press the {pitch} key with the right hand. Hold for {ticks} ticks (feel {ticks} heartbeats)."


def process_chord(chord_element):
    pitches = chord_element.pitches
    duration = chord_element.duration

    # Calculate how many ticks to hold the chord
    quarter_length = duration.quarterLength
    ticks_to_hold = int(4 * quarter_length)

    pitch_names = [str(pitch) for pitch in pitches]
    chord_name = ' and '.join(pitch_names)

    return f"Play the chord {chord_name}. Hold for {ticks_to_hold} ticks."


def process_rest(rest_element):
    duration = rest_element.duration

    quarter_length = duration.quarterLength
    ticks_to_rest = int(4 * quarter_length)

    return f"Rest for {ticks_to_rest} ticks."


def process_tempo(tempo_marking):
    tempo_value = tempo_marking.number
    starting_message = "Find a steady, comfortable heartbeat pulse (you can feel it on your neck or wrist). Each pulse is one tick. If you want, tap your toe or count along out loud 'One, Two, Three, Four', with each number as a tick. BPM: {}".format(
        tempo_value)

    return starting_message


def process_dynamic(dynamic):
    dynamic_symbol = dynamic.text
    return f"Play with {dynamic_symbol}."


def get_articulation_instruction(articulation):
    if articulation.name == 'staccato':
        return "Strike the note with a quick tap and immediately lift your finger."
    elif articulation.name == 'accent':
        return "Hit the note hard, but immediately, as if surprised, let it get much quieter."
    elif articulation.name == 'legato':
        return "Play the notes smoothly connected, like your fingers are gently walking between keys."
    else:
        return ""


def duration_to_ticks(duration):
    return int(4 * duration)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower(
           ) in current_app.config['ALLOWED_EXTENSIONS']
