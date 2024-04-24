import type { NextApiRequest, NextApiResponse } from 'next'

const item = {
  repo_id: 772699441,
  repo_full_name: "meta-llama/llama3",
  repo_link: "https://github.com/meta-llama/llama3",
  repo_github_url: "https://api.github.com/repos/meta-llama/llama3",
  new_stars: "59",
  rank: "1"
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const trending_repositories = {
    update_at: 1713921819,
    repo_list: [
      item,
      item
    ]
  };
  res.status(200).json(trending_repositories);
}
