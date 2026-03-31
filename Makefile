install:
npm install

lint:
npm run lint

lint-fix:
npm run lint:fix

test:
npm test

test-coverage:
npm test -- --coverage

watch:
npm run test:watch

.PHONY: install lint lint-fix test test-coverage watch
