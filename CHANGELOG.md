# Changelog

## [v0.2.2]

### Changed
- Remove requirement for GitHub PAT from non docker builds.

## [v0.2.1]

### Changed

- Model Schema Post Hook Fixed - Changed to `findOneAndUpdate` to catch duplicate key errors when updating documents.
- Rename env var - `BACKEND_PORT` => `PORT`

## [v0.2.0]

### Added
- New Scalars `JWT` and `EmailAddress` for Validation.
- Historical Stats - Provided by Mongo Filter Generator

### Changed
- Mongo Filter Generator Updated - Support for Historical Stats
- Moved to Federation 2
- GraphQL 16
- TypeDefs and Resolver Folders Reorganized
- Updated `GetAccountsInput` with standarized parameters `query` and `config`. 
- Updated Scalar `DateTime`  provided by the Mongo Filter Generator Library.
- Codegen specifies scalar types

### Removed
- Validators using `validator`

