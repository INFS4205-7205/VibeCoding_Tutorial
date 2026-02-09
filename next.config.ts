import type { NextConfig } from "next";

const repoName = process.env.NEXT_PUBLIC_REPO_NAME || "VibeCoding_Tutorial";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
