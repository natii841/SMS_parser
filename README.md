# Ethio Telecom SMS Parser Telegram Bot

A production-ready Telegram bot built with Node.js and the Telegraf library that parses Ethio Telecom SMS notifications into formatted Markdown reports. It automatically extracts package names, remaining minutes, seconds, and exact expiry timestamps, grouping duplicate packages for a clean summary.

## Features

* **Automated Parsing**: Uses robust regular expressions to extract bundle details, balances, and expiration dates from SMS text.
* **Data Grouping**: Aggregates duplicate package entries into clean, consolidated Markdown views.
* **Polling Architecture**: Runs continuously as a background service listening for incoming Telegram messages.

## Tech Stack

* **Runtime**: Node.js
* **Framework**: Telegraf (`telegraf`)
* **Configuration**: Dotenv (`dotenv`)

---

## Setup & Installation

1. **Clone the repository**:
```bash
git clone https://github.com/nati841/SMS_parser.git
cd SMS_parser

```


2. **Install dependencies**:
```bash
npm install

```


3. **Configure environment variables**:
Create a `.env` file in the root directory and add your Telegram Bot token:
```env
BOT_TOKEN=your_telegram_bot_token_here

```


4. **Run the bot locally**:
```bash
npm start

```



---

## Deployment

To host this bot in production on platforms like Railway, Render, or a custom Linux VPS:

1. Connect your GitHub repository to your hosting provider.
2. Set the build command to `npm install` and the start command/entry point to `index.js`.
3. Add your `BOT_TOKEN` under the project's environment variables dashboard.
