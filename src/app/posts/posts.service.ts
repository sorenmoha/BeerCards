import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, type: string, abv: string, rating: string,  content: string) {
    const post: Post = {title: title, abv: content, type: content, rating: content, content: content, };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
