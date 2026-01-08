\# Evinced Playwright SDK Assignment



This project demonstrates how to integrate the Evinced Playwright JS SDK

into a Playwright test suite and generate accessibility HTML reports.



\## What’s included



\### Tests

\- \*\*Home page navigation test\*\*

&nbsp; - Navigates to the home page

&nbsp; - Runs a one-time accessibility scan using `evAnalyze()`

\- \*\*Consultation flow test\*\*

&nbsp; - Navigates through a consultation flow

&nbsp; - Triggers validation states

&nbsp; - Runs a continuous accessibility scan using `evStart()` / `evStop()`



\### Reports

\- Evinced accessibility reports are generated in HTML format

\- Reports are saved under:

evinced-reports/







\### Scaling example

\- An example of integrating Evinced at scale using a Playwright fixture

is included under:

tests/scaled/





\## Prerequisites

\- Node.js

\- Playwright browsers:

npx playwright install





\## Environment variables

The following environment variables are required:

\- `EVINCED\_SERVICE\_ID`

\- `EVINCED\_API\_KEY`



(Installation of the SDK requires a JFrog token, which is not committed.)



\## Install

npm install





\## Run tests

npx playwright test





\## View Playwright test report

npx playwright show-report --port 9324





If localhost does not open on Windows, use:

http://\[::1]:9324





\## View Evinced reports

Open the HTML files under:

evinced-reports/


**## Screenshots

Relevant screenshots from the test execution (including validation states)
are included under:

evinced-reports/screenshots/


These screenshots were copied from Playwright’s temporary `test-results`
folder into a stable location so they can be reviewed in the repository.


