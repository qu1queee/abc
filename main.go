package main

import (
	"embed"
	"io/fs"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

//go:embed all:docs
var docsFS embed.FS

//go:embed languages.yaml
//go:embed letters/*.yaml
var decksFS embed.FS

func main() {
	ui, err := fs.Sub(docsFS, "docs")
	if err != nil {
		log.Fatal(err)
	}
	app := NewApp(decksFS)

	err = wails.Run(&options.App{
		Title:  "Abc",
		Width:  520,
		Height: 820,
		AssetServer: &assetserver.Options{
			Assets: ui,
		},
		BackgroundColour: &options.RGBA{R: 244, G: 234, B: 214, A: 255},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		Mac: &mac.Options{
			TitleBar:             mac.TitleBarDefault(),
			Appearance:           mac.NSAppearanceNameAqua,
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			About: &mac.AboutInfo{
				Title:   "Abc",
				Message: "A picture-book alphabet for kids, in English and Español.",
			},
		},
	})
	if err != nil {
		log.Fatal(err)
	}
}
