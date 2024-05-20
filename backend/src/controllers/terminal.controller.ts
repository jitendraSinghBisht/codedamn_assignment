import Docker from 'dockerode';
import { WebSocket } from 'ws';

const docker = new Docker();

export async function terminalConnect(ws: WebSocket, containerId: string) {
  console.log('Client connected');

  try {
    const container = await docker.getContainer(containerId);
    const exec = await container.exec({
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ['sh'],
    });

    const stream = await exec.start({
      hijack: true,
      stdin: true,
    });

    ws.on('message', (message) => {
      stream.write(message);
    });

    stream.on('data', (data) => {
      ws.send(data.toString());
    });

    stream.on('end', () => {
      console.log('Stream ended');
      ws.close();
    });

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      ws.close();
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      stream.end();
      container.stop();
      container.remove();
    });

  } catch (error) {
    console.error('Error:', error);
    ws.close();
  }
}