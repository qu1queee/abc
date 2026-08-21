package webexport

import (
	"encoding/json"
	"io/fs"
	"os"
	"path/filepath"
	"time"

	"github.com/qu1queee/abc/internal/letters"
	"github.com/qu1queee/abc/internal/repo"
)

type Catalog struct {
	GeneratedAt string          `json:"generatedAt"`
	DefaultLang string          `json:"defaultLang"`
	Decks       []letters.Deck  `json:"decks"`
}

func BuildCatalog(root string) (Catalog, error) {
	cfg, err := repo.LoadLanguages(root)
	if err != nil {
		return Catalog{}, err
	}
	langs := repo.LanguageCodes(cfg)
	decks, err := letters.LoadAll(root, langs)
	if err != nil {
		return Catalog{}, err
	}
	return catalogFrom(cfg.Default, decks), nil
}

func BuildCatalogFS(fsys fs.FS) (Catalog, error) {
	cfg, err := repo.LoadLanguagesFS(fsys)
	if err != nil {
		return Catalog{}, err
	}
	langs := repo.LanguageCodes(cfg)
	decks, err := letters.LoadAllFS(fsys, langs)
	if err != nil {
		return Catalog{}, err
	}
	return catalogFrom(cfg.Default, decks), nil
}

func catalogFrom(defaultLang string, decks []letters.Deck) Catalog {
	return Catalog{
		GeneratedAt: time.Now().UTC().Format(time.RFC3339),
		DefaultLang: defaultLang,
		Decks:       decks,
	}
}

func WriteLetters(root string) (string, int, error) {
	cat, err := BuildCatalog(root)
	if err != nil {
		return "", 0, err
	}
	data, err := json.MarshalIndent(cat, "", "  ")
	if err != nil {
		return "", 0, err
	}
	out := filepath.Join(root, "docs", "data", "letters.json")
	if err := os.MkdirAll(filepath.Dir(out), 0o755); err != nil {
		return "", 0, err
	}
	if err := os.WriteFile(out, append(data, '\n'), 0o644); err != nil {
		return "", 0, err
	}
	n := 0
	for _, d := range cat.Decks {
		n += len(d.Letters)
	}
	rel, _ := filepath.Rel(root, out)
	return filepath.ToSlash(rel), n, nil
}
