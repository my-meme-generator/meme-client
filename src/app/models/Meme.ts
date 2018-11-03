/**
 * Model for client-side meme
 */
export class Meme {
  _id?: string;
  imagePath: string;
  text: string;
  author: string;
  upvotes: number;
  downvotes: number;
}