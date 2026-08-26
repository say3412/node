import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.interface';
import { findIndex } from 'rxjs';

@Injectable()
export class PostsService {
  private userId = 1;
  private posts: Post[] = [
    {
      id: this.userId++,
      title: 'first greeting',
      content: 'Thank you for comming, nice to meet you.',
      author: 'Minji',
    },
  ];
  create(createPostDto: CreatePostDto) {
    const post: Post = {
      id: this.userId++,
      title: createPostDto.title,
      content: createPostDto.content,
      author: createPostDto.author ?? "익명" ,
    };

    this.posts.push(post);
    return post;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`no post ${id} found`);
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.findOne(id);
    post.title = updatePostDto.title ?? post.title;
    post.content = updatePostDto.content ?? post.content;
    post.author = updatePostDto.author ?? post.author;
    return post;
  }

  remove(id: number) {
    const post = this.findOne(id);
    const index = this.posts.findIndex((p) => p.id === id);
    const [removed] = this.posts.splice(index, 1);
    return removed;
  }
}
