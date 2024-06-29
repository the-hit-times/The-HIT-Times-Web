# Contribute to The HIT Times Website

Thank you for considering contributing to our project! To ensure a smooth and efficient collaboration, please follow these guidelines when making contributions.

## Branch Naming Convention

1. **Fixing Bugs**
   - Use the following format for bug fix branches: `fix/<fix-branch-name>`
   - Example: `fix/login-issue`

2. **Adding Features**
   - Use the following format for feature branches: `feat/<feature-branch-name>`
   - Example: `feat/user-authentication`

3. **Other Branch Types**
   - For other types of work, use a descriptive name:
     - **Documentation:** `docs/<documentation-branch-name>`
       - Example: `docs/update-readme`
     - **Chore:** `chore/<chore-branch-name>`
       - Example: `chore/update-dependencies`

## Code Formatting

- Ensure your code is formatted using Prettier before committing.
- You can run Prettier with the following command:
  ```sh
  npx prettier --write .
  ```
- You can use Prettier extension in VS Code or any other editor.
## Pull Request Guidelines

1. **Descriptive Titles and Messages**
   - Provide a clear and concise title for your pull request.
   - Include a detailed description of what your pull request does, why it’s needed, and any additional information that might be helpful for reviewers.

2. **Reference Issues**
   - If your pull request addresses an issue, include a reference to that issue in your pull request description.
   - Example: `Fixes #123`

3. **Review and Approval**
   - Ensure your code is reviewed and approved by at least one other team member before merging.

4. **Commit Messages**
   - Use clear and descriptive commit messages.
   - Follow the convention:
     ```
     <type>(<scope>): <subject>
     ```

   - Example: 
     ```
     feat(auth): add login functionality
     fix(api): handle error responses correctly
     ```

## Contribution Workflow

1. **Fork the Repository**
   - Fork the repository to your own GitHub account.

2. **Clone the Repository**
   - Clone the forked repository to your local machine.
   ```sh
   git clone https://github.com/the-hit-times/The-HIT-Times-Web.git
   ```

3. **Create a Branch**
   - Create a new branch using the appropriate naming convention.
   ```sh
   git checkout -b fix/login-issue
   ```

4. **Make Changes**
   - Make your changes in the new branch.
   - Ensure code is formatted with Prettier and tests are passing.

5. **Commit and Push**
   - Commit your changes with a descriptive message.
   - Push the branch to your forked repository.
   ```sh
   git push origin fix/login-issue
   ```

6. **Create a Pull Request**
   - Navigate to the original repository and create a pull request from your forked repository.
   - Fill in the pull request template with all required information.

We appreciate your contributions and efforts in improving our project. Thank you!

---

For any questions or additional guidance, feel free to reach out to the maintainers or refer to the project documentation.