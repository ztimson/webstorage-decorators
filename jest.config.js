module.exports = {
    "reporters": ["default"],
    "roots": [
        "<rootDir>/tests"
    ],
    "testMatch": [
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        ".+\\.(ts)$": "ts-jest"
    },
}
