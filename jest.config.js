module.exports = {
    roots: ['<rootDir>/tests'],
    testMatch: ['**/?(*.)+(spec|test).js'],
    testEnvironment: 'node',
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js', 'src/config/**', 'src/utils/types.js'],
    coverageDirectory: 'coverage'
};
