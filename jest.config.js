module.exports = {
    "preset": "react-native",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
    "setupFiles": [
        "./node_modules/react-native-gesture-handler/jestSetup.js"
      ],
    moduleNameMapper: {
       '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
       '\\.(css|less)$': 'identity-obj-proxy'
    },
    "transformIgnorePatterns": [
        "node_modules/?!(react-icons)"
    ]
}