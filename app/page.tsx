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

    setStatus(`Sent: ${command}`);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-2xl mb-6">Dog Device Control</h1>

      <button onClick={() => sendCommand("led_on")} className="bg-green-600 p-4 m-2 w-40">
        LED ON
      </button>

      <button onClick={() => sendCommand("led_off")} className="bg-red-600 p-4 m-2 w-40">
        LED OFF
      </button>

      <button onClick={() => sendCommand("blink")} className="bg-blue-600 p-4 m-2 w-40">
        BLINK
      </button>

      <p className="mt-4">{status}</p>
    </main>
  );
}