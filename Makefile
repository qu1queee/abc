.PHONY: help test validate export preview doctor dev app

help:
	@echo "test      Go tests for CLI packages"
	@echo "validate  Check letter decks"
	@echo "export    Write docs/data/letters.json"
	@echo "preview   Export and serve docs on :8080"
	@echo "doctor    Check Wails prerequisites"
	@echo "dev       Run the desktop app from source"
	@echo "app       Build build/bin/Abc.app"

test:
	go test ./internal/... ./cmd/...

validate:
	go run ./cmd/abc validate

export:
	go run ./cmd/abc web-export

preview: export
	python3 -m http.server -d docs 8080

doctor:
	wails doctor

dev:
	wails dev

app:
	wails build
