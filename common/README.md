# @2ssk/medium-common

A TypeScript utility library that provides Zod schemas and TypeScript types for handling common inputs such as authentication and post management. This library can be used to validate input data for user signup, and post creation or updates in a TypeScript or JavaScript application.

## Features

- **Zod schemas** for validating user and post input data.
- **TypeScript** inferred from Zod schemas, ensuring type safety.
- Ready to integrate into your backend or frontend for input validation.

## Installation

```bash
npm install @2ssk/medium-common
```

or with yarn:

```bash
yarn add @2ssk/medium-common
```

## Usage

#### Importing Schemas and Types

You can import the Zod schemas and types for validating and typing your input data.

```typescript
import {
  signupInput,
  signinInput,
  createPostInput,
  updatePostInput,
} from "@2ssk/medium-common";
import type {
  SignupInput,
  SigninInput,
  CreatePostInput,
  UpdatePostInput,
} from "@2ssk/medium-common";
```

#### Validating Example

Use the schemas to validate data for signup, signin, and post creation or updates.

```typescript
import {
  signupInput,
  signinInput,
  createPostInput,
  updatePostInput,
} from "@2ssk/medium-common";

const signupData = {
  email: "user@email.com",
  password: "password",
  name: "User",
};

try {
  signupInput.parse(signupData); // Validates the signup data
  console.log("Signup data is valid");
} catch (error) {
  console.error("Signup validation error", error);
}

const postData = {
  title: "My First Post",
  content: "This is the content of the post.",
};

try {
  createPostInput.parse(postData); // validates the post creation data
  console.log("Post data is valid");
} catch (error) {
  console.error("Post creation validation error", error);
}
```

## TypeScript Integration Example

You can also infer TypeScript types from the Zod schemas for strict checking.

```typescript
import { SigninInput, createPostType } from "@2ssk/medium-common";

const signup: SignupInput = {
  email: "user@example.com",
  password: "password",
  name: "SSK", // Optional field
};

const newPost: CreatePostType = {
  title: "My First Post",
  content: "This is the content of the post.",
};
```

## Zod Schemas

- **Signup Input:**

```typescript
const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string().optional(),
});
```

- **Signin Input:**

```typescript
const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});
```

- **Create Post Input:**

```typescript
const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});
```

- **Update Post Input:**

```typescript
const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
```

## TypeScript Types

- **SignupInput** - TypeScript type for the `signupInput` schema.
- **SigninInput** - TypeScript type for the `signinInput` schema.
- **createPostInput** - TypeScript type for the `createPostInput` schema.
- **updatePostInput** - TypeScript type for the `updatePostInput` schema.

## License

This project is licensed under the MIT License.
