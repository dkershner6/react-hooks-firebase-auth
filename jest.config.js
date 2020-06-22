module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testPathIgnorePatterns: ['./.next/', './node_modules/'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    coveragePathIgnorePatterns: ['node_modules', 'resume', '/r/', 'Resume', 'cms', 'classes', 'pages', '.next'],
    globals: {
        // we must specify a custom tsconfig for tests because we need the typescript transform
        // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
        // can see this setting in tsconfig.jest.json -> "jsx": "react"
        'ts-jest': {
            tsConfig: 'tsconfig.jest.json'
        }
    }
};
