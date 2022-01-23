import { ScrollButton } from '@atoms/ScrollToTop';
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';

type Props = {
  children: React.ReactElement;
};

const HideOnScroll: FC<Props> = props => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AppLayout = memo<AppLayoutProps>(({ children, title }) => {
  const router = useRouter();
  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            {router.route !== '/' ? (
              <IconButton onClick={router.back}>
                <ArrowBack />
              </IconButton>
            ) : null}
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 2 }}>{children}</Box>
      </Container>
      <ScrollButton />
    </>
  );
});
