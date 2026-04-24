# Local Content Workflow

This site is a static Hugo site. A secure web-only admin panel cannot be added to the public site without a real backend and authentication service.

The private workflow added here is local-only:

```bash
./scripts/manage-content.sh new-writeup "Title" "Short description"
./scripts/manage-content.sh new-page "section" "Title"
```

What it does:

- Creates new draft markdown files under `content/`
- Uses restrictive local file permissions through `umask 077`
- Keeps editing private to whoever already has shell access to this machine

Profile image:

- Add your photo at `static/profile.jpg`
- The homepage will render it as a small circular portrait automatically

Publish flow:

1. Create or edit content locally
2. Change `draft = true` to `draft = false`
3. Run `hugo`
4. Deploy the updated site output
