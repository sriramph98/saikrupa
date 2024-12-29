.ONESHELL:
templates=head.html header.html footer.html

pages=index.html privacy.html
deploy-path=lighttpd@saikrupagas.com:/srv/www/saikrupagas.com/

%.html: %.html.in $(templates)
	m4 $< > $@

all: $(pages)

autorefresh:
	ls | entr make refresh

host:
	python3 -m http.server

# 	osascript -e 'tell application "Arc"' \
	-e 'tell front window's active tab to execute javascript "window.location.reload()"' \
	-e 'end tell' \

refresh: all
	if [ "$$(uname -o)" = "Darwin" ]; then \
		osascript -e 'set frontApp to (path to frontmost application as text)' \
-e 'tell application "Arc" to activate' \
-e 'tell application "System Events" to keystroke "r" using {command down}' \
-e 'delay 0.1' \
-e 'tell application frontApp to activate' \
	else \
		xdotool search --onlyvisible --class firefox* windowfocus --sync key F5; \
	fi

deploy-src: all
	scp -r $(wildcard *.html) $(shell git ls-files) $(deploy-path)

deploy-assets:
	scp -r assets $(deploy-path)

deploy: deploy-src deploy-assets

clean:
	-@rm $(foreach page,$(pages),$(page))

build:
	mkdir -p dist
	m4 index.html.in > dist/index.html
	m4 privacy.html.in > dist/privacy.html
	mkdir -p dist/components
	cp components/emergency-cta.html dist/components/
