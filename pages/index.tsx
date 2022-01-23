import { ArticlesData, getArticlesList } from '@core/operations/articles';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import type { GetServerSideProps, NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';
import { ArticlesList } from 'ui/components/articles/List';
import { AppLayout } from 'ui/components/layout/AppLayout';
import { useInView } from 'ui/hooks/useInView';

const Home: NextPage<{ data: ArticlesData }> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState(data.result);
  const [pageNum, setPageNum] = useState(data.pagination.current);

  const shoudlSetLastItem = useMemo(
    () => !loading && pageNum < data.pagination.total,
    [pageNum, data.pagination.total, loading],
  );

  const fetchMoreArticles = useCallback((nextPage: number) => {
    setLoading(true);
    getArticlesList(nextPage)
      .then(r => {
        setArticles(v => v.concat(r.result));
        setPageNum(nextPage);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const onObserveCb = useCallback(() => {
    fetchMoreArticles(pageNum + 1);
  }, [pageNum]);

  const { observedItem } = useInView(onObserveCb, [shoudlSetLastItem]);

  return (
    <AppLayout title="Articles">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ArticlesList articles={articles} observedItem={observedItem} shoudlSetLastItem={shoudlSetLastItem} />

        {loading && <LinearProgress sx={{ borderRadius: '.25rem' }} color="secondary" />}
      </Box>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getArticlesList(1);
  return {
    props: { data },
  };
};

export default Home;
