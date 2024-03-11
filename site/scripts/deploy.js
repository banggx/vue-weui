import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const run = async (command, path) => {
  const [cmd, ...args] = command.split(' ');
  return new Promise((resolve) => {
    const app = spawn(cmd, args, {
      cwd: path,
      stdio: 'inherit',
      shell: true
    });
    app.on('close', resolve);
  });
};

run('deploy.sh', resolve(__dirname, '../'));
