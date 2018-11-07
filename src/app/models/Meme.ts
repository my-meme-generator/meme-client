/**
 * Model for client-side meme
 */
export class Meme {
  _id?: string;
  imagePath: string;
  textAbove: string;
  textBelow: string;
  author: string;
  upvotes: number;
  downvotes: number;
  created: Date;
}