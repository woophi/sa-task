import { api } from '@core/common';
import { ArticleItem } from '@core/models';

export const getArticlesList = (page: number) => api<ArticleItem[]>('get', `/v1/articles?page=${page}`);
