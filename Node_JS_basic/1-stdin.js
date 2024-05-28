process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('readable', () => {
  const content = process.stdin.read();

  if (content) process.stdout.write(`Your name is: ${content}`);
});

process.stdin.on('close', () => {
  process.stdout.write('This important software is now closing\n');
});
