# Vinicius Blog and CMS

This project is my own blog and a a custom-built CMS and blog platform created using Next.js, MDX, React, and other modern web technologies. It allows for easy management of blog posts, including creating, editing, and deleting posts, as well as viewing and liking posts.

## Features

- **Next.js**: Utilizes Next.js for server-side rendering (SSR) and static site generation (SSG) for fast load times and SEO optimization.
- **MDX**: Supports writing blog posts in Markdown with embedded React components.
- **Tailwind CSS**: Uses Tailwind CSS for utility-first styling.
- **Redis**: Manages post views and likes with Redis for fast reads and writes.
- **Admin Access**: Provides an admin interface for managing posts.
- **Authentication**: Includes authentication for admin access using JWT.
- **Responsive Design**: Ensures a seamless experience across different devices.

## Getting Started

### Prerequisites

- Node.js or Bun
- npm or yarn or bun
- Redis server (You can create a free tier instance using [Redis Cloud](https://redis.io/try-free/))

### Installation

1. Clone the repository:
   - `git clone https://github.com/ViniciusCestarii/vinicius-blog.git`
3. Install dependencies:
   - `npm i`
   - `yarn i`
   - `bun i`
5. Set up environment variables:
   - Copy `.env.example` to `.env.local` and fill in the required values.

### Start the development server:
- `npm run dev`
- `yarn dev`
- `bun dev`

Open `http://localhost:3000` with your browser to see the result.

## Usage

### Creating a Post

1. Log in as an admin on `/login` page with the credentials on `.env`.
2. Use the "Create new post" button to open the post creation dialog.
3. Fill in the post name and submit.

### Editing a Post

1. Log in as an admin.
2. Navigate to the post you want to edit.
3. Click the "Edit post" button to open the edit dialog.
4. Make your changes and submit.

### Deleting a Post

1. Log in as an admin.
2. Navigate to the post you want to delete.
3. Click the "Delete post" button.
4. Write the post title and click the "Delete post" button.

## Build

1. Build the project:
   - `npm run build`
   - `yarn build`
   - `bun run build`

2. Start the production server:
   - `node .next/standalone/server.js`
   - `bun .next/standalone/server.js`

## Deployment

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the Next.js deployment documentation for more details.

## Docker

You can also run the project using Docker. To do so, follow these steps:

1. Build the Docker image:
   - `docker build -t vinicius-blog .`
2. Run the Docker container:
   - `docker run -p 3000:3000 vinicius-blog`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redis](https://redis.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)
