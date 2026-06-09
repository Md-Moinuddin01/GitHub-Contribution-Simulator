import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { tryDb } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  const passwordHash = await bcrypt.hash(body.password, 10);

  const user = await tryDb(
    (db) =>
      db.user.upsert({
        where: { email: body.email },
        update: { name: body.name, username: body.username, passwordHash },
        create: {
          name: body.name,
          email: body.email,
          username: body.username,
          passwordHash,
          avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${body.username}`,
        },
      }),
    {
      id: `local-${body.username}`,
      name: body.name,
      email: body.email,
      username: body.username,
    },
  );

  return NextResponse.json({ user });
}
