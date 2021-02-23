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
    }
}

export default initialState