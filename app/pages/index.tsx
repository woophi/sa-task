import { Link } from '@atoms/Links';
import { getArticlesList } from '@core/operations/articles';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage<{ list: any }> = ({ list }) => {
  // console.debug(list);
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
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/about">
            Go to the about page
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export const getStaticProps: GetServerSideProps = async ({ req }) => {
  let list: any[] = [];
  try {
    list = await getArticlesList(1);
  } catch {}

  return {
    props: { list },
  };
};

export default Home;
