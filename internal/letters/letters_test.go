package letters

import (
	"os"
	"path/filepath"
	"testing"
)

func TestExpectedUppers(t *testing.T) {
	en := ExpectedUppers("en")
	if len(en) != 26 || en[0] != "A" || en[25] != "Z" {
		t.Fatalf("en: %v", en)
	}
	es := ExpectedUppers("es")
	if len(es) != 27 || es[13] != "N" || es[14] != "Ñ" || es[15] != "O" {
		t.Fatalf("es: %v", es)
	}
}

func TestLoad(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, "letters", "en.yaml")
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatal(err)
	}
	body := "lang: en\nname: English\nletters:\n  - id: a\n    upper: A\n    lower: a\n    name: ay\n    sound: a as in apple\n    word: apple\n    picture: apple\n"
	if err := os.WriteFile(path, []byte(body), 0o644); err != nil {
		t.Fatal(err)
	}
	deck, err := Load(root, "en")
	if err != nil {
		t.Fatal(err)
	}
	if deck.Lang != "en" || len(deck.Letters) != 1 || deck.Letters[0].Word != "apple" {
		t.Fatalf("%+v", deck)
	}
}
