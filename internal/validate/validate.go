package validate

import (
	"fmt"
	"path/filepath"
	"strings"
	"unicode"

	"github.com/qu1queee/abc/internal/letters"
	"github.com/qu1queee/abc/internal/repo"
)

func All(root string) []string {
	cfg, err := repo.LoadLanguages(root)
	if err != nil {
		return []string{err.Error()}
	}
	langs := repo.LanguageCodes(cfg)
	if len(langs) == 0 {
		return []string{"languages.yaml has no languages"}
	}
	var errs []string
	for _, lang := range langs {
		meta := cfg.Languages[lang]
		deck, err := letters.Load(root, lang)
		if err != nil {
			errs = append(errs, err.Error())
			continue
		}
		rel := filepath.ToSlash(letters.Path(".", lang))
		errs = append(errs, checkDeck(rel, lang, meta.Name, deck)...)
	}
	return errs
}

func checkDeck(rel, lang, expectedName string, deck letters.Deck) []string {
	var errs []string
	if deck.Lang != lang {
		errs = append(errs, fmt.Sprintf("%s: lang is %q, want %q", rel, deck.Lang, lang))
	}
	if expectedName != "" && deck.Name != expectedName {
		errs = append(errs, fmt.Sprintf("%s: name is %q, want %q", rel, deck.Name, expectedName))
	}
	want := letters.ExpectedUppers(lang)
	if len(deck.Letters) != len(want) {
		errs = append(errs, fmt.Sprintf("%s: %d letters, want %d", rel, len(deck.Letters), len(want)))
	}
	seenID := map[string]bool{}
	seenPic := map[string]bool{}
	for i, let := range deck.Letters {
		prefix := fmt.Sprintf("%s letter %d", rel, i+1)
		if let.ID == "" {
			errs = append(errs, prefix+": missing id")
		} else if seenID[let.ID] {
			errs = append(errs, fmt.Sprintf("%s: duplicate id %q", prefix, let.ID))
		}
		seenID[let.ID] = true
		if let.Upper == "" || let.Lower == "" || let.Name == "" || let.Sound == "" || let.Word == "" || let.Picture == "" {
			errs = append(errs, prefix+": upper, lower, name, sound, word, and picture are required")
		}
		if i < len(want) && let.Upper != want[i] {
			errs = append(errs, fmt.Sprintf("%s: upper is %q, want %q", prefix, let.Upper, want[i]))
		}
		if let.Picture != "" {
			if seenPic[let.Picture] {
				errs = append(errs, fmt.Sprintf("%s: duplicate picture %q", prefix, let.Picture))
			}
			seenPic[let.Picture] = true
		}
		if let.Word != "" && let.Lower != "" && !wordStartsWith(let.Word, let.Lower) {
			errs = append(errs, fmt.Sprintf("%s: word %q does not start with %q", prefix, let.Word, let.Lower))
		}
	}
	return errs
}

func wordStartsWith(word, lower string) bool {
	w := firstLetter(word)
	l := firstLetter(lower)
	return w != "" && w == l
}

func firstLetter(s string) string {
	for _, r := range strings.TrimSpace(s) {
		if !unicode.IsLetter(r) {
			continue
		}
		return string(foldLetter(r))
	}
	return ""
}

func foldLetter(r rune) rune {
	r = unicode.ToLower(r)
	switch r {
	case 'á', 'à', 'ä', 'â', 'ã':
		return 'a'
	case 'é', 'è', 'ë', 'ê':
		return 'e'
	case 'í', 'ì', 'ï', 'î':
		return 'i'
	case 'ó', 'ò', 'ö', 'ô', 'õ':
		return 'o'
	case 'ú', 'ù', 'ü', 'û':
		return 'u'
	default:
		return r
	}
}
