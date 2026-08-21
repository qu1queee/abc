package cli

import (
	"flag"
	"fmt"
	"os"

	"github.com/qu1queee/abc/internal/repo"
	"github.com/qu1queee/abc/internal/validate"
	"github.com/qu1queee/abc/internal/webexport"
)

func Run(args []string) int {
	if len(args) == 0 {
		usage()
		return 2
	}
	cmd, rest := args[0], args[1:]
	switch cmd {
	case "validate":
		return cmdValidate(rest)
	case "web-export":
		return cmdWebExport(rest)
	case "-h", "--help", "help":
		usage()
		return 0
	default:
		fmt.Fprintf(os.Stderr, "unknown command: %s\n", cmd)
		usage()
		return 2
	}
}

func usage() {
	fmt.Fprintf(os.Stderr, `abc — kid alphabet book tooling

Usage:
  go run ./cmd/abc <command> [flags]

Commands:
  validate     Check letter decks
  web-export   Write docs/data/letters.json for GitHub Pages
`)
}

func mustRoot() (string, int) {
	root, err := repo.FindRoot()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return "", 1
	}
	return root, 0
}

func cmdValidate(args []string) int {
	root, code := mustRoot()
	if code != 0 {
		return code
	}
	fs := flag.NewFlagSet("validate", flag.ContinueOnError)
	if err := fs.Parse(args); err != nil {
		return 2
	}
	errs := validate.All(root)
	if len(errs) > 0 {
		for _, e := range errs {
			fmt.Fprintln(os.Stderr, e)
		}
		return 1
	}
	fmt.Println("All letter decks passed validation.")
	return 0
}

func cmdWebExport(args []string) int {
	root, code := mustRoot()
	if code != 0 {
		return code
	}
	fs := flag.NewFlagSet("web-export", flag.ContinueOnError)
	if err := fs.Parse(args); err != nil {
		return 2
	}
	path, n, err := webexport.WriteLetters(root)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return 1
	}
	fmt.Printf("Wrote %s (%d letters)\n", path, n)
	return 0
}
