/**
 * Model for client-side meme
 */
export class Meme {
  _id?: string;
  imageLink: string;
  author: string;
  upvotes: number;
  downvotes: number;
  created: Date;
}