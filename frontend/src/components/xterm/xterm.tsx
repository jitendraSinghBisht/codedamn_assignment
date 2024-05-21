import { Terminal } from "@xterm/xterm";
import { AttachAddon } from "@xterm/addon-attach";
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css'
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { containerData } from "../store/slice/container.slice";

function Xterm() {

  const container = useSelector(containerData)

  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const term = new Terminal({ convertEol: true });
    term.open(termRef.current!); // Accessing the current value of termRef

    const socket = new WebSocket(`${container.wsurl}/container/${container.containerId}`)
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
  }, [termRef, container]);

  return (<>
  <div className=" text-white pt-1 pl-3 border-b">Terminal</div>
  <div className="pl-3 pt-1 mb-2 overflow-scroll h-[90%] w-full min-h-[]" ref={termRef}></div>
  </>);
}

export default Xterm;
