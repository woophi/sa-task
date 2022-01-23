import { ArticleData, getArticle } from '@core/operations/articles';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import type { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { AppLayout } from 'ui/components/layout/AppLayout';

const Comments = dynamic(() => import('ui/components/articles/Comments'), { ssr: false });
const PopulationGraph = dynamic(() => import('ui/components/graphs/Population'), { ssr: false });

const ArticlePage: NextPage<{ data: ArticleData }> = ({ data }) => {
  const { result } = data;
  return (
    <AppLayout title={result.title}>
      <Box minWidth="50vw" padding="1rem" maxWidth="720px" margin="auto">
        <Typography variant="h3" component="h1" gutterBottom>
          {result.title}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom color="textSecondary">
          Published: {result.created_at}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom color="textSecondary">
          Author: {result.author.first_name} {result.author.last_name}
        </Typography>
        <Typography component="div" gutterBottom>
          {result.content}
        </Typography>
        <PopulationGraph />
        <Comments uuid={result.id} />
      </Box>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const data = await getArticle(String(query.uuid));
  return {
    props: { data },
  };
};

export default ArticlePage;
