import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { path: string[] } }
) {
  const url = `http://210.79.190.9:7456/${params.path.join("/")}`;
  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}