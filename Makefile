.PHONY: dev new-post serve

dev:
	python3 -m http.server 8080

serve: dev

# Create a new blog post
# Usage: make new-post title="My Post Title"
# Creates: _posts/YYYY-MM-MM-my-post-title.md
new-post:
ifndef title
	@echo "Usage: make new-post title=\"Your Post Title\""
	@exit 1
endif
	@mkdir -p _posts
	@DATE=$$(date +%Y-%m-%d); \
	SLUG=$$(echo "$(title)" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-'); \
	FILE="_posts/$$DATE-$$SLUG.md"; \
	echo "---" > "$$FILE"; \
	echo "title: $(title)" >> "$$FILE"; \
	echo "date: $$(date +'%B %d, %Y')" >> "$$FILE"; \
	echo "type: article  # or video" >> "$$FILE"; \
	echo "youtube:       # fill if type is video" >> "$$FILE"; \
	echo "---" >> "$$FILE"; \
	echo "" >> "$$FILE"; \
	echo "Write your content here..." >> "$$FILE"; \
	echo "" >> "$$FILE"; \
	echo "## Section 1" >> "$$FILE"; \
	echo "Your content goes here." >> "$$FILE"; \
	echo "Created $$FILE" && open "$$FILE"

# List all posts
posts:
	@echo "Blog Posts:"; ls -la posts/*.html 2>/dev/null || echo "No posts yet"; echo ""; echo "Markdown sources:"; ls -la _posts/*.md 2>/dev/null || echo "No markdown files yet"

# Add a new post from markdown (manual conversion required)
# 1. Write your post in _posts/*.md
# 2. Convert to HTML (use online converter or markdown tool)
# 3. Save as posts/YYYY-MM-DD-slug.html
add-post:
	@echo "To add a new post:"; echo "1. Run: make new-post title='Your Title'"; echo "2. Write content in _posts/YYYY-MM-DD-slug.md"; echo "3. Convert markdown to HTML and save to posts/"; echo "4. Add the post to index.html blog section"
