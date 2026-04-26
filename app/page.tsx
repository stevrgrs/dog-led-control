"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DEVICE_ID = "dog-device-001";

export default function Home() {
  const [status, setStatus] = useState("Ready");

  async function sendCommand(command: string) {
    setStatus(`Sending ${command}...`);

    const { error } = await supabase.from("device_commands").insert({
      device_id: DEVICE_ID,
      command: command,
    });

    if (error) {
      setStatus(`Error: ${error.message}`);
      return;
    }

    if (command === "dispense_treat") {
      setStatus("Treat is being dispensed...");
    } else {
      setStatus(`Sent: ${command}`);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl mb-6">FreshPaws Control</h1>

      <button
        onClick={() => sendCommand("led_on")}
        className="bg-green-600 p-4 m-2 w-56"
      >
        LED ON
      </button>

      <button
        onClick={() => sendCommand("led_off")}
        className="bg-red-600 p-4 m-2 w-56"
      >
        LED OFF
      </button>

      <button
        onClick={() => sendCommand("blink")}
        className="bg-blue-600 p-4 m-2 w-56"
      >
        BLINK
      </button>

      <button
        onClick={() => sendCommand("dispense_treat")}
        className="bg-purple-600 p-4 m-2 w-56 text-lg font-bold"
      >
        🍖 Dispense Treat
      </button>

      <p className="mt-4 text-yellow-400">{status}</p>
    </main>
  );
}