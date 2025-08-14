"use client";

import { trpc } from "@/trpc/client";

export default function Home() {
  const { data } = trpc.auth.session.useQuery();

  console.log(data);

  return <div>{JSON.stringify(data?.user)}</div>;
}
