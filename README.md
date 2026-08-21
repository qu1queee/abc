# Abc

Picture-book alphabet for kids (EN + ES, including Ñ). One letter per page. [Web](https://qu1queee.github.io/abc/).

Decks: `letters/en.yaml`, `letters/es.yaml`. Needs Go 1.25+.

```sh
make test validate export   # CLI
make preview                # http://127.0.0.1:8080
make doctor                 # Wails check (once)
make dev                    # desktop from source
make app                    # build/bin/Abc.app
```

Mac build (unsigned, Apple Silicon): [Releases](https://github.com/qu1queee/abc/releases) after a `v*` tag. First open: right-click → Open.
