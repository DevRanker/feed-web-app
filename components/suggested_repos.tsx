import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import {Avatar, Button} from "@nextui-org/react";
import {Star} from '@/components/svgs/star';
import {Fork} from '@/components/svgs/fork';

interface RepoDetails {
  name: string;
  owner_login: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

interface RelatedRepo {
  repo_details: RepoDetails
}

interface SuggestedRepo extends Array<number|RelatedRepo>{0:number, 1: RelatedRepo}

export function RelatedRepo({repo_details}: RelatedRepo) {
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{repo_details['name']}</h4>
            <h5 className="text-small tracking-tight text-default-400">{repo_details['owner_login']}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">{repo_details['description']}</CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <Star starCount={repo_details['stargazers_count']} />
        </div>
        <div className="flex gap-1">
          <Fork forkCount={repo_details['forks_count']} />
        </div>
      </CardFooter>
    </Card>
  );
}

// @ts-ignore
export function SuggestedRepos({suggested_repos}) {
  return (
    <Card className="border-solid border-1" radius="none" shadow="none">
      <CardHeader className="flex gap-3 p-0 px-2">
        <div className="flex flex-col">
          <p className="text-small">Users also Starred</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody className="flex flex-row grid grid-cols-2 gap-3 overflow-x-scroll">
        {// @ts-ignore
          suggested_repos.map((repo_item, i) => (
          <RelatedRepo key={i} repo_details={repo_item[1]['repository_details']} />
        ))}
      </CardBody>
      <Divider/>
    </Card>
  );
}