"use client";
import { useState, useEffect } from "react";
import { ApiClient } from "./client";

export default function Home() {
  const client = new ApiClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return <div> Hello World</div>;
}
