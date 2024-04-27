import { Terminal } from "@xterm/xterm";
import '@xterm/xterm/css/xterm.css'
import { useRef, useEffect } from "react";

function Xterm() {
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const term = new Terminal({ convertEol: true });
    term.open(termRef.current!); // Accessing the current value of termRef

    term.writeln('Welcome to xterm.js Terminal!');
    term.writeln('Enter your commands here.');
    
    term.onKey((e) => {
      console.log(e)
      const printable = !e.key.includes("\\u");
      if (e.domEvent.key === 'Enter') {
        term.write('\n');
        
        //https://xtermjs.org/docs/api/terminal/interfaces/ibuffer/
        const buffer = term.buffer.active;
        if (buffer) {
          const bufferText = buffer?.getLine(buffer?.cursorY - 1)?.translateToString()
          console.log(bufferText);
        }

      } else if (printable) {
        term.write(e.key);
      }
    });
    term.options = {
      fontSize: 16,
      fontFamily: 'Courier New'
    };
  }, []);

  return (<>
  <div className=" text-white pt-1 pl-3 border-b">Terminal</div>
  <div className="pl-3 pt-1" ref={termRef}></div>
  </>);
}

export default Xterm;
