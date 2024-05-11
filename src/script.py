import math
import random

from navec import Navec
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

import sys

path = "/home/nosebleed/Downloads/navec_hudlit_v1_12B_500K_300d_100q.tar"

def y(x):
    return np.exp(np.log(10000) - 9.21 * x)

navec = Navec.load(path)

word1 = sys.argv[1].lower()
word2 = sys.argv[2].lower()

try:
    a = navec[word1]
    b = navec[word2]

    cosine = cosine_similarity(a.reshape(1, -1), b.reshape(1, -1))[0][0]

    cosine = cosine if cosine >= 0 else 0
    cosine = cosine if cosine < 0.76 or cosine == 1 else random.randint(3, 10)
    print(math.ceil(y(cosine)))
    sys.exit()
except KeyError:
    print("No word")
except Exception as e:
    print("An error occurred:", e)
