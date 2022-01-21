import { Link } from '@atoms/Links';
import { ArticlesData, getArticlesList } from '@core/operations/articles';
import { Button, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { GetServerSideProps, NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';
import { ArticlesList } from 'ui/components/articles/List';
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
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Articles
        </Typography>
        <ArticlesList articles={articles} observedItem={observedItem} shoudlSetLastItem={shoudlSetLastItem} />
        {loading && (
          <Box sx={{ width: '100%', maxWidth: '65vw', marginBottom: '1rem' }}>
            <LinearProgress sx={{ borderRadius: '.25rem' }} color="secondary" />
          </Box>
        )}
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/about">
            Go to the about page
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getArticlesList(1);
  return {
    props: { data },
  };
};

export default Home;
