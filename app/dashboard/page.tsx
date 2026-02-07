"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error fetching API"));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4 text-gray-700">{message}</p>
    </div>
  );
}
