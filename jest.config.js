module.exports = {
    preset: "ts-jest",
    roots: ["<rootDir>/src/"],
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "<rootDir>/jest/svgTransform.js"
    },
};
