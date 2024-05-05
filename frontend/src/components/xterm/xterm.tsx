import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css'
import { useRef, useEffect } from "react";

function Xterm() {
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const term = new Terminal({ convertEol: true });
    term.open(termRef.current!); // Accessing the current value of termRef

    const url =`ws://localhost:2375/containers/ea4ab66984e6/attach/ws?stream=1&stdout=1&stdin=1&logs=1`
    const socket = new WebSocket(url)
    const attachAddon = new AttachAddon(socket)
    term.loadAddon(attachAddon)
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    fitAddon.fit();

    new ResizeObserver(
      () => {
        fitAddon.fit();
      }
  ).observe(termRef.current!);
  }, [termRef]);

  return (<>
  <div className=" text-white pt-1 pl-3 border-b">Terminal</div>
  <div className="pl-3 pt-1 mb-2 overflow-scroll h-[90%] w-full min-h-[]" ref={termRef}></div>
  </>);
}

export default Xterm;
