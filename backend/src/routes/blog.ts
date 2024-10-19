import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware
blogRouter.use(async (c, next) => {
  const jwt = c.req.header("authorization") || "";
  if (!jwt) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }

  const token = jwt.split(" ")[1];
  const payload = (await verify(token, c.env.JWT_SECRET)) as { userId: string };
  if (!payload) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }

  c.set("userId", payload.userId as string);
  await next();
});

// Post route
blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({
    id: post.id,
  });
});

// Put route
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("updated post");
});

// Get route
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    return c.json(post);
  } catch {
    c.status(404);
    return c.json({
      message: "Error while fetching blog",
    });
  }
});
