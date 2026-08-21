package main

import (
	"context"
	"io/fs"

	"github.com/qu1queee/abc/internal/repo"
	"github.com/qu1queee/abc/internal/webexport"
)

type App struct {
	ctx   context.Context
	decks fs.FS
}

func NewApp(decks fs.FS) *App {
	return &App{decks: decks}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// GetCatalog returns the letter books. Uses the repo on disk when running from
// the source tree; otherwise the YAML embedded in the binary.
func (a *App) GetCatalog() (webexport.Catalog, error) {
	if root, err := repo.FindRoot(); err == nil {
		return webexport.BuildCatalog(root)
	}
	return webexport.BuildCatalogFS(a.decks)
}
