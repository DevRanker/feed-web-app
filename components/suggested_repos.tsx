import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import {Avatar, Button} from "@nextui-org/react";
import {Star} from '@/components/svgs/star';
import {Fork} from '@/components/svgs/fork';
import React from 'react';

interface RepoDetails {
  name: string;
  owner_login: string;
  owner_avatar_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

interface RelatedRepo {
  repo_index: number;
  repo_details: RepoDetails;
  selectRepoHook: (repo_index: number) => void;
}

interface SuggestedRepo extends Array<number|RelatedRepo>{0:number, 1: RelatedRepo}

export function RelatedRepo({repo_index, repo_details, selectRepoHook}: RelatedRepo) {
  return (
    <Card isPressable onPress={() => selectRepoHook(repo_index)} className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex gap-1 items-start">
            <Avatar radius="full" size="sm" src={repo_details['owner_avatar_url']} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">{repo_details['name']}</h4>
              <h5 className="text-small tracking-tight text-default-400">{repo_details['owner_login']}</h5>
            </div>
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
export function SuggestedRepos({suggested_repos, selectRepoHook}) {
  const selectRepoIndex = (repo_index: number) => {
    console.log(suggested_repos[repo_index]);
    selectRepoHook(suggested_repos[repo_index][1]);
  }
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
          <RelatedRepo
            key={i}
            repo_index={i}
            repo_details={repo_item[1]['repository_details']}
            selectRepoHook={selectRepoIndex}
          />
        ))}
      </CardBody>
      <Divider/>
    </Card>
  );
}