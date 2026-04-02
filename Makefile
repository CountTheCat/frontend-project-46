help:
	@echo "Available commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make link         - Create global symlink for CLI"
	@echo "  make lint         - Run linter"
	@echo "  make lint-fix     - Fix linter errors automatically"
	@echo "  make test         - Run tests"
	@echo "  make test-coverage - Run tests with coverage report"
	@echo "  make watch        - Run tests in watch mode"
	@echo "  make clean        - Remove node_modules and coverage"
	@echo "  make reinstall    - Clean and reinstall dependencies"
	@echo "  make help         - Show this help"

install:
	npm install

link:
	npm link

lint:
	npm run lint

lint-fix:
	npm run lint:fix

test:
	npm test

test-coverage:
	npm run test:coverage

watch:
	npm run test:watch

clean:
	rm -rf node_modules coverage
	rm -f package-lock.json

reinstall: clean install

.PHONY: help install link lint lint-fix test test-coverage watch clean reinstall