export interface GraphModel {
  data: GraphDataModel[];
  source: GraphSourceModel[];
}

export interface GraphDataModel {
  ['ID Nation']: string;
  ['Nation']: string;
  ['ID Year']: number;
  Year: string;
  Population: number;
  ['Slug Nation']: string;
}
export interface GraphSourceModel {
  measures: ['Population'];
  annotations: {
    source_name: string;
    source_description: string;
    dataset_name: string;
    dataset_link: string;
    table_id: string;
    topic: string;
    subtopic: string;
  };
  name: string;
  substitutions: [];
}
