import { api } from '@core/common';
import { BaseRespose, GraphModel } from '@core/models';

export type GraphData = BaseRespose<GraphModel>;

export const getGraphData = () => api<GraphData>('get', '/graph');
