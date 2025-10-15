.PHONY: help
help: makefile
	@tail -n +4 makefile | grep ".PHONY"


.PHONY: build
build:
	rm -rf dist
	@echo "Building project to dist/ …"
	mkdir -p dist/css dist/js
	npx stylus source/styl/screen.styl -o dist/css/screen.css
	cp source/js/index.js dist/js/
	cp node_modules/mousetrap/mousetrap.js dist/js/
	cp source/index.html dist/index.html


.PHONY: dev  # Start development server
dev: build
	@npx http-server dist -p 4788 -o


.PHONY: clean
clean:
	rm -rf dist
	rm -rf node_modules
