"use client";

export default function ErrorWrapper({ error }: { error: Error }) {
  return <h1>OOps!!! {error.message}</h1>;
}
