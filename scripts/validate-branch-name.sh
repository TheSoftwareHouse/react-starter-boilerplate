#!/bin/bash

local_branch_name="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_name_regex='^(feature|improvement|bugfix|hotfix|release)\/[a-zA-Z0-9\_\.\-]+$'

message="There is something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_name_regex. Your commit will be rejected. You should rename your branch to a valid name and try again."

if [[ ! $local_branch_name =~ $valid_branch_name_regex ]]; then
    echo "$message"
    exit 1
fi

exit 0
