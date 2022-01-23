import { api } from '@core/common';
import {
  ArticleInfo,
  ArticleItem,
  BaseRespose,
  CommentModel,
  CreateCommentModel,
  Pagination,
} from '@core/models';

export type ArticlesData = BaseRespose<ArticleItem[], { pagination: Pagination }>;
export type ArticleData = BaseRespose<ArticleInfo>;
export type ArticleCommentsData = BaseRespose<CommentModel[]>;

export const getArticlesList = (page: number) => api<ArticlesData>('get', `/articles?page=${page}`);
export const getArticle = (uuid: string) => api<ArticleData>('get', `/article/${uuid}`);

export const getArticleComments = (uuid: string) =>
  api<ArticleCommentsData>('get', `/article/${uuid}/comments`);

export const createComment = (uuid: string, data: CreateCommentModel) =>
  api<BaseRespose<undefined>>('post', `/article/${uuid}/comment`, data);
