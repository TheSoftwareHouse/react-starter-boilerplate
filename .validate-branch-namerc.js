const pattern = '^(feature|improvement|bugfix|hotfix|release)/[a-zA-Z0-9_.-]+$';

module.exports = {
  pattern,
  errorMsg:
    `There is something wrong with your branch name. Branch names in this project must adhere to this contract: ${pattern}. Your commit will be rejected. You should rename your branch to a valid name and try again.`,
};
