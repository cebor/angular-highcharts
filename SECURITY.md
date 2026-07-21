# Security Policy

## Supported Versions

Only the latest major version receives security updates.

| Version | Supported          |
| ------- | ------------------ |
| 22.x    | :white_check_mark: |
| < 22.0  | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, report them privately through GitHub's
[Private Vulnerability Reporting](https://github.com/cebor/angular-highcharts/security/advisories/new):
open the repository's **Security** tab and click **Report a vulnerability**.

Please include as much of the following as you can:

- A description of the vulnerability and its impact
- Steps to reproduce (a minimal reproduction is ideal)
- Affected version(s) of `angular-highcharts`
- Any known mitigations or workarounds

### What to expect

- We aim to acknowledge your report as soon as reasonably possible.
- We follow coordinated disclosure: once a fix is available, it is shipped as a
  patch release (via the project's standard release workflow) and, where
  appropriate, published as a GitHub Security Advisory.
- Please give us a reasonable amount of time to address the issue before any
  public disclosure.

## Scope

`angular-highcharts` is a thin Angular wrapper around
[Highcharts](https://www.highcharts.com/). Vulnerabilities in Highcharts itself
are out of scope here and should be reported to Highcharts via their
[security channel](https://www.highcharts.com/security). This policy covers the
Angular wrapper code in this repository.
