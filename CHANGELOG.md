# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-02-22

### Added

- Attachment handling
- Monitoring and displaying information about the status of the Internet connection
- Support for resending error messages
- This CHANGELOG

### Changed

- New required theme property ```messageErrorColor``` with default value: ```'#EB5249'```
- Updated README.md documentation with additional required post-install steps for iOS  ```pod install``` and add ```NSPhotoLibraryUsageDescription``` key to your ```Info.plist```.

### Fixed

- Handling potential problems with interpretation of property hitSlop for iOS
- Problem with ```Changing onViewableItems on the fly is not supported``` in ```markNewMessageAsRead```
- Draft messages order

## [0.1.8] - 2024-02-05

### Added
- Init repo
