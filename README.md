# Commit Rules
## inntroduction
These commit rules are designed to ensure consistency and clarity in our version control history. By following these guidelines, we can maintain a clean and understandable project history.

## Commit Types

- feat: Commits that add a new feature
Example: `git commit -m "feat(profile): add button for update call`
- fix: Commits that fix a bug
Example: `git commit -m "fix(login): correct authentication error`
- refactor: Commits that restructure code without changing behavior
Example: `git commit -m "refactor(database): optimize query performance`
- perf: Commits that improve performance
Example: `git commit -m "perf(api): reduce response time`
- style: Commits that do not affect the meaning of the code (white space, formatting, etc.)
Example: `git commit -m "style(css): format header styles`
- test: Commits that add or correct tests
Example: `git commit -m "test(api): add tests for user endpoint`
- docs: Commits that affect documentation only
Example: `git commit -m "docs(readme): update commit rules`
- build: Commits that affect build components like build tools, CI pipeline, dependencies, etc.
Example: `git commit -m "build(ci): add new deployment script`
- chore: Miscellaneous commits (e.g., modifying .gitignore)
Example: `git commit -m "chore(gitignore): add new patterns`

## Commit Rules

1. **Each commit should have a single clear purpose.**  
   Do not mix fixes, features, and refactors in the same commit.

2. **The scope is mandatory.**  
   It should be a noun in English that identifies the affected module (e.g., `auth`, `db`, `profile`).

3. **Commit messages must be written in English.**  
   Use clear, concise English messages so the whole team can understand.

4. **Commit messages must be in imperative present tense.**  
   Use verbs like `add`, `fix`, `remove`, not `added`, `fixed`, `removed`.

5. **Style changes (spaces, formatting) must be in separate commits.**  
   Never mix formatting changes with functional code changes.

6. **Run Biome before committing.**  
   Execute `biome check ./src --write` to ensure proper style and import order.

7. **Commit Small, Atomic Changes.**                                                                                                                                                       
   Keep commits focused on a single logical change, to simplify review and rollback.

## Branching Rules 

###  General Workflow

1. **`main`**  
   - Must always be **stable** and production-ready.  
   - Only merge **approved and tested** code from `dev`.  
   - All PRs to `main` must pass **CI** and be **reviewed**.

2. **`dev`**  
   - Integration and internal testing branch.  
   - All `feature/*`, `bugfix/*`, etc. branches are merged here first.  
   - Never develop directly in `dev`.

3. **Development Branches**
   - Use clear prefixes:
     - `feature/feature-name`
     - `bugfix/bug-description`
     - `refactor/refactor-area`
   - Examples:
     - `feature/auth-login`
     - `bugfix/login-error-401`
     - `refactor/api-endpoints`

### Branching Best Practices

- **Create branches from `dev`**, never from `main`.
- Use descriptive names; avoid generic ones like `test`, `fix`, or `change`.
- **Do not commit directly to `main` or `dev`**.

### Pull Requests (PR)

- **Always use PRs** when merging into `dev` or `main`.
- **No direct merges** allowed.
- A good PR should:
  - Be **reviewed** by at least one team member.
  - Have a clear **title** and **description**.
  - Avoid unnecessary commits or WIP commits.
  - Be clean: **use squash** if the branch has many commits.

### Branch Cleanup

- **Delete your branch** locally and remotely after it’s merged to avoid clutter:
  ```sh
  git branch -d feature/branch-name        # local
  git push origin --delete feature/branch-name  # remote

