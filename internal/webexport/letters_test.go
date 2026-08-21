package webexport

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestWriteLetters(t *testing.T) {
	root := t.TempDir()
	write(t, filepath.Join(root, "languages.yaml"), "default: es\nlanguages:\n  es:\n    name: Español\n")
	write(t, filepath.Join(root, "letters", "es.yaml"), `lang: es
name: Español
letters:
  - id: a
    upper: A
    lower: a
    name: a
    sound: a de árbol
    word: árbol
    picture: tree
`)
	path, n, err := WriteLetters(root)
	if err != nil {
		t.Fatal(err)
	}
	if n != 1 {
		t.Fatalf("n=%d", n)
	}
	data, err := os.ReadFile(filepath.Join(root, path))
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(data), `"defaultLang": "es"`) || !strings.Contains(string(data), "árbol") {
		t.Fatalf("%s", data)
	}
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
