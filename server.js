const { Telegraf } = require('telegraf');

require('dotenv').config();
const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

console.log('Bot is running and listening for messages...');

bot.on('text', (ctx) => {
  const rawText = ctx.message.text;

  console.log('Received message:', rawText);

  if (rawText.startsWith('/')) {
    ctx.reply('Paste the damn link.');
    return;
  }

  let parsedResults = [];

  const balancePattern =
    /from\s+(.+?)\s+is\s+(\d+)\s+minute[s]?\s+and\s+(\d+)\s+second[s]?\s+with\s+expiry\s+date\s+on\s+(\d{4}-\d{2}-\d{2})(?:\s+at)?\s+(\d{2}:\d{2}:\d{2})/gi;
  let match;

  while ((match = balancePattern.exec(rawText)) !== null) {
    const packageName = match[1]
      .replace(/\s+to be expired after \d+ days/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    const minutes = match[2];
    const seconds = match[3];
    const expiryDate = `${match[4]} ${match[5]}`;

    parsedResults.push({ packageName, minutes, seconds, expiryDate });
  }

  if (parsedResults.length > 0) {
    const groupedPackages = new Map();

    for (const result of parsedResults) {
      if (!groupedPackages.has(result.packageName)) {
        groupedPackages.set(result.packageName, []);
      }
      groupedPackages.get(result.packageName).push(result);
    }

    const packageMessages = [...groupedPackages.entries()].map(
      ([packageName, balances]) => {
        const balanceLines = balances
          .map(
            ({ minutes, seconds, expiryDate }) =>
              `${minutes}m ${seconds}s | ${expiryDate}`
          )
          .join('\n');

        return `📦 *${packageName}*\n${balanceLines}`;
      }
    );
    const responseMessage = packageMessages.join('\n\n');
    ctx.reply(responseMessage, { parse_mode: 'Markdown' });
  } else {
    ctx.reply('Could not find package balance details in that SMS.');
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
