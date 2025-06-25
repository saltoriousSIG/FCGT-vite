import { NUser } from "./neynar.type";

export type RawSubmission = {
  entry_id: string;
  fid: bigint;
  submission_descripton: string; // Note: keeping your original spelling
  submission_link: string;
  submission_name: string;
  user_address: string;
};

type Comment = {
  user: string;
  message: string;
};

export type SubmissionData = {
  entry_id: string;
  user: NUser;
  votes: number;
  comments: Comment[];
};
