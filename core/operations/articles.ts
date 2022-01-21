import { api } from '@core/common';
import { ArticleItem, BaseRespose, Pagination } from '@core/models';

export type ArticlesData = BaseRespose<ArticleItem[], { pagination: Pagination }>;

export const getArticlesList = (page: number) => api<ArticlesData>('get', `/articles?page=${page}`);
