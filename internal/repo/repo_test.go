package repo

import (
	"os"
	"path/filepath"
	"testing"
)

func TestLoadLanguagesOrder(t *testing.T) {
	root := t.TempDir()
	path := filepath.Join(root, LanguagesFile)
	if err := os.WriteFile(path, []byte("default: es\nlanguages:\n  es:\n    name: Español\n  en:\n    name: English\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	cfg, err := LoadLanguages(root)
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Default != "es" {
		t.Fatalf("default %q", cfg.Default)
	}
	got := LanguageCodes(cfg)
	if len(got) != 2 || got[0] != "es" || got[1] != "en" {
		t.Fatalf("%v", got)
	}
}
