import music21
from instruction_service import sheet_music_to_instructions

def test_instructions(musicxml_file):
    instructions = sheet_music_to_instructions(musicxml_file)
    for instruction in instructions:
        print(instruction)

if __name__ == "__main__":
    filename = "3.1.a.Fur_Elise.xml"  
    test_instructions(filename)
