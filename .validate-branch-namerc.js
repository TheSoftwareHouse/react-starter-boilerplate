const commitizenTypes = ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'];
const pattern = `^((${commitizenTypes.join('|')})(\/[a-zA-Z0-9_.-]+){1,2}|changeset-release/master)$`;

module.exports = {
  pattern,
  errorMsg: `There is something wrong with your branch name. Branch names in this project must adhere to this contract: ${pattern}. Your commit will be rejected. You should rename your branch to a valid name and try again.`,
};
