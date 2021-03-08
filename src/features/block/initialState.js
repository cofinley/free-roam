const initialState = {
  "abcd": {
    "id": "abcd",
    "parentId": null,
    "text": "Hello World",
    "childrenIds": [
      "ijkl",
      "mnop"
    ]
  },
  "efgh": {
    "id": "efgh",
    "parentId": null,
    "text": "Lorem ipsum",
    "childrenIds": [
      "qrst"
    ]
  },
  "ijkl": {
    "id": "ijkl",
    "parentId": "abcd",
    "text": "Normal *italics* **bold** ***bold italics***",
    "childrenIds": []
  },
  "mnop": {
    "id": "mnop",
    "parentId": "abcd",
    "text": "Link to [[Lorem ipsum]]",
    "childrenIds": [
      "uvwx",
      "a1"
    ]
  },
  "qrst": {
    "id": "qrst",
    "parentId": "efgh",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "childrenIds": []
  },
  "uvwx": {
    "id": "uvwx",
    "parentId": "mnop",
    "text": "I'm a third layer block",
    "childrenIds": [
      "a2"
    ]
  },
  "a1": {
    "id": "a1",
    "parentId": "mnop",
    "text": "I'm another third layer block",
    "childrenIds": []
  },
  "a2": {
    "id": "a2",
    "parentId": "uvwx",
    "text": "I'm a fourth layer block",
    "childrenIds": []
  },
  "2021-02-17": {
    "id": "2021-02-17",
    "parentId": null,
    "text": "February 17th, 2021",
    "childrenIds": [
      "a4"
    ],
    "created": 1613546102000,
    "updated": null,
    "dailyNote": "2021-02-17"
  },
  "a4": {
    "id": "a4",
    "parentId": "a3",
    "text": "Click here to edit",
    "childrenIds": []
  },
  "plXnqf7B": {
    "id": "plXnqf7B",
    "parentId": "welcome",
    "text": "Welcome to Free-Roam!",
    "childrenIds": [],
    "created": 1613962018019,
    "updated": 1613962047962,
    "dailyNote": null
  },
  "welcome": {
    "id": "welcome",
    "parentId": null,
    "text": "Welcome",
    "childrenIds": [
      "plXnqf7B",
      "0NOhIzxB",
      "H-O00XW0",
      "64SNNX17"
    ],
    "created": 1613962018016,
    "updated": null,
    "dailyNote": null
  },
  "0NOhIzxB": {
    "id": "0NOhIzxB",
    "parentId": "welcome",
    "text": "Take a look around; you can check out:",
    "childrenIds": [
      "pKs_vxuk",
      "ANZddpXT",
      "NMb4Yf1z"
    ],
    "created": 1613962048878,
    "updated": 1613962057083,
    "dailyNote": null
  },
  "pKs_vxuk": {
    "id": "pKs_vxuk",
    "parentId": "0NOhIzxB",
    "text": "[Daily Notes](#/daily-notes) (like a journal)",
    "childrenIds": [],
    "created": 1613962057397,
    "updated": 1613962069453,
    "dailyNote": null
  },
  "ANZddpXT": {
    "id": "ANZddpXT",
    "parentId": "0NOhIzxB",
    "text": "All of the [current pages](#/all-pages)",
    "childrenIds": [],
    "created": 1613962070989,
    "updated": 1613962076848,
    "dailyNote": null
  },
  "NMb4Yf1z": {
    "id": "NMb4Yf1z",
    "parentId": "0NOhIzxB",
    "text": "A sample page: [[Hello World]]",
    "childrenIds": [
      "nbGfXXqe"
    ],
    "created": 1613962077493,
    "updated": 1613962081636,
    "dailyNote": null
  },
  "nbGfXXqe": {
    "id": "nbGfXXqe",
    "parentId": "NMb4Yf1z",
    "text": "Shift+click to open in side bar",
    "childrenIds": [],
    "created": 1613962082245,
    "updated": 1613962090754,
    "dailyNote": null
  },
  "H-O00XW0": {
    "id": "H-O00XW0",
    "parentId": "welcome",
    "text": "Be sure to save your work if you wish to persist it",
    "childrenIds": [
      "mPiN8jkq"
    ],
    "created": 1613962091917,
    "updated": 1613962107536,
    "dailyNote": null
  },
  "mPiN8jkq": {
    "id": "mPiN8jkq",
    "parentId": "H-O00XW0",
    "text": "Save/load buttons in top left",
    "childrenIds": [],
    "created": 1613962107877,
    "updated": 1613962114571,
    "dailyNote": null
  },
  "64SNNX17": {
    "id": "64SNNX17",
    "parentId": "welcome",
    "text": "Enjoy! Check out [the repo](https://github.com/cofinley/free-roam) to learn more and/or contribute!",
    "childrenIds": [],
    "created": 1613962115053,
    "updated": 1613962120478,
    "dailyNote": null
  },
  "CYGv8EoI": {
    "id": "CYGv8EoI",
    "parentId": "qoGY8XCw",
    "text": "[[v0.8.0]] - [[March 8th, 2021]]",
    "childrenIds": [
      "rrxpq9EB",
      "APdozas6"
    ],
    "created": 1615151525499,
    "updated": 1615241546978,
    "dailyNote": null
  },
  "qoGY8XCw": {
    "id": "qoGY8XCw",
    "parentId": null,
    "text": "Changelog",
    "childrenIds": [
      "CYGv8EoI",
      "Q-52Ly5Z",
      "hbwAGc0n",
      "LZcy3J05",
      "aHlHRw0J",
      "zh5H9xj_",
      "cJikzeh9",
      "65Whw5OF",
      "osJqlMOc",
      "jLc-SlCe",
      "ye0mPSj4"
    ],
    "created": 1615151525497,
    "updated": null,
    "dailyNote": null
  },
  "knSL6JxF": {
    "id": "knSL6JxF",
    "parentId": "U0wzj61A",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151540801,
    "updated": null,
    "dailyNote": null
  },
  "U0wzj61A": {
    "id": "U0wzj61A",
    "parentId": null,
    "text": "v0.8.0",
    "childrenIds": [
      "knSL6JxF"
    ],
    "created": 1615151540799,
    "updated": null,
    "dailyNote": null
  },
  "rrxpq9EB": {
    "id": "rrxpq9EB",
    "parentId": "CYGv8EoI",
    "text": "**Added**",
    "childrenIds": [
      "aYDvZZDa",
      "-G0SPlgl"
    ],
    "created": 1615151549773,
    "updated": 1615151554208,
    "dailyNote": null
  },
  "aYDvZZDa": {
    "id": "aYDvZZDa",
    "parentId": "rrxpq9EB",
    "text": "Collapsible panes",
    "childrenIds": [],
    "created": 1615151554741,
    "updated": 1615151560593,
    "dailyNote": null
  },
  "Q-52Ly5Z": {
    "id": "Q-52Ly5Z",
    "parentId": "qoGY8XCw",
    "text": "[[v0.7.0]] - [[March 5th, 2021]]",
    "childrenIds": [
      "5v0LPIcJ",
      "NmXAqdVJ"
    ],
    "created": 1615151561373,
    "updated": 1615241553633,
    "dailyNote": null
  },
  "x4tIQpko": {
    "id": "x4tIQpko",
    "parentId": "2Aqvr2ow",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151568732,
    "updated": null,
    "dailyNote": null
  },
  "2Aqvr2ow": {
    "id": "2Aqvr2ow",
    "parentId": null,
    "text": "v0.7.0",
    "childrenIds": [
      "x4tIQpko"
    ],
    "created": 1615151568730,
    "updated": null,
    "dailyNote": null
  },
  "5v0LPIcJ": {
    "id": "5v0LPIcJ",
    "parentId": "Q-52Ly5Z",
    "text": "**Added**",
    "childrenIds": [
      "mO6iGrvz"
    ],
    "created": 1615151575750,
    "updated": 1615151579131,
    "dailyNote": null
  },
  "dfaf5wnb": {
    "id": "dfaf5wnb",
    "parentId": "2021-03-05",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151575815,
    "updated": null,
    "dailyNote": null
  },
  "2021-03-05": {
    "id": "2021-03-05",
    "parentId": null,
    "text": "March 5th, 2021",
    "childrenIds": [
      "dfaf5wnb"
    ],
    "created": 1615151575815,
    "updated": null,
    "dailyNote": "2021-03-05"
  },
  "mO6iGrvz": {
    "id": "mO6iGrvz",
    "parentId": "5v0LPIcJ",
    "text": "Ability to use up/down arrow keys to navigate between blocks",
    "childrenIds": [],
    "created": 1615151579517,
    "updated": 1615151589444,
    "dailyNote": null
  },
  "NmXAqdVJ": {
    "id": "NmXAqdVJ",
    "parentId": "Q-52Ly5Z",
    "text": "**Fixed**",
    "childrenIds": [
      "B0euIf5P"
    ],
    "created": 1615151590286,
    "updated": 1615151600634,
    "dailyNote": null
  },
  "B0euIf5P": {
    "id": "B0euIf5P",
    "parentId": "NmXAqdVJ",
    "text": "Small editing bugs",
    "childrenIds": [],
    "created": 1615151601205,
    "updated": 1615151604976,
    "dailyNote": null
  },
  "hbwAGc0n": {
    "id": "hbwAGc0n",
    "parentId": "qoGY8XCw",
    "text": "[[v0.6.1]] - [[March 3rd, 2021]]",
    "childrenIds": [
      "nRqacq7j",
      "LIk2h4jD"
    ],
    "created": 1615151610278,
    "updated": 1615241556995,
    "dailyNote": null
  },
  "U_BM_Wui": {
    "id": "U_BM_Wui",
    "parentId": "PHWZ0YQa",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151618368,
    "updated": null,
    "dailyNote": null
  },
  "PHWZ0YQa": {
    "id": "PHWZ0YQa",
    "parentId": null,
    "text": "v0.6.1",
    "childrenIds": [
      "U_BM_Wui"
    ],
    "created": 1615151618366,
    "updated": null,
    "dailyNote": null
  },
  "nRqacq7j": {
    "id": "nRqacq7j",
    "parentId": "hbwAGc0n",
    "text": "**Added**",
    "childrenIds": [
      "ASDbCeJC"
    ],
    "created": 1615151627277,
    "updated": 1615151631388,
    "dailyNote": null
  },
  "Zoton0HW": {
    "id": "Zoton0HW",
    "parentId": "2021-03-03",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151627364,
    "updated": null,
    "dailyNote": null
  },
  "2021-03-03": {
    "id": "2021-03-03",
    "parentId": null,
    "text": "March 3rd, 2021",
    "childrenIds": [
      "Zoton0HW"
    ],
    "created": 1615151627362,
    "updated": null,
    "dailyNote": "2021-03-03"
  },
  "ASDbCeJC": {
    "id": "ASDbCeJC",
    "parentId": "nRqacq7j",
    "text": "Unit/integration tests",
    "childrenIds": [],
    "created": 1615151633493,
    "updated": 1615151637391,
    "dailyNote": null
  },
  "LIk2h4jD": {
    "id": "LIk2h4jD",
    "parentId": "hbwAGc0n",
    "text": "**Fixed**",
    "childrenIds": [
      "nI6sjZEh",
      "sWA5LPEl"
    ],
    "created": 1615151646957,
    "updated": 1615151650254,
    "dailyNote": null
  },
  "nI6sjZEh": {
    "id": "nI6sjZEh",
    "parentId": "LIk2h4jD",
    "text": "Searching with \\[\\[link brackets\\]\\]",
    "childrenIds": [],
    "created": 1615151651172,
    "updated": 1615151664214,
    "dailyNote": null
  },
  "sWA5LPEl": {
    "id": "sWA5LPEl",
    "parentId": "LIk2h4jD",
    "text": "Bug where adding a link in the main view would break the app if the same block was open in the sidebar",
    "childrenIds": [],
    "created": 1615151666021,
    "updated": 1615151676716,
    "dailyNote": null
  },
  "LZcy3J05": {
    "id": "LZcy3J05",
    "parentId": "qoGY8XCw",
    "text": "[[v0.6.0]] - [[February 23rd, 2021]]",
    "childrenIds": [
      "QRq7Iijd",
      "xpkrOqmn"
    ],
    "created": 1615151680838,
    "updated": 1615241562711,
    "dailyNote": null
  },
  "28UYA3QT": {
    "id": "28UYA3QT",
    "parentId": "n8zdS3M6",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151688570,
    "updated": null,
    "dailyNote": null
  },
  "n8zdS3M6": {
    "id": "n8zdS3M6",
    "parentId": null,
    "text": "v0.6.0",
    "childrenIds": [
      "28UYA3QT"
    ],
    "created": 1615151688569,
    "updated": null,
    "dailyNote": null
  },
  "QRq7Iijd": {
    "id": "QRq7Iijd",
    "parentId": "LZcy3J05",
    "text": "**Added**",
    "childrenIds": [
      "fcx0cCvG"
    ],
    "created": 1615151702501,
    "updated": 1615151706620,
    "dailyNote": null
  },
  "XMhm2bRA": {
    "id": "XMhm2bRA",
    "parentId": "2021-02-23",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151702615,
    "updated": null,
    "dailyNote": null
  },
  "2021-02-23": {
    "id": "2021-02-23",
    "parentId": null,
    "text": "February 23rd, 2021",
    "childrenIds": [
      "XMhm2bRA"
    ],
    "created": 1615151702613,
    "updated": null,
    "dailyNote": "2021-02-23"
  },
  "fcx0cCvG": {
    "id": "fcx0cCvG",
    "parentId": "QRq7Iijd",
    "text": "'Show references' button for view pane sections",
    "childrenIds": [],
    "created": 1615151706796,
    "updated": 1615151716454,
    "dailyNote": null
  },
  "xpkrOqmn": {
    "id": "xpkrOqmn",
    "parentId": "LZcy3J05",
    "text": "**Changed**",
    "childrenIds": [
      "Xb1qVATK"
    ],
    "created": 1615151716756,
    "updated": 1615151721385,
    "dailyNote": null
  },
  "Xb1qVATK": {
    "id": "Xb1qVATK",
    "parentId": "xpkrOqmn",
    "text": "Linked/unlinked reference controls behavior, styling",
    "childrenIds": [],
    "created": 1615151721780,
    "updated": 1615151738847,
    "dailyNote": null
  },
  "aHlHRw0J": {
    "id": "aHlHRw0J",
    "parentId": "qoGY8XCw",
    "text": "[[v0.5.0]] - [[February 22nd, 2021]]",
    "childrenIds": [
      "BQKXI_WC",
      "DLV049Kx",
      "6vRV-qni"
    ],
    "created": 1615151742357,
    "updated": 1615241566336,
    "dailyNote": null
  },
  "WvrzSZxd": {
    "id": "WvrzSZxd",
    "parentId": "GrVjOqq0",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151753460,
    "updated": null,
    "dailyNote": null
  },
  "GrVjOqq0": {
    "id": "GrVjOqq0",
    "parentId": null,
    "text": "v0.5.0",
    "childrenIds": [
      "WvrzSZxd"
    ],
    "created": 1615151753459,
    "updated": null,
    "dailyNote": null
  },
  "BQKXI_WC": {
    "id": "BQKXI_WC",
    "parentId": "aHlHRw0J",
    "text": "**Added**",
    "childrenIds": [
      "ce6qtsCS"
    ],
    "created": 1615151764900,
    "updated": 1615151769070,
    "dailyNote": null
  },
  "8ma9KyU9": {
    "id": "8ma9KyU9",
    "parentId": "2021-02-22",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151765020,
    "updated": null,
    "dailyNote": null
  },
  "2021-02-22": {
    "id": "2021-02-22",
    "parentId": null,
    "text": "February 22nd, 2021",
    "childrenIds": [
      "8ma9KyU9"
    ],
    "created": 1615151765019,
    "updated": null,
    "dailyNote": "2021-02-22"
  },
  "ce6qtsCS": {
    "id": "ce6qtsCS",
    "parentId": "BQKXI_WC",
    "text": "Welcome page",
    "childrenIds": [],
    "created": 1615151769340,
    "updated": 1615151772726,
    "dailyNote": null
  },
  "DLV049Kx": {
    "id": "DLV049Kx",
    "parentId": "aHlHRw0J",
    "text": "**Changed**",
    "childrenIds": [
      "H26Q1rNJ",
      "AkNZvm6T",
      "4kT4k6AB"
    ],
    "created": 1615151772973,
    "updated": 1615151778766,
    "dailyNote": null
  },
  "H26Q1rNJ": {
    "id": "H26Q1rNJ",
    "parentId": "DLV049Kx",
    "text": "Shorter page Ids",
    "childrenIds": [],
    "created": 1615151779396,
    "updated": 1615151786911,
    "dailyNote": null
  },
  "AkNZvm6T": {
    "id": "AkNZvm6T",
    "parentId": "DLV049Kx",
    "text": "Link color",
    "childrenIds": [
      "Jeu_zI_d"
    ],
    "created": 1615151787236,
    "updated": 1615151789774,
    "dailyNote": null
  },
  "Jeu_zI_d": {
    "id": "Jeu_zI_d",
    "parentId": "AkNZvm6T",
    "text": "Something with AAA contrast",
    "childrenIds": [],
    "created": 1615151791484,
    "updated": 1615151795773,
    "dailyNote": null
  },
  "4kT4k6AB": {
    "id": "4kT4k6AB",
    "parentId": "DLV049Kx",
    "text": "Clarify/condense readme",
    "childrenIds": [],
    "created": 1615151796132,
    "updated": 1615151811399,
    "dailyNote": null
  },
  "6vRV-qni": {
    "id": "6vRV-qni",
    "parentId": "aHlHRw0J",
    "text": "**Fixed**",
    "childrenIds": [
      "Hz2cnxGo"
    ],
    "created": 1615151816396,
    "updated": 1615151823078,
    "dailyNote": null
  },
  "Hz2cnxGo": {
    "id": "Hz2cnxGo",
    "parentId": "6vRV-qni",
    "text": "References",
    "childrenIds": [
      "zcFTghP_",
      "GTSiOiPB",
      "BWvQJEpx"
    ],
    "created": 1615151825428,
    "updated": 1615151827462,
    "dailyNote": null
  },
  "zcFTghP_": {
    "id": "zcFTghP_",
    "parentId": "Hz2cnxGo",
    "text": "Link to page on reference heading, not the block",
    "childrenIds": [],
    "created": 1615151828596,
    "updated": 1615151840213,
    "dailyNote": null
  },
  "GTSiOiPB": {
    "id": "GTSiOiPB",
    "parentId": "Hz2cnxGo",
    "text": "Styling",
    "childrenIds": [],
    "created": 1615151840843,
    "updated": 1615151842695,
    "dailyNote": null
  },
  "BWvQJEpx": {
    "id": "BWvQJEpx",
    "parentId": "Hz2cnxGo",
    "text": "Breadcrumbs",
    "childrenIds": [],
    "created": 1615151843124,
    "updated": 1615151845279,
    "dailyNote": null
  },
  "zh5H9xj_": {
    "id": "zh5H9xj_",
    "parentId": "qoGY8XCw",
    "text": "[[v0.4.0]] - [[February 20th, 2021]]",
    "childrenIds": [
      "_NgKanaH",
      "ykaw0vG-",
      "MkE63b42"
    ],
    "created": 1615151851516,
    "updated": 1615241570549,
    "dailyNote": null
  },
  "SHEu5mSn": {
    "id": "SHEu5mSn",
    "parentId": "h3QIVAwN",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151856750,
    "updated": null,
    "dailyNote": null
  },
  "h3QIVAwN": {
    "id": "h3QIVAwN",
    "parentId": null,
    "text": "v0.4.0",
    "childrenIds": [
      "SHEu5mSn"
    ],
    "created": 1615151856749,
    "updated": null,
    "dailyNote": null
  },
  "_NgKanaH": {
    "id": "_NgKanaH",
    "parentId": "zh5H9xj_",
    "text": "**Added**",
    "childrenIds": [
      "oNR59Nt6"
    ],
    "created": 1615151877364,
    "updated": 1615151883631,
    "dailyNote": null
  },
  "qxIrQMXH": {
    "id": "qxIrQMXH",
    "parentId": "2021-02-20",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615151877619,
    "updated": null,
    "dailyNote": null
  },
  "2021-02-20": {
    "id": "2021-02-20",
    "parentId": null,
    "text": "February 20th, 2021",
    "childrenIds": [
      "qxIrQMXH"
    ],
    "created": 1615151877617,
    "updated": null,
    "dailyNote": "2021-02-20"
  },
  "oNR59Nt6": {
    "id": "oNR59Nt6",
    "parentId": "_NgKanaH",
    "text": "All pages view",
    "childrenIds": [],
    "created": 1615151884107,
    "updated": 1615151891717,
    "dailyNote": null
  },
  "ykaw0vG-": {
    "id": "ykaw0vG-",
    "parentId": "zh5H9xj_",
    "text": "**Changed**",
    "childrenIds": [
      "mRMlNbtc",
      "2Jff6FfY",
      "VwYwAGRr"
    ],
    "created": 1615151895571,
    "updated": 1615151899030,
    "dailyNote": null
  },
  "mRMlNbtc": {
    "id": "mRMlNbtc",
    "parentId": "ykaw0vG-",
    "text": "View pane can now open just a page's references if desired (used for all pages mentions",
    "childrenIds": [],
    "created": 1615151899491,
    "updated": 1615151911306,
    "dailyNote": null
  },
  "2Jff6FfY": {
    "id": "2Jff6FfY",
    "parentId": "ykaw0vG-",
    "text": "Saving can now happen in bulk, all saved artifacts are zipped up now",
    "childrenIds": [],
    "created": 1615151912355,
    "updated": 1615151915014,
    "dailyNote": null
  },
  "VwYwAGRr": {
    "id": "VwYwAGRr",
    "parentId": "ykaw0vG-",
    "text": "Seafoam green link color",
    "childrenIds": [],
    "created": 1615151915675,
    "updated": 1615151919885,
    "dailyNote": null
  },
  "MkE63b42": {
    "id": "MkE63b42",
    "parentId": "zh5H9xj_",
    "text": "**Fixed**",
    "childrenIds": [
      "tCuoXsgJ"
    ],
    "created": 1615151920683,
    "updated": 1615151924133,
    "dailyNote": null
  },
  "tCuoXsgJ": {
    "id": "tCuoXsgJ",
    "parentId": "MkE63b42",
    "text": "Various bug fixes",
    "childrenIds": [],
    "created": 1615151924571,
    "updated": 1615151928190,
    "dailyNote": null
  },
  "cJikzeh9": {
    "id": "cJikzeh9",
    "parentId": "qoGY8XCw",
    "text": "[[v0.3.0]] - [[February 19th, 2021]]",
    "childrenIds": [
      "MTEYkWg4",
      "orng4Tbx"
    ],
    "created": 1615151995763,
    "updated": 1615241573546,
    "dailyNote": null
  },
  "iQLTYbmZ": {
    "id": "iQLTYbmZ",
    "parentId": "lOYo9YNv",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615152001477,
    "updated": null,
    "dailyNote": null
  },
  "lOYo9YNv": {
    "id": "lOYo9YNv",
    "parentId": null,
    "text": "v0.3.0",
    "childrenIds": [
      "iQLTYbmZ"
    ],
    "created": 1615152001474,
    "updated": null,
    "dailyNote": null
  },
  "MTEYkWg4": {
    "id": "MTEYkWg4",
    "parentId": "cJikzeh9",
    "text": "**Added**",
    "childrenIds": [
      "RWUiSaqJ"
    ],
    "created": 1615152014338,
    "updated": 1615152313396,
    "dailyNote": null
  },
  "hn3EsXvI": {
    "id": "hn3EsXvI",
    "parentId": "2021-02-19",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615152014569,
    "updated": null,
    "dailyNote": null
  },
  "2021-02-19": {
    "id": "2021-02-19",
    "parentId": null,
    "text": "February 19th, 2021",
    "childrenIds": [
      "hn3EsXvI"
    ],
    "created": 1615152014566,
    "updated": null,
    "dailyNote": "2021-02-19"
  },
  "RWUiSaqJ": {
    "id": "RWUiSaqJ",
    "parentId": "MTEYkWg4",
    "text": "Daily Notes",
    "childrenIds": [
      "RVF3qlH4"
    ],
    "created": 1615152313681,
    "updated": 1615152316822,
    "dailyNote": null
  },
  "RVF3qlH4": {
    "id": "RVF3qlH4",
    "parentId": "RWUiSaqJ",
    "text": "Clicking on this page will generate today's note if it doesn't exist",
    "childrenIds": [],
    "created": 1615152317360,
    "updated": 1615152354091,
    "dailyNote": null
  },
  "orng4Tbx": {
    "id": "orng4Tbx",
    "parentId": "cJikzeh9",
    "text": "**Changed**",
    "childrenIds": [
      "ijym7flZ"
    ],
    "created": 1615152359016,
    "updated": 1615152363485,
    "dailyNote": null
  },
  "ijym7flZ": {
    "id": "ijym7flZ",
    "parentId": "orng4Tbx",
    "text": "Refactor `Block.js`",
    "childrenIds": [],
    "created": 1615152363784,
    "updated": 1615152377738,
    "dailyNote": null
  },
  "65Whw5OF": {
    "id": "65Whw5OF",
    "parentId": "qoGY8XCw",
    "text": "[[v0.2.0]] - [[February 14th, 2021]]",
    "childrenIds": [
      "4yDhjlwo",
      "LSyO6QeQ"
    ],
    "created": 1615152378217,
    "updated": 1615241577095,
    "dailyNote": null
  },
  "37i-QRj4": {
    "id": "37i-QRj4",
    "parentId": "NnBgaPbM",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615152387178,
    "updated": null,
    "dailyNote": null
  },
  "NnBgaPbM": {
    "id": "NnBgaPbM",
    "parentId": null,
    "text": "v0.2.0",
    "childrenIds": [
      "37i-QRj4"
    ],
    "created": 1615152387175,
    "updated": null,
    "dailyNote": null
  },
  "4yDhjlwo": {
    "id": "4yDhjlwo",
    "parentId": "65Whw5OF",
    "text": "**Added**",
    "childrenIds": [
      "NQQ24pc2"
    ],
    "created": 1615152397696,
    "updated": 1615152401882,
    "dailyNote": null
  },
  "lYga6L3g": {
    "id": "lYga6L3g",
    "parentId": "2021-02-14",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615152397952,
    "updated": null,
    "dailyNote": null
  },
  "2021-02-14": {
    "id": "2021-02-14",
    "parentId": null,
    "text": "February 14th, 2021",
    "childrenIds": [
      "lYga6L3g"
    ],
    "created": 1615152397950,
    "updated": null,
    "dailyNote": "2021-02-14"
  },
  "NQQ24pc2": {
    "id": "NQQ24pc2",
    "parentId": "4yDhjlwo",
    "text": "Ability to position caret under mouse click position",
    "childrenIds": [],
    "created": 1615152402136,
    "updated": 1615152414280,
    "dailyNote": null
  },
  "LSyO6QeQ": {
    "id": "LSyO6QeQ",
    "parentId": "65Whw5OF",
    "text": "**Fixed**",
    "childrenIds": [
      "KwKSIov_",
      "5QIy-o9I"
    ],
    "created": 1615152414719,
    "updated": 1615152418703,
    "dailyNote": null
  },
  "KwKSIov_": {
    "id": "KwKSIov_",
    "parentId": "LSyO6QeQ",
    "text": "Unlinked refs bug which toggled *all* unlinked refs",
    "childrenIds": [],
    "created": 1615152418951,
    "updated": 1615152432814,
    "dailyNote": null
  },
  "5QIy-o9I": {
    "id": "5QIy-o9I",
    "parentId": "LSyO6QeQ",
    "text": "Block expand/collapse buttons not playing well with clicking the thread lines",
    "childrenIds": [],
    "created": 1615152439544,
    "updated": 1615152455272,
    "dailyNote": null
  },
  "osJqlMOc": {
    "id": "osJqlMOc",
    "parentId": "qoGY8XCw",
    "text": "[[v0.1.2]] - [[February 13th, 2021]]",
    "childrenIds": [
      "KfegyrhL"
    ],
    "created": 1615152458768,
    "updated": 1615241582244,
    "dailyNote": null
  },
  "sb8fAPEM": {
    "id": "sb8fAPEM",
    "parentId": "ChLH8aqz",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615152465521,
    "updated": null,
    "dailyNote": null
  },
  "ChLH8aqz": {
    "id": "ChLH8aqz",
    "parentId": null,
    "text": "v0.1.2",
    "childrenIds": [
      "sb8fAPEM"
    ],
    "created": 1615152465512,
    "updated": null,
    "dailyNote": null
  },
  "KfegyrhL": {
    "id": "KfegyrhL",
    "parentId": "osJqlMOc",
    "text": "**Fixed**",
    "childrenIds": [
      "ls_xmxM1"
    ],
    "created": 1615152478743,
    "updated": 1615152491499,
    "dailyNote": null
  },
  "lO5DViF0": {
    "id": "lO5DViF0",
    "parentId": "2021-02-13",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615152479088,
    "updated": null,
    "dailyNote": null
  },
  "2021-02-13": {
    "id": "2021-02-13",
    "parentId": null,
    "text": "February 13th, 2021",
    "childrenIds": [
      "lO5DViF0"
    ],
    "created": 1615152479085,
    "updated": null,
    "dailyNote": "2021-02-13"
  },
  "ls_xmxM1": {
    "id": "ls_xmxM1",
    "parentId": "KfegyrhL",
    "text": "View pane and page link bugs",
    "childrenIds": [],
    "created": 1615152492576,
    "updated": 1615152498679,
    "dailyNote": null
  },
  "jLc-SlCe": {
    "id": "jLc-SlCe",
    "parentId": "qoGY8XCw",
    "text": "[[v0.1.1]] - [[February 13th, 2021]]",
    "childrenIds": [
      "wse3RmyV"
    ],
    "created": 1615152499080,
    "updated": 1615241585479,
    "dailyNote": null
  },
  "VwBYAYLC": {
    "id": "VwBYAYLC",
    "parentId": "jPesTGdz",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615152504189,
    "updated": null,
    "dailyNote": null
  },
  "jPesTGdz": {
    "id": "jPesTGdz",
    "parentId": null,
    "text": "v0.1.1",
    "childrenIds": [
      "VwBYAYLC"
    ],
    "created": 1615152504187,
    "updated": null,
    "dailyNote": null
  },
  "wse3RmyV": {
    "id": "wse3RmyV",
    "parentId": "jLc-SlCe",
    "text": "**Fixed**",
    "childrenIds": [
      "3EI68J4G"
    ],
    "created": 1615152515519,
    "updated": 1615152521252,
    "dailyNote": null
  },
  "3EI68J4G": {
    "id": "3EI68J4G",
    "parentId": "wse3RmyV",
    "text": "Event `preventDefault()` was blocking deletion",
    "childrenIds": [],
    "created": 1615152521509,
    "updated": 1615152538969,
    "dailyNote": null
  },
  "ye0mPSj4": {
    "id": "ye0mPSj4",
    "parentId": "qoGY8XCw",
    "text": "[[v0.1.0]] - [[February 13th, 2021]]",
    "childrenIds": [
      "xFNuKdHA",
      "8Fku1XWQ",
      "ikdmYO9N"
    ],
    "created": 1615152539487,
    "updated": 1615241588599,
    "dailyNote": null
  },
  "ACTsaLY2": {
    "id": "ACTsaLY2",
    "parentId": "QzkNFrfk",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615152545181,
    "updated": null,
    "dailyNote": null
  },
  "QzkNFrfk": {
    "id": "QzkNFrfk",
    "parentId": null,
    "text": "v0.1.0",
    "childrenIds": [
      "ACTsaLY2"
    ],
    "created": 1615152545179,
    "updated": null,
    "dailyNote": null
  },
  "xFNuKdHA": {
    "id": "xFNuKdHA",
    "parentId": "ye0mPSj4",
    "text": "Everything in the [React rewrite Github issue](https://github.com/cofinley/free-roam/issues/3) as well as block deletion.",
    "childrenIds": [],
    "created": 1615152554855,
    "updated": 1615152599403,
    "dailyNote": null
  },
  "8Fku1XWQ": {
    "id": "8Fku1XWQ",
    "parentId": "ye0mPSj4",
    "text": "Provide a release bundle to make it easier for people to test.",
    "childrenIds": [],
    "created": 1615152599879,
    "updated": 1615152611757,
    "dailyNote": null
  },
  "ikdmYO9N": {
    "id": "ikdmYO9N",
    "parentId": "ye0mPSj4",
    "text": "This project uses semver, so until we get to v1.0, this is considered incomplete.",
    "childrenIds": [],
    "created": 1615152613143,
    "updated": 1615152623765,
    "dailyNote": null
  },
  "APdozas6": {
    "id": "APdozas6",
    "parentId": "CYGv8EoI",
    "text": "**Fixed**",
    "childrenIds": [
      "lJ2X-IPj",
      "W0nrIHya"
    ],
    "created": 1615153736696,
    "updated": 1615153739900,
    "dailyNote": null
  },
  "lJ2X-IPj": {
    "id": "lJ2X-IPj",
    "parentId": "APdozas6",
    "text": "Center stage not scrolling on long pages",
    "childrenIds": [],
    "created": 1615153740753,
    "updated": 1615153763286,
    "dailyNote": null
  },
  "t7DCXn7R": {
    "id": "t7DCXn7R",
    "parentId": "2021-03-08",
    "text": "Click here to edit",
    "childrenIds": [],
    "created": 1615241289927,
    "updated": null,
    "dailyNote": null
  },
  "2021-03-08": {
    "id": "2021-03-08",
    "parentId": null,
    "text": "March 8th, 2021",
    "childrenIds": [
      "t7DCXn7R"
    ],
    "created": 1615241289921,
    "updated": null,
    "dailyNote": "2021-03-08"
  },
  "W0nrIHya": {
    "id": "W0nrIHya",
    "parentId": "APdozas6",
    "text": "Performance improvements",
    "childrenIds": [
      "uzorR-kR",
      "k6iAs-fh"
    ],
    "created": 1615241295759,
    "updated": 1615241306251,
    "dailyNote": null
  },
  "uzorR-kR": {
    "id": "uzorR-kR",
    "parentId": "W0nrIHya",
    "text": "No more saving on textarea change; much better now",
    "childrenIds": [
      "giaeP2_c"
    ],
    "created": 1615241306135,
    "updated": 1615241332287,
    "dailyNote": null
  },
  "giaeP2_c": {
    "id": "giaeP2_c",
    "parentId": "uzorR-kR",
    "text": "Saving will happen on blur",
    "childrenIds": [],
    "created": 1615241332111,
    "updated": 1615241340386,
    "dailyNote": null
  },
  "k6iAs-fh": {
    "id": "k6iAs-fh",
    "parentId": "W0nrIHya",
    "text": "Memoization of more-pure functional components",
    "childrenIds": [],
    "created": 1615241340254,
    "updated": 1615241354547,
    "dailyNote": null
  },
  "-G0SPlgl": {
    "id": "-G0SPlgl",
    "parentId": "rrxpq9EB",
    "text": "The [[Changelog]]!",
    "childrenIds": [],
    "created": 1615241411742,
    "updated": 1615241424857,
    "dailyNote": null
  }
}

export default initialState