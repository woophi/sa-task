import { ScrollButton } from '@atoms/ScrollToTop';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
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

type AppLayoutProps = Props & {
  title: string;
};

export const AppLayout = memo<AppLayoutProps>(({ children, title }) => {
  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
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
