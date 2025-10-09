#!/bin/bash

# This script removes large video files from Git history

echo "Removing large video files from Git history..."

# Use git filter-repo to remove video folder from all commits
# If you don't have git filter-repo, use filter-branch (slower but works)

# Method 1: Using git filter-branch (built-in)
git filter-branch --force --index-filter \
  "git rm -r --cached --ignore-unmatch video/" \
  --prune-empty --tag-name-filter cat -- --all

echo "Cleaning up..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Done! Now force push to GitHub:"
echo "git push origin main --force"

