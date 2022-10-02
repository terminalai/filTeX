#Command format
#python isSlur.py <word> <threshold-optional>

import numpy as np
from tensorflow.keras import models
from PIL import Image, ImageDraw
import warnings
warnings.filterwarnings('ignore')
import sys

def word2img(rw, rh, txt):
  img = Image.new('RGB', (rw, rh))
  d = ImageDraw.Draw(img)
  txtw, txth = d.textsize(txt)
  d.text((rw/2 - txtw/2, rh/2 - txth/2), txt, fill=(1, 0, 0))
  return np.array(img)[:,:,0]


def isSlur(word, threshold=0.5):
    model = models.load_model('isSlurModel')
    rw = 200
    rh = 50
    prediction = model.predict(word2img(rw, rh, word.lower()).reshape((1, rh, rw, 1)))
    return np.all(prediction >= threshold)

if __name__ == "__main__":
  isSlur('nigger')

# if len(sys.argv) > 3:
#     print('you have specified too many arguments')
# elif len(sys.argv) == 2:
#     print(isSlur(sys.argv[1]))
# else:
#     print(isSlur(sys.argv[1], float(sys.argv[2])))