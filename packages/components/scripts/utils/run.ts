import { spawn } from 'child_process';

export default async (command: string, path: string) => {
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
