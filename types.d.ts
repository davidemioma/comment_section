export interface CommentProps {
  id: string;
  replyTo: string;
  comment: string;
  displayName: string;
  profileUrl: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}
