## Commitlint

Commitlint rules are based on regex - it split commit message into two groups:
- type
- subject

Behaviour of this two groups can be modified using rules object - [API Reference](https://commitlint.js.org/#/reference-rules)

How should commit message looks like:
- [RSS-123] commit message
- [RSS-123][RSS-124] commit message
- [HOTFIX] commit message

If commit message will not be valid there will be information that type and subject may not by empty.