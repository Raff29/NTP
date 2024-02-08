
from music21 import converter, note, chord, instrument
from music21 import tempo, dynamics, key
import music21 as m21
import fractions

def sheet_music_to_instructions(file):
    instructions = []

    # Try to parse the file and handle any errors
    try:
        score = converter.parse(file)

        instructions.extend(extract_metadata(score))

        # Iterate through each part in the score
        for part in score.parts:
            if "Piano" in str(part.getInstrument()):

                for measure in part.getElementsByClass('Measure'):
                    for element in measure:
                        if isinstance(element, note.Note):
                            instructions.append(process_note(element))
                            for articulation in element.articulations:
                                instructions.append(
                                    get_articulation_instruction(articulation))
                        elif isinstance(element, chord.Chord):
                            instructions.append(process_chord(element))
                            for articulation in element.articulations:
                                instructions.append(
                                    get_articulation_instruction(articulation))
                        elif isinstance(element, note.Rest):
                            instructions.append(process_rest(element))
                        elif isinstance(element, tempo.MetronomeMark):
                            instructions.append(process_tempo(element))
                        elif isinstance(element, dynamics.Dynamic):
                            instructions.append(process_dynamic(element))

    except m21.converter.ConverterException as e:
        instructions.append(f"Error parsing file: {e}")

    return instructions


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


def process_note(note_element):
    pitch = note_element.pitch
    duration = note_element.duration
    friendly_duration = get_friendly_duration(duration)

    articulation_text = ""

    for articulation in note_element.articulations:
        articulation_text = get_articulation_instruction(articulation)
        break  # Only one articulation is supported for now
    return f"Play the note {pitch} for a {friendly_duration}. {articulation_text}"


def process_chord(chord_element):
    pitches = chord_element.pitches
    duration = chord_element.duration
    friendly_duration = get_friendly_duration(duration)

    pitch_names = [str(pitch) for pitch in pitches]
    chord_name = ' and '.join(pitch_names)

    return f"Play the chord {chord_name} for a {friendly_duration}."


def process_rest(rest_element):
    duration = rest_element.duration.quarterLength
    fraction = fractions.Fraction(duration).limit_denominator()
    return f"Rest for {fraction} of a beat."


def process_tempo(tempo_marking):
    tempo_value = tempo_marking.number
    return f"Change the tempo to {tempo_value} beats per minute."


def process_dynamic(dynamic):
    dynamic_symbol = dynamic.text
    return f"Play with {dynamic_symbol}."


def get_friendly_duration(duration):
    quarter_length = duration.quarterLength
    if quarter_length == 0.0:
        duration = "as an acciaccatura"
    else:
        duration = f"{quarter_length} of a beat"
        
    return f"{duration}"  # 1/8, 1/16, etc.


def get_articulation_instruction(articulation):
    if articulation.name == 'staccato':
        return "Play the note short and detached."
    elif articulation.name == 'accent':
        return "Emphasize the note."
    elif articulation.name == 'tenuto':
        return "Play the note to its full duration, or slightly longer."
    elif articulation.name == 'staccatissimo':
        return "Play the note very short and detached."
    elif articulation.name == 'marcato':
        return "Play the note with a strong, marked attack."
    elif articulation.name == 'legato' or articulation.name == 'slur':
        return "Play the note smoothly and connected to the next."
    else:
        return ""

