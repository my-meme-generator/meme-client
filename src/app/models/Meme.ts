/**
 * Model for client-side meme
 */
export class Meme {
  _id?: string;
  image: any;
  author: string;
  upvotes: number;
  downvotes: number;
  created: Date;
}