# Abc

## What

A picture-book alphabet for kids, in English and Español. Each letter is one page: giant uppercase, giant lowercase, then a word and picture to remember it by. [GitHub Pages](https://qu1queee.github.io/abc/) after Pages is on.

## Why

Same idea as [cartitas](https://github.com/qu1queee/cartitas), aimed at first letters instead of topic facts. One letter at a time, in alphabet order (Spanish includes Ñ). No accounts or scores; the last letter stays on that browser.

## How

Needs [Go](https://go.dev/dl/) 1.23+.

```sh
go test ./...
go run ./cmd/abc validate
go run ./cmd/abc web-export
```

Local preview:

```sh
go run ./cmd/abc web-export
python3 -m http.server -d docs 8080
```

Then open `http://127.0.0.1:8080`.

Letter decks live in `letters/en.yaml` and `letters/es.yaml`.
