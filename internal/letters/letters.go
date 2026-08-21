package letters

import (
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

type Deck struct {
	Lang    string   `yaml:"lang" json:"lang"`
	Name    string   `yaml:"name" json:"name"`
	Letters []Letter `yaml:"letters" json:"letters"`
}

type Letter struct {
	ID      string `yaml:"id" json:"id"`
	Upper   string `yaml:"upper" json:"upper"`
	Lower   string `yaml:"lower" json:"lower"`
	Name    string `yaml:"name" json:"name"`
	Sound   string `yaml:"sound" json:"sound"`
	Word    string `yaml:"word" json:"word"`
	Picture string `yaml:"picture" json:"picture"`
}

func Path(root, lang string) string {
	return filepath.Join(root, "letters", lang+".yaml")
}

func Load(root, lang string) (Deck, error) {
	return LoadFile(Path(root, lang))
}

func LoadFile(path string) (Deck, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Deck{}, err
	}
	var deck Deck
	if err := yaml.Unmarshal(data, &deck); err != nil {
		return Deck{}, fmt.Errorf("%s: %w", path, err)
	}
	return deck, nil
}

func LoadAll(root string, langs []string) ([]Deck, error) {
	out := make([]Deck, 0, len(langs))
	for _, lang := range langs {
		deck, err := Load(root, lang)
		if err != nil {
			return nil, err
		}
		out = append(out, deck)
	}
	return out, nil
}

// ExpectedUppers is the RAE Spanish alphabet (Ñ after N) or English A–Z.
func ExpectedUppers(lang string) []string {
	letters := make([]string, 0, 27)
	for r := 'A'; r <= 'Z'; r++ {
		if lang == "es" && r == 'O' {
			letters = append(letters, "Ñ")
		}
		letters = append(letters, string(r))
	}
	return letters
}
