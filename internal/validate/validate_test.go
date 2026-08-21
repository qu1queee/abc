package validate

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestWordStartsWith(t *testing.T) {
	cases := []struct {
		word, lower string
		ok          bool
	}{
		{"apple", "a", true},
		{"árbol", "a", true},
		{"niño", "n", true},
		{"ñandú", "ñ", true},
		{"x-ray", "x", true},
		{"ball", "a", false},
	}
	for _, c := range cases {
		if got := wordStartsWith(c.word, c.lower); got != c.ok {
			t.Errorf("%s / %s: got %v want %v", c.word, c.lower, got, c.ok)
		}
	}
}

func TestAll(t *testing.T) {
	root := t.TempDir()
	write(t, filepath.Join(root, "languages.yaml"), "default: en\nlanguages:\n  en:\n    name: English\n")
	var b strings.Builder
	b.WriteString("lang: en\nname: English\nletters:\n")
	for r := 'A'; r <= 'Z'; r++ {
		low := strings.ToLower(string(r))
		word := low + "word"
		fmtLetter(&b, low, string(r), low, word)
	}
	write(t, filepath.Join(root, "letters", "en.yaml"), b.String())
	if errs := All(root); len(errs) != 0 {
		t.Fatalf("%v", errs)
	}
}

func TestAllRejectsShortDeck(t *testing.T) {
	root := t.TempDir()
	write(t, filepath.Join(root, "languages.yaml"), "default: en\nlanguages:\n  en:\n    name: English\n")
	write(t, filepath.Join(root, "letters", "en.yaml"), "lang: en\nname: English\nletters:\n  - id: a\n    upper: A\n    lower: a\n    name: ay\n    sound: a as in apple\n    word: apple\n    picture: apple\n")
	errs := All(root)
	if len(errs) == 0 {
		t.Fatal("expected errors")
	}
}

func fmtLetter(b *strings.Builder, id, upper, lower, word string) {
	b.WriteString("  - id: ")
	b.WriteString(id)
	b.WriteString("\n    upper: ")
	b.WriteString(upper)
	b.WriteString("\n    lower: ")
	b.WriteString(lower)
	b.WriteString("\n    name: ")
	b.WriteString(id)
	b.WriteString("\n    sound: ")
	b.WriteString(lower)
	b.WriteString(" as in ")
	b.WriteString(word)
	b.WriteString("\n    word: ")
	b.WriteString(word)
	b.WriteString("\n    picture: ")
	b.WriteString(id)
	b.WriteString("\n")
}

func write(t *testing.T, path, body string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte(body), 0o644); err != nil {
		t.Fatal(err)
	}
}
