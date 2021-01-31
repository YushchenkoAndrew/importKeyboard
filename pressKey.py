import sys
import keyboard

for key in sys.argv[1:]:
  keyboard.write(key)